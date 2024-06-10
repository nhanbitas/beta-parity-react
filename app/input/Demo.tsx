import { Input } from '@libComponents/Input';
import React from 'react';

type Props = {};

export const DemoBasicInput = () => <Input type='text' />;

export const DemoFloatingLabelInput = () => <Input floatingLabel='Floating Label' type='text' />;

export const DemoClearableInput = () => <Input floatingLabel='Floating Label' isClearable type='text' />;

export const DemoErrorInput = () => <Input floatingLabel='Floating Label' isError={true} type='text' />;

export const DemoSuccessInput = () => <Input floatingLabel='Floating Label' isSuccess={true} type='text' />;
