'use client';

import React from 'react';
import { Button } from '@libComponents/Button';

const ButtonDemo = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const btnClick = () => {
    setIsLoading(true);
    console.log('Loading...');
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      console.log('Done!');
    }, 2000);
  };

  return (
    <Button
      isLoading={isLoading}
      text={isSuccess ? 'Submit Successfully' : 'Submit'}
      size='large'
      variant={isSuccess ? 'success' : 'primary'}
      onClick={btnClick}
    />
  );
};

export default ButtonDemo;
