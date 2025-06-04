'use client';

import { DomainEmailInput } from './DomainEmailInput';

export const DomainEmailInputFloatingLabelDisabled = (props: any) => (
  <DomainEmailInput {...props} disabled isClearable floatingLabel='Your Email' />
);
