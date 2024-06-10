import React from 'react';
import { PasswordInput } from '@libComponents/PasswordInput';

type Props = {};

const page = (props: Props) => {
  return (
    <>
      <PasswordInput wrapperClassname='!w-64' />
      <PasswordInput floatingLabel='Password' wrapperClassname='!w-64' />
      <PasswordInput wrapperClassname='!w-64' isClearable />
      <PasswordInput wrapperClassname='!w-64' isError={true} />
      <PasswordInput wrapperClassname='!w-64' isSuccess={true} />
    </>
  );
};

export default page;
