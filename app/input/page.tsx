import { Input } from '@libComponents/Input';
import React from 'react';

type Props = {};

const Page = (props: Props) => {
  return (
    <>
      <Input type='text' />
      <Input floatingLabel='Floating Label' type='number' />
      <Input floatingLabel='Floating Label' isClearable />
      <Input floatingLabel='Floating Label' isError={true} type='text' isClearable />
      <Input floatingLabel='Floating Label' isSuccess={true} type='text' isClearable />
    </>
  );
};

export default Page;
