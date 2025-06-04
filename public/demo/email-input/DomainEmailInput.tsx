'use client';

import { MailOpen } from 'lucide-react';
import { EmailInput } from 'beta-parity-react/ui/EmailInput';
import React from 'react';

type Props = any;

const domains = [
  '@gmail.com',
  '@outlook.com',
  '@hotmail.com',
  '@live.com',
  '@yahoo.com',
  '@zoho.com',
  '@aol.com',
  '@protonmail.com'
];

export const DomainEmailInput = (props: Props) => {
  const [value, setValue] = React.useState(props.value ?? '');
  const [domain, setDomain] = React.useState(domains[0]);

  const handleChange = (e: any) => {
    if (e.target.value.includes('@')) return;
    setValue(e.target.value);
    console.log(e.target.value + domain);
  };

  const handleDomainChange = (domain: string) => {
    setDomain(domain);
    console.log(value + domain);
  };
  return (
    <EmailInput
      placeholder='example'
      leftIcon={<MailOpen />}
      value={value}
      domain={domains}
      domainValue={domain}
      onDomainChange={handleDomainChange}
      onChange={handleChange}
      wrapperProps={{ className: '!max-w-96', ...props.wrapperProps }}
      {...props}
    />
  );
};
