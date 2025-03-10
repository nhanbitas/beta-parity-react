'use client';

import React from 'react';
import { toast, ToastOptions } from 'beta-parity-react/ui/Toast';
import { Button } from 'beta-parity-react/ui/Button';
import Link from 'next/link';

type Props = ToastOptions;

export const DemoGenericToast = (props: Props) => {
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

export const DemoInformationToast = (props: Props) => {
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

export const DemoAffirmativeToast = (props: Props) => {
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

export const DemoCautionaryToast = (props: Props) => {
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

export const DemoAdverseToast = (props: Props) => {
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

export const DemoAutoCloseToast = (props: Props) => {
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

export const DemoPositionToast = (props: Props) => {
  const types = ['information', 'affirmative', 'cautionary', 'adverse'] as const;
  const positions = ['top-right', 'top-center', 'bottom-center', 'bottom-right'] as const;
  const notify = () =>
    toast({
      message:
        Math.floor(Math.random() * 2) === 1
          ? 'This is an bottom toast'
          : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et dolore magna aliqua.',
      title: 'Position',
      kind: types[Math.floor(Math.random() * types.length)],
      autoDismiss: true,
      progressBar: true,
      position: positions[Math.floor(Math.random() * positions.length)],
      icon: '👋',
      action: (
        <Link href='/toast' className='text-blue-500'>
          More
        </Link>
      ),
      onDismissed: () => {
        console.log('Closed');
      },
      ...props
    }).start();
  return (
    <Button onClick={notify} className='w-fit' kind='glass'>
      Random
    </Button>
  );
};

export const DemoImportantToast = (props: Props) => {
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

export const DemoPendingToast = (props: Props) => {
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
