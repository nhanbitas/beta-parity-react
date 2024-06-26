'use client';

import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import Toast, { ToastProps } from './Toast';
import './index.css';

interface ToastContainerProps {
  max?: number;
}

interface ToastInstance extends ToastProps {}

const ToastContainer: React.FC<ToastContainerProps> = ({ max = 1 }) => {
  const [isClient, setIsClient] = useState(false);
  const [toasts, setToasts] = useState<ToastInstance[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
  }, []);

  useEffect(() => {
    const handleAddToast = (event: CustomEvent) => {
      setToasts((currentToasts) => [...currentToasts, event.detail]);
    };

    window.addEventListener('parity-add-toast', handleAddToast as EventListener);

    return () => {
      window.removeEventListener('parity-add-toast', handleAddToast as EventListener);
    };
  }, []);

  const topRightToasts = toasts.filter((toast) => toast.position === 'top-right');
  const bottomCenterToasts = toasts.filter((toast) => toast.position === 'bottom-center');

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <>
      {topRightToasts.length
        ? ReactDOM.createPortal(
            <div className='toast-container top-right'>
              {topRightToasts.length > max
                ? topRightToasts.map((toast, index) => (
                    <Toast
                      key={toast.id}
                      {...toast}
                      removeToast={removeToast}
                      className={index !== topRightToasts.length - 1 ? 'collapsed' : ''}
                      style={{
                        bottom: -8 * (topRightToasts.length - index - 1)
                      }}
                    />
                  ))
                : topRightToasts.map((toast) => <Toast key={toast.id} {...toast} removeToast={removeToast} />)}
            </div>,
            document.body
          )
        : null}
      {bottomCenterToasts.length
        ? ReactDOM.createPortal(
            <div className='toast-container bottom-center'>
              {bottomCenterToasts.length > max
                ? bottomCenterToasts.map((toast, index) => (
                    <Toast
                      key={toast.id}
                      {...toast}
                      removeToast={removeToast}
                      className={index !== bottomCenterToasts.length - 1 ? 'collapsed' : ''}
                      style={{
                        bottom: -8 * (bottomCenterToasts.length - index - 1)
                      }}
                    />
                  ))
                : bottomCenterToasts.map((toast) => <Toast key={toast.id} {...toast} removeToast={removeToast} />)}
            </div>,

            document.body
          )
        : null}
    </>
  );
};

export default ToastContainer;
