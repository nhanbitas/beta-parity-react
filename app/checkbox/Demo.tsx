'use client';

import React from 'react';
import { Checkbox, CheckboxGroup } from '@libComponents/Checkbox';

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
          { value: 'value-2-1-1', label: 'Grandchild 2.1.1', checked: true },
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
      <h2>Basic</h2>
      <Checkbox />
      <Checkbox label='With Label' />
      <Checkbox label='With Sub Label' subLabel='This is a sub label' />
      <Checkbox checked label='Controlled Checkbox' subLabel='This is a Checkbox with checked = true' />
      <Checkbox label='Disabled Checkbox' subLabel='This is a disabled Checkbox' disabled />
      <Checkbox checked label='Disabled Checkbox' subLabel='This is a disabled Checkbox' disabled />
      <Checkbox
        label='Indeterminate Checkbox'
        subLabel='This is a Checkbox with indeterminate = true'
        indeterminate={true}
        onChange={(e) => {
          console.log(e.target.checked);
        }}
      />
      <h2>Group</h2>
      <CheckboxGroup data={treeData} onChange={(value: any) => console.log(value)} />
      <CheckboxGroup data={treeData} onChange={(value: any) => console.log(value)} layout='horizontal' />
      <CheckboxGroup onChange={(value: any) => console.log(value)}>
        <Checkbox value='value-1' label='value 1' />
        <Checkbox value='value-2' label='value 2' />
        <Checkbox value='value-3' label='value 3' />
      </CheckboxGroup>

      <h2>NestedGroup</h2>
      <CheckboxGroup nested={true} data={treeData} onChange={(value: any) => console.log(value)} />
      <CheckboxGroup nested={true} data={treeData} root='All' onChange={(value: any) => console.log(value)} />
    </>
  );
};
