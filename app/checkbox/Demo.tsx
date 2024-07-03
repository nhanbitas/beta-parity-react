'use client';

import React from 'react';
import { Checkbox, CheckboxNest } from '@libComponents/Checkbox';

const treeData = [
  {
    value: 'value-1',
    label: 'Parent 1',
    children: [
      { value: 'value-1-1', label: 'Child 1.1' },
      { value: 'value-1-2', label: 'Child 1.2' }
    ]
  },
  {
    value: 'value-2',
    label: 'Parent 2',
    children: [
      {
        value: 'value-2-1',
        label: 'Child 2.1',
        children: [
          { value: 'value-2-1-1', label: 'Grandchild 2.1.1' },
          { value: 'value-2-1-2', label: 'Grandchild 2.1.2' }
        ]
      },
      {
        value: 'value-2-2',
        label: 'Child 2.2',
        children: [
          { value: 'value-2-2-1', label: 'Grandchild 2.2.1' },
          { value: 'value-2-2-2', label: 'Grandchild 2.2.2' }
        ]
      }
    ]
  }
];

type Props = {};

export const DemoBasicCheckbox = (props: Props) => {
  return (
    <>
      <Checkbox label={'Basic Checkbox'} />
      <Checkbox checked label={'Checked Checkbox'} subLabel={'This is a checked Checkbox'} />
      <Checkbox label={'Disabled Checkbox'} subLabel={'This is a disabled Checkbox'} disabled />
      <Checkbox
        label={'Indeterminate Checkbox'}
        subLabel={'This is a indeterminate Checkbox'}
        indeterminate={true}
        onChange={(e) => {
          console.log(e.target.checked);
        }}
      />

      <CheckboxNest data={treeData} onChange={(value: any) => console.log(value)} />
    </>
  );
};
