import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Pagination, PaginationItem, ControlButton } from '../index';

// Mock Lucide icons
jest.mock('lucide-react', () => ({
  ChevronLeft: () => <div data-testid='chevron-left' />,
  ChevronRight: () => <div data-testid='chevron-right' />,
  ChevronsLeft: () => <div data-testid='chevrons-left' />,
  ChevronsRight: () => <div data-testid='chevrons-right' />
}));

// Mock Menu component
jest.mock('../../Menu', () => ({
  Menu: ({ children, isOpen, ...props }: any) =>
    isOpen ? (
      <div data-testid='menu' {...props}>
        {children}
      </div>
    ) : null
}));

describe('Pagination Component', () => {
  // Test basic rendering
  test('renders pagination with correct number of pages', () => {
    render(<Pagination page={1} totalPage={5} />);

    // Should find 5 page numbers
    const pageNumbers = screen
      .getAllByRole('button')
      .filter((btn) => btn.textContent && /^[0-9]+$/.test(btn.textContent));
    expect(pageNumbers).toHaveLength(5);

    // Should find 4 control buttons
    expect(screen.getByTestId('chevrons-left')).toBeInTheDocument();
    expect(screen.getByTestId('chevron-left')).toBeInTheDocument();
    expect(screen.getByTestId('chevron-right')).toBeInTheDocument();
    expect(screen.getByTestId('chevrons-right')).toBeInTheDocument();
  });

  // Test current page is active
  test('marks current page as active', () => {
    render(<Pagination page={3} totalPage={5} />);

    // Page 3 should be active
    const page3 = screen.getByText('3').closest('button');
    expect(page3).toHaveClass('active');
    expect(page3).toHaveAttribute('aria-current', 'page');

    // Other pages should not be active
    const page1 = screen.getByText('1').closest('button');
    expect(page1).not.toHaveClass('active');
    expect(page1).not.toHaveAttribute('aria-current');
  });

  // Test page change event
  test('calls onPageChange when page is clicked', () => {
    const handlePageChange = jest.fn();
    render(<Pagination page={1} totalPage={5} onPageChange={handlePageChange} />);

    // Click on page 3
    fireEvent.click(screen.getByText('3'));

    expect(handlePageChange).toHaveBeenCalledWith(3);
  });

  // Test navigation controls
  test('navigates using control buttons', () => {
    const handlePageChange = jest.fn();
    render(<Pagination page={3} totalPage={5} onPageChange={handlePageChange} />);

    // Find control buttons
    const firstBtn = screen.getByTestId('chevrons-left').closest('button');
    const prevBtn = screen.getByTestId('chevron-left').closest('button');
    const nextBtn = screen.getByTestId('chevron-right').closest('button');
    const lastBtn = screen.getByTestId('chevrons-right').closest('button');

    // Click prev button
    fireEvent.click(prevBtn as HTMLButtonElement);
    expect(handlePageChange).toHaveBeenCalledWith(2);

    // Click next button
    fireEvent.click(nextBtn as HTMLButtonElement);
    expect(handlePageChange).toHaveBeenCalledWith(4);

    // Click first button
    fireEvent.click(firstBtn as HTMLButtonElement);
    expect(handlePageChange).toHaveBeenCalledWith(1);

    // Click last button
    fireEvent.click(lastBtn as HTMLButtonElement);
    expect(handlePageChange).toHaveBeenCalledWith(5);
  });

  // Test disabled control buttons
  test('disables control buttons when on first or last page', () => {
    // On first page
    const { rerender } = render(<Pagination page={1} totalPage={5} />);

    // First and prev buttons should be disabled
    const firstBtn = screen.getByTestId('chevrons-left').closest('button');
    const prevBtn = screen.getByTestId('chevron-left').closest('button');
    expect(firstBtn).toBeDisabled();
    expect(prevBtn).toBeDisabled();

    // Next and last buttons should be enabled
    const nextBtn = screen.getByTestId('chevron-right').closest('button');
    const lastBtn = screen.getByTestId('chevrons-right').closest('button');
    expect(nextBtn).not.toBeDisabled();
    expect(lastBtn).not.toBeDisabled();

    // On last page
    rerender(<Pagination page={5} totalPage={5} />);

    // First and prev buttons should be enabled
    expect(firstBtn).not.toBeDisabled();
    expect(prevBtn).not.toBeDisabled();

    // Next and last buttons should be disabled
    expect(nextBtn).toBeDisabled();
    expect(lastBtn).toBeDisabled();
  });

  // Test keyboard navigation
  test('supports keyboard navigation with arrow keys', () => {
    const handlePageChange = jest.fn();
    render(<Pagination page={3} totalPage={5} onPageChange={handlePageChange} />);

    // Get the navigation element (ul)
    const navElement = screen.getByRole('navigation');

    // Press left arrow key
    fireEvent.keyDown(navElement, { key: 'ArrowLeft' });
    expect(handlePageChange).toHaveBeenCalledWith(2);

    // Press right arrow key
    fireEvent.keyDown(navElement, { key: 'ArrowRight' });
    expect(handlePageChange).toHaveBeenCalledWith(4);
  });

  // Test only control mode
  test('renders only control buttons in onlyControl mode', () => {
    render(<Pagination page={3} totalPage={5} onlyControl />);

    // Should find 4 control buttons
    expect(screen.getByTestId('chevrons-left')).toBeInTheDocument();
    expect(screen.getByTestId('chevron-left')).toBeInTheDocument();
    expect(screen.getByTestId('chevron-right')).toBeInTheDocument();
    expect(screen.getByTestId('chevrons-right')).toBeInTheDocument();

    // Should not find any page numbers
    const pageNumbers = screen
      .queryAllByRole('button')
      .filter((btn) => btn.textContent && /^[0-9]+$/.test(btn.textContent));
    expect(pageNumbers).toHaveLength(0);
  });

  // Test with custom control configuration
  test('renders custom control configuration', () => {
    const controlConfig = {
      first: { isActive: false },
      last: { isActive: false }
    };

    render(<Pagination page={3} totalPage={5} controlConfig={controlConfig} />);

    // First and last buttons should not be present
    expect(screen.queryByTestId('chevrons-left')).not.toBeInTheDocument();
    expect(screen.queryByTestId('chevrons-right')).not.toBeInTheDocument();

    // Prev and next buttons should be present
    expect(screen.getByTestId('chevron-left')).toBeInTheDocument();
    expect(screen.getByTestId('chevron-right')).toBeInTheDocument();
  });

  // Test with siblings
  test('renders with different numbers of siblings', () => {
    // With 0 siblings
    const { rerender } = render(<Pagination page={5} totalPage={9} siblings={0} />);

    // Should show active page and neighbors without ellipsis
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('9')).toBeInTheDocument();

    // With 1 sibling
    rerender(<Pagination page={5} totalPage={9} siblings={1} />);

    // Should show active page and neighbors without ellipsis
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText('9')).toBeInTheDocument();
  });

  // Test collapsed pagination with ellipsis for large number of pages
  test('collapses pagination with ellipsis for large number of pages', () => {
    render(<Pagination page={5} totalPage={20} siblings={1} />);

    // Should show first, last and around current page
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();

    // Should have ellipsis buttons
    const ellipsisButtons = screen.getAllByText('...');
    expect(ellipsisButtons.length).toBeGreaterThan(0);
  });

  // Test menu for collapsed pages
  test('shows menu when clicking ellipsis', () => {
    render(<Pagination page={10} totalPage={20} siblings={1} />);

    // Find ellipsis buttons
    const ellipsisButtons = screen.getAllByText('...');

    // Click on first ellipsis to show menu
    fireEvent.click(ellipsisButtons[0]);

    // Menu should be visible
    expect(screen.getByTestId('menu')).toBeInTheDocument();
  });

  // Test component prop for custom rendering
  test('uses custom component for pagination items', () => {
    const LinkComponent = ({ children, href, ...props }: any) => (
      <a href={href} data-testid='custom-link' {...props}>
        {children}
      </a>
    );

    render(<Pagination page={1} totalPage={5} component={LinkComponent} to={(page) => `/page/${page}`} />);

    // Should use custom link component
    const links = screen.getAllByTestId('custom-link');
    expect(links.length).toBeGreaterThan(0);

    // Should have correct hrefs
    expect(links[0]).toHaveAttribute('href', '/page/1');
  });

  // Test bordered style
  test('applies bordered style', () => {
    render(<Pagination page={1} totalPage={5} bordered />);

    const navigation = screen.getByRole('navigation');
    expect(navigation).toHaveClass('bordered');
  });
});

