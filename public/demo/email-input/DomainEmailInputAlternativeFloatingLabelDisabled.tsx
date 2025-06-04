'use client';

import { DomainEmailInput } from './DomainEmailInput';

export const DomainEmailInputAlternativeFloatingLabelDisabled = (props: any) => (
  <DomainEmailInput {...props} theme='alternative' disabled isClearable floatingLabel='Your Email' />
);
