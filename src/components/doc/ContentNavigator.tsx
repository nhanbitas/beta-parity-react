'use client';

import { usePathname } from 'next/navigation';
import { Button } from 'beta-parity-react/ui/Button';
import React from 'react';
import { components } from '@/src/data';
import TableOfContents from '@components/doc/TableOfContents';
import Link from 'next/link';

const ContentNavigator = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const currentComponentPath = pathname.split('/')[1];
  const currentTab = pathname.split('/')[2] as 'dev' | 'spec' | undefined;
  const currentComponent = components.find((component) => component.url === `/${currentComponentPath}`) || {
    name: 'Component'
  };

  return (
    <>
      <nav className='fixed right-0 top-0 z-40 flex w-full justify-end gap-1 bg-[var(--par-color-bg)] p-2 px-8 backdrop-blur-sm'>
        <Button size='sm' kind={currentTab === 'dev' ? 'solid' : 'glass'}>
          <Link href={`/${currentComponentPath}/dev`} prefetch className='grid h-full w-full place-items-center'>
            Dev
          </Link>
        </Button>
        <Button size='sm' kind={currentTab === 'spec' ? 'solid' : 'glass'}>
          <Link href={`/${currentComponentPath}/spec`} prefetch className='grid h-full w-full place-items-center'>
            Spec
          </Link>
        </Button>
      </nav>

      <TableOfContents />

      <main id='main' className='prose flex min-h-screen w-full flex-col gap-8 p-8 sm:px-12 md:px-24 2xl:px-48'>
        <h1 className='block h-24 bg-[var(--par-color-bg)] text-2xl'>{currentComponent.name}</h1>
        {children}
      </main>
    </>
  );
};

export default ContentNavigator;
