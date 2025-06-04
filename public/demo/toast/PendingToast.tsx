'use client';

import React from 'react';
import { toast, ToastOptions } from 'beta-parity-react/ui/Toast';
import { Button } from 'beta-parity-react/ui/Button';

type Props = ToastOptions;

export const PendingToast = (props: Props) => {
  const [loading, setLoading] = React.useState(false);
  const Toast = toast({
    title: 'Loading',
    message: 'Loading data...',
    autoDismiss: true,
    duration: 5000,
    progressBar: true,
    pending: true
  });

  const getData = async () => {
    setLoading(true);
    Toast.start();

    try {
      await new Promise((resolve) => setTimeout(resolve, 3000)).then(() => {
        if (Math.floor(Math.random() * 2) === 1) {
          throw new Error('Error occurred while fetching data');
        }
      });
      Toast.update({
        title: 'Success',
        message: 'Get Data Success',
        kind: 'affirmative',
        pending: false
      });
    } catch (error: any) {
      Toast.update({
        title: 'Error',
        message: error.message,
        kind: 'adverse',
        pending: false
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={getData} className='w-fit' kind='glass' isPending={loading}>
      Get Data
    </Button>
  );
};

export default PendingToast;
