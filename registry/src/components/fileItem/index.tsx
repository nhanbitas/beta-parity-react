import * as React from 'react';

import './index.css';
import './variables.css';

import classNames from 'classnames';
import { Spinner } from '../Spinner';
import { Check, Minus, RefreshCw, Trash2 } from 'lucide-react';

export interface FileItemProps extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  status?: 'error' | 'success' | 'completed';
  loading?: number;
  fileName?: string;
  fileSize?: string;
  onRetry?: () => void;
  onRemove?: () => void;
}

export const FileItem = React.forwardRef<HTMLDivElement, FileItemProps>(
  (
    {
      className,
      status = 'completed',
      loading = 0,
      disabled = false,
      fileName = 'Choose file',
      fileSize = '0KB',
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
          <span className='file-item-name'>{fileName}</span>
          <span className='file-item-size'>{fileSize}</span>

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
