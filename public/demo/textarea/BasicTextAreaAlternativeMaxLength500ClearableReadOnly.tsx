'use client';
import React from 'react';
import { Textarea } from 'beta-parity-react/ui/Textarea';

export const BasicTextAreaAlternativeMaxLength500ClearableReadOnly = () => (
  <Textarea
    theme='alternative'
    maxLength={500}
    isClearable
    defaultValue='This is read only text area'
    readOnly
    wrapperProps={{ className: '!max-w-96' }}
    {...({ placeholder: 'Enter your message' } as any)}
  />
);
