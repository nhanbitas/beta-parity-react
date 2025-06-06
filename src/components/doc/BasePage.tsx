'use client';

import { components } from '@/src/data';
import { usePathname } from 'next/navigation';
import React from 'react';

type Props = Record<string, never>;

const BasePage = ({ children }: Props) => {
  const pathname = usePathname();
  const currentComponent = components.find((component) => component.url === pathname) || { name: 'Component' };

  return (
    <>
      <h1 className='block h-24 bg-[var(--par-color-bg)] text-2xl'>{currentComponent.name}</h1>
      {children}
    </>
  );
};

export default BasePage;
