import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Menu, MenuItem, MenuTrigger, MenuHeader, MenuFooter, MenuDivider, MenuGroup } from '../index';

// Mock necessary components and hooks
jest.mock('../../BaseInput', () => ({
  Input: React.forwardRef(({ value, onChange, placeholder, isClearable, wrapperProps, ...props }: any, ref: any) => (
    <div data-testid='mock-input-wrapper'>
      {wrapperProps?.leftElement}
      <input
        data-testid='search-input'
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        ref={ref}
        {...props}
      />
      {isClearable && value && (
        <button data-testid='clear-button' onClick={() => onChange({ target: { value: '' } })}>
          Clear
        </button>
      )}
    </div>
  ))
}));

jest.mock('../../Checkbox', () => ({
  Checkbox: ({ onChange, color, disabled, checked }: any) => (
    <input
      type='checkbox'
      data-testid='mock-checkbox'
      data-color={color}
      disabled={disabled}
      checked={checked}
      onChange={onChange}
    />
  )
}));

jest.mock('../../Radio', () => ({
  Radio: ({ onChange, color, name, disabled, checked }: any) => (
    <input
      type='radio'
      data-testid='mock-radio'
      data-color={color}
      name={name}
      disabled={disabled}
      checked={checked}
      onChange={onChange}
    />
  )
}));

jest.mock('../../Portal', () => ({
  Portal: ({ children }: { children: React.ReactNode }) => <div data-testid='mock-portal'>{children}</div>
}));

// Mock Lucide icons
jest.mock('lucide-react', () => ({
  Check: () => <span data-testid='check-icon'>✓</span>,
  Search: () => <span data-testid='search-icon'>🔍</span>,
  ChevronUp: () => <span data-testid='chevron-up-icon'>↑</span>,
  ChevronDown: () => <span data-testid='chevron-down-icon'>↓</span>
}));

// Mock useFloating hook
jest.mock('@floating-ui/react', () => ({
  ...jest.requireActual('@floating-ui/react'),
  useFloating: () => ({
    refs: {
      setReference: jest.fn(),
      setFloating: jest.fn()
    },
    floatingStyles: {
      position: 'absolute',
      top: 0,
      left: 0
    },
    update: jest.fn(),
    elements: {
      floating: true
    }
  }),
  autoUpdate: jest.fn(),
  flip: () => ({ name: 'flip' }),
  offset: () => ({ name: 'offset' }),
  shift: () => ({ name: 'shift' })
}));

// Mock arrow key navigation hook
jest.mock('../../hooks/useArrowKeyNavigation ', () => ({
  useArrowKeyNavigation: () => ({
    setItemsRef: jest.fn(),
    resetItemsRef: jest.fn(),
    initFocus: jest.fn()
  })
}));

