'use client';

import { FileItem } from 'beta-parity-react/ui/FileItem';
import React from 'react';

export const BasicFileItem = () => {
  return (
    <div className='flex w-96 flex-col gap-2'>
      {/* Enabled FileItem */}
      <FileItem
        status='completed'
        fileName='example1.png'
        fileSize={200}
        onRemove={() => console.log('Removing example1.png')}
      />

      {/* Disabled FileItem */}
      <FileItem
        disabled
        status='completed'
        fileName='example2.png'
        fileSize={300}
        onRemove={() => console.log('Removing example2.png')}
      />

      {/* Loading FileItem */}
      <FileItem loading={35} fileName='example3.png' fileSize={400} />

      {/* Completed FileItem */}
      <FileItem
        status='success'
        fileName='example4.png'
        fileSize={500}
        onRemove={() => console.log('Removing example4.png')}
      />
      {/* Completed FileItem */}
      <FileItem
        status='error'
        fileName='example5.png'
        fileSize={500}
        onRemove={() => console.log('Removing example5.png')}
      />
    </div>
  );
};
