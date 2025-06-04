'use client';

import { DomainEmailInput } from './DomainEmailInput';

export const DomainEmailInputAlternativeDisabledDomainGmail = (props: any) => (
  <DomainEmailInput {...props} theme='alternative' disabled domain='@gmail.com' />
);
