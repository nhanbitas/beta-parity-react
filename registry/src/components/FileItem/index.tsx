import * as React from 'react';
import classNames from 'classnames';
import { Check, Minus, RefreshCw, Trash2 } from 'lucide-react';

import './index.css';
import './variables.css';

import { Spinner } from '../Spinner';

// =========================
// FileItem
// =========================
// Declare and export select type and FileItem component

/**
 * Props for the FileItem component.
 *
 */
export interface FileItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Whether the file item is disabled.
   *
   * @default false
   * @memberof FileItemProps
   */
  disabled?: boolean;

  /**
   * The status of the file item.
   *
   * - `error`: Indicates an error occurred.
   * - `success`: Indicates the file was successfully processed.
   * - `completed`: Indicates the file upload or processing is completed.
   *
   * @default "completed"
   * @memberof FileItemProps
   */
  status?: 'error' | 'success' | 'completed';

  /**
   * The loading progress percentage (0-100).
   *
   * @default 0
   * @memberof FileItemProps
   */
  loading?: number;

  /**
   * The name of the file.
   *
   * @default "Choose file"
   */
  fileName?: string;

  /**
   * The size of the file in bytes.
   *
   * @default 0
   * @memberof FileItemProps
   */
  fileSize?: number;

  /**
   * Callback function triggered when the retry action is performed.
   *
   * @memberof FileItemProps
   */
  onRetry?: () => void;

  /**
   * Callback function triggered when the remove action is performed.
   *
   * @memberof FileItemProps
   */
  onRemove?: () => void;
}

/**
 * **File Item**.
 *
 * @see {@link https://beta-parity-react.vercel.app/file-item Parity FileItem}
 */
export const FileItem = React.forwardRef<HTMLDivElement, FileItemProps>(
  (
    {
      className,
      status = 'completed',
      loading = 0,
      disabled = false,
      fileName = 'Choose file',
      fileSize = 0,
      onRetry,
      onRemove,
      ...props
    },
    ref
  ) => {
    const isLoading = loading > 0;
    const isError = status === 'error';
    const isCompleted = status === 'completed';
    const isSuccess = status === 'success';

    return (
      <div
        ref={ref}
        className={classNames('file-item', className, {
          disabled: disabled,
          loading: isLoading,
          error: isError,
          completed: isCompleted,
          success: isSuccess
        })}
        {...props}
      >
        <div className='file-item-wrapper'>
          {/* Left Information */}
          <FileName name={fileName} />
          {/* File Size */}
          <span className='file-item-size'>{formatFileSize(fileSize)}</span>

          {/* Rigt Icon Status */}
          {isLoading ? (
            <Spinner size='sm' variant='sunburst' />
          ) : isError ? (
            <span className='error-icon'>
              <Minus />
            </span>
          ) : isSuccess ? (
            <span className='success-icon'>
              <Check />
            </span>
          ) : (
            <button className='file-item-remove-btn' onClick={onRemove} aria-label='Remove file' disabled={disabled}>
              <Trash2 />
            </button>
          )}
        </div>

        {/* Error action */}
        {isError && (
          <div className='file-item-actions'>
            <button className='retry' onClick={onRetry} aria-label='Retry upload' disabled={disabled}>
              <RefreshCw /> Retry
            </button>
            <button className='remove' onClick={onRemove} aria-label='Remove file' disabled={disabled}>
              <Trash2 /> Remove
            </button>
          </div>
        )}

        {/* Loading Progress */}
        {isLoading && (
          <div className='file-item-progress-track'>
            <div
              className='file-item-progress-thumb'
              style={{
                width: `${loading}%`
              }}
            ></div>
          </div>
        )}
      </div>
    );
  }
);

FileItem.displayName = 'FileItem';

// =========================
// FileName
// =========================
// Declare and export FileName component

/**
 * **File Name**.
 *
 * This component displays the name of the file with a specified format, retaining a certain number of characters from the end.
 * It also shows the file type based on the file extension.
 */
const FileName = ({ name, retainLength }: { name: string; retainLength?: number }) => {
  const RETAINED_LENGTH = retainLength || 5; // Number of characters to retain from the end of the file name
  const arrName = name.split('.');

  if (arrName.length < 2) {
    return <span className='file-item-name'>{name}</span>;
  }

  const type = arrName[arrName.length - 1];
  const fullName = arrName.slice(0, arrName.length - 1).join('.');

  const fnPrefix = fullName.slice(0, fullName.length - RETAINED_LENGTH);
  const fnSuffix = fullName.slice(fullName.length - RETAINED_LENGTH);

  return (
    <span className='file-item-name'>
      <span className='file-item-name-prefix'>{fnPrefix}</span>
      <span className='file-item-name-suffix'>{fnSuffix}</span>
      <span className='file-item-name-type'>.{type}</span>
    </span>
  );
};

/**
 * Format file size from bytes to appropriate unit (KB, MB, GB, ...)
 * Automatically increases unit when size >= 1024
 *
 * @param sizeInBytes - Raw file size in bytes
 * @returns Formatted string, e.g., "892.34 KB", "1.23 MB"
 */
function formatFileSize(sizeInBytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let size = sizeInBytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`;
}
