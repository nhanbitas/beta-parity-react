'use client';

import React from 'react';
import { toast, ToastOptions } from '@libComponents/Toast';
import { Button } from '@libComponents/Button';
import Link from 'next/link';

type Props = ToastOptions;

export const DemoInfoToast = (props: Props) => {
  const notify = () =>
    toast({
      message: 'This is an info toast',
      toastTitle: 'Info',
      type: 'info',
      position: 'top-right',
      onClose: () => {
        console.log('Closed');
      },
      ...props
    });
  return (
    <>
      <Button onClick={notify} className='w-24'>
        Info
      </Button>
    </>
  );
};

export const DemoSuccessToast = (props: Props) => {
  const notify = () =>
    toast({
      message: 'This is an success toast',
      toastTitle: 'Success',
      type: 'success',
      position: 'top-right',
      onClose: () => {
        console.log('Closed');
      },
      ...props
    });
  return (
    <>
      <Button onClick={notify} className='w-24'>
        Success
      </Button>
    </>
  );
};

export const DemoWarningToast = (props: Props) => {
  const notify = () =>
    toast({
      message: 'This is an warning toast',
      toastTitle: 'Warning',
      type: 'warning',
      onClose: () => {
        console.log('Closed');
      },
      ...props
    });
  return (
    <>
      <Button onClick={notify} className='w-24'>
        Warning
      </Button>
    </>
  );
};

export const DemoDangerToast = (props: Props) => {
  const notify = () =>
    toast({
      message: 'This is an danger toast',
      toastTitle: 'Danger',
      type: 'danger',
      onClose: () => {
        console.log('Closed');
      },
      ...props
    });
  return (
    <>
      <Button onClick={notify} className='w-24'>
        Danger
      </Button>
    </>
  );
};

export const DemoAutoCloseToast = (props: Props) => {
  const types = ['info', 'success', 'warning', 'danger'] as const;
  const notify = () =>
    toast({
      message: 'This is an auto close toast',
      toastTitle: 'Auto Close',
      type: types[Math.floor(Math.random() * types.length)],
      details: (
        <Link href='/toast' className='text-blue-500'>
          More
        </Link>
      ),
      duration: 2000,
      onClose: () => {
        console.log('Closed');
      },
      ...props
    });
  return (
    <>
      <Button onClick={notify} className='w-24'>
        Duration
      </Button>
    </>
  );
};

export const DemoBottomToast = (props: Props) => {
  const types = ['info', 'success', 'warning', 'danger'] as const;
  const notify = () =>
    toast({
      message: 'This is an bottom toast',
      toastTitle: 'Bottom',
      type: types[Math.floor(Math.random() * types.length)],
      position: 'bottom-center',
      details: (
        <Link href='/toast' className='text-blue-500'>
          More
        </Link>
      ),
      onClose: () => {
        console.log('Closed');
      },
      ...props
    });
  return (
    <>
      <Button onClick={notify} className='w-24'>
        Bottom
      </Button>
    </>
  );
};
