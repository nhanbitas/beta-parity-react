import ComponentSection from './_ComponentSection';
import React from 'react';

type Props = {
  paths?: [string, string];
  children?: React.ReactNode;
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3005';

const CodePreview = async ({ paths, children }: Props) => {
  if (!paths) return null;

  const res = await fetch(`${BASE_URL}/demo/${paths[0]}/${paths[1]}.tsx`, { cache: 'no-store' });

  if (!res.ok) return null;

  const rawText = await res.text();

  return (
    <ComponentSection paths={paths} rawText={rawText || ''}>
      {children}
    </ComponentSection>
  );
};

export default CodePreview;
