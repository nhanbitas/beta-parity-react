'use client';
import React from 'react';
import { Textarea } from 'beta-parity-react/ui/Textarea';

export const BasicTextAreaClearable = () => (
  <Textarea wrapperProps={{ className: '!max-w-96' }} isClearable placeholder='Enter your message' />
);
