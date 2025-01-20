import Image, { ImageProps } from 'next/image';
import React from 'react';

interface Props extends ImageProps {}

const ImageSection = (props: Props) => {
  return (
    <div className='image-section align-center pt-1/2 flex min-h-48 w-full justify-center'>
      <Image
        width={450}
        height={450}
        {...props}
        alt={props.alt}
        priority
        style={{ objectFit: 'contain', width: 'auto', height: 'auto' }}
      />
    </div>
  );
};

export default ImageSection;
