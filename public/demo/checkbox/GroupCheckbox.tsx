'use client';

import React from 'react';
import { Checkbox, CheckboxGroup } from 'beta-parity-react/ui/Checkbox';

const arrData = ['value-1', 'value-2', 'value-3', 'value-4'];

export const GroupCheckbox = (props: {}) => {
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
    <div className='flex flex-col gap-4'>
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
        color='accent'
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
    </div>
  );
};
