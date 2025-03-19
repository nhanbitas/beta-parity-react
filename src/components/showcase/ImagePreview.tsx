import Image, { ImageProps } from 'next/image';
import React from 'react';

interface Props extends ImageProps {}

const ImagePreview = (props: Props) => {
  return (
    <div className='image-section relative my-4 flex min-h-24 w-full items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-25 p-0 2xl:min-h-48 2xl:rounded-lg 2xl:p-8  '>
      <div className='h-fit w-fit'>
        <Image width={762} height={762} quality={100} priority {...props} alt={props.alt} />
      </div>
    </div>
  );
};

export default ImagePreview;
