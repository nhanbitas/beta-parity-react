import React from 'react';
import useDidMountEffect from '../hooks/useDidMountEffect';
import './index.css';

/**
 * Props for the Animation component.
 */

export interface AnimationProps {
  /**
   * The react element that will receive the animated classes and styles.
   */
  children: React.ReactElement;
  /**
   * Additional class name to apply.
   */
  className?: string;
  /**
   * Callback when animation starts entering.
   */
  onEnter?: () => void;
  /**
   * Callback when animation starts exiting.
   */
  onExit?: () => void;
  /**
   * Callback when animation has fully exited.
   */
  onExited?: () => void;
  /**
   * Callback when exiting transition is active.
   */
  onExiting?: () => void;
  /**
   * Callback when entering transition is active.
   */
  onEntering?: () => void;
  /**
   * Callback when animation has fully entered.
   */
  onEntered?: () => void;
  /**
   * Duration or durations for the transition. If a number, applies to both entering and exiting.
   */
  timeout?: number | { enter?: number; exit?: number };
  /**
   * If true, the component is shown.
   */
  in?: boolean;
  /**
   * If true, the animation is applied on the initial mount.
   */
  appear?: boolean;
  /**
   * If true, the child is unmounted on exit.
   */
  unmountOnExit?: boolean;

  /**
   * Specifies the animation template to use. Determines the type of animation applied to the component.
   */
  template?: 'fade' | 'slide' | 'zoom' | 'rotate' | 'flip' | 'bounce' | 'pulse' | 'shake' | 'tada' | 'jello';
  /**
   * The CSS easing function to use for the transition.
   */
  easing?: string;
  /**
   * The direction of the animation.
   */
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  /**
   * Delay before starting the animation in milliseconds.
   */
  delay?: number;
  /**
   * Duration of the animation in milliseconds.
   */
  duration?: number;
  /**
   * Number of times the animation should repeat.
   */
  iterationCount?: number | 'infinite';
  /**
   * Specifies how styles are applied before and after the animation.
   */
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both';
}

/**
 * **Animation Component**
 *
 * A component that wraps a single React element and adds entry/exit animations.
 * Based on the animation state, it applies different CSS classes and inline styles
 * to enable transitions such as fade-in, fade-out, slide, etc.
 *
 * The Animation component provides lifecycle callbacks and configurable timing,
 * easing, and other CSS animation properties.

 * @example
 * // Basic usage
 * <Animation in={true} timeout={300}>
 *   <div>Your animated content here</div>
 * </Animation>
 *
 * @see {@link http://localhost:3005/animation Animation Documentation}
 */
export const Animation: React.FC<AnimationProps> = ({
  children,
  className: initialClassName,
  onEnter,
  onExit,
  onExited,
  onExiting,
  onEntering,
  onEntered,
  timeout = 300,
  template,
  in: inProp = false,
  appear = false,
  unmountOnExit = false,
  easing = 'ease',
  direction = 'normal',
  delay = 0,
  duration = 300,
  iterationCount = 1,
  fillMode = 'forwards',
  ...props
}) => {
  const [state, setState] = React.useState<'entering' | 'entered' | 'exiting' | 'exited'>(() => {
    if (inProp) {
      return appear ? 'exited' : 'entered'; // Start in 'exited' if appear is true
    }
    return 'exited';
  });

  useDidMountEffect(() => {
    if (inProp) {
      setState('entering');
      onEntering?.();
      const timer = setTimeout(
        () => {
          setState('entered');
          onEntered?.();
        },
        typeof timeout === 'number' ? timeout : timeout.enter || 300
      );
      return () => clearTimeout(timer);
    } else {
      setState('exiting');
      onExiting?.();
      const timer = setTimeout(
        () => {
          setState('exited');
          onExited?.();
        },
        typeof timeout === 'number' ? timeout : timeout.exit || 300
      );

      return () => clearTimeout(timer);
    }
  }, [inProp, timeout, onEntering, onEntered, onExiting, onExited]);

  const getClassName = React.useCallback(() => {
    const baseClassName = children.props.className || '';
    // Append a class to indicate the current animation state: entering, entered, exiting, or exited.
    const animationClass = `${initialClassName || ''} ${template ? template + '-' : ''}animation-${state}`;
    return `${baseClassName}${animationClass}`.trim();
  }, [children.props.className, initialClassName, state]);

  if (state === 'exited' && unmountOnExit) {
    return null;
  }

  if (state === 'entering') {
    onEnter?.();
  }

  if (state === 'exiting') {
    onExit?.();
  }

  const newProps = {
    ...children.props,
    ...props,
    className: getClassName(),
    style: {
      ...children.props.style,
      transition: `all ${typeof timeout === 'number' ? timeout : timeout.enter}ms ${easing}`,
      animationDirection: direction,
      animationDelay: `${delay}ms`,
      animationDuration: `${duration}ms`,
      animationIterationCount: iterationCount,
      animationFillMode: fillMode
    }
  };

  return React.cloneElement(children, newProps);
};
