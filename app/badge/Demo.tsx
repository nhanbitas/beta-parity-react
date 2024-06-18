import { Badge } from '@libComponents/Badge';
import React from 'react';

type Props = {};

export const DemoBasicBadge = (props: Props) => {
  return (
    <div className='flex gap-4'>
      <Badge className='' color='sky' size='medium' variant=''>
        Badge
      </Badge>
      <Badge className='' color='orange' size='medium' variant=''>
        Badge
      </Badge>
      <Badge className='' color='gray' size='medium' variant=''>
        Badge
      </Badge>
      <Badge className='' color='green' size='medium' variant=''>
        Badge
      </Badge>
      <Badge className='' color='red' size='medium' variant=''>
        Badge
      </Badge>
    </div>
  );
};

export const DemoStrongBadge = (props: Props) => {
  return (
    <div className='flex gap-4'>
      <Badge className='' color='sky' size='medium' variant='strong'>
        Badge
      </Badge>
      <Badge className='' color='orange' size='medium' variant='strong'>
        Badge
      </Badge>
      <Badge className='' color='gray' size='medium' variant='strong'>
        Badge
      </Badge>
      <Badge className='' color='green' size='medium' variant='strong'>
        Badge
      </Badge>
      <Badge className='' color='red' size='medium' variant='strong'>
        Badge
      </Badge>
    </div>
  );
};

export const DemoSmallBadge = (props: Props) => {
  return (
    <div className='flex gap-4'>
      <Badge className='' color='sky' size='small' variant=''>
        Badge
      </Badge>
      <Badge className='' color='orange' size='small' variant=''>
        Badge
      </Badge>
      <Badge className='' color='gray' size='small' variant=''>
        Badge
      </Badge>
      <Badge className='' color='green' size='small' variant=''>
        Badge
      </Badge>
      <Badge className='' color='red' size='small' variant=''>
        Badge
      </Badge>
    </div>
  );
};
