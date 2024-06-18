'use client';

import { PasswordInput } from '@libComponents/PasswordInput';
import { FloatingLabel } from '@libComponents/FloatingLabel';
import React from 'react';
import { Input } from '@libComponents/Input';
import { NativeSelect } from '@libComponents/Select';

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
        <Input type='text' isClearable isSuccess />
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
