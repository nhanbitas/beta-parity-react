'use client';

import React from 'react';
import { CopyIcon } from 'lucide-react';
// @ts-ignore
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// @ts-ignore
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Tooltip } from 'beta-parity-react/ui/Tooltip';

interface Props {
  children?: any;
  language?: string;
}

const CodeBlock = ({ children, language }: Props) => {
  const [copyInfo, setCopyInfo] = React.useState('Copy code');

  if (!children) {
    return <div className='w-full'>No code provided</div>;
  }

  if (typeof children !== 'string') {
    return <div className='w-full'>Invalid code format</div>;
  }

  const rawText = typeof children === 'string' ? children : '';

  const handleCopy = () => {
    navigator.clipboard.writeText(rawText || 'undefined');
    setCopyInfo('Copied!');
  };

  const handleMouseLeave = () => {
    setCopyInfo('Copy code');
  };

  return (
    <div className='h-fit w-full'>
      <div className='text-sm font-semibold text-[var(--par-color-text-primary)]'>{language}</div>
      <div
        className='relative z-10 flex w-full items-center justify-between py-1'
        onBlur={handleMouseLeave}
        onMouseLeave={handleMouseLeave}
      >
        <Tooltip content={copyInfo}>
          <button className='absolute right-4 top-4 rounded-md bg-transparent p-2 text-gray-100' onClick={handleCopy}>
            <CopyIcon />
          </button>
        </Tooltip>
      </div>

      <div className='flex w-full items-center justify-center'>
        <SyntaxHighlighter
          language={language || 'tsx'}
          style={atomDark}
          className='tsx-language !mt-0 max-h-[600px] min-h-4 w-full flex-1 overflow-auto !text-sm'
        >
          {children}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeBlock;
