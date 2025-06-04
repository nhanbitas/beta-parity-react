'use client';

import React from 'react';
import { RadioGroup } from 'beta-parity-react/ui/Radio';

type Props = {};

const items = [
  { label: 'Item 1', value: 'item-1' },
  { label: 'Item 2', value: 'item-2' },
  { label: 'Item 3', value: 'item-3' },
  { label: 'Item 4', value: 'item-4' },
  { label: 'Item 5', value: 'item-5', sublabel: 'Sublabel item 5' }
];

export const RadioItems = (props: Props) => {
  return (
    <>
      <RadioGroup
        label='This is a group generated from items array'
        name='group-items'
        defaultValue='item-3'
        items={items}
        onChange={(value) => console.log(value)}
      />
    </>
  );
};
