'use client';

import React from 'react';
import { CopyIcon } from 'lucide-react';
// @ts-ignore
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// @ts-ignore
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Tooltip } from 'beta-parity-react/ui/Tooltip';
import { BlackSkeleton } from '../doc/Skeleton';

interface Props {
  children?: any;
  theme?: 'default' | 'alternative';
  rawText?: string;
  paths?: [string, string];
  loading?: boolean;
}

const ComponentSection = ({ children, rawText, loading }: Props) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(rawText || 'undefined');
    alert('Copied to clipboard!');
  };

  return (
    <div className='w-full'>
      <div className='w-full *:mt-12'>{children}</div>

      <div className='relative flex w-full items-center justify-between py-1'>
        {!loading && rawText ? (
          <Tooltip content='Copy code to clipboard'>
            <button className='absolute right-4 top-4 rounded-md bg-transparent p-2 text-gray-100' onClick={handleCopy}>
              <CopyIcon />
            </button>
          </Tooltip>
        ) : null}
      </div>

      <div className='flex w-full items-center justify-center'>
        {!loading && rawText ? (
          <SyntaxHighlighter
            language='javascript'
            style={atomDark}
            className='tsx-language !mt-0 max-h-[600px] min-h-64 w-full flex-1 overflow-auto !text-sm'
          >
            {rawText}
          </SyntaxHighlighter>
        ) : (
          <BlackSkeleton />
        )}
      </div>
    </div>
  );
};

export default ComponentSection;
