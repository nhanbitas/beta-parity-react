'use client';

import React, { useCallback, useEffect } from 'react';
import classNames from 'classnames';
import { X } from 'lucide-react';
import './index.css';
import useHoverFocus, { EventHandlers } from '../hooks/useHoverFocus';
import { Spinner } from '../Spinner';
import useDidMountEffect from '../hooks/useDidMountEffect';

// TODO:
// - Pending state => OK
// - Icon => OK
// - Action button
// - Layout: flex/compact
// - Light/dark/alternative mode

const positions = ['top-right', 'top-center', 'bottom-right', 'bottom-center'] as const;

const openAnimations = {
  'top-right': 'animate-slide-in-left',
  'top-center': 'animate-slide-in-top',
  'bottom-right': 'animate-slide-in-left',
  'bottom-center': 'animate-slide-in-bottom'
};

const closeAnimations = {
  'top-right': 'animate-fade-out',
  'top-center': 'animate-fade-out',
  'bottom-right': 'animate-fade-out',
  'bottom-center': 'animate-fade-out'
};

export interface ToastProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  id: string;
  removeToast: (id: string) => void;
  title?: string | React.ReactNode;
  message?: string | React.ReactNode;
  action?: string | React.ReactNode;
  kind?: 'generic' | 'information' | 'affirmative' | 'cautionary' | 'adverse';
  position?: (typeof positions)[number];
  autoDismiss?: boolean;
  duration?: number;
  pauseOnHover?: boolean;
  icon?: React.ReactNode;
  progressBar?: boolean;
  actionSection?: React.ReactNode;
  dismissButton?: boolean;
  importance?: number;
  pending?: boolean;
  onShown?: () => void;
  onDismissed?: () => void;
}

