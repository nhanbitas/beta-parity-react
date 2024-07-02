import React from 'react';
import { PasswordInput } from '@libComponents/PasswordInput';

type Props = {};

export const DemoBasicPasswordInput = () => <PasswordInput wrapperClassname='!w-64' />;

export const DemoFloatinLabelPasswordInput = () => <PasswordInput wrapperClassname='!w-64' />;

export const DemoClearablePasswordInput = () => <PasswordInput wrapperClassname='!w-64' isClearable />;

export const DemoErrorPasswordInput = () => <PasswordInput wrapperClassname='!w-64' isError={true} />;

export const DemoSuccessPasswordInput = () => <PasswordInput wrapperClassname='!w-64' isSuccess={true} />;

export const DemoLabelPasswordInput = () => <PasswordInput floatingLabel='Password' wrapperClassname='!w-64' />;
