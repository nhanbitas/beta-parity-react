'use client';

import { Button } from '@libComponents/Button';
import React from 'react';

type Props = {
  spec: React.ReactNode;
  dev: React.ReactNode;
};

const NavigatorComponent = (props: Props) => {
  const { dev, spec } = props;
  const [current, setCurrent] = React.useState('dev');
  return (
    <>
      <nav className='fixed right-0 top-0 z-50 flex w-full justify-end gap-1 rounded-lg p-2 px-8 backdrop-blur-sm'>
        <Button size='sm' kind={current === 'dev' ? 'solid' : 'ghost'} onClick={() => setCurrent('dev')}>
          Dev
        </Button>
        <Button size='sm' kind={current === 'spec' ? 'solid' : 'ghost'} onClick={() => setCurrent('spec')}>
          Spec
        </Button>
      </nav>
      {current === 'dev' && dev}
      {current === 'spec' && spec}
    </>
  );
};

export default NavigatorComponent;
