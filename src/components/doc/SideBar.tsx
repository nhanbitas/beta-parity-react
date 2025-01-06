'use client';

import React from 'react';
import { components } from '../../../app/data';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu } from 'lucide-react';

type Props = {};

const SideBar = (props: Props) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(true);
  return (
    <aside
      className={`side-bar sticky left-0 top-0 z-10 h-screen border-r border-gray-200 ${isOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full'} transform duration-300 ease-in-out`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`absolute right-0 ${isOpen ? 'translate-x-0' : 'translate-x-full'} top-2 z-10 h-8 w-8 cursor-pointer bg-white p-2 text-gray-950 transition-all duration-300 ease-in-out hover:text-gray-900 active:text-gray-700`}
      >
        <Menu />
      </button>

      <Link href='/' className='block w-full overflow-hidden border-b border-gray-200 text-black'>
        <span className='text-heading-02 block px-4 py-3 hover:underline'>Components</span>
      </Link>

      <ul className='h-[calc(100vh-4rem)] overflow-hidden overflow-y-auto pb-20'>
        {components
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((component: { name: string; url: string; status: number }) => (
            <li className='group h-fit w-full min-w-64 hover:bg-gray-100' key={component.url}>
              <Link
                className={`z-10 block w-full px-4 py-2 ${pathname.startsWith(component.url) ? 'bg-orange-50/50 text-orange-500' : 'text-gray-900'}`}
                href={component.url}
              >
                <span className='mr-2 group-hover:underline'>{component.name}</span>
                <span
                  className={`text-label-01 ml-2 rounded-md p-0.5 ${component.status === 1 ? 'bg-violet-200/50 text-violet-800' : component.status === 2 ? 'bg-cyan-200/50 text-cyan-800' : 'bg-green-200/50 text-green-800'}`}
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
