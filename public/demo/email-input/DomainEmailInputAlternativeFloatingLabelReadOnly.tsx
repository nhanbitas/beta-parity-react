'use client';

import { DomainEmailInput } from './DomainEmailInput';

export const DomainEmailInputAlternativeFloatingLabelReadOnly = (props: any) => (
  <DomainEmailInput {...props} theme='alternative' readOnly value='bitas' isClearable floatingLabel='Your Email' />
);
