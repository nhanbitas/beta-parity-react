'use client';

import { DomainEmailInput } from './DomainEmailInput';

export const DomainEmailInputDisabledDomainGmail = (props: any) => (
  <DomainEmailInput {...props} disabled domain='@gmail.com' />
);
