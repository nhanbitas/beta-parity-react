'use client';

import { DomainEmailInput } from './DomainEmailInput';

export const DomainEmailInputFloatingLabelReadOnly = (props: any) => (
  <DomainEmailInput {...props} readOnly value='bitas' isClearable floatingLabel='Your Email' />
);
