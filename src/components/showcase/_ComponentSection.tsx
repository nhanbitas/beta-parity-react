'use client';

import React from 'react';
import { CopyIcon } from 'lucide-react';
// @ts-ignore
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// @ts-ignore
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface Props {
  children?: any;
  rawText?: string;
  paths?: [string, string];
}

const ComponentSection = ({ children, rawText, paths }: Props) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(rawText || 'undefined');
    alert('Copied to clipboard!');
  };

  return (
    <section className='component-section not-prose pt-1/2 min-h-48 w-full rounded-lg border border-gray-200/50 bg-[var(--background-alternative)] p-8 shadow-sm'>
      <div className='w-full'>
        <div className='w-full *:mt-12'>{children}</div>

        <div className=' mt-16 flex items-center justify-between py-1'>
          <span className='text-sm italic'>
            {paths && paths[1] ? paths[1].charAt(0).toUpperCase() + paths[1].slice(1) : ''}.tsx{' '}
          </span>
          <button className=' rounded-md bg-gray-800/50 p-2 text-white' onClick={handleCopy}>
            <CopyIcon />
          </button>
        </div>

        <SyntaxHighlighter language='javascript' style={atomDark} className='tsx-language !mt-0 max-h-[600px] !text-sm'>
          {rawText}
        </SyntaxHighlighter>
      </div>
    </section>
  );
};

export default ComponentSection;
