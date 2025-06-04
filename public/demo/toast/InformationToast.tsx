'use client';

import React from 'react';
import { toast, ToastOptions } from 'beta-parity-react/ui/Toast';
import { Button } from 'beta-parity-react/ui/Button';
import Link from 'next/link';

type Props = ToastOptions;

export const InformationToast = (props: Props) => {
  const notify = () =>
    toast({
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et dolore magna aliqua.',
      title: 'Information Toast',
      kind: 'information',
      position: 'top-right',
      action: (
        <Link href='/toast' className='text-blue-500'>
          Read more
        </Link>
      ),
      autoDismiss: false,
      ...props
    }).start();
  return (
    <Button onClick={notify} className='w-fit' kind='glass'>
      Information
    </Button>
  );
};

export default InformationToast;
