'use client';

import { BasicEmailInput } from './BasicEmailInput';

export const BasicEmailInputFloatingLabelDisabled = (props: any) => (
  <BasicEmailInput {...props} disabled isClearable floatingLabel='Your Email' />
);
