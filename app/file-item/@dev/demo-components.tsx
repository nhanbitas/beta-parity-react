'use client';

import { FileItem } from 'beta-parity-react/ui/FileItem';
import React from 'react';

type Props = any;

export const DemoFileItem = (props: Props) => <FileItem className='w-96' />;

export const DemoErrorFileItem = (props: Props) => <FileItem className='w-96' />;

export const DemoBasicFileItem = () => {
  return (
    <div className='flex w-96 flex-col gap-2'>
      {/* Enabled FileItem */}
      <FileItem
        status='completed'
        fileName='example1.png'
        fileSize='200KB'
        onRemove={() => console.log('Removing example1.png')}
      />

      {/* Disabled FileItem */}
      <FileItem
        disabled
        status='completed'
        fileName='example2.png'
        fileSize='300KB'
        onRemove={() => console.log('Removing example2.png')}
      />

      {/* Loading FileItem */}
      <FileItem loading={35} fileName='example3.png' fileSize='400KB' />

      {/* Completed FileItem */}
      <FileItem
        status='success'
        fileName='example4.png'
        fileSize='500KB'
        onRemove={() => console.log('Removing example4.png')}
      />
      {/* Completed FileItem */}
      <FileItem
        status='error'
        fileName='example4.png'
        fileSize='500KB'
        onRemove={() => console.log('Removing example4.png')}
      />
    </div>
  );
};
