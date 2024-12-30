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
  FloatingPortal,
  Placement,
  useClick
} from '@floating-ui/react';
import './index.css';
import { Portal } from '../Portal';
import classNames from 'classnames';

export interface TooltipProps {
  children: React.ReactNode;
  position?: Placement;
}

export const Tooltip = ({ children, position = 'top', ...props }: TooltipProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const { refs, floatingStyles, context, placement } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: position,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(5),
      flip({
        fallbackAxisSideDirection: 'start'
      }),
      shift()
    ]
  });

  // Event listeners to change the open state
  const click = useClick(context);
  const hover = useHover(context, { move: false });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });

  // Merge all the interactions into prop getters
  const { getReferenceProps, getFloatingProps } = useInteractions([click, hover, focus, dismiss, role]);

  const cloneChildren = React.Children.map(children, (child) => {
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
            className={`tooltip-content ${placement}`}
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            {placement} tooltip! Compiled in 804ms (606 modules)
          </div>
        )}
      </Portal>
    </>
  );
};
