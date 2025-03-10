'use client';

import React from 'react';
import { Progress } from 'beta-parity-react/ui/Progress';

// Define  demo components
export function DemoBasicProgress(props: any) {
  return <Progress {...props} />;
}

export function DemoSuccessProgress(props: any) {
  const [progress, setProgress] = React.useState(0);
  const [state, setState] = React.useState<'active' | 'success' | 'error'>('active');

  // Fake loading
  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setState('success');
          }, 500); // animation delay
          return 100;
        }
        return prevProgress + 1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <Progress
      title='File'
      size='sm'
      numeral
      value={progress}
      state={state}
      helperText={state === 'success' ? 'You can now close this window!' : 'Uploading...'}
      {...props}
    />
  );
}

export function DemoErrorProgress(props: any) {
  const [progress, setProgress] = React.useState(0);
  const [state, setState] = React.useState<'active' | 'success' | 'error'>('active');

  // Fake loading
  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 80) {
          clearInterval(interval);
          setTimeout(() => {
            setState('error');
          }, 500); // animation delay
          return 87;
        }
        return prevProgress + 10;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Progress
      title='File'
      size='md'
      numeral
      value={progress}
      state={state}
      helperText={state === 'error' ? 'File is too large, please try again!' : 'Uploading...'}
      {...props}
    />
  );
}
