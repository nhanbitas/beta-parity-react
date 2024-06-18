import React from 'react';
import classNames from 'classnames';
import './index.css';
import useCombinedProps from '../hooks/useCombinedProps';
import useCombinedRefs from '../hooks/useCombinedRefs';

export interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
  position?: 'top' | 'top-left' | 'top-right' | 'bottom' | 'bottom-left' | 'bottom-right' | 'left' | 'right';
  size?: 'fit' | 'full' | 'standard';
  isToggle?: boolean;
  isOpen?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
}

export interface DropdownPassThroughProps
  extends Pick<DropdownProps, 'isToggle' | 'isOpen' | 'isLoading' | 'disabled' | 'position' | 'size'> {
  openState?: boolean;
  setOpenState?: (openState: boolean) => void;
}

export const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  (
    {
      className,
      children,
      position = 'bottom',
      size = 'standard',
      isLoading,
      disabled,
      isOpen,
      isToggle = true,
      ...props
    },
    ref
  ) => {
    const dropdownRef = React.useRef(null);
    const [openState, setOpenState] = React.useState(isOpen);
    const combinedRefs = useCombinedRefs(dropdownRef, ref);

    const handleOutsideClick = (e: MouseEvent) => {
      if (e.target) {
        const target = e.target as HTMLElement;
        if (combinedRefs.current && !combinedRefs.current.contains(target)) {
          setOpenState(false);
        }
      }
    };

    React.useEffect(() => {
      document.addEventListener('click', handleOutsideClick);
      return () => document.removeEventListener('click', handleOutsideClick);
    }, [isOpen, setOpenState]);

    const clonedChildren = useCombinedProps(children, {
      openState,
      setOpenState,
      isToggle,
      isLoading,
      disabled,
      position,
      size
    } as DropdownPassThroughProps);

    return (
      <div className={classNames('dropdown', className, size)} ref={combinedRefs} data-open={openState} {...props}>
        {clonedChildren}
      </div>
    );
  }
);

Dropdown.displayName = 'Dropdown';

export interface TriggerButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string;
}

export interface DropdownTriggerProps extends TriggerButtonProps, DropdownPassThroughProps {}

export const DropdownTringger = React.forwardRef<HTMLButtonElement, DropdownTriggerProps>(
  ({ className, children, isLoading, disabled, openState, setOpenState, isToggle, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      props.onClick && props.onClick(e);
      if (isToggle) {
        setOpenState && setOpenState(!openState);
      } else {
        setOpenState && setOpenState(true);
      }
    };

    return (
      <button
        className={classNames('dropdown-trigger', className)}
        ref={ref}
        {...props}
        data-open={openState}
        onClick={handleClick}
      >
        {children}
      </button>
    );
  }
);

DropdownTringger.displayName = 'DropdownTringger';

export interface ContentDropdownDiv extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  clickToClose?: boolean;
}

export interface DropdownContentProps extends ContentDropdownDiv, DropdownPassThroughProps {}

export const DropdownContent = React.forwardRef<HTMLDivElement, DropdownContentProps>(
  (
    {
      className,
      children,
      position = 'bottom',
      size,
      isLoading,
      disabled,
      openState,
      setOpenState,
      isToggle,
      clickToClose = false,
      ...props
    },
    ref
  ) => {
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (clickToClose) {
        setOpenState && setOpenState(false);
      }
    };

    return (
      <div
        className={classNames('dropdown-content', className, position, size)}
        onClick={handleClick}
        ref={ref}
        {...props}
        data-open={openState}
      >
        {children}
      </div>
    );
  }
);

DropdownContent.displayName = 'DropdownContent';

export interface DropdownItemProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
}

export const DropdownItem = React.forwardRef<HTMLDivElement, DropdownItemProps>(
  ({ className, children, isLoading, disabled, ...props }, ref) => {
    return (
      <div tabIndex={0} className={classNames('dropdown-item', className)} ref={ref} {...props}>
        {children}
      </div>
    );
  }
);

DropdownItem.displayName = 'DropdownItem';

export interface DropdownDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
}

export const DropdownDivider = React.forwardRef<HTMLDivElement, DropdownDividerProps>(
  ({ className, children, isLoading, disabled, ...props }, ref) => {
    return (
      <div className={classNames('dropdown-divider', className)} ref={ref} {...props}>
        {children}
      </div>
    );
  }
);

DropdownDivider.displayName = 'DropdownDivider';
