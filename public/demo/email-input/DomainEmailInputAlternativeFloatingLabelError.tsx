'use client';

import { DomainEmailInput } from './DomainEmailInput';

export const DomainEmailInputAlternativeFloatingLabelError = (props: any) => (
  <DomainEmailInput
    {...props}
    theme='alternative'
    isError={true}
    errorMessage='Error message'
    isClearable
    floatingLabel='Your Email'
  />
);
