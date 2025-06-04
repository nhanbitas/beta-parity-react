'use client';

import React from 'react';
import { toast, ToastOptions } from 'beta-parity-react/ui/Toast';
import { Button } from 'beta-parity-react/ui/Button';

type Props = ToastOptions;

export const CautionaryToast = (props: Props) => {
  const notify = () =>
    toast({
      message: 'This is an cautionary toast',
      title: 'Cautionary',
      kind: 'cautionary',
      height: 'compact',
      autoDismiss: false,
      ...props
    }).start();
  return (
    <Button onClick={notify} className='w-fit' kind='glass'>
      Cautionary
    </Button>
  );
};

export default CautionaryToast;
