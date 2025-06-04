'use client';

import React from 'react';
import { toast, ToastOptions } from 'beta-parity-react/ui/Toast';
import { Button } from 'beta-parity-react/ui/Button';

type Props = ToastOptions;

export const ImportantToast = (props: Props) => {
  const notify = () =>
    toast({
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et dolore magna aliqua.',
      title: 'Information',
      kind: 'information',
      position: 'top-right',
      autoDismiss: false,
      importance: 1,
      onDismissed: () => {
        console.log('Closed');
      },
      ...props
    }).start();
  return (
    <Button onClick={notify} className='w-fit' kind='glass'>
      Important 1
    </Button>
  );
};

export default ImportantToast;
