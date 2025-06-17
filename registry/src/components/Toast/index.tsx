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
 * @see {@link https://parity-react.vercel.app/toast Parity Toast}
 */

const toast = ({ position, kind, ...options }: ToastOptions) => {
  const detail = {
    id: (Date.now() + Math.random()).toString(),
    kind: kind ?? 'generic',
    position: position ?? 'top-right',
    ...options
  };

  const clientDispatch = (type: 'add' | 'remove' | 'update', updateOptions?: ToastOptions) => {
    if (typeof window !== 'undefined') {
      let event: CustomEvent;
      if (type === 'add') {
        event = new CustomEvent('parity-add-toast', { detail });
      } else if (type === 'remove') {
        event = new CustomEvent('parity-remove-toast', { detail });
      } else {
        event = new CustomEvent('parity-update-toast', { detail: { ...detail, ...updateOptions } });
      }
      window.dispatchEvent(event);
    } else {
      console.warn('Toast events can only be dispatched in a browser environment.');
    }
  };

  return {
    getDetail: () => detail,
    start: () => clientDispatch('add'),
    stop: () => clientDispatch('remove'),
    update: (options: ToastOptions) => clientDispatch('update', options)
  };
};

export { Toast, ToastContainer, toast };
