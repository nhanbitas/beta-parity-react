'use client';

import React from 'react';
import { NumberInput } from '@libComponents/NumberInput';

type Props = {};

export const DemoNumberInput = (props: Props) => {
  return <NumberInput onChange={(e) => console.log(e.target.value)} {...props} />;
};
