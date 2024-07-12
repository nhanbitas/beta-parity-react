'use client';

import React from 'react';
import { Checkbox, CheckboxGroup } from '@libComponents/Checkbox';

const arrData = ['value-1', 'value-2', 'value-3', 'value-4'];
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
      <Checkbox label='With Sublabel' sublabel='This is a sublabel' />
      <Checkbox checked label='Controlled Checkbox' sublabel='This is a Checkbox with checked = true' />
      <Checkbox label='Disabled Checkbox' sublabel='This is a disabled Checkbox' disabled />
      <Checkbox checked label='Disabled Checkbox' sublabel='This is a disabled Checkbox' disabled />
      <Checkbox
        label='Indeterminate Checkbox'
        sublabel='This is a Checkbox with indeterminate = true'
        indeterminate={true}
      />
    </>
  );
};

export const DemoGroupCheckbox = (props: Props) => {
  const [arr, setArr] = React.useState<any>(
    arrData.map((item) => {
      return { label: item, value: item };
    })
  );
  const [group, setGroup] = React.useState({
    value: 'all',
    label: 'All'
  });
  return (
    <>
      <h2>Group</h2>

      <CheckboxGroup onChange={({ value, tree, getGroup }) => console.log(value, tree, getGroup('value-1'))}>
        <Checkbox value='value-1' label='value 1' checked />
        <Checkbox value='value-2' label='value 2' />
        <Checkbox value='value-3' label='value 3' />
      </CheckboxGroup>

      <CheckboxGroup
        onParse={(value) => console.log('parsed', value)}
        value={group.value}
        label={group.label}
        sublabel='Parent Checkbox is enabled'
        checked={true}
        onChange={({ value, tree, getGroup }) => console.log(value, tree, getGroup('value-1'))}
      >
        {arr.map((item: any) => (
          <Checkbox
            key={item.value}
            value={item.value}
            label={item.label}
            sublabel='This checkbox will be controlled by checkbox All'
          />
        ))}
      </CheckboxGroup>
    </>
  );
};

export const DemoNestedCheckbox = (props: Props) => {
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
