import React, { useCallback, useEffect } from 'react';
import classNames from 'classnames';
import { X } from 'lucide-react';
import './index.css';

import useHoverFocus, { EventHandlers } from '../hooks/useHoverFocus';
import { Spinner } from '../Spinner';
import useDidMountEffect from '../hooks/useDidMountEffect';

// TODO: - Feat pauseOnFocus

// =========================
// Toast
// =========================

const positions: readonly string[] = ['top-right', 'top-center', 'bottom-right', 'bottom-center'] as const;

const openAnimations: Record<string, string> = {
  'top-right': 'animate-slide-in-left',
  'top-center': 'animate-slide-in-top',
  'bottom-right': 'animate-slide-in-left',
  'bottom-center': 'animate-slide-in-bottom'
};

const closeAnimations: Record<string, string> = {
  'top-right': 'animate-fade-out',
  'top-center': 'animate-fade-out',
  'bottom-right': 'animate-fade-out',
  'bottom-center': 'animate-fade-out'
};

const emphasisClasses: Record<'normal' | 'high', string> = {
  normal: 'emphasis-normal',
  high: 'emphasis-high'
};

const heightClasses: Record<'flexible' | 'compact', string> = {
  flexible: 'height-flexible',
  compact: 'height-compact'
};

/**
 * Props for the Toast component.
 *
 * Extends properties from the `div` element.
 */
export interface ToastProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Unique identifier for the toast.
   *
   * @memberof ToastProps
   */
  id: string;

  /**
   * Function to remove the toast, called with the toast's unique identifier.
   * @param id The unique identifier of the toast to remove.
   * @memberof ToastProps
   */
  removeToast: (id: string) => void;

  /**
   * The title of the toast, which can be a string or a React node.
   *
   * @memberof ToastProps
   */
  title?: string | React.ReactNode;

  /**
   * The message displayed in the toast, which can be a string or a React node.
   *
   * @memberof ToastProps
   */
  message?: string | React.ReactNode;

  /**
   * Optional action element to display in the toast.
   *
   * @memberof ToastProps
   */
  action?: React.ReactNode;

  /**
   * The height of the toast. Determines if the toast is compact or flexible.
   *
   * @default 'flexible'
   * @memberof ToastProps
   */
  height?: 'flexible' | 'compact';

  /**
   * The emphasis level of the toast.
   * - `normal`: Default emphasis.
   * - `high`: Highlighted emphasis for important toasts.
   *
   * @default 'high'
   * @memberof ToastProps
   */
  emphasis?: 'normal' | 'high';

  /**
   * The kind of toast, which determines its purpose or styling.
   * - `generic`: Default styling.
   * - `information`: For informational messages.
   * - `affirmative`: For success or positive feedback.
   * - `cautionary`: For warnings or caution.
   * - `adverse`: For errors or negative feedback.
   *
   * @default 'generic'
   * @memberof ToastProps
   */
  kind?: 'generic' | 'information' | 'affirmative' | 'cautionary' | 'adverse';

  /**
   * The position of the toast. Should be one of the positions defined in `positions`.
   *
   * @default 'top-right'
   * @memberof ToastProps
   */
  position?: (typeof positions)[number];

  /**
   * Whether the toast should automatically dismiss after a certain duration.
   *
   * @default false
   * @memberof ToastProps
   */
  autoDismiss?: boolean;

  /**
   * The duration (in milliseconds) before the toast automatically dismisses.
   * Only applicable if `autoDismiss` is true.
   *
   * @default 5000
   * @memberof ToastProps
   */
  duration?: number;

  /**
   * Whether to pause the auto-dismiss timer when the user hovers over the toast.
   *
   * @default true
   * @memberof ToastProps
   */
  pauseOnHover?: boolean;

  /**
   * The icon to display in the toast. This can be any React node.
   *
   * Override the default icon based on the `kind` prop.
   *
   * @memberof ToastProps
   */
  icon?: React.ReactNode;

  /**
   * Whether to display a progress bar for the auto-dismiss timer.
   *
   * @default false
   * @memberof ToastProps
   */
  progressBar?: boolean;

  /**
   * Whether to display a dismiss button in the toast.
   *
   * @default true
   * @memberof ToastProps
   */
  dismissButton?: boolean;

  /**
   * The importance level of the toast. Higher values indicate higher priority.
   *
   * @default 0
   * @memberof ToastProps
   */
  importance?: number;

  /**
   * Whether the toast is in a pending state, typically used for asynchronous operations.
   *
   * @default false
   * @memberof ToastProps
   */
  pending?: boolean;

  /**
   * Callback function that is triggered when the toast is dismissed.
   *
   * @memberof ToastProps
   */
  onDismissed?: () => void;
}

/**
 * **Parity Toast**.
 *
 * @see {@link http://localhost:3005/toast Parity Toast}
 */
export const Toast: React.FC<ToastProps> = ({
  id,
  removeToast,
  className,
  title,
  message,
  action,
  icon,
  height = 'flexible',
  emphasis = 'high',
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
  const isCompact = height === 'compact';

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
    if (isHovered) {
      clearTimeout(timer);
      setRemaining(end - Date.now());
    }

    // If toast is not focused or hovered and remaining time is greater than 0ms, set a timeout
    // to close the toast with the remaining time
    if (!isHovered) {
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
  }, [isHovered, duration, autoDismiss, pauseOnHover, pending]);

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
      className={classNames(
        'toast',
        pending ? 'generic' : kind,
        emphasisClasses[emphasis],
        heightClasses[height],
        className,
        {
          active: true,
          [openAnimations[position]]: !closing,
          [closeAnimations[position]]: closing,
          ...(pauseOnHover && { paused: closing ? false : isHovered })
        }
      )}
      {...props}
      {...(combinedEventHandlers as any)}
    >
      <ToastIcon kind={kind} icon={icon} pending={pending} />

      <ToastBody>
        {!isCompact && title && <ToastTitle>{title}</ToastTitle>}

        {message && <ToastMessage>{message}</ToastMessage>}

        {!isCompact && action && <ToastAction>{action}</ToastAction>}
      </ToastBody>

      <div className='action-section'>
        {isCompact && action && <ToastAction>{action}</ToastAction>}

        {isCompact && action && dismissButton && <span className='toast-action-divider'></span>}

        {dismissButton && !pending && (
          <ToastCloseButton onClick={() => handleCloseToast()}>
            <X />
          </ToastCloseButton>
        )}
      </div>

      {autoDismiss && !pending && progressBar && <ToastProgressBar duration={duration} />}
    </div>
  );
};

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
        <span className='toast-icon' ref={ref} {...props}>
          {icon}
        </span>
      );

    if (pending)
      return (
        <span className='toast-icon' ref={ref} {...props}>
          <Spinner size='sm' />
        </span>
      );

    switch (kind) {
      case 'generic':
        return null;
      case 'information':
        return (
          <span className='toast-icon' ref={ref} {...props}>
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
          <span className='toast-icon' ref={ref} {...props}>
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
          <span className='toast-icon' ref={ref} {...props}>
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
          <span className='toast-icon' ref={ref} {...props}>
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
