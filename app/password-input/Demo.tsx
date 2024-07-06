import React from 'react';
import { PasswordInput } from '@libComponents/PasswordInput';

type Props = {};

export const DemoBasicPasswordInput = () => <PasswordInput wrapperProps={{ className: '!w-64' }} />;

export const DemoFloatinLabelPasswordInput = () => <PasswordInput wrapperProps={{ className: '!w-64' }} />;

export const DemoClearablePasswordInput = () => <PasswordInput wrapperProps={{ className: '!w-64' }} isClearable />;

export const DemoErrorPasswordInput = () => <PasswordInput wrapperProps={{ className: '!w-64' }} isError={true} />;

export const DemoSuccessPasswordInput = () => <PasswordInput wrapperProps={{ className: '!w-64' }} isSuccess={true} />;

export const DemoLabelPasswordInput = () => (
  <PasswordInput floatingLabel='Password' wrapperProps={{ className: '!w-64' }} />
);
