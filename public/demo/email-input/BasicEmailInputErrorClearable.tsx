'use client';
import { BasicEmailInput } from './index';
export default function BasicEmailInputErrorClearable() {
  return <BasicEmailInput isError={true} errorMessage='Error message' isClearable />;
}
