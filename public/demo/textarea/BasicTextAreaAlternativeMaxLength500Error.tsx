'use client';
import React from 'react';
import { Textarea } from 'beta-parity-react/ui/Textarea';

export const BasicTextAreaAlternativeMaxLength500Error = () => (
  <Textarea
    theme='alternative'
    maxLength={500}
    defaultValue='This is error value'
    isError={true}
    errorMessage='Error message'
    placeholder='Enter your message'
    wrapperProps={{ className: '!max-w-96' }}
  />
);