const Toast: React.FC<ToastProps> = ({
  id,
  removeToast,
  className,
  title,
  message,
  action,
  icon,
  actionSection,
  kind = 'generic',
  position = 'top-right',
  dismissButton = true,
  importance = 0,
  pending = false,
  autoDismiss = false,
  progressBar = false,
  duration = 5000,
  pauseOnHover = true,
  onDismissed = () => {},
  ...props
}) => {
  const { isHovered, isFocused, getEventHandlers } = useHoverFocus();
  const combinedEventHandlers = getEventHandlers(props as EventHandlers);
  const [closing, setClosing] = React.useState(false);

  const [remaining, setRemaining] = React.useState(duration);
  const [end, setEnd] = React.useState(Date.now() + duration);

  const handleCloseToast = useCallback(() => {
    setClosing(true);
    // set timeout equal with css duration to sync animation
    setTimeout(() => {
      removeToast(id);
      onDismissed && onDismissed();
    }, 250);
  }, [id, onDismissed, removeToast]);

  // Case 1: pauseOnHover is true
  useEffect(() => {
    if (!autoDismiss || !pauseOnHover || pending) return;

    let timer: any;

    // Clear timeout, set new duration (remaining) when toast is focused or hovered
    if (isFocused || isHovered) {
      clearTimeout(timer);
      setRemaining(end - Date.now());
    }

    // If toast is not focused or hovered and remaining time is greater than 0ms, set a timeout
    // to close the toast with the remaining time
    if (!isFocused && !isHovered) {
      if (remaining > 0) {
        timer = setTimeout(() => {
          handleCloseToast();
        }, remaining);

        setEnd(Date.now() + remaining);
      }
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isFocused, isHovered, duration, autoDismiss, pauseOnHover, pending]);

  // Case 2: pauseOnHover is false
  useEffect(() => {
    if (!autoDismiss || pauseOnHover || pending) return;

    let timer: any;

    timer = setTimeout(() => {
      handleCloseToast();
    }, duration);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [duration, autoDismiss, pauseOnHover, pending]);

  useDidMountEffect(() => {
    setEnd(Date.now() + duration);
    setRemaining(duration);
  }, [pending]);

  return (
    <div
      tabIndex={0}
      className={classNames('toast', pending ? 'generic' : kind, className, {
        active: true,
        [openAnimations[position]]: !closing,
        [closeAnimations[position]]: closing,
        ...(pauseOnHover && { paused: closing ? false : isFocused || isHovered })
      })}
      {...props}
      {...(combinedEventHandlers as any)}
    >
      <ToastIcon kind={kind} icon={icon} pending={pending} />

      <ToastBody>
        <ToastTitle>{title}</ToastTitle>
        <ToastMessage>{message}</ToastMessage>
        <ToastAction>{action}</ToastAction>
      </ToastBody>

      {dismissButton && !pending && (
        <ToastCloseButton onClick={() => handleCloseToast()}>
          <X />
        </ToastCloseButton>
      )}

      {autoDismiss && !pending && progressBar && <ToastProgressBar duration={duration} />}
    </div>
  );
};

export default Toast;

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

export interface ToastActionProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ToastAction = React.forwardRef<HTMLDivElement, ToastActionProps>(({ children, ...props }, ref) => {
  return children ? (
    <div className='toast-action' ref={ref} {...props}>
      {children}
    </div>
  ) : null;
});

ToastAction.displayName = 'ToastAction';

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

export interface ToastProgressBarProps extends React.HTMLAttributes<HTMLSpanElement> {
  duration: number;
}

export const ToastProgressBar = React.forwardRef<HTMLSpanElement, ToastProgressBarProps>(
  ({ children, duration, ...props }, ref) => {
    return (
      <span className='toast-progress-bar' ref={ref} {...props} style={{ animationDuration: `${duration}ms` }}>
        {children}
      </span>
    );
  }
);

ToastProgressBar.displayName = 'ToastProgressBar';

export interface ToastIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  kind?: 'generic' | 'information' | 'affirmative' | 'cautionary' | 'adverse';
  icon?: React.ReactNode;
  pending?: boolean;
}

export const ToastIcon = React.forwardRef<HTMLSpanElement, ToastIconProps>(
  ({ kind = 'generic', icon, pending, ...props }, ref) => {
    if (icon)
      return (
        <span className='toast-icon' ref={ref}>
          {icon}
        </span>
      );

    if (pending)
      return (
        <span className='toast-icon' ref={ref}>
          <Spinner size='sm' />
        </span>
      );

    switch (kind) {
      case 'generic':
        return null;
      case 'information':
        return (
          <span className='toast-icon' ref={ref}>
            <svg xmlns='http://www.w3.org/2000/svg' width={20} height={20} viewBox='0 0 20 20' fill='none'>
              <path
                d='M10 18.3333C14.5833 18.3333 18.3333 14.5833 18.3333 9.99996C18.3333 5.41663 14.5833 1.66663 10 1.66663C5.41667 1.66663 1.66667 5.41663 1.66667 9.99996C1.66667 14.5833 5.41667 18.3333 10 18.3333Z'
                fill='var(--par-color-text-helper-info)'
                stroke='var(--par-color-text-helper-info)'
                strokeWidth='1.33'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M10 10V14.1667'
                stroke='var(--par-color-text-primary-inverse)'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M10 6.25H10.0075'
                stroke='var(--par-color-text-primary-inverse)'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </span>
        );
      case 'affirmative':
        return (
          <span className='toast-icon' ref={ref}>
            <svg xmlns='http://www.w3.org/2000/svg' width={20} height={20} viewBox='0 0 20 20' fill='none'>
              <path
                d='M10 18.3333C14.5833 18.3333 18.3333 14.5833 18.3333 9.99996C18.3333 5.41663 14.5833 1.66663 10 1.66663C5.41667 1.66663 1.66667 5.41663 1.66667 9.99996C1.66667 14.5833 5.41667 18.3333 10 18.3333Z'
                fill='var(--par-color-text-helper-affirmative)'
                stroke='var(--par-color-text-helper-affirmative)'
                strokeWidth='1.33'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M6.45833 10.0001L8.81667 12.3584L13.5417 7.64172'
                stroke='var(--par-color-text-primary-inverse)'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </span>
        );
      case 'cautionary':
        return (
          <span className='toast-icon' ref={ref}>
            <svg xmlns='http://www.w3.org/2000/svg' width={20} height={20} viewBox='0 0 20 20' fill='none'>
              <path
                d='M10 17.8417H4.95C2.05833 17.8417 0.85 15.775 2.25 13.25L4.85 8.56665L7.3 4.16665C8.78333 1.49165 11.2167 1.49165 12.7 4.16665L15.15 8.57498L17.75 13.2583C19.15 15.7833 17.9333 17.85 15.05 17.85H10V17.8417Z'
                fill='var(--par-color-text-helper-cautionary)'
                stroke='var(--par-color-text-helper-cautionary)'
                strokeWidth='1.33'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M10 7.5V11.6667'
                stroke='var(--par-color-text-primary-inverse)'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M9.99542 14.1667H10.0029'
                stroke='var(--par-color-text-primary-inverse)'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </span>
        );
      case 'adverse':
        return (
          <span className='toast-icon' ref={ref}>
            <svg xmlns='http://www.w3.org/2000/svg' width={20} height={20} viewBox='0 0 20 20' fill='none'>
              <path
                d='M9.93333 18.3334C14.5167 18.3334 18.2667 14.5834 18.2667 10.0001C18.2667 5.41675 14.5167 1.66675 9.93333 1.66675C5.35 1.66675 1.6 5.41675 1.6 10.0001C1.6 14.5834 5.35 18.3334 9.93333 18.3334Z'
                fill='var(--par-color-text-helper-adverse)'
                stroke='var(--par-color-text-helper-adverse)'
                strokeWidth='1.33'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M6.6 10H13.2667'
                stroke='var(--par-color-text-primary-inverse)'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </span>
        );
      default:
        return null;
    }
  }
);

ToastIcon.displayName = 'ToastIcon';
