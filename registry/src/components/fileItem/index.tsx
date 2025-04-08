import * as React from 'react';

import './index.css';
import './variables.css';

import classNames from 'classnames';
import { Spinner } from '../Spinner';

export interface FileItemProps extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: Boolean;
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
      status = 'completed',
      loading = 0,
      disabled = false,
      fileName = 'File name with extension.png',
      fileSize = '100KB',
      onRetry,
      onRemove,
      ...props
    },
    ref
  ) => {
    const isLoading = loading > 0;
    const isError = status === 'error';
    const isSuccess = status === 'success';
    const isCompleted = status === 'completed';

    return (
      <div
        ref={ref}
        className={classNames('file-item', {
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
          ) : isError ? null : (
            <button className='file-item-remove' onClick={onRemove} aria-label='Remove file'>
              🗑️
            </button>
          )}
        </div>

        {/* Error action */}
        {isError && (
          <div className='file-item-actions'>
            <button className='file-item-retry' onClick={onRetry} aria-label='Retry upload'>
              Retry
            </button>
            <button className='file-item-remove' onClick={onRemove} aria-label='Remove file'>
              Remove
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
