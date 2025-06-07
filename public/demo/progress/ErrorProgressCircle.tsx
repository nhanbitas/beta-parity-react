'use client';
import React from 'react';
import { Progress } from 'beta-parity-react/ui/Progress';

export function ErrorProgressCircle() {
  const [progress, setProgress] = React.useState(0);
  const [state, setState] = React.useState<'active' | 'success' | 'error'>('active');

  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 80) {
          clearInterval(interval);
          setTimeout(() => {
            setState('error');
          }, 500);
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
      kind='circle'
    />
  );
}
