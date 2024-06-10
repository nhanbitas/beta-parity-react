'use client';

import React from 'react';
import { components } from '../../../app/data';
import { usePathname } from 'next/navigation';

type Props = {};

const SideBar = (props: Props) => {
  const pathname = usePathname();

  return (
    <aside className='h-screen w-[256px] bg-white'>
      <h1 className='text-heading-02 px-4 py-2'>Components</h1>
      <ul>
        {components.map((component: { name: string; url: string }) => (
          <li className='px-4 py-2' key={component.url}>
            <a className={`w-full ${pathname.startsWith(component.url) ? 'text-orange-500' : ''}`} href={component.url}>
              {component.name}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SideBar;
