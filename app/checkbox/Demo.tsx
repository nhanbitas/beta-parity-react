'use client';

import React from 'react';
import { Checkbox, CheckboxGroup } from '@libComponents/Checkbox';
const arrData = ['value-1', 'value-2', 'value-3', 'value-4'];
const treeData = [
  {
    value: 'value-1',
    label: 'Parent 1',
    checkboxProps: {
      checkboxWrapperProps: {
        className: '!bg-blue-200 px-1 rounded-md'
      }
    },
    children: [
      { value: 'value-1-1', label: 'Child 1.1' },
      { value: 'value-1-2', label: 'Child 1.2' }
    ]
  },
  {
    value: 'value-2',
    label: 'Parent 2',
    checkboxProps: {
      checkboxWrapperProps: {
        className: '!bg-blue-200 px-1 rounded-md'
      }
    },
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
      <Checkbox
        onChange={(e: any) => {
          console.log(e.target.checked);
        }}
      />
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

      <CheckboxGroup onChange={(value: any, tree: any, getGroup: any) => console.log(value, tree, getGroup('value-1'))}>
        <Checkbox value='value-1' label='value 1' checked />
        <Checkbox value='value-2' label='value 2' />
        <Checkbox value='value-3' label='value 3' />
      </CheckboxGroup>

      <CheckboxGroup
        value='value'
        label='All'
        onChange={(value: any, tree: any, getGroup: any) => console.log(value, tree, getGroup('value-1'))}
      >
        {arrData.map((item) => (
          <Checkbox key={item} value={item} label={item} />
        ))}
      </CheckboxGroup>

      <h2>NestedGroup</h2>
      <CheckboxGroup
        nested
        data={treeData}
        onChange={(value: any, tree: any, getGroup: any) => console.log(value, tree, getGroup('value-2-1'))}
      />

      <CheckboxGroup
        nested
        data={treeData}
        label='all'
        value='value-all'
        layout='horizontal'
        onChange={(value: any, tree: any, getGroup: any) => console.log(value, tree, getGroup('value-2-2'))}
      />

      <CheckboxGroup onChange={(value: any, tree: any, getGroup: any) => console.log(value, tree, getGroup('value-5'))}>
        <Checkbox value='value-1' label='value 1' />
        <Checkbox value='value-2' label='value 2' />
        <Checkbox value='value-3' label='value 3' />
        <CheckboxGroup value='value-4' label='value 4'>
          <Checkbox value='value-4.1' label='value 4.1' />
          <Checkbox value='value-4.2' label='value 4.2' />
        </CheckboxGroup>
        <CheckboxGroup value='value-5' label='value 5'>
          <Checkbox value='value-5.1' label='value 5.1' />
          <Checkbox value='value-5.2' label='value 5.2' />
          <CheckboxGroup value='value-5.3' label='value 5.3'>
            <Checkbox value='value-5.3.1' label='value 5.3.1' />
            <Checkbox value='value-5.3.2' label='value 5.3.2' />
            <Checkbox value='value-5.3.3' label='value 5.3.3' />
          </CheckboxGroup>
        </CheckboxGroup>
      </CheckboxGroup>
    </>
  );
};
