import * as React from 'react';
import classNames from 'classnames';
import { Upload } from 'lucide-react';

import './index.css';

import { InputProps } from '../BaseInput';
import useCombinedRefs from '../hooks/useCombinedRefs';

// =========================
// FileInput
// =========================
// Declare and export select type and FileInput component

/**
 * Props for the FileInput component.
 *
 */
export interface FileInputProps extends InputProps {
  /**
   * Array of supported file formats.
   *
   * Example: `['image/png', 'image/jpeg']`
   *
   * If left empty, all file formats are accepted.
   *
   * @default []
   * @memberof FileInputProps
   */
  supportedFormats?: string[];

  /**
   * Label text for the file input.
   *
   * @default "Choose file"
   * @memberof FileInputProps
   */
  label?: string;
}

/**
 * **File Input**.
 *
 * @see {@link http://localhost:3005/file-input Parity FileInput}
 */
export const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  (
    {
      type = 'file',
      supportedFormats = [],
      label = 'Choose file',
      isError,
      className,
      errorMessage,
      theme = 'default',
      ...props
    },
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
          className={classNames('file-input-wrapper', className, theme, {
            'error-state': isError,
            'drag-active': isDragActive
          })}
          {...wrapperAccessibilityProps}
        >
          <input
            ref={combinedRef}
            className='par-input'
            type={type}
            accept={supportedFormats.join(',')}
            style={{ display: 'none' }}
            {...props}
          />

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