describe('PaginationItem Component', () => {
  test('renders with correct content', () => {
    render(<PaginationItem page={5} />);

    const item = screen.getByText('5');
    expect(item).toBeInTheDocument();
  });

  test('applies active class when active', () => {
    render(<PaginationItem page={5} active />);

    const item = screen.getByText('5').closest('button');
    expect(item).toHaveClass('active');
    expect(item).toHaveAttribute('aria-current', 'page');
  });

  test('renders as menu item when isMenuItem is true', () => {
    render(<PaginationItem page={5} isMenuItem />);

    const item = screen.getByText('5').closest('button');
    expect(item).toHaveAttribute('role', 'menuitem');
  });
});

describe('ControlButton Component', () => {
  test('renders with children', () => {
    render(<ControlButton>Test Button</ControlButton>);

    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  test('applies disabled attribute', () => {
    render(<ControlButton disabled>Test Button</ControlButton>);

    const button = screen.getByText('Test Button');
    expect(button).toBeDisabled();
  });

  test('uses custom component when not disabled', () => {
    const LinkComponent = ({ children, ...props }: any) => (
      <a data-testid='custom-link' {...props}>
        {children}
      </a>
    );

    render(<ControlButton component={LinkComponent}>Test Button</ControlButton>);

    expect(screen.getByTestId('custom-link')).toBeInTheDocument();
  });

  test('falls back to button when disabled, even with custom component', () => {
    const LinkComponent = ({ children, ...props }: any) => (
      <a data-testid='custom-link' {...props}>
        {children}
      </a>
    );

    render(
      <ControlButton component={LinkComponent} disabled>
        Test Button
      </ControlButton>
    );

    expect(screen.queryByTestId('custom-link')).not.toBeInTheDocument();
    const button = screen.getByText('Test Button');
    expect(button.tagName).toBe('BUTTON');
  });
});
