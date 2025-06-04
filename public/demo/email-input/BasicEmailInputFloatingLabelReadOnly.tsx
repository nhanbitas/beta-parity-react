'use client';

import { BasicEmailInput } from './BasicEmailInput';

export const BasicEmailInputFloatingLabelReadOnly = (props: any) => (
  <BasicEmailInput {...props} readOnly value='bitas@example.com' isClearable floatingLabel='Your Email' />
);
