'use client';

import { PasswordInput } from 'beta-parity-react/ui/PasswordInput';
import { FloatingLabel } from 'beta-parity-react/ui/FloatingLabel';
import React from 'react';
import { Input } from 'beta-parity-react/ui/BaseInput';
import { NativeSelect } from 'beta-parity-react/ui/Select';

type Props = {};

const Page = (props: Props) => {
  return (
    <>
      <FloatingLabel label='Floating Label'>
        <Input type='text' />
      </FloatingLabel>

      <FloatingLabel label='Floating Label'>
        <Input type='text' isClearable />
      </FloatingLabel>

      <FloatingLabel label='Floating Label'>
        <Input type='text' isClearable isError />
      </FloatingLabel>

      <FloatingLabel label='Floating Label'>
        <Input type='text' isClearable />
      </FloatingLabel>

      <FloatingLabel label='Password'>
        <PasswordInput />
      </FloatingLabel>

      <FloatingLabel label='Select'>
        <NativeSelect
          options={[
            { label: 'Choose option', value: '' },
            { label: 'Option 1', value: '1' },
            { label: 'Option 2', value: '2' }
          ]}
        />
      </FloatingLabel>
    </>
  );
};

export const Demo = () => <Page />;
