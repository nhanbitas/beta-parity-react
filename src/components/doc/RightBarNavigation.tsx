import { ContentNavigation } from 'beta-parity-react/ui/ContentNavigation';
import React from 'react';

type Props = {};

function RightBarNavigation({}: Props) {
  return <ContentNavigation className='!fixed !top-12 right-0 z-50 w-fit' target='#main' spaceToTop={50} />;
}

export default RightBarNavigation;
