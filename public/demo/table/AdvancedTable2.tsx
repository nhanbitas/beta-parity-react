'use client';
import React, { useState } from 'react';
import { Table, TableColumn, TablePagination } from 'beta-parity-react/ui/Table';
import { SearchInput } from 'beta-parity-react/ui/SearchInput';
import { Button } from 'beta-parity-react/ui/Button';
import { Download, Edit3, PenLine, Trash2 } from 'lucide-react';
import { Pagination } from 'beta-parity-react/ui/Pagination';
import { Badge } from 'beta-parity-react/ui/Badge';
import { AvatarGroup, Avatar } from 'beta-parity-react/ui/Avatar';

const generateProjectData = (count: number) => {
  const projectNames = [
    'Design System',
    'Mobile App',
    'Landing page',
    'Game UI',
    'Dashboard',
    'CRM System',
    'E-commerce',
    'Analytics'
  ];
  const projectManagers = [
    'Kristin Watson',
    'Kathryn Murphy',
    'Bessie Cooper',
    'Cody Fisher',
    'Jenny Wilson',
    'Robert Fox'
  ];
  const statuses = ['On hold', 'On track', 'At risk'];
  const teamAvatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&h=300&fit=crop'
  ];
  return Array.from({ length: count }).map((_, index) => {
    const projectNameIndex = index % projectNames.length;
    const pmIndex = (index * 3) % projectManagers.length;
    const statusIndex = (index * 7) % statuses.length;
    const month = (index * 2) % 12;
    const day = ((index * 5) % 28) + 1;
    const deadline = new Date(2025, month, day).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
    const teamSize = (index % 3) + 2;
    const team = Array.from({ length: teamSize }).map((_, i) => {
      const avatarIndex = (index + i * 3) % teamAvatars.length;
      return teamAvatars[avatarIndex];
    });
    const additionalMembers = index % 3 === 0 ? ((index * 3) % 8) + 1 : undefined;
    return {
      id: index + 1,
      projectName: projectNames[projectNameIndex],
      pm: projectManagers[pmIndex],
      deadline,
      status: statuses[statusIndex],
      team,
      ...(additionalMembers && { additionalMembers })
    };
  });
};

export const AdvancedTable2 = () => {
  const allData = React.useMemo(() => generateProjectData(500), []);
  const [data, setData] = useState(allData);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortKey, setSortKey] = useState<string>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const columns: TableColumn[] = [
    { key: 'projectName', title: 'PROJECT NAME', sortable: true, resizable: true },
    { key: 'pm', title: 'PM', sortable: true, resizable: true },
    { key: 'deadline', title: 'DEADLINE', sortable: true, resizable: true },
    {
      key: 'status',
      title: 'STATUS',
      sortable: true,
      resizable: true,
      render: (value) => {
        let color = 'gray';
        if (value === 'On track') color = 'green';
        if (value === 'At risk') color = 'red';
        if (value === 'On hold') color = 'gray';
        return <Badge dot key={color} color={color as any} variant='glass' label={value} />;
      }
    },
    {
      key: 'team',
      title: 'TEAM',
      sortable: false,
      resizable: true,
      render: (value, row) => {
        return (
          <AvatarGroup max={2}>
            {value.map((avatarUrl: string, index: number) => (
              <Avatar key={index} src={avatarUrl} alt='Team member' />
            ))}
          </AvatarGroup>
        );
      }
    }
  ];

  const handleClearSelection = () => setSelectedRows([]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    setCurrentPage(1);
    if (!event.target.value.trim()) {
      setData(allData);
      return;
    }
    const filtered = allData.filter((item) =>
      Object.values(item).some((val) => {
        if (typeof val === 'string') {
          return val.toLowerCase().includes(event.target.value.toLowerCase());
        }
        return false;
      })
    );
    setData(filtered);
  };

  const handleSort = (key: string, direction: 'asc' | 'desc') => {
    setSortKey(key);
    setSortDirection(direction);
    const sortedData = [...data].sort((a, b) => {
      const valueA = a[key as keyof typeof a];
      const valueB = b[key as keyof typeof b];
      if (Array.isArray(valueA) || Array.isArray(valueB)) return 0;
      if (valueA === valueB) return 0;
      if (valueA == null) return 1;
      if (valueB == null) return -1;
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return direction === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      }
      return direction === 'asc' ? (valueA < valueB ? -1 : 1) : valueA > valueB ? -1 : 1;
    });
    setData(sortedData);
  };

  const handleSelect = (selectedRows: any[]) => {
    setSelectedRows(selectedRows);
    console.log('Selected rows:', selectedRows);
  };

  const paginatedData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleBatchAction = (text: string) => {
    const result = confirm(`Are you sure you want to ${text} the selected projects?`);
    if (result) {
      handleClearSelection();
      alert(`Selected projects ${text} successfully!`);
    } else {
      alert(`Cancelled ${text} action.`);
    }
  };

  return (
    <div className='demo-section not-prose'>
      <Table
        color='accent'
        data={paginatedData}
        columns={columns}
        title='Project Management'
        description='Track and manage all projects'
        selectable
        selectOnRowClick={false}
        freezeColumns={2}
        maxHeight={800}
        selectedRows={selectedRows}
        onSelect={handleSelect}
        onSort={handleSort}
        sortKey={sortKey}
        sortDirection={sortDirection}
        actions={
          <div className='flex w-full items-center justify-between'>
            <div className='w-1/4'>
              <SearchInput
                value={searchValue}
                onChange={handleSearch}
                placeholder='Search projects...'
                theme='alternative'
              />
            </div>
            <div className='flex gap-2'>
              <Button kind='glass' iconOnly color='accent'>
                <Download />
              </Button>
              <Button kind='glass' iconOnly color='accent'>
                <PenLine />
              </Button>
              <Button color='accent'>New Project</Button>
            </div>
          </div>
        }
        batchActions={
          <div className='flex w-fit items-center justify-between gap-2'>
            <Button onClick={() => handleBatchAction('edit')} kind='ghost' color='accent'>
              Edit <Edit3 className='ml-1' />
            </Button>
            <Button onClick={() => handleBatchAction('export')} kind='ghost' color='accent'>
              Export <Download className='ml-1' />
            </Button>
            <Button onClick={() => handleBatchAction('delete')} kind='ghost' color='accent'>
              Delete <Trash2 className='ml-1' />
            </Button>
            <div className='h-6 w-px bg-[var(--par-color-text-button-ghost-neutral-enabled)]'></div>
            <Button onClick={() => handleClearSelection()} kind='ghost' color='accent'>
              Cancel
            </Button>
          </div>
        }
        footer={
          <div className='flex w-full items-center justify-between'>
            <TablePagination
              currentPage={currentPage}
              pageSize={pageSize}
              total={data.length}
              pageSizeOptions={[5, 10, 20, 50]}
              onPageSizeChange={setPageSize}
            />
            <Pagination
              color='accent'
              page={currentPage}
              totalPage={Math.ceil(data.length / pageSize)}
              onPageChange={setCurrentPage}
            />
          </div>
        }
        emptyState={undefined}
      />
    </div>
  );
};
