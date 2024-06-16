'use client';

import React from 'react';
import { NumberInput } from '@libComponents/NumberInput';

type Props = {};

export const DemoNumberInput = (props: Props) => {
  return (
    <NumberInput isClearable value={123123} allowLeadingZeros thousandsGroupStyle='thousand' thousandSeparator=',' />
  );
};
