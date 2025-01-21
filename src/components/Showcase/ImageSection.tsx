import Image, { ImageProps } from 'next/image';
import React from 'react';

interface Props extends ImageProps {}

const ImageSection = (props: Props) => {
  return (
    <div className='image-section align-center pt-1/2 flex min-h-48 w-full justify-center overflow-hidden rounded-lg border border-gray-200/50 bg-[var(--background-alternative)] p-8 shadow-sm'>
      <Image
        width={512}
        height={512}
        {...props}
        alt={props.alt}
        priority
        quality={100}
        // style={{ width: 'auto', height: 'auto', maxWidth: '512px' }}
      />
    </div>
  );
};

export default ImageSection;
