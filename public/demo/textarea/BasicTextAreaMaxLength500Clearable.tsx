'use client';
import React from 'react';
import { Textarea } from 'beta-parity-react/ui/Textarea';

export const BasicTextAreaMaxLength500Clearable = () => (
  <Textarea wrapperProps={{ className: '!max-w-96' }} maxLength={500} isClearable placeholder='Enter your message' />
);
