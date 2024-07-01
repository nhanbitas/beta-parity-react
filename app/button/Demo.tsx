'use client';

import React from 'react';
import { Button } from '@libComponents/Button';
import { ClipboardCheck } from 'lucide-react';
import { Badge } from '@libComponents/Badge';

export const DemoBasicButton = () => {
  const ref = React.useRef<HTMLButtonElement>(null);
  return (
    <div>
      <Button ref={ref} component={Badge} color='red' onClick={() => console.log(ref.current)}>
        Click
      </Button>
      <br />
      <Button variant='secondary' component='a' href='/button'>
        Click
      </Button>
    </div>
  );
};

export const DemoVariantsButton = () => {
  return (
    <div className='flex gap-4'>
      <Button variant='primary'>Click</Button>
      <Button variant='secondary'>Click</Button>
      <Button variant='tertiary'>Click</Button>
      <Button variant='ghost'>Click</Button>
      <Button variant='danger'>Click</Button>
      <Button variant='success'>Click</Button>
      <Button variant='system'>Click</Button>
    </div>
  );
};

export const DemoSizesButton = () => {
  return (
    <div className='flex gap-4'>
      <Button size='small'>Click</Button>
      <Button size='medium'>Click</Button>
      <Button size='large'>Click</Button>
    </div>
  );
};

export const DemoStatesButton = () => {
  return (
    <div className='flex gap-4'>
      <Button disabled>Click</Button>
      <Button isLoading>Click</Button>
      <Button>
        <ClipboardCheck />
      </Button>
    </div>
  );
};
