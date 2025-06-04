'use client';
import React from 'react';
import { Textarea } from 'beta-parity-react/ui/Textarea';

export const BasicTextAreaClearableDisabled = () => (
  <Textarea
    isClearable
    defaultValue='This is disabled text area'
    disabled
    wrapperProps={{ className: '!max-w-96' }}
    {...({ placeholder: 'Enter your message' } as any)}
  />
);
