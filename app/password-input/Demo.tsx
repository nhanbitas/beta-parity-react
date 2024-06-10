import React from 'react';
import { PasswordInput } from '@libComponents/PasswordInput';

type Props = {};

export const DemoBasicPasswordInput = () => <PasswordInput wrapperClassname='!w-64' />;

export const DemoFloatinLabelPasswordInput = () => <PasswordInput floatingLabel='Password' wrapperClassname='!w-64' />;

export const DemoClearablePasswordInput = () => (
  <PasswordInput floatingLabel='Password' wrapperClassname='!w-64' isClearable />
);

export const DemoErrorPasswordInput = () => (
  <PasswordInput floatingLabel='Password' wrapperClassname='!w-64' isError={true} />
);

export const DemoSuccessPasswordInput = () => (
  <PasswordInput floatingLabel='Password' wrapperClassname='!w-64' isSuccess={true} />
);
