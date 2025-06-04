'use client';

import { BasicEmailInput } from './BasicEmailInput';

export const BasicEmailInputFloatingLabelError = (props: any) => (
  <BasicEmailInput {...props} isError={true} errorMessage='Error message' isClearable floatingLabel='Your Email' />
);
