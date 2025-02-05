'use client';

import { components } from '../../../app/data';
import { usePathname } from 'next/navigation';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const BasePage = ({ children }: Props) => {
  const pathname = usePathname();
  const currentComponent = components.filter((component) => component.url === pathname)[0];
  return (
    <>
      <h1 className='h-24 border-b border-gray-200 text-2xl'>{currentComponent.name || 'Component'}</h1>
      {children}
    </>
  );
};

export default BasePage;
