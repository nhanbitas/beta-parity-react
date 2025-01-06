import React from 'react';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  Placement,
  useClick,
  arrow,
  FloatingArrow,
  safePolygon
} from '@floating-ui/react';
import './index.css';
import { Portal } from '../Portal';
import classNames from 'classnames';
import { useTouch } from './useTouch';

export interface TooltipProps {
  /**
   * The position of the tooltip relative to the target element. Based on the `Placement` type from the floating-ui library.
   *
   *  Acceptable values include:
   * `top`,
   * `bottom`,
   * `left`,
   * `right`,
   * `top-start`,
   * `bottom-start`,
   * `left-start`,
   * `right-start`,
   * `top-end`,
   * `bottom-end`,
   * `left-end`,
   * `right-end`
   *
   * Default value is `top`
   *
   * @memberof Tooltip
   */
  position?: Placement;

  /**
   * Determines if the tooltip is static (does not auto-adjust position) or dynamic.
   * If `true`, the tooltip will be a toggle tooltip.
   *
   * Default value is `false`
   *
   * @memberof Tooltip
   */
  isToggle?: boolean;

  /**
   * The text or content to display inside the tooltip.
   *
   * @memberof Tooltip
   */
  content: string;

  /**
   * The delay time (ms) to show tooltip when hovering the tooltip
   *
   * Default value is `0`
   *
   * @memberof Tooltip
   */
  delay?: number;

  /**
   * The delay time (ms) to show tooltip when touching the tooltip on mobile
   *
   * If touchDelay is `undefined`, it will not show tooltip when touching the tooltip on mobile
   *
   * If touchDelay is valid (number), it will show tooltip when touching the tooltip on mobile with delay
   *
   * @memberof Tooltip
   */
  touchDelay?: number;

  /**
   * If `true`, it is allows the user to move the cursor off the reference element and towards the floating element without it closing (e.g. it has interactive content inside).
   *
   * Default value is `false`
   *
   * @memberof Tooltip
   */
  isSafePolygon?: boolean;
}

export const Tooltip = ({
  children,
  className,
  content,
  position = 'top',
  isToggle = false,
  delay = 0,
  touchDelay,
  isSafePolygon = false,
  ...props
}: TooltipProps & React.HTMLAttributes<HTMLDivElement>) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const arrowRef = React.useRef(null);

  // Initialize floating-ui
  const { refs, floatingStyles, context, placement } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: position,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(8),
      flip({
        fallbackAxisSideDirection: 'start'
      }),
      shift(),
      arrow({
        element: arrowRef
      })
    ]
  });

  // Event listeners to change the open state
  const click = useClick(context, {
    enabled: isToggle
  });
  const hover = useHover(context, {
    mouseOnly: false,
    move: false,
    handleClose: isSafePolygon ? safePolygon() : undefined,
    delay: { open: delay, close: 0 }
  });
  const focus = useFocus(context, { visibleOnly: false });
  const touch = useTouch(context, {
    delay: touchDelay || 1500
  });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });

  const interactions = [click, hover, focus, dismiss, role];
  if (touchDelay !== undefined) interactions.push(touch);

  // Merge all the interactions into prop getters
  const { getReferenceProps, getFloatingProps } = useInteractions(interactions);

  const cloneChildren = React.Children.map(children, (child) => {
    // If child is string or number, add a wrapper for them
    if (typeof child === 'string' || typeof child === 'number') {
      return (
        <span className='tooltip' tabIndex={0} ref={refs.setReference} {...getReferenceProps()}>
          {child}
        </span>
      );
    }
    // If child is a component, clone and pass ref and reference props from floating-ui to them
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        ...child.props,
        className: classNames(child.props.className, 'tooltip'),
        ref: refs.setReference,
        ...getReferenceProps()
      });
    }

    return child;
  });

  return (
    <>
      {cloneChildren}

      <Portal>
        {isOpen && (
          <div
            {...props}
            className={classNames('tooltip-content', className, placement)}
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            {content}

            <FloatingArrow width={8} height={4} className='tooltip-caret' ref={arrowRef} context={context} />
          </div>
        )}
      </Portal>
    </>
  );
};
