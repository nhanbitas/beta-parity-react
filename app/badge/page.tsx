import { Badge } from '@libComponents/Badge';
import React from 'react';

type Props = {};

const Page = (props: Props) => {
  return (
    <>
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
    </>
  );
};

export default Page;
