'use client';

import { BasicEmailInput } from './BasicEmailInput';

export const BasicEmailInputAlternativeFloatingLabelError = (props: any) => (
  <BasicEmailInput
    {...props}
    theme='alternative'
    isError={true}
    errorMessage='Error message'
    isClearable
    floatingLabel='Your Email'
  />
);
