'use client';

import React from 'react';
import { ContentNavigation } from '@/registry/ui/ContentNavigation';
import { Skeleton } from './Skeleton';
import { ListOrdered, X } from 'lucide-react';

export default function TableOfContents(props: any) {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={toggleDrawer}
        className='not-prose fixed right-4 top-1/2 z-10 h-8 w-8 -translate-y-1/2 cursor-pointer rounded-full bg-gray-100 p-2 text-gray-900 hover:bg-gray-200'
        aria-label='Toggle table of contents'
      >
        <ListOrdered />
      </button>

      {/* Backdrop */}
      <div
        className={`not-prose fixed inset-0 z-50 bg-black transition-opacity duration-300 ease-in-out ${
          isOpen ? 'opacity-30' : 'pointer-events-none opacity-0'
        }`}
        onClick={toggleDrawer}
      />

      {/* Drawer */}
      <div
        className={`not-prose fixed right-0 top-0 z-50 h-screen w-80 transform overflow-y-auto border-l border-[var(--par-color-border-surface)] bg-[var(--par-color-bg)] p-6 shadow-lg transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='mb-4 flex items-center justify-between'>
          <p className='excluded-content text-heading-compact-02 font-semibold'>On this page:</p>
          <button
            onClick={toggleDrawer}
            className='rounded-md p-1 hover:bg-[var(--par-color-bg-surface)]'
            aria-label='Close table of contents'
          >
            <X />
          </button>
        </div>
        <ContentNavigation spaceToTop={150} skeleton={<Skeleton />} exclude={['.excluded-content']} target={'#main'} />
      </div>
    </>
  );
}
