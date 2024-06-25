'use client';

import Toast, { ToastProps } from './Toast';
import ToastContainer from './ToastContainer';

export interface ToastOptions extends Omit<ToastProps, 'id' | 'removeToast'> {}

const toast = ({ position, type, ...options }: ToastOptions) => {
  const event = new CustomEvent('parity-add-toast', {
    detail: {
      id: (Date.now() + Math.random()).toString(),
      type: type || 'info',
      position: position || 'top-right',
      ...options
    }
  });

  window.dispatchEvent(event);
};

export { Toast, ToastContainer, toast };
