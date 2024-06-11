import React from 'react';
import classNames from 'classnames';
import './index.css';
import useCombinedProps from '../hooks/useCombinedProps';

export interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
  position?: 'top' | 'top-left' | 'top-right' | 'bottom' | 'bottom-left' | 'bottom-right';
  size?: 'fit' | 'full' | 'standard';
  isOpen?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
}

export const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  ({ className, children, position = 'bottom', size = 'standard', isLoading, disabled, isOpen, ...props }, ref) => {
    const [openState, seOpenState] = React.useState(isOpen);

    const handleOutsideClick = (e: MouseEvent) => {
      if (e.target) {
        const target = e.target as HTMLElement;
        if (!target.closest('.dropdown')) {
          seOpenState(false);
        }
      }
    };

    React.useEffect(() => {
      document.addEventListener('click', handleOutsideClick);
      return () => document.removeEventListener('click', handleOutsideClick);
    }, [isOpen, seOpenState]);

    const clonedChildren = useCombinedProps(children, { openState, seOpenState });

    return (
      <div className={classNames('dropdown', className, size)} ref={ref} {...props} data-open={openState}>
        {clonedChildren}
      </div>
    );
  }
);

Dropdown.displayName = 'Dropdown';

export interface DropdownTriggerProps extends React.HTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  openState?: boolean;
  seOpenState?: (openState: boolean) => void;
}

export const DropdownTringger = React.forwardRef<HTMLButtonElement, DropdownTriggerProps>(
  ({ className, children, isLoading, disabled, openState, seOpenState, ...props }, ref) => {
    return (
      <button
        className={classNames('dropdown-trigger', className)}
        ref={ref}
        {...props}
        data-open={openState}
        onClick={() => seOpenState && seOpenState(!openState)}
      >
        {children}
      </button>
    );
  }
);

DropdownTringger.displayName = 'DropdownTringger';

export interface DropdownContentProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
  position?: 'top' | 'top-left' | 'top-right' | 'bottom' | 'bottom-left' | 'bottom-right';
  size?: 'fit' | 'full' | 'standard';
  isLoading?: boolean;
  disabled?: boolean;
  openState?: boolean;
  seOpenState?: (openState: boolean) => void;
}

export const DropdownContent = React.forwardRef<HTMLDivElement, DropdownContentProps>(
  ({ className, children, position = 'bottom', size, isLoading, disabled, openState, ...props }, ref) => {
    return (
      <div
        className={classNames('dropdown-content', className, position, size)}
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
      <div className={classNames('dropdown-item', className)} ref={ref} {...props}>
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
