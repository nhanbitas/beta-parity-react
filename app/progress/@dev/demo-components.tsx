'use client';

import React from 'react';
import { Progress } from '@libComponents/Progress';

// Define  demo components
export function DemoBasicProgress(props: any) {
  return <Progress {...props} />;
}

export function DemoSuccessProgress(props: any) {
  const [progress, setProgress] = React.useState(0);
  const [state, setState] = React.useState<'active' | 'success' | 'error'>('active');

  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setState('success');
          return 100;
        }
        return prevProgress + 10;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Progress
      title='File '
      value={progress}
      state={state}
      helperText={state === 'success' ? 'Completed' : 'Uploading...'}
      {...props}
    />
  );
}

export function DemoErrorProgress(props: any) {
  const [progress, setProgress] = React.useState(0);
  const [state, setState] = React.useState<'active' | 'success' | 'error'>('active');

  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 87) {
          clearInterval(interval);
          setState('error');
          return 87;
        }
        return prevProgress + 1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <Progress
      title='File '
      value={progress}
      state={state}
      helperText={state === 'error' ? 'File is too large' : 'Uploading...'}
      {...props}
    />
  );
}
