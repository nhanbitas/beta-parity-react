import React from 'react';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode;
};

export const Skeleton = (props: Props) => {
  return <div className='h-64 w-full rounded-md bg-[var(--par-color-bg-surface)]' {...props}></div>;
};

export const BlackSkeleton = (props: Props) => {
  return <div className='h-64 w-full rounded-md bg-[var(--par-gray-950)]' {...props}></div>;
};
