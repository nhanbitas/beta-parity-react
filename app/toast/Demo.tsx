'use client';

import React from 'react';
import { toast, ToastOptions } from '@libComponents/Toast';
import { Button } from '@libComponents/Button';
import Link from 'next/link';

type Props = ToastOptions;

export const DemoGenericToast = (props: Props) => {
  const notify = () =>
    toast({
      message: 'This is an generic toast',
      title: 'Generic',
      kind: 'generic',
      position: 'top-right',
      autoDismiss: false,
      onDismissed: () => {
        console.log('Dissmissed');
      },
      ...props
    }).start();
  return (
    <Button onClick={notify} className='w-24' kind='glass'>
      Generic
    </Button>
  );
};

export const DemoInformationToast = (props: Props) => {
  const notify = () =>
    toast({
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et dolore magna aliqua.',
      title: 'Information',
      kind: 'information',
      position: 'top-right',
      autoDismiss: false,
      onDismissed: () => {
        console.log('Closed');
      },
      ...props
    }).start();
  return (
    <Button onClick={notify} className='w-24' kind='glass'>
      Information
    </Button>
  );
};

export const DemoAffirmativeToast = (props: Props) => {
  const notify = () =>
    toast({
      message: 'This is an affirmative toast',
      title: 'Affirmative',
      kind: 'affirmative',
      position: 'top-right',
      autoDismiss: false,
      onDismissed: () => {
        console.log('Closed');
      },
      ...props
    }).start();
  return (
    <Button onClick={notify} className='w-24' kind='glass'>
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
      autoDismiss: false,
      onDismissed: () => {
        console.log('Closed');
      },
      ...props
    }).start();
  return (
    <Button onClick={notify} className='w-24' kind='glass'>
      Cautionary
    </Button>
  );
};

export const DemoAdverseToast = (props: Props) => {
  const notify = () =>
    toast({
      message: 'This is an adverse toast',
      title: 'Adverse',
      kind: 'adverse',
      autoDismiss: false,
      onDismissed: () => {
        console.log('Closed');
      },
      ...props
    }).start();
  return (
    <Button onClick={notify} className='w-24' kind='glass'>
      Adverse
    </Button>
  );
};

export const DemoAutoCloseToast = (props: Props) => {
  const types = ['information', 'affirmative', 'cautionary', 'adverse'] as const;
  const notify = () =>
    toast({
      message: 'This is an auto close toast',
      title: 'Auto Close',
      kind: types[Math.floor(Math.random() * types.length)],
      icon: '👋',
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
    <Button onClick={notify} className='w-24' kind='glass'>
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
      title: 'Bottom',
      kind: types[Math.floor(Math.random() * types.length)],
      position: positions[Math.floor(Math.random() * positions.length)],
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
    <Button onClick={notify} className='w-24' kind='glass'>
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
    <Button onClick={notify} className='w-24' kind='glass'>
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
