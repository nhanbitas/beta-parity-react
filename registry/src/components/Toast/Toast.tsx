import React, { useCallback, useEffect } from 'react';
import classNames from 'classnames';
import { X } from 'lucide-react';
import './index.css';

const positions = ['top-right', 'bottom-center'] as const;

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  removeToast: (id: string) => void;
  className?: string;
  toastTitle?: string | React.ReactNode;
  message?: string | React.ReactNode;
  details?: string | React.ReactNode;
  type?: 'info' | 'success' | 'warning' | 'danger';
  position?: (typeof positions)[number];
  duration?: number;
  onClose?: () => void;
}

const Toast: React.FC<ToastProps> = ({
  id,
  removeToast,
  className,
  toastTitle,
  message,
  details,
  type = 'info',
  position = 'top-right',
  duration = null,
  onClose = () => {},
  ...props
}) => {
  const [closing, setClosing] = React.useState(false);

  const handleCloseToast = useCallback(() => {
    setClosing(true);

    setTimeout(() => {
      removeToast(id);
      onClose && onClose();
    }, 300);
  }, [id, onClose, removeToast]);

  useEffect(() => {
    let timer: any;

    if (duration) {
      timer = setTimeout(() => {
        handleCloseToast();
      }, duration);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [handleCloseToast, duration]);

  return (
    <div className={classNames('toast', type, className, { active: true, closing: closing })} {...props}>
      <ToastIcon type={type} />
      <ToastBody>
        <ToastTitle>{toastTitle}</ToastTitle>
        <ToastMessage>{message}</ToastMessage>
        <small className='mt-2'>{details}</small>
      </ToastBody>
      <ToastCloseButton onClick={() => handleCloseToast()}>
        <X />
      </ToastCloseButton>
    </div>
  );
};

export default Toast;

export interface ToastIconProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'info' | 'success' | 'warning' | 'danger';
}

export const ToastIcon = React.forwardRef<HTMLDivElement, ToastIconProps>(({ type = 'info', ...props }, ref) => {
  return <div className={`toast-icon ${type}`} ref={ref} {...props} />;
});

ToastIcon.displayName = 'ToastIcon';

export interface ToastBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ToastBody = React.forwardRef<HTMLDivElement, ToastBodyProps>(({ children, ...props }, ref) => {
  return (
    <div className='toast-body' ref={ref} {...props}>
      {children}
    </div>
  );
});

ToastBody.displayName = 'ToastBody';

export interface ToastTitleProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ToastTitle = React.forwardRef<HTMLDivElement, ToastTitleProps>(({ children, ...props }, ref) => {
  return (
    <div className='toast-title' ref={ref} {...props}>
      {children}
    </div>
  );
});

ToastTitle.displayName = 'ToastTitle';

export interface ToastMessageProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ToastMessage = React.forwardRef<HTMLDivElement, ToastMessageProps>(({ children, ...props }, ref) => {
  return (
    <div className='toast-message' ref={ref} {...props}>
      {children}
    </div>
  );
});

ToastMessage.displayName = 'ToastMessage';

export interface ToastCloseButtonProps extends React.HTMLAttributes<HTMLButtonElement> {}

export const ToastCloseButton = React.forwardRef<HTMLButtonElement, ToastCloseButtonProps>(
  ({ children, ...props }, ref) => {
    return (
      <button className='toast-close' ref={ref} {...props}>
        {children}
      </button>
    );
  }
);

ToastCloseButton.displayName = 'ToastCloseButton';
