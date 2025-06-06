'use client';

import ComponentSection from './_ComponentSection';
import React, { useEffect, useState } from 'react';

type Props = {
  paths?: [string, string];
  children?: React.ReactNode;
  theme?: 'default' | 'alternative';
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3005';

const CodePreview = ({ paths, children, theme }: Props) => {
  const [rawText, setRawText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [openCodeBlock, setOpenCodeBlock] = useState(false);

  useEffect(() => {
    if (!paths || !openCodeBlock) return;
    setLoading(true);
    fetch(`${BASE_URL}/demo/${paths[0]}/${paths[1]}.tsx`, { cache: 'force-cache' })
      .then((res) => (res.ok ? res.text() : ''))
      .then((text) => setRawText(text))
      .finally(() => setLoading(false));
  }, [paths, openCodeBlock]);

  if (!paths) return null;

  return (
    <section className='component-section excluded-content not-prose pt-1/2  w-full grow-0 rounded-lg border border-gray-200/50 p-8 shadow-sm'>
      <div>{children}</div>
      {!openCodeBlock ? (
        <button
          className='mt-4 py-2 text-sm text-[var(--par-color-text)] hover:underline'
          onClick={() => setOpenCodeBlock(true)}
        >
          Show code
        </button>
      ) : (
        <div className='mt-4 flex w-full flex-col items-start justify-start'>
          <button
            className='py-2 text-sm text-[var(--par-color-text)] hover:underline'
            onClick={() => setOpenCodeBlock(false)}
          >
            Hide code
          </button>

          <ComponentSection paths={paths} rawText={rawText || ''} loading={loading} theme={theme} />
        </div>
      )}
    </section>
  );
};

export default CodePreview;
