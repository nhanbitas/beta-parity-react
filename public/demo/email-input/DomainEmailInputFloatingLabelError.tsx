'use client';

import { DomainEmailInput } from './DomainEmailInput';

export const DomainEmailInputFloatingLabelError = (props: any) => (
  <DomainEmailInput {...props} isError={true} errorMessage='Error message' isClearable floatingLabel='Your Email' />
);
