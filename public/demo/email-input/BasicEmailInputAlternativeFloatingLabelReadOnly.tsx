'use client';

import { BasicEmailInput } from './BasicEmailInput';

export const BasicEmailInputAlternativeFloatingLabelReadOnly = (props: any) => (
  <BasicEmailInput
    {...props}
    theme='alternative'
    readOnly
    value='bitas@example.com'
    isClearable
    floatingLabel='Your Email'
  />
);
