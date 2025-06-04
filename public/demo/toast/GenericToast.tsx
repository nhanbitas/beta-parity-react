'use client';

import React from 'react';
import { toast, ToastOptions } from 'beta-parity-react/ui/Toast';
import { Button } from 'beta-parity-react/ui/Button';
import Link from 'next/link';

type Props = ToastOptions;

export const GenericToast = (props: Props) => {
  const notify = () =>
    toast({
      title: 'Generic Toast',
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et dolore magna aliqua.',
      kind: 'generic',
      position: 'top-right',
      autoDismiss: false,
      onDismissed: () => {
        console.log('Dissmissed');
      },
      ...props
    }).start();
  return (
    <Button onClick={notify} className='w-fit' kind='glass'>
      Generic
    </Button>
  );
};

export default GenericToast;
