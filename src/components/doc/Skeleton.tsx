import React from 'react';

type Props = {};

const Skeleton = (props: Props) => {
  return <div className='my-4 h-64 animate-pulse rounded-md bg-[var(--par-color-bg-surface)]'></div>;
};

export default Skeleton;
