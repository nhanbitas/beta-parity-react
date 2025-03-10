'use client';

import React from 'react';
import { components } from '../../../app/data';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Badge } from 'beta-parity-react/ui/Badge';
import { SearchInput } from 'beta-parity-react/ui/SearchInput';
import { Select } from 'beta-parity-react/ui/Select';

type Props = {};

const statusOptions = {
  1: 'Next',
  2: 'Current',
  3: 'Post-queue'
};

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
      className={`side-bar sticky left-0 top-0 z-[9999] h-screen border-r border-gray-200 ${isOpen ? 'w-64' : 'w-0'} transform duration-300 ease-in-out`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`absolute right-0 ${isOpen ? 'translate-x-0' : 'translate-x-full'} top-2 z-10 h-8 w-12 cursor-pointer p-2 px-4 transition-transform duration-300 ease-in-out hover:text-[var(--text-hover)] active:text-[var(--text-active)]`}
      >
        <Menu />
      </button>

      <div
        className={`h-[3rem] overflow-hidden ${isOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 ease-in-out`}
      >
        <Link className='text-heading-02 block w-fit min-w-64 px-4 py-3 hover:underline' href='/'>
          Parity React
        </Link>
      </div>

      <div
        className={`h-[7rem] border-b border-gray-200 ${isOpen ? 'overflow-visible opacity-100' : 'overflow-hidden opacity-0'} transition-opacity duration-500 ease-in-out`}
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
        className={`h-[calc(100vh-10rem)] overflow-hidden overflow-y-auto pb-20 scrollbar-none ${isOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 ease-in-out`}
      >
        {componentList.map((component: { name: string; url: string; status: number }) => (
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
                {statusOptions[component.status as keyof typeof statusOptions]}
              </Badge>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SideBar;
