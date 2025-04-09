import * as React from 'react';

import './index.css';

import { InputProps } from '../BaseInput';
import useCombinedRefs from '../hooks/useCombinedRefs';
import classNames from 'classnames';
import { Upload } from 'lucide-react';

export interface FileInputProps extends InputProps {
  supportedFormats?: string[]; // Array of supported file formats (e.g., ['image/png', 'image/jpeg'])
  label?: string; // Label text for the file input
}
export const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  (
    { type = 'file', supportedFormats = [], label = 'Choose file', isError, className, errorMessage, ...props },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const combinedRef = useCombinedRefs(ref, inputRef);

    const [isDragActive, setIsDragActive] = React.useState(false);

    const handleWrapperClick = () => {
      inputRef.current?.click();
    };

    const handleDrop = (event: React.DragEvent) => {
      event.preventDefault();
      event.stopPropagation();
      setIsDragActive(false);

      const droppedFiles = event.dataTransfer.files;

      if (inputRef.current) {
        // Trigger change manually
        const dataTransfer = new DataTransfer();
        Array.from(droppedFiles).forEach((file) => {
          if (supportedFormats.length === 0 || supportedFormats.includes(file.type)) {
            dataTransfer.items.add(file);
          }
        });

        inputRef.current.files = dataTransfer.files;
        // Fire change event
        const changeEvent = new Event('change', { bubbles: true });
        inputRef.current.dispatchEvent(changeEvent);
      }
    };

    const handleDragOver = (event: React.DragEvent) => {
      event.preventDefault();
      setIsDragActive(true);
    };

    const handleDragLeave = () => {
      setIsDragActive(false);
    };

    const wrapperAccessibilityProps = {
      role: 'button',
      tabIndex: 0,
      onKeyDown: (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
          handleWrapperClick();
        }
      },
      onClick: handleWrapperClick,
      onDrop: handleDrop,
      onDragOver: handleDragOver,
      onDragLeave: handleDragLeave
    };

    return (
      <div className={classNames('input-wrapper')}>
        <div
          className={classNames('file-input-wrapper', className, {
            'error-state': isError,
            'drag-active': isDragActive
          })}
          {...wrapperAccessibilityProps}
        >
          <input ref={combinedRef} className='par-input' type={type} style={{ display: 'none' }} {...props} />

          <span className='file-input-text'>{label}</span>

          <span className='file-input-icon'>
            <Upload />
          </span>
        </div>

        {isError && <div className='input-error-message'>{errorMessage}</div>}
      </div>
    );
  }
);

FileInput.displayName = 'FileInput';
