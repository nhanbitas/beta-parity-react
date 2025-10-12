import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Table, TablePagination, TableColumn } from './index';

describe('Table Component', () => {
  const mockColumns: TableColumn[] = [
    { key: 'id', title: 'ID' },
    { key: 'name', title: 'Name' },
    { key: 'email', title: 'Email' },
  ];

  const mockData = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
  ];

  describe('Rendering', () => {
    it('renders table with data', () => {
      render(<Table data={mockData} columns={mockColumns} />);
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
    });

    it('renders column headers', () => {
      render(<Table data={mockData} columns={mockColumns} />);
      expect(screen.getByText('ID')).toBeInTheDocument();
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
    });

    it('renders with title', () => {
      render(<Table data={mockData} columns={mockColumns} title="User List" />);
      expect(screen.getByText('User List')).toBeInTheDocument();
    });

    it('renders with description', () => {
      render(<Table data={mockData} columns={mockColumns} description="List of users" />);
      expect(screen.getByText('List of users')).toBeInTheDocument();
    });

    it('renders empty state when no data', () => {
      render(<Table data={[]} columns={mockColumns} />);
      expect(screen.getByText('No data')).toBeInTheDocument();
    });

    it('renders custom empty state', () => {
      render(<Table data={[]} columns={mockColumns} emptyState={<div>Custom empty</div>} />);
      expect(screen.getByText('Custom empty')).toBeInTheDocument();
    });

    it('renders row count in footer', () => {
      render(<Table data={mockData} columns={mockColumns} showRowCount />);
      expect(screen.getByText('3 items')).toBeInTheDocument();
    });

    it('hides row count when showRowCount is false', () => {
      render(<Table data={mockData} columns={mockColumns} showRowCount={false} />);
      expect(screen.queryByText('3 items')).not.toBeInTheDocument();
    });

    it('renders custom footer', () => {
      render(<Table data={mockData} columns={mockColumns} footer={<div>Custom footer</div>} />);
      expect(screen.getByText('Custom footer')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<Table data={mockData} columns={mockColumns} className="custom-table" />);
      expect(container.querySelector('.table-container.custom-table')).toBeInTheDocument();
    });
  });

  describe('Selectable', () => {
    it('renders checkbox column when selectable', () => {
      render(<Table data={mockData} columns={mockColumns} selectable />);
      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes.length).toBe(mockData.length + 1);
    });

    it('selects all rows when header checkbox is clicked', async () => {
      const handleSelect = jest.fn();
      render(<Table data={mockData} columns={mockColumns} selectable onSelect={handleSelect} />);

      const headerCheckbox = screen.getAllByRole('checkbox')[0];
      await userEvent.click(headerCheckbox);

      expect(handleSelect).toHaveBeenCalledWith(mockData);
    });

    it('deselects all rows when header checkbox is unchecked', async () => {
      const handleSelect = jest.fn();
      render(<Table data={mockData} columns={mockColumns} selectable onSelect={handleSelect} />);

      const headerCheckbox = screen.getAllByRole('checkbox')[0];
      await userEvent.click(headerCheckbox);
      await userEvent.click(headerCheckbox);

      expect(handleSelect).toHaveBeenLastCalledWith([]);
    });

    it('selects individual row', async () => {
      const handleSelect = jest.fn();
      render(<Table data={mockData} columns={mockColumns} selectable onSelect={handleSelect} />);

      const rowCheckbox = screen.getAllByRole('checkbox')[1];
      await userEvent.click(rowCheckbox);

      expect(handleSelect).toHaveBeenCalledWith([mockData[0]]);
    });

    it('shows batch actions when rows are selected', async () => {
      render(
        <Table
          data={mockData}
          columns={mockColumns}
          selectable
          batchActions={<button>Delete selected</button>}
        />
      );

      const rowCheckbox = screen.getAllByRole('checkbox')[1];
      await userEvent.click(rowCheckbox);

      expect(screen.getByText('1 selected')).toBeInTheDocument();
      expect(screen.getByText('Delete selected')).toBeInTheDocument();
    });

    it('shows custom count description', async () => {
      render(
        <Table
          data={mockData}
          columns={mockColumns}
          selectable
          countDescription="items chosen"
          batchActions={<button>Delete</button>}
        />
      );

      const rowCheckbox = screen.getAllByRole('checkbox')[1];
      await userEvent.click(rowCheckbox);

      expect(screen.getByText(/1.*items chosen/)).toBeInTheDocument();
    });

    it('selects row on row click when selectOnRowClick is true', async () => {
      const handleSelect = jest.fn();
      render(<Table data={mockData} columns={mockColumns} selectable selectOnRowClick onSelect={handleSelect} />);

      await userEvent.click(screen.getByText('John Doe'));

      expect(handleSelect).toHaveBeenCalled();
    });
  });

  describe('Sorting', () => {
    const sortableColumns: TableColumn[] = [
      { key: 'id', title: 'ID', sortable: true },
      { key: 'name', title: 'Name', sortable: true },
      { key: 'email', title: 'Email' },
    ];

    it('renders sort icons for sortable columns', () => {
      const { container } = render(<Table data={mockData} columns={sortableColumns} />);
      const sortIcons = container.querySelectorAll('.table-sort-icon');
      expect(sortIcons.length).toBe(2);
    });

    it('calls onSort when sortable column is clicked', async () => {
      const handleSort = jest.fn();
      render(<Table data={mockData} columns={sortableColumns} onSort={handleSort} />);

      await userEvent.click(screen.getByText('ID'));

      expect(handleSort).toHaveBeenCalledWith('id', 'asc');
    });

    it('toggles sort direction on repeated clicks', async () => {
      const handleSort = jest.fn();
      render(<Table data={mockData} columns={sortableColumns} onSort={handleSort} sortKey="id" sortDirection="asc" />);

      await userEvent.click(screen.getByText('ID'));

      expect(handleSort).toHaveBeenCalledWith('id', 'desc');
    });

    it('shows sort indicator for current sorted column', () => {
      const { container } = render(
        <Table data={mockData} columns={sortableColumns} sortKey="id" sortDirection="asc" />
      );

      const sortIcon = container.querySelector('[data-key="id"] .table-sort-icon');
      expect(sortIcon).toHaveStyle({ visibility: 'visible' });
    });
  });

  describe('Custom render', () => {
    const columnsWithRender: TableColumn[] = [
      { key: 'id', title: 'ID' },
      {
        key: 'name',
        title: 'Name',
        render: (value) => <strong>{value}</strong>,
      },
    ];

    it('uses custom render function', () => {
      render(<Table data={mockData} columns={columnsWithRender} />);
      const strongElements = screen.getAllByText(/John Doe|Jane Smith|Bob Johnson/).filter((el) => el.tagName === 'STRONG');
      expect(strongElements.length).toBe(3);
    });

    it('passes value, record, and index to render function', () => {
      const renderFn = jest.fn((value) => value);
      const columnsWithMock: TableColumn[] = [
        { key: 'name', title: 'Name', render: renderFn },
      ];

      render(<Table data={mockData} columns={columnsWithMock} />);

      expect(renderFn).toHaveBeenCalledWith('John Doe', mockData[0], 0);
      expect(renderFn).toHaveBeenCalledWith('Jane Smith', mockData[1], 1);
    });
  });

  describe('Row interactions', () => {
    it('calls onRowClick when row is clicked', async () => {
      const handleRowClick = jest.fn();
      render(<Table data={mockData} columns={mockColumns} onRowClick={handleRowClick} />);

      await userEvent.click(screen.getByText('John Doe'));

      expect(handleRowClick).toHaveBeenCalledWith(mockData[0], mockData[0].id);
    });

    it('calls both onRowClick and selection when selectable with selectOnRowClick', async () => {
      const handleRowClick = jest.fn();
      const handleSelect = jest.fn();
      render(
        <Table
          data={mockData}
          columns={mockColumns}
          selectable
          selectOnRowClick
          onRowClick={handleRowClick}
          onSelect={handleSelect}
        />
      );

      await userEvent.click(screen.getByText('John Doe'));

      expect(handleRowClick).toHaveBeenCalled();
      expect(handleSelect).toHaveBeenCalled();
    });
  });

  describe('Actions', () => {
    it('renders actions section', () => {
      render(<Table data={mockData} columns={mockColumns} actions={<button>Add user</button>} />);
      expect(screen.getByText('Add user')).toBeInTheDocument();
    });

    it('shows batch actions when rows are selected and hides regular actions', async () => {
      render(
        <Table
          data={mockData}
          columns={mockColumns}
          selectable
          actions={<button>Add user</button>}
          batchActions={<button>Delete</button>}
        />
      );

      const checkbox = screen.getAllByRole('checkbox')[1];
      await userEvent.click(checkbox);

      expect(screen.getByText('Delete')).toBeInTheDocument();
    });
  });

  describe('Color variants', () => {
    it('renders neutral color by default', () => {
      const { container } = render(<Table data={mockData} columns={mockColumns} />);
      expect(container.querySelector('.par-table-neutral')).toBeInTheDocument();
    });

    it('renders accent color', () => {
      const { container } = render(<Table data={mockData} columns={mockColumns} color="accent" />);
      expect(container.querySelector('.par-table-accent')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('forwards ref correctly', () => {
      const ref = jest.fn();
      render(<Table data={mockData} columns={mockColumns} ref={ref} />);
      expect(ref).toHaveBeenCalled();
    });
  });
});

describe('TablePagination Component', () => {
  describe('Rendering', () => {
    it('renders pagination buttons', () => {
      render(<TablePagination currentPage={1} pageSize={10} total={50} onChange={jest.fn()} />);
      expect(screen.getByLabelText('Previous page')).toBeInTheDocument();
      expect(screen.getByLabelText('Next page')).toBeInTheDocument();
    });

    it('renders page size selector when onPageSizeChange is provided', () => {
      render(
        <TablePagination
          currentPage={1}
          pageSize={10}
          total={50}
          onChange={jest.fn()}
          onPageSizeChange={jest.fn()}
        />
      );
      expect(screen.getByText('Rows per page:')).toBeInTheDocument();
    });

    it('renders pagination info', () => {
      render(
        <TablePagination
          currentPage={1}
          pageSize={10}
          total={50}
          onChange={jest.fn()}
          onPageSizeChange={jest.fn()}
        />
      );
      expect(screen.getByText('1-10 of 50')).toBeInTheDocument();
    });

    it('calculates correct range for last page', () => {
      render(
        <TablePagination
          currentPage={5}
          pageSize={10}
          total={50}
          onChange={jest.fn()}
          onPageSizeChange={jest.fn()}
        />
      );
      expect(screen.getByText('41-50 of 50')).toBeInTheDocument();
    });
  });

  describe('Navigation', () => {
    it('disables previous button on first page', () => {
      render(<TablePagination currentPage={1} pageSize={10} total={50} onChange={jest.fn()} />);
      expect(screen.getByLabelText('Previous page')).toBeDisabled();
    });

    it('disables next button on last page', () => {
      render(<TablePagination currentPage={5} pageSize={10} total={50} onChange={jest.fn()} />);
      expect(screen.getByLabelText('Next page')).toBeDisabled();
    });

    it('calls onChange when previous button is clicked', async () => {
      const handleChange = jest.fn();
      render(<TablePagination currentPage={2} pageSize={10} total={50} onChange={handleChange} />);

      await userEvent.click(screen.getByLabelText('Previous page'));
      expect(handleChange).toHaveBeenCalledWith(1);
    });

    it('calls onChange when next button is clicked', async () => {
      const handleChange = jest.fn();
      render(<TablePagination currentPage={1} pageSize={10} total={50} onChange={handleChange} />);

      await userEvent.click(screen.getByLabelText('Next page'));
      expect(handleChange).toHaveBeenCalledWith(2);
    });
  });

  describe('Page size', () => {
    it('calls onPageSizeChange when page size is changed', async () => {
      const handlePageSizeChange = jest.fn();
      const handleChange = jest.fn();
      render(
        <TablePagination
          currentPage={2}
          pageSize={10}
          total={100}
          onChange={handleChange}
          onPageSizeChange={handlePageSizeChange}
        />
      );

      const select = screen.getByRole('combobox');
      await userEvent.selectOptions(select, '20');

      expect(handlePageSizeChange).toHaveBeenCalledWith(20);
      expect(handleChange).toHaveBeenCalledWith(1);
    });

    it('uses custom pageSizeOptions', () => {
      const { container } = render(
        <TablePagination
          currentPage={1}
          pageSize={25}
          total={100}
          onChange={jest.fn()}
          onPageSizeChange={jest.fn()}
          pageSizeOptions={[25, 50, 100]}
        />
      );

      const options = container.querySelectorAll('option');
      expect(options.length).toBe(3);
      expect(options[0]).toHaveValue('25');
      expect(options[1]).toHaveValue('50');
      expect(options[2]).toHaveValue('100');
    });
  });
});
