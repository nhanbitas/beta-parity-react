import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Breadcrumb, BreadcrumbItem } from '../index';

// Mock InlineLink component to simplify testing
jest.mock('../../InlineLink', () => ({
  InlineLink: ({ children, href, disabled, ...props }: any) => (
    <a href={disabled ? undefined : href} data-disabled={disabled || undefined} {...props}>
      {children}
    </a>
  )
}));

// Mock Menu component
jest.mock('../../Menu', () => ({
  Menu: ({ children, isOpen, anchor, ...props }: any) =>
    isOpen ? (
      <div data-testid='menu' {...props}>
        {children}
      </div>
    ) : null
}));

describe('Breadcrumb Component', () => {
  // Test basic rendering with children
  test('renders breadcrumb with children', () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem href='/home'>Home</BreadcrumbItem>
        <BreadcrumbItem href='/products'>Products</BreadcrumbItem>
        <BreadcrumbItem href='/products/category'>Category</BreadcrumbItem>
        <BreadcrumbItem>Current Page</BreadcrumbItem>
      </Breadcrumb>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Current Page')).toBeInTheDocument();
  });

  // Test rendering with breadcrumbList prop
  test('renders breadcrumb with breadcrumbList prop', () => {
    const breadcrumbList = [
      { href: '/home', children: 'Home' },
      { href: '/products', children: 'Products' },
      { href: '/products/category', children: 'Category' },
      { children: 'Current Page' }
    ];

    render(<Breadcrumb breadcrumbList={breadcrumbList} />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Current Page')).toBeInTheDocument();
  });

  // Test different separator styles
  test('renders with different separator styles', () => {
    const breadcrumbList = [
      { href: '/home', children: 'Home' },
      { href: '/products', children: 'Products' },
      { children: 'Current Page' }
    ];

    const { rerender } = render(<Breadcrumb breadcrumbList={breadcrumbList} separator='chevron' />);
    expect(screen.getByRole('navigation')).toHaveClass('chevron');

    rerender(<Breadcrumb breadcrumbList={breadcrumbList} separator='dash' />);
    expect(screen.getByRole('navigation')).toHaveClass('dash');

    rerender(<Breadcrumb breadcrumbList={breadcrumbList} separator='slash' />);
    expect(screen.getByRole('navigation')).toHaveClass('slash');
  });

  // Test accessibility attributes
  test('applies correct accessibility attributes', () => {
    const breadcrumbList = [{ href: '/home', children: 'Home' }, { children: 'Current Page' }];

    render(<Breadcrumb breadcrumbList={breadcrumbList} />);

    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'Breadcrumb');
  });

  // Test disabled item
  test('applies disabled attribute to disabled items', () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem href='/home'>Home</BreadcrumbItem>
        <BreadcrumbItem href='/products' disabled>
          Products
        </BreadcrumbItem>
        <BreadcrumbItem>Current Page</BreadcrumbItem>
      </Breadcrumb>
    );

    const disabledItem = screen.getByText('Products');
    expect(disabledItem).toHaveAttribute('data-disabled');
    expect(disabledItem).not.toHaveAttribute('href');
  });

  // Test limited breadcrumb with menu
  test('truncates items and shows menu when limit is specified', () => {
    const breadcrumbList = [
      { href: '/home', children: 'Home' },
      { href: '/level1', children: 'Level 1' },
      { href: '/level2', children: 'Level 2' },
      { href: '/level3', children: 'Level 3' },
      { children: 'Current Page' }
    ];

    render(<Breadcrumb breadcrumbList={breadcrumbList} limit={3} />);

    // First and last items should be visible
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Current Page')).toBeInTheDocument();

    // Middle items should be in a menu trigger button
    const menuTrigger = screen.getByText('. . .');
    expect(menuTrigger).toBeInTheDocument();

    // Menu should not be visible initially
    expect(screen.queryByTestId('menu')).not.toBeInTheDocument();

    // Click menu trigger to show menu
    fireEvent.click(menuTrigger);

    // Menu should now be visible with middle items
    const menu = screen.getByTestId('menu');
    expect(menu).toBeInTheDocument();
    expect(screen.getByText('Level 1')).toBeInTheDocument();
    expect(screen.getByText('Level 2')).toBeInTheDocument();
    expect(screen.getByText('Level 3')).toBeInTheDocument();
  });

  // Test passing props to InlineLink components
  test('forwards props to InlineLink components', () => {
    const breadcrumbList = [
      { href: '/home', children: 'Home' },
      { href: '/products', children: 'Products' },
      { children: 'Current Page' }
    ];

    render(<Breadcrumb breadcrumbList={breadcrumbList} color='interactive' size='sm' underline='always' />);

    // Get the first link
    const homeLink = screen.getByText('Home');

    // Check that props were forwarded
    expect(homeLink).toHaveAttribute('color', 'interactive');
    expect(homeLink).toHaveAttribute('size', 'sm');
    expect(homeLink).toHaveAttribute('underline', 'always');
  });

  // Test last item as active (no href)
  test('renders last item as active without link', () => {
    const breadcrumbList = [
      { href: '/home', children: 'Home' },
      { href: '/products', children: 'Products' },
      { children: 'Current Page' }
    ];

    render(<Breadcrumb breadcrumbList={breadcrumbList} />);

    // Last item should be in a span, not an anchor
    const lastItem = screen.getByText('Current Page').closest('li');
    expect(lastItem).toHaveClass('breadcrumb-active');

    // Last item should not be a link
    const lastItemLink = screen.getByText('Current Page').closest('a');
    expect(lastItemLink).not.toBeInTheDocument();
  });
});

describe('BreadcrumbItem Component', () => {
  test('renders with correct class', () => {
    render(<BreadcrumbItem href='/test'>Test Item</BreadcrumbItem>);

    const item = screen.getByText('Test Item').closest('li');
    expect(item).toHaveClass('breadcrumb-item');
  });

  test('renders as menu item when isMenuItem is true', () => {
    render(
      <BreadcrumbItem href='/test' isMenuItem>
        Test Item
      </BreadcrumbItem>
    );

    const link = screen.getByText('Test Item');
    expect(link).toHaveAttribute('role', 'menuitem');
    expect(link).toHaveAttribute('underline', 'none');
  });
});
