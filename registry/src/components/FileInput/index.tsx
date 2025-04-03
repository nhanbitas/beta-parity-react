import * as React from 'react';
import './index.css';

import { Input } from '../BaseInput';

export interface FileInputProps extends React.ComponentPropsWithoutRef<typeof Input> {
  supportedFormats?: string[]; // Array of supported file formats (e.g., ['image/png', 'image/jpeg'])
  label?: string; // Label text for the file input
}

export const FileInput = React.forwardRef<React.ElementRef<typeof Input>, FileInputProps>(
  ({ type = 'file', supportedFormats = [], label = 'Choose file', ...props }, ref) => {
    const [error, setError] = React.useState<string | null>(null);
    const [fileName, setFileName] = React.useState<string | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file && supportedFormats.length > 0 && !supportedFormats.includes(file.type)) {
        setError('File format not supported');
        setFileName(null);
        event.target.value = ''; // Clear the input
      } else {
        setError(null);
        setFileName(file ? file.name : null);
      }

      if (props.onChange) {
        props.onChange(event);
      }
    };

    return (
      <div className={`file-input-wrapper ${error ? 'file-input-wrapper-error' : ''}`}>
        <label className='file-input-label'>
          <span className='file-input-label-text'>{fileName || label}</span>
          <span className='file-input-icon'>📤</span>
          <input className='file-input' ref={ref} type={type} onChange={handleChange} {...props} />
        </label>
        {error && <div className='file-input-error-message'>{error}</div>}
      </div>
    );
  }
);

FileInput.displayName = 'FileInput';
