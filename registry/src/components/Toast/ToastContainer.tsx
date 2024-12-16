'use client';

import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import Toast, { ToastProps } from './Toast';
import './variables.css';
import './index.css';

interface ToastContainerProps {
  limit?: number;
  stacked?: boolean;
  sortImportance?: boolean;
}

interface ToastInstance extends ToastProps {}

const ToastContainer: React.FC<ToastContainerProps> = ({
  limit = 1,
  stacked = true,
  sortImportance = true,
  ...props
}) => {
  const [isClient, setIsClient] = useState(false);
  const [toasts, setToasts] = useState<ToastInstance[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
  }, []);

  useEffect(() => {
    const handleAddToast = (event: CustomEvent) => {
      setToasts((currentToasts) => [...currentToasts, event.detail]);
    };

    const handleRemoveToast = (event: CustomEvent) => {
      setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== event.detail.id));
    };

    const handleUpdateToast = (event: CustomEvent) => {
      setToasts((currentToasts) =>
        currentToasts.map((toast) => (toast.id === event.detail.id ? { ...toast, ...event.detail } : toast))
      );
    };

    window.addEventListener('parity-add-toast', handleAddToast as EventListener);
    window.addEventListener('parity-remove-toast', handleRemoveToast as EventListener);
    window.addEventListener('parity-update-toast', handleUpdateToast as EventListener);
    return () => {
      window.removeEventListener('parity-add-toast', handleAddToast as EventListener);
      window.removeEventListener('parity-remove-toast', handleRemoveToast as EventListener);
      window.removeEventListener('parity-update-toast', handleUpdateToast as EventListener);
    };
  }, []);

  const sortedToasts = sortImportance ? toasts.sort((a, b) => (a.importance ?? 0) - (b.importance ?? 0)) : toasts;

  const topRightToasts = sortedToasts.filter((toast) => toast.position === 'top-right');
  const topCenterToasts = sortedToasts.filter((toast) => toast.position === 'top-center');
  const bottomRightToasts = sortedToasts.filter((toast) => toast.position === 'bottom-right');
  const bottomCenterToasts = sortedToasts.filter((toast) => toast.position === 'bottom-center');

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <>
      {topRightToasts.length
        ? ReactDOM.createPortal(
            <div className='toast-container top-right' {...props}>
              {generateToast(topRightToasts, removeToast, limit, stacked)}
            </div>,
            document.body
          )
        : null}

      {topCenterToasts.length
        ? ReactDOM.createPortal(
            <div className='toast-container top-center' {...props}>
              {generateToast(topCenterToasts, removeToast, limit, stacked)}
            </div>,
            document.body
          )
        : null}

      {bottomRightToasts.length
        ? ReactDOM.createPortal(
            <div className='toast-container bottom-right' {...props}>
              {generateToast(bottomRightToasts, removeToast, limit, stacked)}
            </div>,
            document.body
          )
        : null}

      {bottomCenterToasts.length
        ? ReactDOM.createPortal(
            <div className='toast-container bottom-center' {...props}>
              {generateToast(bottomCenterToasts, removeToast, limit, stacked)}
            </div>,
            document.body
          )
        : null}
    </>
  );
};

export default ToastContainer;

const generateToast = (toasts: ToastInstance[], removeToast: (id: string) => void, limit: number, stacked: boolean) => {
  const ITEMS_IN_STACK = 3;
  const revertIndex = (index: number) => toasts.length - (index + 1);
  const scaleIndicator = (index: number) => 1 - 0.05 * revertIndex(index);
  const bottomIndicator = (index: number) => -10 * revertIndex(index);
  const isShowing = (index: number) => index >= toasts.length - ITEMS_IN_STACK;

  if (!stacked)
    return (
      toasts.length &&
      toasts
        .map((toast) => <Toast key={toast.id} {...toast} removeToast={removeToast} />)
        .splice(-limit)
        .reverse()
    );

  return toasts.length > limit
    ? toasts.map((toast, index) => (
        <Toast
          key={toast.id}
          {...toast}
          removeToast={removeToast}
          className={index !== toasts.length - 1 ? 'collapsed' : ''}
          style={{
            top: isShowing(index) ? bottomIndicator(index) : 0,
            scale: isShowing(index) ? scaleIndicator(index) : 0
          }}
        />
      ))
    : toasts.map((toast) => <Toast key={toast.id} {...toast} removeToast={removeToast} />);
};
