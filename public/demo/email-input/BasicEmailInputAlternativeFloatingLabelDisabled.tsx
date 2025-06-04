'use client';

import { BasicEmailInput } from './BasicEmailInput';

export const BasicEmailInputAlternativeFloatingLabelDisabled = (props: any) => (
  <BasicEmailInput {...props} theme='alternative' disabled isClearable floatingLabel='Your Email' />
);
