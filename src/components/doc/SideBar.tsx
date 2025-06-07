'use client';

import React from 'react';
import { components, statusOptions } from '@/src/data';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, PencilRuler, Wrench } from 'lucide-react';

import { SearchInput } from 'beta-parity-react/ui/SearchInput';
import { Select } from 'beta-parity-react/ui/Select';

type Props = {};

const SideBar = (props: Props) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(true);

  const [componentList, setComponentList] = React.useState(components.sort((a, b) => a.name.localeCompare(b.name)));
  const [filter, setFilter] = React.useState({
    name: '',
    url: '',
    status: ''
  });

  const handleSetFilter = (key: 'name' | 'url' | 'status', value: string) => {
    setFilter((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    let filteredComponents = components;
    if (filter.name) {
      filteredComponents = filteredComponents.filter((component) =>
        component.name.toLowerCase().includes(filter.name.toLowerCase())
      );
    }
    if (filter.url) {
      filteredComponents = filteredComponents.filter((component) =>
        component.url.toLowerCase().includes(filter.url.toLowerCase())
      );
    }
    if (filter.status) {
      filteredComponents = filteredComponents.filter(
        (component) => !filter.status || component.status === Number(filter.status)
      );
    }
    setComponentList(filteredComponents);
  };

  React.useEffect(() => {
    handleSearch();
  }, [filter]);

  return (
    <aside
      className={`side-bar fixed left-0 top-0 z-50 h-screen border-r border-[var(--par-color-border-surface)] bg-[var(--par-color-bg)] md:sticky ${isOpen ? 'w-64' : 'w-0'} transform duration-150 ease-in-out`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`absolute right-0 ${isOpen ? 'translate-x-0' : 'translate-x-full'} top-2 z-10 h-8 w-12 cursor-pointer p-2 px-4 transition-transform duration-150 ease-in-out hover:text-[var(--text-hover)] active:text-[var(--text-active)]`}
      >
        <Menu />
      </button>

      <div
        className={`flex h-[3rem] items-center overflow-hidden ${isOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-150 ease-in-out`}
      >
        <Link
          className='text-heading-compact-02 w-fit min-w-fit truncate px-4 py-3 font-bold uppercase hover:underline'
          href='/'
        >
          Parity React
        </Link>
      </div>

      <div
        className={`h-[7rem] border-b border-[var(--par-color-border-surface)] ${isOpen ? 'overflow-visible opacity-100' : 'overflow-hidden opacity-0'} transition-opacity duration-500 ease-in-out`}
      >
        <div className='text-heading-02 flex w-full flex-col items-center gap-2 px-4'>
          <SearchInput
            placeholder='Search component'
            inputSize='sm'
            isClearable
            onChange={(e: any) => handleSetFilter('name', e.target.value)}
          />

          <Select
            placeholder='All status'
            keepOpen={false}
            usePortal={false}
            position='bottom'
            selectSize='sm'
            options={Object.keys(statusOptions).map((key: any) => ({
              value: key.toString(),
              label: statusOptions[key as keyof typeof statusOptions]
            }))}
            onChange={(value) => handleSetFilter('status', value as string)}
          />
        </div>
      </div>

      <ul
        className={`h-[calc(100vh-10rem)] overflow-hidden overflow-y-auto pb-20 pt-4 scrollbar-none ${isOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-150 ease-in-out`}
      >
        {componentList.map((component: { name: string; url: string; status: number }) => (
          <li className='group h-fit w-full min-w-64 px-4' key={component.url}>
            <Link
              className={`z-10 flex w-full items-center justify-start gap-2 rounded-md px-3 py-1 ${pathname.startsWith(component.url) ? 'bg-[var(--par-color-bg-surface)] font-semibold ' : ''}`}
              href={component.url + '/dev'}
            >
              <span className='truncate group-hover:underline'>{component.name}</span>

              <span className='flex h-4 w-4 items-center justify-center'>
                {component.status === 1 ? <PencilRuler /> : component.status === 2 ? <Wrench /> : null}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SideBar;
