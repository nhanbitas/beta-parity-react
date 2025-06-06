'use client';

import { ContentNavigation } from '@/registry/ui/ContentNavigation';
import Skeleton from './Skeleton';

export default function TableOfContents(props: any) {
  return (
    <div className=' not-prose mb-8 border-b border-[var(--par-color-border)] bg-[var(--par-color-bg)] pb-8'>
      <p className='excluded-content text-heading-compact-02 font-semibold'>On this page:</p>
      <ContentNavigation
        spaceToTop={150}
        color='accent'
        skeleton={<Skeleton />}
        exclude={['.excluded-content']}
        target={'#main'}
      />
    </div>
  );
}
