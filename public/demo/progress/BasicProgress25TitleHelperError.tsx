'use client';
import { Progress } from 'beta-parity-react/ui/Progress';
export function BasicProgress25TitleHelperError() {
  return <Progress value={25} title='Title' helperText='Helper text' state='error' />;
}
