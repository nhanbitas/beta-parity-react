'use client';
import React from 'react';
import { Textarea } from 'beta-parity-react/ui/Textarea';

export const BasicTextAreaRows6MaxLength2000Clearable2 = () => (
  <Textarea
    rows={6}
    maxLength={2000}
    isClearable
    wrapperProps={{ className: '!max-w-96' }}
    {...({ placeholder: 'Enter your message' } as any)}
  />
);
