'use client';

import React from 'react';
import { Progress } from 'beta-parity-react/ui/Progress';

export function SuccessProgress(props: any) {
  const [progress, setProgress] = React.useState(0);
  const [state, setState] = React.useState<'active' | 'success' | 'error'>('active');

  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setState('success');
          }, 500);
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
