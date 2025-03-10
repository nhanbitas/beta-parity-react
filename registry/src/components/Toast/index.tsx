'use client';

import { Toast, ToastProps } from './Toast';
import { ToastContainer } from './ToastContainer';

export interface ToastOptions extends Omit<ToastProps, 'id' | 'removeToast'> {}

const toast = ({ position, kind, ...options }: ToastOptions) => {
  const detail = {
    id: (Date.now() + Math.random()).toString(),
    kind: kind ?? 'generic',
    position: position ?? 'top-right',
    ...options
  };

  const eventAddToast = new CustomEvent('parity-add-toast', {
    detail: detail
  });

  const eventRemoveToast = new CustomEvent('parity-remove-toast', {
    detail: detail
  });

  const eventUpdateToast = (options: ToastOptions) =>
    new CustomEvent('parity-update-toast', { detail: { ...detail, ...options } });

  return {
    getDetail: () => detail,
    start: () => window.dispatchEvent(eventAddToast),
    stop: () => window.dispatchEvent(eventRemoveToast),
    update: (options: ToastOptions) => window.dispatchEvent(eventUpdateToast(options))
  };
};

export { Toast, ToastContainer, toast };
