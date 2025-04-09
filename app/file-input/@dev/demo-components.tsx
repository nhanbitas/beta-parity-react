'use client';

import { FileInput } from 'beta-parity-react/ui/FileInput';
import React from 'react';

type Props = any;

export const DemoFileInput = (props: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      console.log('Selected file:', files[0]);
    }
  };
  return <FileInput className='!w-96' onChange={handleChange} />;
};

export const DemoErrorFileInput = (props: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      console.log('Selected file:', files[0]);
    }
  };
  return <FileInput className='!w-96' isError errorMessage='File is not support' onChange={handleChange} />;
};
