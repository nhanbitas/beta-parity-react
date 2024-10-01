'use client';

import React from 'react';
import { components } from '../../../app/data';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

type Props = {};

const SideBar = (props: Props) => {
  const pathname = usePathname();

  return (
    <aside className='side-bar fixed left-0 top-0 h-screen w-[256px] overflow-y-auto border-r border-gray-200'>
      <Link href='/' className='text-heading-03 block w-full px-4 py-4 text-black'>
        Components
      </Link>
      <ul>
        {components
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((component: { name: string; url: string; status: number }) => (
            <li className='h-fit w-full hover:bg-gray-100' key={component.url}>
              <Link
                className={`z-10 block w-full px-4 py-2 ${pathname.startsWith(component.url) ? 'bg-orange-50/50 text-orange-500' : 'text-gray-900'}`}
                href={component.url}
              >
                {component.name}{' '}
                <span
                  className={`text-label-01 ml-2 rounded-md p-0.5  ${component.status === 1 ? 'bg-violet-200/50 text-violet-800' : component.status === 2 ? 'bg-cyan-200/50 text-cyan-800' : 'bg-green-200/50 text-green-800'}`}
                >
                  {component.status === 1 ? 'next' : component.status === 2 ? 'current' : 'post-queue'}
                </span>
              </Link>
            </li>
          ))}
      </ul>
    </aside>
  );
};

export default SideBar;
