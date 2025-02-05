import Image, { ImageProps } from 'next/image';
import React from 'react';

interface Props extends ImageProps {}

const ComponentSection = (props: Props) => {
  const { children, ...rest } = props;
  return (
    <div className='component-section align-center pt-1/2 flex min-h-48 w-full justify-center overflow-hidden rounded-lg border border-gray-200/50 bg-[var(--background-alternative)] p-8 shadow-sm'>
      <div className='flex max-w-lg flex-wrap items-center justify-center gap-2' {...rest}>
        {children}
      </div>
    </div>
  );
};

export default ComponentSection;
