'use client';

import React from 'react';
import { Checkbox, CheckboxGroup } from 'beta-parity-react/ui/Checkbox';

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
        checked: true,
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

export const NestedCheckbox = (props: {}) => {
  const [parsedValue, setParsedValue] = React.useState<any>([]);
  return (
    <>
      <h2>NestedGroup</h2>
      <CheckboxGroup
        tree={parsedValue}
        onParse={(value) => setParsedValue(value)}
        onChange={({ value, tree, getGroup }) => console.log(value, tree, getGroup('value-5'))}
      >
        <Checkbox value='value-1' label='value 1' checked />
        <Checkbox value='value-2' label='value 2' />
        <Checkbox value='value-3' label='value 3' />
        <CheckboxGroup value='value-4' label='value 4' checked>
          <Checkbox value='value-4.1' label='value 4.1' onClick={() => console.log('click value 4.1')} />
          <Checkbox value='value-4.2' label='value 4.2' />
        </CheckboxGroup>
        <CheckboxGroup value='value-5' label='value 5'>
          <Checkbox value='value-5.1' label='value 5.1' checked />
          <Checkbox value='value-5.2' label='value 5.2' />
          <CheckboxGroup value='value-5.3' label='value 5.3'>
            <Checkbox value='value-5.3.1' label='value 5.3.1' />
            <Checkbox value='value-5.3.2' label='value 5.3.2' />
            <Checkbox value='value-5.3.3' label='value 5.3.3' />
          </CheckboxGroup>
        </CheckboxGroup>
      </CheckboxGroup>
      <CheckboxGroup
        tree={treeData}
        label='all'
        value='value-all'
        onParse={(value) => console.log('parsed nested', value)}
        onChange={({ value, tree, getGroup }) => console.log(value, tree, getGroup('value-2'))}
      />
    </>
  );
};
