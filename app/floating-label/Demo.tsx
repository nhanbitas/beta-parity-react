import { PasswordInput } from '@libComponents/PasswordInput';
import { FloatingLabel } from '@libComponents/FloatingLabel';
import React from 'react';
import { Input } from '@libComponents/Input';

type Props = {};

const Page = (props: Props) => {
  return (
    <>
      <FloatingLabel label='Floating Label' for='input-1'>
        <Input id='input-1' type='text' />
      </FloatingLabel>

      <FloatingLabel label='Floating Label' for='input-2'>
        <Input id='input-2' type='text' isClearable />
      </FloatingLabel>

      <FloatingLabel label='Floating Label' for='input-3'>
        <Input id='input-3' type='text' isClearable isError />
      </FloatingLabel>

      <FloatingLabel label='Floating Label' for='input-4'>
        <Input id='input-4' type='text' isClearable isSuccess />
      </FloatingLabel>

      <FloatingLabel label='Password' for='input-5'>
        <PasswordInput id='input-5' />
      </FloatingLabel>
    </>
  );
};

export const Demo = () => <Page />;
