'use client';

import { components } from '../../../app/data';
import { usePathname } from 'next/navigation';
import React from 'react';

type Props = {};

const BasePage = (props: Props) => {
  const pathname = usePathname();
  const currentComponent = components.filter((component) => component.url === pathname)[0];
  return <>{currentComponent.name || 'Component'}</>;
};

export default BasePage;
