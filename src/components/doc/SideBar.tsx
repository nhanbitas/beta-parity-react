'use client';

import React from 'react';
import { components } from '../../../app/data';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

type Props = {};

const SideBar = (props: Props) => {
  const pathname = usePathname();

  return (
    <aside className='fixed left-0 top-0 h-screen w-[256px] bg-white'>
      <Link href='/' className='text-heading-03 block w-full px-4 py-4 text-black'>
        Components
      </Link>
      <ul>
        {components.map((component: { name: string; url: string }) => (
          <li className='h-fit w-full hover:bg-gray-100' key={component.url}>
            <Link
              className={`z-10 block w-full px-4 py-2 ${pathname.startsWith(component.url) ? 'text-orange-500' : ''}`}
              href={component.url}
            >
              {component.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SideBar;
