'use client';

import React from 'react';
import { CopyIcon } from 'lucide-react';
// @ts-ignore
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// @ts-ignore
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Tooltip } from 'beta-parity-react/ui/Tooltip';
import Skeleton from '../doc/Skeleton';

interface Props {
  children?: any;
  theme?: 'default' | 'alternative';
  rawText?: string;
  paths?: [string, string];
  loading?: boolean;
}

const ComponentSection = ({ children, rawText, paths, theme, loading }: Props) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(rawText || 'undefined');
    alert('Copied to clipboard!');
  };

  const isAlternative = theme === 'alternative';

  return (
    <section
      className={`component-section excluded-content not-prose pt-1/2 min-h-48  w-full grow-0 rounded-lg border border-gray-200/50 ${isAlternative ? 'bg-[var(--background-alternative)]' : 'bg-transparent'} p-8 shadow-sm`}
    >
      <div className='w-full'>
        <div className='w-full *:mt-12'>{children}</div>

        <div className='mt-16 flex items-center justify-between py-1'>
          <span className='text-sm italic'>
            {paths && paths[1] ? paths[1].charAt(0).toUpperCase() + paths[1].slice(1) : ''}.tsx{' '}
          </span>

          <Tooltip content='Copy code to clipboard'>
            <button
              className=' rounded-md bg-[var(--par-color-bg-surface)] p-2 text-[var(--par-color-text-reverse)]'
              onClick={handleCopy}
            >
              <CopyIcon />
            </button>
          </Tooltip>
        </div>

        <div className='flex w-full items-center justify-center'>
          {loading || !rawText ? (
            <Skeleton />
          ) : (
            <SyntaxHighlighter
              language='javascript'
              style={atomDark}
              className='tsx-language !mt-0 max-h-[600px] w-[1200px] flex-1 overflow-auto !text-sm'
            >
              {rawText}
            </SyntaxHighlighter>
          )}
        </div>
      </div>
    </section>
  );
};

export default ComponentSection;
