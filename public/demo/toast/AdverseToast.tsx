'use client';

import React from 'react';
import { toast, ToastOptions } from 'beta-parity-react/ui/Toast';
import { Button } from 'beta-parity-react/ui/Button';
import Link from 'next/link';

type Props = ToastOptions;

export const AdverseToast = (props: Props) => {
  const notify = () =>
    toast({
      message: 'Error occurred',
      title: 'Error',
      kind: 'adverse',
      height: 'compact',
      dismissButton: false,
      action: (
        <Link href='/toast' className='text-blue-500'>
          Try again
        </Link>
      ),
      autoDismiss: true,
      progressBar: true,
      ...props
    }).start();
  return (
    <Button onClick={notify} className='w-fit' kind='glass'>
      Adverse
    </Button>
  );
};

export default AdverseToast;