describe('Menu Component', () => {
  test('renders correctly with default props when closed', () => {
    render(
      <Menu data-testid='menu'>
        <MenuItem>Item 1</MenuItem>
        <MenuItem>Item 2</MenuItem>
      </Menu>
    );

    const menu = screen.getByTestId('menu');

    // Menu should be hidden when closed
    expect(menu).toHaveAttribute('aria-hidden', 'true');
    expect(menu).toHaveAttribute('data-open', 'false');
    expect(menu).toHaveStyle({ opacity: '0' });
  });

  test('renders correctly when open', () => {
    render(
      <Menu isOpen data-testid='menu'>
        <MenuItem>Item 1</MenuItem>
        <MenuItem>Item 2</MenuItem>
      </Menu>
    );

    const menu = screen.getByTestId('menu');

    // Menu should be visible when open
    expect(menu).toHaveAttribute('aria-hidden', 'false');
    expect(menu).toHaveAttribute('data-open', 'true');
    expect(menu).toHaveStyle({ opacity: '1' });

    // Menu items should be rendered
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  test('applies correct size class', () => {
    const { rerender } = render(
      <Menu isOpen size='sm' data-testid='menu'>
        <MenuItem>Item 1</MenuItem>
      </Menu>
    );

    // Small size
    expect(screen.getByTestId('menu')).toHaveClass('small');

    // Medium size
    rerender(
      <Menu isOpen size='md' data-testid='menu'>
        <MenuItem>Item 1</MenuItem>
      </Menu>
    );
    expect(screen.getByTestId('menu')).toHaveClass('medium');
  });

  test('applies correct color class', () => {
    const { rerender } = render(
      <Menu isOpen menuColor='neutral' data-testid='menu'>
        <MenuItem>Item 1</MenuItem>
      </Menu>
    );

    // Neutral color
    expect(screen.getByTestId('menu')).toHaveClass('neutral');

    // Accent color
    rerender(
      <Menu isOpen menuColor='accent' data-testid='menu'>
        <MenuItem>Item 1</MenuItem>
      </Menu>
    );
    expect(screen.getByTestId('menu')).toHaveClass('accent');
  });

  test('applies correct prominence class', () => {
    const { rerender } = render(
      <Menu isOpen prominence='subtle' data-testid='menu'>
        <MenuItem>Item 1</MenuItem>
      </Menu>
    );

    // Subtle prominence
    expect(screen.getByTestId('menu')).toHaveClass('subtle');

    // Pronounced prominence
    rerender(
      <Menu isOpen prominence='pronounced' data-testid='menu'>
        <MenuItem>Item 1</MenuItem>
      </Menu>
    );
    expect(screen.getByTestId('menu')).toHaveClass('pronounced');
  });

  test('applies correct theme class', () => {
    const { rerender } = render(
      <Menu isOpen theme='default' data-testid='menu'>
        <MenuItem>Item 1</MenuItem>
      </Menu>
    );

    // Default theme
    expect(screen.getByTestId('menu')).toHaveClass('default');

    // Alternative theme
    rerender(
      <Menu isOpen theme='alternative' data-testid='menu'>
        <MenuItem>Item 1</MenuItem>
      </Menu>
    );
    expect(screen.getByTestId('menu')).toHaveClass('alternative');
  });

  test('renders with search input when searchable is true', () => {
    render(
      <Menu isOpen searchable data-testid='menu'>
        <MenuItem>Item 1</MenuItem>
      </Menu>
    );

    // Search input should be rendered
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
  });

  test('search input filters menu items', () => {
    render(
      <Menu isOpen searchable data-testid='menu'>
        <MenuItem value='apple'>Apple</MenuItem>
        <MenuItem value='banana'>Banana</MenuItem>
        <MenuItem value='cherry'>Cherry</MenuItem>
      </Menu>
    );

    const searchInput = screen.getByTestId('search-input');

    // Filter to show only "apple"
    fireEvent.change(searchInput, { target: { value: 'app' } });

    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.queryByText('Banana')).not.toBeInTheDocument();
    expect(screen.queryByText('Cherry')).not.toBeInTheDocument();
  });

  test('displays no results text when search has no matches', () => {
    render(
      <Menu isOpen searchable noResultsText='Nothing found' data-testid='menu'>
        <MenuItem value='apple'>Apple</MenuItem>
        <MenuItem value='banana'>Banana</MenuItem>
      </Menu>
    );

    const searchInput = screen.getByTestId('search-input');

    // Filter with no matches
    fireEvent.change(searchInput, { target: { value: 'xyz' } });

    expect(screen.getByText('Nothing found')).toBeInTheDocument();
    expect(screen.queryByText('Apple')).not.toBeInTheDocument();
    expect(screen.queryByText('Banana')).not.toBeInTheDocument();
  });

  test('uses portal for rendering when usePortal is true', () => {
    render(
      <Menu isOpen usePortal data-testid='menu'>
        <MenuItem>Item 1</MenuItem>
      </Menu>
    );

    // Menu should be rendered inside a portal
    expect(screen.getByTestId('mock-portal')).toBeInTheDocument();
    expect(screen.getByTestId('mock-portal')).toContainElement(screen.getByTestId('menu'));
  });

  test('renders directly without portal when usePortal is false', () => {
    render(
      <Menu isOpen usePortal={false} data-testid='menu'>
        <MenuItem>Item 1</MenuItem>
      </Menu>
    );

    // Menu should be rendered directly without a portal
    expect(screen.queryByTestId('mock-portal')).not.toBeInTheDocument();
    expect(screen.getByTestId('menu')).toBeInTheDocument();
  });

  test('renders header and footer components', () => {
    render(
      <Menu isOpen data-testid='menu'>
        <MenuHeader data-testid='menu-header'>Header Content</MenuHeader>
        <MenuItem>Item 1</MenuItem>
        <MenuFooter data-testid='menu-footer'>Footer Content</MenuFooter>
      </Menu>
    );

    expect(screen.getByTestId('menu-header')).toBeInTheDocument();
    expect(screen.getByText('Header Content')).toBeInTheDocument();
    expect(screen.getByTestId('menu-footer')).toBeInTheDocument();
    expect(screen.getByText('Footer Content')).toBeInTheDocument();
  });

  test('applies menuItemsLimit prop correctly', () => {
    render(
      <Menu isOpen size='sm' menuItemsLimit={3} data-testid='menu'>
        <MenuItem>Item 1</MenuItem>
        <MenuItem>Item 2</MenuItem>
        <MenuItem>Item 3</MenuItem>
        <MenuItem>Item 4</MenuItem>
      </Menu>
    );

    // For size="sm", each item is 40px + 4px, so 3 items would be (40+4)*3 = 132px
    const menuItems = screen.getByText('Item 1').closest('.menu-items');
    expect(menuItems).toHaveStyle({ maxHeight: '132px' });
  });
});

describe('MenuItem Component', () => {
  test('renders correctly with label', () => {
    render(<MenuItem data-testid='menu-item' label='Item Label' />);

    const menuItem = screen.getByTestId('menu-item');
    expect(menuItem).toBeInTheDocument();
    expect(menuItem).toHaveClass('menu-item');
    expect(menuItem).toHaveAttribute('role', 'menuitem');
    expect(screen.getByText('Item Label')).toBeInTheDocument();
  });

  test('renders correctly with children instead of label', () => {
    render(<MenuItem data-testid='menu-item'>Child Content</MenuItem>);

    const menuItem = screen.getByTestId('menu-item');
    expect(menuItem).toBeInTheDocument();
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });

  test('renders icon when provided', () => {
    const icon = <span data-testid='custom-icon'>🍎</span>;
    render(<MenuItem data-testid='menu-item' icon={icon} label='With Icon' />);

    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    expect(screen.getByText('With Icon')).toBeInTheDocument();
  });

  test('shows checkmark when checked is true', () => {
    render(<MenuItem data-testid='menu-item' checked label='Checked Item' />);

    expect(screen.getByTestId('check-icon')).toBeInTheDocument();
  });

  test('handles onClick correctly', () => {
    const handleClick = jest.fn();
    render(<MenuItem data-testid='menu-item' onClick={handleClick} label='Clickable' />);

    fireEvent.click(screen.getByTestId('menu-item'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('does not trigger onClick when disabled', () => {
    const handleClick = jest.fn();
    render(<MenuItem data-testid='menu-item' disabled onClick={handleClick} label='Disabled' />);

    fireEvent.click(screen.getByTestId('menu-item'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  test('calls onChange when clicked', () => {
    const handleChange = jest.fn();
    render(<MenuItem data-testid='menu-item' onChange={handleChange} value='item-value' label='Clickable' />);

    fireEvent.click(screen.getByTestId('menu-item'));
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: 'item-value' }),
        checked: true
      })
    );
  });

  test('supports multiselect mode with checkbox', () => {
    render(<MenuItem data-testid='menu-item' useInput multiselect label='Checkbox Item' />);

    expect(screen.getByTestId('mock-checkbox')).toBeInTheDocument();
  });

  test('supports radio input mode', () => {
    render(<MenuItem data-testid='menu-item' useInput name='group1' label='Radio Item' />);

    expect(screen.getByTestId('mock-radio')).toBeInTheDocument();
  });

  test('applies color prop correctly', () => {
    render(<MenuItem data-testid='menu-item' color='accent' label='Colored Item' />);

    expect(screen.getByTestId('menu-item')).toHaveClass('accent');
  });

  test('applies prominence prop correctly', () => {
    render(<MenuItem data-testid='menu-item' prominence='pronounced' label='Prominent Item' />);

    expect(screen.getByTestId('menu-item')).toHaveClass('pronounced');
  });

  test('respects checkmarkSide prop', () => {
    const { rerender } = render(<MenuItem data-testid='menu-item' checked checkmarkSide='right' label='Right Check' />);

    // With right checkmark, the check should be after the label
    const itemWithRightCheck = screen.getByTestId('menu-item');
    const labelElement = screen.getByText('Right Check');
    expect(labelElement.nextElementSibling?.querySelector('[data-testid="check-icon"]')).toBeTruthy();

    // With left checkmark, the check should be before the label
    rerender(<MenuItem data-testid='menu-item' checked checkmarkSide='left' label='Left Check' />);

    // Need to get fresh references after rerendering
    const updatedLabel = screen.getByText('Left Check');
    expect(updatedLabel.previousElementSibling?.querySelector('[data-testid="check-icon"]')).toBeTruthy();
  });
});

describe('MenuTrigger Component', () => {
  test('renders correctly', () => {
    render(<MenuTrigger data-testid='menu-trigger'>Open Menu</MenuTrigger>);

    const trigger = screen.getByTestId('menu-trigger');
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveClass('menu-trigger');
    expect(trigger).toHaveTextContent('Open Menu');
  });

  test('handles click events', () => {
    const handleClick = jest.fn();
    render(
      <MenuTrigger data-testid='menu-trigger' onClick={handleClick}>
        Open Menu
      </MenuTrigger>
    );

    fireEvent.click(screen.getByTestId('menu-trigger'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<MenuTrigger ref={ref}>Open Menu</MenuTrigger>);

    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('BUTTON');
  });
});

describe('MenuHeader Component', () => {
  test('renders correctly', () => {
    render(<MenuHeader data-testid='menu-header'>Header Content</MenuHeader>);

    const header = screen.getByTestId('menu-header');
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass('menu-header');
    expect(header).toHaveTextContent('Header Content');
  });

  test('applies custom className', () => {
    render(
      <MenuHeader data-testid='menu-header' className='custom-header'>
        Header Content
      </MenuHeader>
    );

    const header = screen.getByTestId('menu-header');
    expect(header).toHaveClass('menu-header');
    expect(header).toHaveClass('custom-header');
  });
});

describe('MenuFooter Component', () => {
  test('renders correctly', () => {
    render(<MenuFooter data-testid='menu-footer'>Footer Content</MenuFooter>);

    const footer = screen.getByTestId('menu-footer');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveClass('menu-footer');
    expect(footer).toHaveTextContent('Footer Content');
  });

  test('applies custom className', () => {
    render(
      <MenuFooter data-testid='menu-footer' className='custom-footer'>
        Footer Content
      </MenuFooter>
    );

    const footer = screen.getByTestId('menu-footer');
    expect(footer).toHaveClass('menu-footer');
    expect(footer).toHaveClass('custom-footer');
  });
});

describe('MenuDivider Component', () => {
  test('renders correctly', () => {
    render(<MenuDivider data-testid='menu-divider' />);

    const divider = screen.getByTestId('menu-divider');
    expect(divider).toBeInTheDocument();
    expect(divider).toHaveClass('menu-divider');
  });

  test('applies custom className', () => {
    render(<MenuDivider data-testid='menu-divider' className='custom-divider' />);

    const divider = screen.getByTestId('menu-divider');
    expect(divider).toHaveClass('menu-divider');
    expect(divider).toHaveClass('custom-divider');
  });
});

describe('MenuGroup Component', () => {
  test('renders correctly with group label', () => {
    render(
      <MenuGroup data-testid='menu-group' groupLabel='Group Title'>
        <MenuItem>Item 1</MenuItem>
        <MenuItem>Item 2</MenuItem>
      </MenuGroup>
    );

    const groupLabel = screen.getByText('Group Title');
    expect(groupLabel).toBeInTheDocument();
    expect(groupLabel).toHaveClass('menu-group-label');
    expect(groupLabel).toHaveAttribute('data-value', 'Group Title');

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });
});
