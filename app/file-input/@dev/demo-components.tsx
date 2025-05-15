'use client';

import { FileItem } from 'beta-parity-react/ui/FileItem';
import { FileInput } from 'beta-parity-react/ui/FileInput';
import React from 'react';

type Props = any;

export const DemoFileInput = (props: Props) => {
  const [files, setFiles] = React.useState<File[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      setFiles((pre) => [...pre, ...Array.from(selectedFiles)]);
    }
  };

  const handleRemove = (file: File) => {
    setFiles((prevFiles) => prevFiles.filter((f) => f !== file));
  };

  return (
    <div className='!max-w-96'>
      <FileInput onChange={handleChange} {...props} />

      {files.length > 0 && (
        <div className='mt-4'>
          {files.map((f, index) => (
            <FileItem
              key={index}
              fileName={f.name}
              fileSize={f.size}
              status='completed'
              onRemove={() => handleRemove(f)}
              className='mb-2'
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const DemoErrorFileInput = (props: Props) => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = React.useState<File[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      setFiles(Array.from(selectedFiles));
    }
  };

  const handleRemove = (file: File) => {
    setFiles((prevFiles) => prevFiles.filter((f) => f !== file));
  };

  const handleRetry = (file: File) => {
    setFiles((prevFiles) => prevFiles.filter((f) => f !== file));
    inputRef.current?.click();
  };

  const checkType = (file: File) => {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/gif'];
    return allowedTypes.includes(file.type);
  };

  return (
    <div className='!max-w-96'>
      <FileInput
        ref={inputRef}
        multiple
        onChange={handleChange}
        errorMessage='Invalid file type. Only PNG, JPEG, and GIF are allowed.'
        isError={files.some((file) => !checkType(file))}
        {...props}
      />

      {files.length > 0 && (
        <div className='mt-4'>
          {files.map(
            (f, index) =>
              checkType(f) && (
                <FileItem
                  key={index}
                  fileName={f.name}
                  fileSize={f.size}
                  status={checkType(f) ? 'completed' : 'error'}
                  onRetry={() => handleRetry(f)}
                  onRemove={() => handleRemove(f)}
                  className='mb-2'
                />
              )
          )}
        </div>
      )}
    </div>
  );
};
