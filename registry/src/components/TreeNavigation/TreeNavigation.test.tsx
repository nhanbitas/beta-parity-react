import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TreeNavigation, TreeNavigationItem } from './index';

describe('TreeNavigation Component', () => {
  const mockItems: TreeNavigationItem[] = [
    {
      id: 'item-1',
      title: 'Item 1',
      href: '#item-1'
    },
    {
      id: 'item-2',
      title: 'Item 2',
      href: '#item-2',
      children: [
        {
          id: 'item-2-1',
          title: 'Item 2.1',
          href: '#item-2-1'
        },
        {
          id: 'item-2-2',
          title: 'Item 2.2',
          href: '#item-2-2'
        }
      ]
    },
    {
      id: 'item-3',
      title: 'Item 3'
    }
  ];

  beforeEach(() => {
    // Mock scrollTo
    window.scrollTo = jest.fn();
    // Mock getElementById
    document.getElementById = jest.fn((id) => {
      const element = document.createElement('div');
      element.id = id;
      element.getBoundingClientRect = jest.fn(() => ({
        top: 100,
        left: 0,
        right: 0,
        bottom: 200,
        width: 100,
        height: 100,
        x: 0,
        y: 100,
        toJSON: () => {}
      }));
      return element;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders correctly', () => {
      const { container } = render(<TreeNavigation items={mockItems} />);
      expect(container.querySelector('.tree-navigation')).toBeInTheDocument();
    });

    it('renders all top-level items', () => {
      render(<TreeNavigation items={mockItems} />);
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
      expect(screen.getByText('Item 3')).toBeInTheDocument();
    });

    it('renders nested items', () => {
      render(<TreeNavigation items={mockItems} />);
      expect(screen.getByText('Item 2.1')).toBeInTheDocument();
      expect(screen.getByText('Item 2.2')).toBeInTheDocument();
    });

    it('renders items with href as links', () => {
      render(<TreeNavigation items={mockItems} />);
      const link = screen.getByText('Item 1').closest('a');
      expect(link).toHaveAttribute('href', '#item-1');
    });

    it('renders items without href as buttons', () => {
      render(<TreeNavigation items={mockItems} />);
      const button = screen.getByText('Item 3').closest('button');
      expect(button).toBeInTheDocument();
    });
  });

  describe('Expand/Collapse functionality', () => {
    it('expands item with defaultExpanded', () => {
      const itemsWithExpanded: TreeNavigationItem[] = [
        {
          id: 'parent',
          title: 'Parent',
          defaultExpanded: true,
          children: [{ id: 'child', title: 'Child' }]
        }
      ];

      const { container } = render(<TreeNavigation items={itemsWithExpanded} />);
      expect(container.querySelector('.tree-navigation-item')).toHaveClass('expanded');
    });

    it('toggles expansion when expand button is clicked', async () => {
      const { container } = render(<TreeNavigation items={mockItems} />);

      const expandButtons = container.querySelectorAll('.tree-navigation-icon-button');
      const item2ExpandButton = expandButtons[1] as HTMLElement; // Item 2 has children

      await userEvent.click(item2ExpandButton);

      await waitFor(() => {
        const item2 = container.querySelectorAll('.tree-navigation-item')[1];
        expect(item2).toHaveClass('expanded');
      });
    });

    it('shows chevron icon for items with children', () => {
      const { container } = render(<TreeNavigation items={mockItems} />);
      const icons = container.querySelectorAll('.tree-navigation-icon');

      // Item 2 has children, should have chevron
      expect(icons[1].querySelector('svg')).toBeInTheDocument();
    });

    it('shows minus icon for items without children', () => {
      const { container } = render(<TreeNavigation items={mockItems} />);
      const icons = container.querySelectorAll('.tree-navigation-icon');

      // Item 1 has no children
      expect(icons[0]).toHaveClass('icon-minus');
    });
  });

  describe('Active state', () => {
    it('sets initial active item with defaultActive', () => {
      const itemsWithActive: TreeNavigationItem[] = [
        {
          id: 'active-item',
          title: 'Active Item',
          defaultActive: true
        }
      ];

      const { container } = render(<TreeNavigation items={itemsWithActive} />);
      expect(container.querySelector('.tree-navigation-item')).toHaveClass('tree-navigation-item-active');
    });

    it('updates active item on click', async () => {
      render(<TreeNavigation items={mockItems} />);

      await userEvent.click(screen.getByText('Item 1'));

      await waitFor(() => {
        const item = screen.getByText('Item 1').closest('.tree-navigation-item');
        expect(item).toHaveClass('tree-navigation-item-active');
      });
    });

    it('calls window.scrollTo on item click', async () => {
      render(<TreeNavigation items={mockItems} />);

      await userEvent.click(screen.getByText('Item 1'));

      expect(window.scrollTo).toHaveBeenCalled();
    });

    it('prevents default navigation for anchor links', async () => {
      render(<TreeNavigation items={mockItems} />);

      const link = screen.getByText('Item 1').closest('a');
      const event = new MouseEvent('click', { bubbles: true, cancelable: true });
      const preventDefaultSpy = jest.spyOn(event, 'preventDefault');

      link?.dispatchEvent(event);

      expect(preventDefaultSpy).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('has proper role attributes', () => {
      const { container } = render(<TreeNavigation items={mockItems} />);
      const items = container.querySelectorAll('[role="treeitem"]');
      expect(items.length).toBeGreaterThan(0);
    });

    it('sets aria-expanded attribute', () => {
      const { container } = render(<TreeNavigation items={mockItems} />);
      const item2 = container.querySelectorAll('[role="treeitem"]')[1];
      expect(item2).toHaveAttribute('aria-expanded');
    });

    it('sets aria-selected attribute for active item', () => {
      const itemsWithActive: TreeNavigationItem[] = [
        {
          id: 'active-item',
          title: 'Active Item',
          defaultActive: true
        }
      ];

      const { container } = render(<TreeNavigation items={itemsWithActive} />);
      const item = container.querySelector('[role="treeitem"]');
      expect(item).toHaveAttribute('aria-selected', 'true');
    });

    it('has aria-label on navigation links', () => {
      render(<TreeNavigation items={mockItems} />);
      const link = screen.getByText('Item 1').closest('a');
      expect(link).toHaveAttribute('aria-label', 'Item 1');
    });

    it('applies custom className', () => {
      const { container } = render(<TreeNavigation items={mockItems} className='custom-nav' />);
      expect(container.querySelector('.tree-navigation')).toHaveClass('custom-nav');
    });

    it('spreads additional props', () => {
      const { container } = render(<TreeNavigation items={mockItems} data-testid='tree-nav' />);
      expect(container.querySelector('.tree-navigation')).toHaveAttribute('data-testid', 'tree-nav');
    });
  });

  describe('Nested structure', () => {
    it('applies subitem class to nested items', () => {
      const { container } = render(<TreeNavigation items={mockItems} />);
      const subitems = container.querySelectorAll('.tree-navigation-subitem');
      expect(subitems.length).toBe(2); // Item 2.1 and Item 2.2
    });

    it('handles deeply nested items', () => {
      const deepItems: TreeNavigationItem[] = [
        {
          id: 'level-1',
          title: 'Level 1',
          children: [
            {
              id: 'level-2',
              title: 'Level 2',
              children: [
                {
                  id: 'level-3',
                  title: 'Level 3'
                }
              ]
            }
          ]
        }
      ];

      render(<TreeNavigation items={deepItems} />);
      expect(screen.getByText('Level 3')).toBeInTheDocument();
    });
  });

  describe('Color variants', () => {
    it('renders with default neutral color', () => {
      const { container } = render(<TreeNavigation items={mockItems} />);
      expect(container.querySelector('.tree-navigation')).toHaveClass('neutral');
    });

    it('renders with custom color', () => {
      const { container } = render(<TreeNavigation items={mockItems} color='accent' />);
      expect(container.querySelector('.tree-navigation')).toHaveClass('accent');
    });
  });
});
