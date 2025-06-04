'use client';
import React from 'react';
import { Textarea } from 'beta-parity-react/ui/Textarea';

export const BasicTextAreaMaxLength500Error = () => (
  <Textarea
    maxLength={500}
    defaultValue='This is error value'
    isError={true}
    errorMessage='Error message'
    wrapperProps={{ className: '!max-w-96' }}
    {...({ placeholder: 'Enter your message' } as any)}
  />
);
