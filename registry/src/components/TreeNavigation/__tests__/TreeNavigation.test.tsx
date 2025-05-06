import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TreeNavigation, TreeNavigationItem } from '../index';

// Mock scrollTo function
const mockScrollTo = jest.fn();
window.scrollTo = mockScrollTo;

// Mock the Lucide icons
jest.mock('lucide-react', () => ({
  ChevronRight: () => <span data-testid='chevron-icon'>▶</span>,
  Minus: () => <span data-testid='minus-icon'>-</span>
}));

// Mock the Animation component
jest.mock('../../Animation', () => ({
  Animation: ({ children, in: isVisible }) => (isVisible ? children : null)
}));

// Sample navigation items for testing
const sampleItems: TreeNavigationItem[] = [
  { id: 'home', title: 'Home', href: '#home' },
  {
    id: 'products',
    title: 'Products',
    defaultExpanded: true,
    children: [
      { id: 'electronics', title: 'Electronics' },
      {
        id: 'clothing',
        title: 'Clothing',
        children: [
          { id: 'mens', title: "Men's Clothing", defaultActive: true },
          { id: 'womens', title: "Women's Clothing" }
        ]
      }
    ]
  },
  { id: 'about', title: 'About Us' }
];

describe('TreeNavigation Component', () => {
  beforeEach(() => {
    // Create mock elements for scroll behavior
    ['home', 'products', 'electronics', 'clothing', 'mens', 'womens', 'about'].forEach((id) => {
      const element = document.createElement('div');
      element.id = id;
      element.getBoundingClientRect = jest.fn().mockReturnValue({
        top: 100,
        left: 0,
        right: 0,
        bottom: 0,
        width: 0,
        height: 0
      });
      document.body.appendChild(element);
    });
  });

  afterEach(() => {
    // Clean up mock elements
    ['home', 'products', 'electronics', 'clothing', 'mens', 'womens', 'about'].forEach((id) => {
      const element = document.getElementById(id);
      if (element) document.body.removeChild(element);
    });
    jest.clearAllMocks();
  });

  test('renders all top-level items correctly', () => {
    render(<TreeNavigation items={sampleItems} />);

    // Check that top-level items are rendered
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('About Us')).toBeInTheDocument();
  });

  test('renders nested items for expanded parent items', () => {
    render(<TreeNavigation items={sampleItems} />);

    // Products is defaultExpanded: true, so its children should be visible
    expect(screen.getByText('Electronics')).toBeInTheDocument();
    expect(screen.getByText('Clothing')).toBeInTheDocument();

    // Men's Clothing is inside a non-expanded parent, so it should not be visible initially
    expect(screen.queryByText("Men's Clothing")).not.toBeInTheDocument();
  });

  test('expands/collapses items when toggle button is clicked', () => {
    render(<TreeNavigation items={sampleItems} />);

    // Find the toggle button for "Clothing"
    const clothingItem = screen.getByText('Clothing').closest('.tree-navigation-item-content');
    const clothingToggle = clothingItem?.querySelector('.tree-navigation-icon-button');

    // Initially, Men's Clothing should not be visible
    expect(screen.queryByText("Men's Clothing")).not.toBeInTheDocument();

    // Click to expand
    if (clothingToggle) fireEvent.click(clothingToggle);

    // Now Men's Clothing should be visible
    expect(screen.getByText("Men's Clothing")).toBeInTheDocument();

    // Click to collapse again
    if (clothingToggle) fireEvent.click(clothingToggle);

    // Men's Clothing should not be visible again
    expect(screen.queryByText("Men's Clothing")).not.toBeInTheDocument();
  });

  test('collapses expanded items when toggle button is clicked', () => {
    render(<TreeNavigation items={sampleItems} />);

    // Products is defaultExpanded: true, so Electronics should be visible initially
    expect(screen.getByText('Electronics')).toBeInTheDocument();

    // Find the toggle button for "Products"
    const productsItem = screen.getByText('Products').closest('.tree-navigation-item-content');
    const productsToggle = productsItem?.querySelector('.tree-navigation-icon-button');

    // Click to collapse
    if (productsToggle) fireEvent.click(productsToggle);

    // Electronics should not be visible now
    expect(screen.queryByText('Electronics')).not.toBeInTheDocument();
  });

  test('activates item and scrolls when nav item is clicked', () => {
    render(<TreeNavigation items={sampleItems} />);

    // Click on Home item
    fireEvent.click(screen.getByText('Home'));

    // Check that Home item is now active
    const homeItem = screen.getByText('Home').closest('li');
    expect(homeItem).toHaveClass('tree-navigation-item-active');

    // Check that scrollTo was called
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: expect.any(Number),
      behavior: 'smooth'
    });
  });

  test('handles anchor links correctly', () => {
    render(<TreeNavigation items={sampleItems} />);

    // Get the Home link (which has an href="#home")
    const homeLink = screen.getByText('Home').closest('a');

    // Simulate click and check that default was prevented
    const mockPreventDefault = jest.fn();
    fireEvent.click(homeLink!, { preventDefault: mockPreventDefault });

    expect(mockPreventDefault).toHaveBeenCalled();
    expect(window.scrollTo).toHaveBeenCalled();
  });

  test('initializes with correct active item', () => {
    render(<TreeNavigation items={sampleItems} />);

    // "Men's Clothing" is marked as defaultActive: true
    // Products should be expanded to show Clothing
    // Clothing should be expanded to show Men's Clothing

    // We need to expand Clothing first (it's initially collapsed)
    const clothingItem = screen.getByText('Clothing').closest('.tree-navigation-item-content');
    const clothingToggle = clothingItem?.querySelector('.tree-navigation-icon-button');
    if (clothingToggle) fireEvent.click(clothingToggle);

    // Now Men's Clothing should be visible and active
    const mensItem = screen.getByText("Men's Clothing").closest('li');
    expect(mensItem).toHaveClass('tree-navigation-item-active');
  });

  test('renders tree items with correct ARIA attributes', () => {
    render(<TreeNavigation items={sampleItems} />);

    // Check top-level items
    const homeItem = screen.getByText('Home').closest('li');
    expect(homeItem).toHaveAttribute('role', 'treeitem');

    // Products is expanded
    const productsItem = screen.getByText('Products').closest('li');
    expect(productsItem).toHaveAttribute('aria-expanded', 'true');

    // Clothing is not expanded initially
    const clothingItem = screen.getByText('Clothing').closest('li');
    expect(clothingItem).toHaveAttribute('aria-expanded', 'false');
  });

  test('applies custom className', () => {
    render(<TreeNavigation items={sampleItems} className='custom-tree' />);

    const navElement = screen.getByRole('navigation');
    expect(navElement).toHaveClass('custom-tree');
  });

  test('displays minus icon for leaf nodes', () => {
    render(<TreeNavigation items={sampleItems} />);

    // Home is a leaf node (no children)
    const homeItem = screen.getByText('Home').closest('.tree-navigation-item-content');
    const homeIcon = homeItem?.querySelector('.tree-navigation-icon');

    expect(homeIcon).toHaveClass('icon-minus');
    expect(homeItem?.querySelector('[data-testid="minus-icon"]')).toBeInTheDocument();
  });

  test('displays chevron icon for parent nodes', () => {
    render(<TreeNavigation items={sampleItems} />);

    // Products is a parent node
    const productsItem = screen.getByText('Products').closest('.tree-navigation-item-content');
    const productsIcon = productsItem?.querySelector('.tree-navigation-icon');

    expect(productsIcon).toBeInTheDocument();
    expect(productsItem?.querySelector('[data-testid="chevron-icon"]')).toBeInTheDocument();
  });

  test('applies correct icon classes based on expanded state', () => {
    render(<TreeNavigation items={sampleItems} />);

    // Products is expanded initially
    const productsItem = screen.getByText('Products').closest('.tree-navigation-item-content');
    let productsIcon = productsItem?.querySelector('.tree-navigation-icon');
    expect(productsIcon).toHaveClass('icon-expanded');

    // Clothing is not expanded initially
    const clothingItem = screen.getByText('Clothing').closest('.tree-navigation-item-content');
    let clothingIcon = clothingItem?.querySelector('.tree-navigation-icon');
    expect(clothingIcon).toHaveClass('icon-collapsed');

    // Click to expand Clothing
    const clothingToggle = clothingItem?.querySelector('.tree-navigation-icon-button');
    if (clothingToggle) fireEvent.click(clothingToggle);

    // Icon should be updated
    clothingIcon = clothingItem?.querySelector('.tree-navigation-icon');
    expect(clothingIcon).toHaveClass('icon-expanded');
  });
});
