'use client';
import { DomainEmailInput } from './index';
export default function DomainEmailInputErrorClearable() {
  return <DomainEmailInput isError={true} errorMessage='Error message' isClearable />;
}
