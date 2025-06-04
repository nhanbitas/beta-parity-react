'use client';

import { FileItem } from 'beta-parity-react/ui/FileItem';
import { FileInput as ParityFileInput } from 'beta-parity-react/ui/FileInput';
import React from 'react';

type Props = any;

export const FileInput: React.FC<Props> = (props) => {
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
      <ParityFileInput onChange={handleChange} {...props} />

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
