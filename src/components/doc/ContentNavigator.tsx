'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from 'beta-parity-react/ui/Button';
import React from 'react';

type Props = {
  spec: React.ReactNode;
  dev: React.ReactNode;
};

const ContentNavigator = (props: Props) => {
  const { dev, spec } = props;
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');
  const [currentTab, setCurrentTab] = React.useState(tab ?? 'dev');

  const handleNavigate = (tab: 'dev' | 'spec') => {
    router.push(`?tab=${tab ?? 'dev'}`);
  };

  React.useEffect(() => {
    setCurrentTab(tab ?? 'dev');
  }, [tab]);

  return (
    <>
      <nav className='fixed right-0 top-0 z-40 flex w-full justify-end gap-1 rounded-lg bg-[var(--par-color-bg)] p-2 px-8 backdrop-blur-sm'>
        <Button size='sm' kind={currentTab === 'dev' ? 'solid' : 'glass'} onClick={() => handleNavigate('dev')}>
          Dev
        </Button>
        <Button size='sm' kind={currentTab === 'spec' ? 'solid' : 'glass'} onClick={() => handleNavigate('spec')}>
          Spec
        </Button>
      </nav>
      {currentTab === 'dev' && dev}
      {currentTab === 'spec' && <div className='spec-content'>{spec}</div>}
    </>
  );
};

export default ContentNavigator;
