import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Menu, MenuItem, MenuHeader, MenuFooter, MenuDivider, MenuGroup } from './index';

describe('Menu Component', () => {
  describe('Rendering', () => {
    it('renders correctly', () => {
      const { container } = render(
        <Menu isOpen>
          <MenuItem value="1">Item 1</MenuItem>
        </Menu>
      );
      expect(container.querySelector('.menu')).toBeInTheDocument();
    });

    it('has role menu', () => {
      const { container } = render(
        <Menu isOpen>
          <MenuItem value="1">Item 1</MenuItem>
        </Menu>
      );
      expect(container.querySelector('.menu')).toHaveAttribute('role', 'menu');
    });

    it('renders menu items', () => {
      render(
        <Menu isOpen>
          <MenuItem value="1">Item 1</MenuItem>
          <MenuItem value="2">Item 2</MenuItem>
        </Menu>
      );
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });

    it('hides menu when isOpen is false', () => {
      const { container } = render(
        <Menu isOpen={false}>
          <MenuItem value="1">Item 1</MenuItem>
        </Menu>
      );
      expect(container.querySelector('.menu')).toHaveAttribute('aria-hidden', 'true');
    });

    it('shows menu when isOpen is true', () => {
      const { container } = render(
        <Menu isOpen>
          <MenuItem value="1">Item 1</MenuItem>
        </Menu>
      );
      expect(container.querySelector('.menu')).toHaveAttribute('aria-hidden', 'false');
    });
  });

  describe('Size variants', () => {
    it('renders small size by default', () => {
      const { container } = render(
        <Menu isOpen>
          <MenuItem value="1">Item</MenuItem>
        </Menu>
      );
      expect(container.querySelector('.menu')).toHaveClass('small');
    });

    it('renders medium size', () => {
      const { container } = render(
        <Menu isOpen size="md">
          <MenuItem value="1">Item</MenuItem>
        </Menu>
      );
      expect(container.querySelector('.menu')).toHaveClass('medium');
    });
  });

  describe('Color variants', () => {
    it('renders neutral color by default', () => {
      const { container } = render(
        <Menu isOpen>
          <MenuItem value="1">Item</MenuItem>
        </Menu>
      );
      expect(container.querySelector('.menu')).toHaveClass('neutral');
    });

    it('renders accent color', () => {
      const { container } = render(
        <Menu isOpen menuColor="accent">
          <MenuItem value="1">Item</MenuItem>
        </Menu>
      );
      expect(container.querySelector('.menu')).toHaveClass('accent');
    });
  });

  describe('Theme variants', () => {
    it('renders default theme', () => {
      const { container } = render(
        <Menu isOpen>
          <MenuItem value="1">Item</MenuItem>
        </Menu>
      );
      expect(container.querySelector('.menu')).toHaveClass('default');
    });

    it('renders alternative theme', () => {
      const { container } = render(
        <Menu isOpen theme="alternative">
          <MenuItem value="1">Item</MenuItem>
        </Menu>
      );
      expect(container.querySelector('.menu')).toHaveClass('alternative');
    });
  });

  describe('Prominence variants', () => {
    it('renders subtle prominence by default', () => {
      const { container } = render(
        <Menu isOpen>
          <MenuItem value="1">Item</MenuItem>
        </Menu>
      );
      expect(container.querySelector('.menu')).toHaveClass('subtle');
    });

    it('renders pronounced prominence', () => {
      const { container } = render(
        <Menu isOpen prominence="pronounced">
          <MenuItem value="1">Item</MenuItem>
        </Menu>
      );
      expect(container.querySelector('.menu')).toHaveClass('pronounced');
    });
  });

  describe('MenuItem', () => {
    it('renders menu item', () => {
      render(
        <Menu isOpen>
          <MenuItem value="item1" label="Item 1" />
        </Menu>
      );
      expect(screen.getByText('Item 1')).toBeInTheDocument();
    });

    it('has role menuitem', () => {
      render(
        <Menu isOpen>
          <MenuItem value="item1">Item 1</MenuItem>
        </Menu>
      );
      expect(screen.getByText('Item 1')).toHaveAttribute('role', 'menuitem');
    });

    it('calls onChange on click', async () => {
      const handleChange = jest.fn();
      render(
        <Menu isOpen>
          <MenuItem value="item1" onChange={handleChange}>
            Item 1
          </MenuItem>
        </Menu>
      );

      await userEvent.click(screen.getByText('Item 1'));
      expect(handleChange).toHaveBeenCalled();
    });

    it('shows checkmark when checked', () => {
      const { container } = render(
        <Menu isOpen>
          <MenuItem value="item1" checked>
            Item 1
          </MenuItem>
        </Menu>
      );
      expect(container.querySelector('.menu-item-icon')).toBeInTheDocument();
    });

    it('can be disabled', () => {
      render(
        <Menu isOpen>
          <MenuItem value="item1" disabled>
            Item 1
          </MenuItem>
        </Menu>
      );
      expect(screen.getByText('Item 1')).toHaveAttribute('aria-disabled', 'true');
    });

    it('does not respond to clicks when disabled', async () => {
      const handleChange = jest.fn();
      render(
        <Menu isOpen>
          <MenuItem value="item1" disabled onChange={handleChange}>
            Item 1
          </MenuItem>
        </Menu>
      );

      await userEvent.click(screen.getByText('Item 1'));
      expect(handleChange).not.toHaveBeenCalled();
    });

    it('renders with icon', () => {
      render(
        <Menu isOpen>
          <MenuItem value="item1" icon={<span data-testid="icon">★</span>}>
            Item 1
          </MenuItem>
        </Menu>
      );
      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });
  });

  describe('Searchable menu', () => {
    it('shows search input when searchable', () => {
      const { container } = render(
        <Menu isOpen searchable>
          <MenuItem value="item1">Item 1</MenuItem>
        </Menu>
      );
      expect(container.querySelector('.menu-item-search')).toBeInTheDocument();
    });

    it('filters items based on search', async () => {
      const { container } = render(
        <Menu isOpen searchable>
          <MenuItem value="apple">Apple</MenuItem>
          <MenuItem value="banana">Banana</MenuItem>
          <MenuItem value="cherry">Cherry</MenuItem>
        </Menu>
      );

      const searchInput = container.querySelector('.menu-item-search') as HTMLInputElement;
      await userEvent.type(searchInput, 'apple');

      expect(screen.getByText('Apple')).toBeInTheDocument();
      expect(screen.queryByText('Banana')).not.toBeInTheDocument();
      expect(screen.queryByText('Cherry')).not.toBeInTheDocument();
    });

    it('shows no results text when no matches', async () => {
      const { container } = render(
        <Menu isOpen searchable noResultsText="Nothing found">
          <MenuItem value="apple">Apple</MenuItem>
        </Menu>
      );

      const searchInput = container.querySelector('.menu-item-search') as HTMLInputElement;
      await userEvent.type(searchInput, 'xyz');

      expect(screen.getByText('Nothing found')).toBeInTheDocument();
    });

    it('uses custom search placeholder', () => {
      const { container } = render(
        <Menu isOpen searchable searchPlaceholder="Search items...">
          <MenuItem value="item1">Item 1</MenuItem>
        </Menu>
      );

      const searchInput = container.querySelector('.menu-item-search') as HTMLInputElement;
      expect(searchInput).toHaveAttribute('placeholder', 'Search items...');
    });
  });

  describe('MenuHeader and MenuFooter', () => {
    it('renders menu header', () => {
      render(
        <Menu isOpen>
          <MenuHeader>
            <div>Header Content</div>
          </MenuHeader>
          <MenuItem value="item1">Item 1</MenuItem>
        </Menu>
      );
      expect(screen.getByText('Header Content')).toBeInTheDocument();
    });

    it('renders menu footer', () => {
      render(
        <Menu isOpen>
          <MenuItem value="item1">Item 1</MenuItem>
          <MenuFooter>
            <div>Footer Content</div>
          </MenuFooter>
        </Menu>
      );
      expect(screen.getByText('Footer Content')).toBeInTheDocument();
    });
  });

  describe('MenuDivider', () => {
    it('renders menu divider', () => {
      const { container } = render(
        <Menu isOpen>
          <MenuItem value="item1">Item 1</MenuItem>
          <MenuDivider />
          <MenuItem value="item2">Item 2</MenuItem>
        </Menu>
      );
      expect(container.querySelector('.menu-divider')).toBeInTheDocument();
    });
  });

  describe('MenuGroup', () => {
    it('renders menu group with label', () => {
      render(
        <Menu isOpen>
          <MenuGroup groupLabel="Group 1">
            <MenuItem value="item1">Item 1</MenuItem>
          </MenuGroup>
        </Menu>
      );
      expect(screen.getByText('Group 1')).toBeInTheDocument();
    });

    it('renders grouped items', () => {
      render(
        <Menu isOpen>
          <MenuGroup groupLabel="Fruits">
            <MenuItem value="apple">Apple</MenuItem>
            <MenuItem value="banana">Banana</MenuItem>
          </MenuGroup>
        </Menu>
      );
      expect(screen.getByText('Apple')).toBeInTheDocument();
      expect(screen.getByText('Banana')).toBeInTheDocument();
    });
  });

  describe('Disabled state', () => {
    it('applies disabled attribute', () => {
      const { container } = render(
        <Menu isOpen disabled>
          <MenuItem value="item1">Item 1</MenuItem>
        </Menu>
      );
      expect(container.querySelector('.menu')).toHaveAttribute('data-disabled', 'true');
    });
  });

  describe('Accessibility', () => {
    it('menu items have tabIndex 0', () => {
      render(
        <Menu isOpen>
          <MenuItem value="item1">Item 1</MenuItem>
        </Menu>
      );
      expect(screen.getByText('Item 1')).toHaveAttribute('tabIndex', '0');
    });

    it('disabled menu items have tabIndex -1', () => {
      render(
        <Menu isOpen>
          <MenuItem value="item1" disabled>
            Item 1
          </MenuItem>
        </Menu>
      );
      expect(screen.getByText('Item 1')).toHaveAttribute('tabIndex', '-1');
    });

    it('forwards ref correctly', () => {
      const ref = jest.fn();
      render(
        <Menu ref={ref} isOpen>
          <MenuItem value="item1">Item 1</MenuItem>
        </Menu>
      );
      expect(ref).toHaveBeenCalled();
    });

    it('applies custom className', () => {
      const { container } = render(
        <Menu className="custom-menu" isOpen>
          <MenuItem value="item1">Item 1</MenuItem>
        </Menu>
      );
      expect(container.querySelector('.menu')).toHaveClass('custom-menu');
    });
  });
});
