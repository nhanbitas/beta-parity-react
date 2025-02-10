'use client';

import { components } from '../../../app/data';
import { usePathname } from 'next/navigation';
import React from 'react';

type Props = Record<string, never>;

const BasePage = ({ children }: Props) => {
  const pathname = usePathname();
  const currentComponent = components.find((component) => component.url === pathname) || { name: 'Component' };

  return (
    <>
      <h1 className='h-24 border-b border-gray-200 text-2xl'>{currentComponent.name}</h1>
      {children}
    </>
  );
};

export default BasePage;
