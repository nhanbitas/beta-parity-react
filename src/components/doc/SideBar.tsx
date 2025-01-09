'use client';

import React from 'react';
import { components } from '../../../app/data';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import Badge from '@libComponents/Badge';

type Props = {};

const SideBar = (props: Props) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(true);
  return (
    <aside
      className={`side-bar sticky left-0 top-0 z-10 h-screen border-r border-gray-200 ${isOpen ? 'w-64' : 'w-0'} transform duration-300 ease-in-out`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`absolute right-0 ${isOpen ? 'translate-x-0' : 'translate-x-full'} top-2 z-10 h-8 w-8 cursor-pointer p-2 transition-transform duration-300 ease-in-out hover:text-[var(--text-hover)] active:text-[var(--text-active)]`}
      >
        <Menu />
      </button>

      <span
        className={`block h-[3rem] overflow-hidden border-b border-gray-200 ${isOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 ease-in-out`}
      >
        <Link className='text-heading-02 block w-fit min-w-64 px-4 py-3 hover:underline' href='/'>
          Parity React
        </Link>
      </span>

      <ul
        className={`h-[calc(100vh-3rem)] overflow-hidden overflow-y-auto pb-20 scrollbar-none ${isOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 ease-in-out`}
      >
        {components
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((component: { name: string; url: string; status: number }) => (
            <li className='group h-fit w-full min-w-64' key={component.url}>
              <Link
                className={`z-10 flex w-full items-center justify-start gap-2 px-4 py-2 ${pathname.startsWith(component.url) ? 'text-orange-500' : ''}`}
                href={component.url}
              >
                <span className='group-hover:underline'>{component.name}</span>

                <Badge
                  variant='glass'
                  dot
                  size='xs'
                  color={component.status === 1 ? 'violet' : component.status === 2 ? 'cyan' : 'green'}
                >
                  {component.status === 1 ? 'next' : component.status === 2 ? 'current' : 'post-queue'}
                </Badge>
              </Link>
            </li>
          ))}
      </ul>
    </aside>
  );
};

export default SideBar;
