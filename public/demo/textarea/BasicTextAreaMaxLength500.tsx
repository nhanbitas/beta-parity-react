'use client';
import React from 'react';
import { Textarea } from 'beta-parity-react/ui/Textarea';

export const BasicTextAreaMaxLength500 = () => (
  <Textarea wrapperProps={{ className: '!max-w-96' }} maxLength={500} placeholder='Enter your message' />
);
