'use client';
import React from 'react';
import { Textarea } from 'beta-parity-react/ui/Textarea';

export const BasicTextAreaAlternativeRows0Error = () => (
  <Textarea
    theme='alternative'
    rows={0}
    defaultValue='This is error value'
    isError={true}
    errorMessage='Error message'
    wrapperProps={{ className: '!max-w-96' }}
    {...({ placeholder: 'Enter your message' } as any)}
  />
);
