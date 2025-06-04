'use client';

import React from 'react';
import { toast, ToastOptions } from 'beta-parity-react/ui/Toast';
import { Button } from 'beta-parity-react/ui/Button';
import Link from 'next/link';

type Props = ToastOptions;

export const AffirmativeToast = (props: Props) => {
  const notify = () =>
    toast({
      title: 'Affirmative Toast',
      message: 'Register successfully',
      action: <Link href='/toast'>Login</Link>,
      height: 'compact',
      kind: 'affirmative',
      position: 'top-right',
      autoDismiss: false,
      ...props
    }).start();
  return (
    <Button onClick={notify} className='w-fit' kind='glass'>
      Affirmative
    </Button>
  );
};

export default AffirmativeToast;
