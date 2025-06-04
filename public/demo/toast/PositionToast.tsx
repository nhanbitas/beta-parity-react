'use client';

import React from 'react';
import { toast, ToastOptions } from 'beta-parity-react/ui/Toast';
import { Button } from 'beta-parity-react/ui/Button';
import Link from 'next/link';

type Props = ToastOptions;

export const PositionToast = (props: Props) => {
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

export default PositionToast;
