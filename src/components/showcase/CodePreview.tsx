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

  useEffect(() => {
    if (!paths) return;
    setLoading(true);
    fetch(`${BASE_URL}/demo/${paths[0]}/${paths[1]}.tsx`, { cache: 'force-cache' })
      .then((res) => (res.ok ? res.text() : ''))
      .then((text) => setRawText(text))
      .finally(() => setLoading(false));
  }, [paths]);

  if (!paths) return null;

  return (
    <ComponentSection paths={paths} rawText={rawText || ''} loading={loading} theme={theme}>
      {children}
    </ComponentSection>
  );
};

export default CodePreview;
