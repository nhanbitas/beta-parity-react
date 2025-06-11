import React from 'react';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode;
};

export const Skeleton = (props: Props) => {
  return <div className='my-4 h-64 w-full animate-pulse rounded-md bg-[var(--par-color-bg-surface)]' {...props}></div>;
};

export const BlackSkeleton = (props: Props) => {
  return <div className='my-4 h-64 w-full animate-pulse rounded-md bg-[var(--par-gray-950)]' {...props}></div>;
};
