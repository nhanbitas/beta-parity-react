'use client';

import { Toast, ToastProps } from './Toast';
import { ToastContainer } from './ToastContainer';

export interface ToastOptions extends Omit<ToastProps, 'id' | 'removeToast'> {}

/**
 * **Parity Toast**.
 *
 * Creates a toast notification and provides methods to control it.
 *
 * This function generates a toast event with a unique `id` and dispatches custom events
 * for adding, removing, or updating the toast notification.
 *
 * @memberof Toast
 *
 * @example
 * const myToast = toast({ kind: 'success', position: 'bottom-left', message: 'Task completed!' });
 * myToast.start(); // Show the toast
 * myToast.update({ message: 'Updated message' }); // Update toast content
 * myToast.stop(); // Remove the toast
 *
 *
 * @see {@link https://beta-parity-react.vercel.app/toast Parity Toast}
 */

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
