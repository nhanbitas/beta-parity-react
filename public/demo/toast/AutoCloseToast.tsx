'use client';

import React from 'react';
import { toast, ToastOptions } from 'beta-parity-react/ui/Toast';
import { Button } from 'beta-parity-react/ui/Button';
import Link from 'next/link';

type Props = ToastOptions;

export const AutoCloseToast = (props: Props) => {
  const types = ['information', 'affirmative', 'cautionary', 'adverse'] as const;
  const notify = () =>
    toast({
      title: 'This is an auto close toast',
      message: 'Please wait a few seconds',
      kind: types[Math.floor(Math.random() * types.length)],
      emphasis: 'normal',
      action: (
        <Link href='/toast' className='text-blue-500'>
          More
        </Link>
      ),
      autoDismiss: true,
      duration: 5000,
      dismissButton: false,
      progressBar: true,
      onDismissed: () => {
        console.log('Closed');
      },
      ...props
    }).start();
  return (
    <Button onClick={notify} className='w-fit' kind='glass'>
      Duration
    </Button>
  );
};

export default AutoCloseToast;
