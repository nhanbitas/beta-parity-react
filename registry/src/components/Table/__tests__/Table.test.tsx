import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Table, TablePagination } from '../index';

// Mock the Button and Checkbox components
jest.mock('../../Button', () => ({
  Button: ({ children, onClick, disabled, ...props }: any) => (
    <button onClick={onClick} disabled={disabled} data-testid={props['aria-label'] || 'button'} {...props}>
      {children}
    </button>
  )
}));

jest.mock('../../Checkbox', () => ({
  Checkbox: ({ checked, indeterminate, onChange }: any) => (
    <input
      type='checkbox'
      checked={checked}
      data-indeterminate={indeterminate}
      onChange={(e) => onChange && onChange(e)}
      data-testid='checkbox'
    />
  )
}));

// Mock Lucide icons
jest.mock('lucide-react', () => ({
  ChevronDown: () => <div data-testid='chevron-down' />,
  ChevronUp: () => <div data-testid='chevron-up' />,
  ChevronLeft: () => <div data-testid='chevron-left' />,
  ChevronRight: () => <div data-testid='chevron-right' />
}));

// Test data
const mockColumns = [
  { key: 'name', title: 'Name', sortable: true, frozen: true },
  { key: 'age', title: 'Age', sortable: true },
  { key: 'address', title: 'Address' },
  { key: 'actions', title: 'Actions', render: () => <button>Edit</button> }
];

const mockData = [
  { name: 'John Doe', age: 32, address: '123 Main St' },
  { name: 'Jane Smith', age: 27, address: '456 Oak Ave' },
  { name: 'Bob Johnson', age: 45, address: '789 Pine Rd' }
];

describe('Table Component', () => {
  // Test basic rendering
  test('renders table with data and columns', () => {
    render(<Table data={mockData} columns={mockColumns} />);

    // Check headers
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
    expect(screen.getByText('Address')).toBeInTheDocument();

    // Check data cells
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('32')).toBeInTheDocument();
    expect(screen.getByText('123 Main St')).toBeInTheDocument();

    // Check rendered content
    const editButtons = screen.getAllByRole('button', { name: /edit/i });
    expect(editButtons).toHaveLength(mockData.length);
  });

  // Test empty state
  test('renders empty state when no data is provided', () => {
    render(<Table data={[]} columns={mockColumns} />);

    expect(screen.getByText('No data to display')).toBeInTheDocument();
  });

  // Test custom empty state
  test('renders custom empty state', () => {
    const customEmptyState = <div>Custom empty state</div>;
    render(<Table data={[]} columns={mockColumns} emptyState={customEmptyState} />);

    expect(screen.getByText('Custom empty state')).toBeInTheDocument();
  });

  // Test title and description
  test('renders title and description', () => {
    const title = 'User Table';
    const description = 'List of all users';
    render(<Table data={mockData} columns={mockColumns} title={title} description={description} />);

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
  });

  // Test actions
  test('renders action buttons', () => {
    const actions = <button data-testid='add-button'>Add User</button>;
    render(<Table data={mockData} columns={mockColumns} actions={actions} />);

    expect(screen.getByTestId('add-button')).toBeInTheDocument();
  });

  // Test row selection
  test('allows row selection when selectable is true', () => {
    const handleSelect = jest.fn();
    render(<Table data={mockData} columns={mockColumns} selectable onSelect={handleSelect} />);

    // Check that checkboxes are rendered
    const checkboxes = screen.getAllByTestId('checkbox');
    expect(checkboxes).toHaveLength(mockData.length + 1); // +1 for header checkbox

    // Select a row
    fireEvent.click(checkboxes[1]); // First row checkbox

    expect(handleSelect).toHaveBeenCalledWith([mockData[0]]);
  });

  // Test select all rows
  test('selects all rows when header checkbox is clicked', () => {
    const handleSelect = jest.fn();
    render(<Table data={mockData} columns={mockColumns} selectable onSelect={handleSelect} />);

    const checkboxes = screen.getAllByTestId('checkbox');

    // Click the header checkbox
    fireEvent.click(checkboxes[0]);

    // All rows should be selected
    expect(handleSelect).toHaveBeenCalledWith(mockData);
  });

  // Test row click for selection
  test('selects row on click when selectOnRowClick is true', () => {
    const handleSelect = jest.fn();
    render(<Table data={mockData} columns={mockColumns} selectable selectOnRowClick onSelect={handleSelect} />);

    const firstRow = screen.getByText('John Doe').closest('tr');
    if (firstRow) {
      fireEvent.click(firstRow);
      expect(handleSelect).toHaveBeenCalledWith([mockData[0]]);
    }
  });

  // Test custom row click handler
  test('calls onRowClick when row is clicked', () => {
    const handleRowClick = jest.fn();
    render(<Table data={mockData} columns={mockColumns} onRowClick={handleRowClick} />);

    const firstRow = screen.getByText('John Doe').closest('tr');
    if (firstRow) {
      fireEvent.click(firstRow);
      expect(handleRowClick).toHaveBeenCalledWith(mockData[0], 0);
    }
  });

  // Test sorting
  test('calls onSort when sortable column header is clicked', () => {
    const handleSort = jest.fn();
    render(<Table data={mockData} columns={mockColumns} onSort={handleSort} />);

    // Click on the Name column which is sortable
    const nameHeader = screen.getByText('Name').closest('th');
    if (nameHeader) {
      fireEvent.mouseDown(nameHeader);
      expect(handleSort).toHaveBeenCalledWith('name', 'asc');
    }
  });

  // Test sort direction toggle
  test('toggles sort direction when clicking the same column', () => {
    const handleSort = jest.fn();
    render(<Table data={mockData} columns={mockColumns} onSort={handleSort} sortKey='name' sortDirection='asc' />);

    // Click on the Name column which is already sorted asc
    const nameHeader = screen.getByText('Name').closest('th');
    if (nameHeader) {
      fireEvent.mouseDown(nameHeader);
      expect(handleSort).toHaveBeenCalledWith('name', 'desc');
    }
  });

  // Test batch actions
  test('renders batch actions when rows are selected', () => {
    const batchActions = <button data-testid='delete-button'>Delete Selected</button>;
    render(
      <Table
        data={mockData}
        columns={mockColumns}
        selectable
        batchActions={batchActions}
        defaultSelectedRows={[0, 1]}
      />
    );

    expect(screen.getByText('2 selected')).toBeInTheDocument();
    expect(screen.getByTestId('delete-button')).toBeInTheDocument();
  });

  // Test show row count
  test('shows row count in footer', () => {
    render(<Table data={mockData} columns={mockColumns} showRowCount />);

    expect(screen.getByText(`${mockData.length} items`)).toBeInTheDocument();
  });

  // Test max height
  test('applies maxHeight style', () => {
    render(<Table data={mockData} columns={mockColumns} maxHeight={400} />);

    const tableWrapper = screen.getByRole('table').closest('.table-wrapper');
    if (tableWrapper) {
      expect(tableWrapper).toHaveStyle({ '--table-max-height': '400px' });
    }
  });

  // Test footer
  test('renders custom footer', () => {
    const footer = <div data-testid='custom-footer'>Custom Footer</div>;
    render(<Table data={mockData} columns={mockColumns} footer={footer} />);

    expect(screen.getByTestId('custom-footer')).toBeInTheDocument();
  });
});

