'use client';

import React from 'react';
import classNames from 'classnames';
import './index.css';
import { ButtonProps } from '../Button';

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  size?: 'small' | 'medium' | 'large';
  type?: 'static' | 'dynamic';
  children: React.ReactNode;
  isActive: boolean;
  onClose?: () => void;
  onOpen?: () => void;
}

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  ({ className, type = 'dynamic', size = 'medium', isActive, onClose, onOpen, children, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(isActive);
    const [isBlock, setIsBlock] = React.useState(isActive);

    const handleActive = React.useCallback(() => {
      setIsBlock(true);
      const timeoutId = setTimeout(() => {
        setIsOpen(true);
      }, 100);
      onOpen && onOpen();
      return () => clearTimeout(timeoutId);
    }, [onOpen]);

    const handleClose = React.useCallback(() => {
      setIsOpen(false);
      const timeoutId = setTimeout(() => {
        setIsBlock(false);
      }, 100);
      onClose && onClose();
      return () => clearTimeout(timeoutId);
    }, [onClose]);

    React.useEffect(() => {
      if (isActive) {
        handleActive();
      } else {
        handleClose();
      }
    }, [isActive, handleActive, handleClose]);

    return (
      <div
        style={{ display: isBlock ? 'block' : 'none' }}
        className={classNames('modal', className, type, size, { active: isOpen })}
        ref={ref}
        {...props}
      >
        <ModalDialog>{children}</ModalDialog>
      </div>
    );
  }
);

Modal.displayName = 'Modal';

export interface ModalTriggerProps extends ButtonProps {}

export const ModalTrigger = React.forwardRef<HTMLButtonElement, ModalTriggerProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button className={classNames('modal-trigger', className)} ref={ref} {...props}>
        {children}
      </button>
    );
  }
);

ModalTrigger.displayName = 'ModalTrigger';

export interface ModalDialogProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ModalDialog = React.forwardRef<HTMLDivElement, ModalDialogProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className={classNames('modal-dialog', className)} ref={ref} {...props}>
        {children}
      </div>
    );
  }
);

ModalDialog.displayName = 'ModalDialog';

export interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ModalHeader = React.forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className={classNames('modal-header', className)} ref={ref} {...props}>
        {children}
      </div>
    );
  }
);

ModalHeader.displayName = 'ModalHeader';

export interface ModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ModalBody = React.forwardRef<HTMLDivElement, ModalBodyProps>(({ className, children, ...props }, ref) => {
  return (
    <div className={classNames('modal-body', className)} ref={ref} {...props}>
      {children}
    </div>
  );
});

ModalBody.displayName = 'ModalBody';

export interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ModalFooter = React.forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className={classNames('modal-footer', className)} ref={ref} {...props}>
        {children}
      </div>
    );
  }
);

ModalFooter.displayName = 'ModalFooter';
