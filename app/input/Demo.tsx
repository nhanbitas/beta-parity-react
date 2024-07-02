import { Input } from '@libComponents/Input';
import React from 'react';

type Props = {};

export const DemoBasicInput = () => <Input type='text' />;

export const DemoClearableInput = () => <Input isClearable type='text' />;

export const DemoErrorInput = () => <Input isError={true} type='text' />;

export const DemoSuccessInput = () => <Input isSuccess={true} type='text' />;

export const DemoLabelInput = () => <Input type='text' isClearable floatingLabel='Floating Label' />;
