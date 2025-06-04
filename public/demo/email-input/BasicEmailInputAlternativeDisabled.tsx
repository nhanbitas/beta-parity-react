'use client';

import { BasicEmailInput } from './BasicEmailInput';

export const BasicEmailInputAlternativeDisabled = (props: any) => (
  <BasicEmailInput {...props} theme='alternative' disabled isClearable />
);