describe('TablePagination Component', () => {
  test('renders pagination with correct info', () => {
    render(<TablePagination currentPage={2} pageSize={10} total={45} onChange={jest.fn()} />);

    // Check info text (11-20 of 45)
    expect(screen.getByText('11-20 of 45')).toBeInTheDocument();

    // Check navigation buttons
    expect(screen.getByTestId('Previous page')).not.toBeDisabled();
    expect(screen.getByTestId('Next page')).not.toBeDisabled();
  });

  test('disables previous button on first page', () => {
    render(<TablePagination currentPage={1} pageSize={10} total={45} onChange={jest.fn()} />);

    expect(screen.getByTestId('Previous page')).toBeDisabled();
    expect(screen.getByTestId('Next page')).not.toBeDisabled();
  });

  test('disables next button on last page', () => {
    render(<TablePagination currentPage={5} pageSize={10} total={45} onChange={jest.fn()} />);

    expect(screen.getByTestId('Previous page')).not.toBeDisabled();
    expect(screen.getByTestId('Next page')).toBeDisabled();
  });

  test('calls onChange when navigation buttons are clicked', () => {
    const handleChange = jest.fn();
    render(<TablePagination currentPage={2} pageSize={10} total={45} onChange={handleChange} />);

    // Click previous button
    fireEvent.click(screen.getByTestId('Previous page'));
    expect(handleChange).toHaveBeenCalledWith(1);

    // Click next button
    fireEvent.click(screen.getByTestId('Next page'));
    expect(handleChange).toHaveBeenCalledWith(3);
  });

  test('renders page size options and calls onPageSizeChange', () => {
    const handlePageSizeChange = jest.fn();
    render(
      <TablePagination
        currentPage={1}
        pageSize={10}
        total={100}
        onChange={jest.fn()}
        onPageSizeChange={handlePageSizeChange}
        pageSizeOptions={[5, 10, 25]}
      />
    );

    // Check if select is rendered
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(select).toHaveValue('10');

    // Change page size
    fireEvent.change(select, { target: { value: '25' } });
    expect(handlePageSizeChange).toHaveBeenCalledWith(25);
  });
});
