'use client';

import React from 'react';
import { NumberInput } from '@libComponents/NumberInput';

type Props = {};

export const DemoNumberInput = (props: Props) => {
  return <NumberInput floatingLabel='Number Input' isClearable />;
};
