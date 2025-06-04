'use client';
import React from 'react';
import { Textarea } from 'beta-parity-react/ui/Textarea';

export const BasicTextAreaAlternativeRows6MaxLength2000Clearable = () => (
  <Textarea
    theme='alternative'
    rows={6}
    maxLength={2000}
    isClearable
    wrapperProps={{ className: '!max-w-96' }}
    {...({ placeholder: 'Enter your message' } as any)}
  />
);
