import Image, { ImageProps } from 'next/image';
import React from 'react';

interface Props extends ImageProps {}

const ImageSection = (props: Props) => {
  return (
    <div className='image-section pt-1/2 flex min-h-24 w-full items-center justify-center overflow-hidden p-0 2xl:min-h-48 2xl:rounded-lg 2xl:p-8'>
      <div className='h-fit w-fit'>
        <Image
          width={762}
          height={762}
          {...props}
          alt={props.alt}
          priority
          quality={100}
          // style={{ width: 'auto', height: 'auto', maxWidth: '512px' }}
        />
      </div>
    </div>
  );
};

export default ImageSection;
