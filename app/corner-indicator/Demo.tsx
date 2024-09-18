import { Button } from '@libComponents/Button';
import { CornerIndicator } from '@libComponents/CornerIndicator';
import { BellRing } from 'lucide-react';
import React from 'react';

type Props = {};

export const DemoCornerIndicator = (props: Props) => {
  return (
    <div className='flex  flex-wrap gap-4'>
      <CornerIndicator label='5' color='red'>
        <Button iconOnly color='info'>
          <BellRing />
        </Button>
      </CornerIndicator>

      <CornerIndicator dot size='lg' color='red'>
        <Button iconOnly color='info'>
          <BellRing />
        </Button>
      </CornerIndicator>

      <CornerIndicator label='5' color='red' outline>
        <Button iconOnly color='info'>
          <BellRing />
        </Button>
      </CornerIndicator>

      <CornerIndicator dot size='lg' color='red' outline>
        <Button iconOnly color='info'>
          <BellRing />
        </Button>
      </CornerIndicator>

      <CornerIndicator dot size='lg' color='red' pulse>
        <Button iconOnly color='info'>
          <BellRing />
        </Button>
      </CornerIndicator>
    </div>
  );
};

export const DemoCornerIndicatorPosition = (props: Props) => {
  return (
    <div className='flex  flex-wrap gap-4'>
      {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((position) => (
        <CornerIndicator key={position} dot size='lg' color='red' position={position as any} outline>
          <Button iconOnly color='info' kind='glass'>
            <BellRing />
          </Button>
        </CornerIndicator>
      ))}
    </div>
  );
};
