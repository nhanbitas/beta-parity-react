import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Tabs, TabButton, TabContent } from '../index';

// Mock the Button component
jest.mock('../../Button', () => ({
  Button: ({ children, onClick, disabled, ...props }: any) => (
    <button
      onClick={onClick}
      disabled={disabled}
      data-testid={props.className?.includes('scroll-right') ? 'scroll-right' : 'scroll-left'}
      {...props}
    >
      {children}
    </button>
  )
}));

// Mock Lucide-react icons
jest.mock('lucide-react', () => ({
  ChevronLeft: () => <div data-testid='chevron-left' />,
  ChevronRight: () => <div data-testid='chevron-right' />
}));

// Test data
const tabsData = [
  { value: 'tab1', title: 'Tab 1', content: 'Content 1' },
  { value: 'tab2', title: 'Tab 2', content: 'Content 2' },
  { value: 'tab3', title: 'Tab 3', content: 'Content 3', disabled: true }
];

describe('Tabs Component', () => {
  // Test basic rendering with data prop
  test('renders tabs with data prop', () => {
    render(<Tabs data={tabsData} />);

    // Check tab buttons
    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Tab 2')).toBeInTheDocument();
    expect(screen.getByText('Tab 3')).toBeInTheDocument();

    // First tab should be active by default and its content should be visible
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();

    // Third tab should be disabled
    const thirdTabButton = screen.getByText('Tab 3').closest('button');
    expect(thirdTabButton).toBeDisabled();
  });

  // Test rendering with children
  test('renders tabs with children components', () => {
    render(
      <Tabs>
        <TabButton value='tab1'>Tab 1</TabButton>
        <TabContent value='tab1'>Content 1</TabContent>

        <TabButton value='tab2'>Tab 2</TabButton>
        <TabContent value='tab2'>Content 2</TabContent>

        <TabButton value='tab3' disabled>
          Tab 3
        </TabButton>
        <TabContent value='tab3'>Content 3</TabContent>
      </Tabs>
    );

    // Check tab buttons
    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Tab 2')).toBeInTheDocument();
    expect(screen.getByText('Tab 3')).toBeInTheDocument();

    // First tab should be active by default and its content should be visible
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();

    // Third tab should be disabled
    const thirdTabButton = screen.getByText('Tab 3').closest('button');
    expect(thirdTabButton).toBeDisabled();
  });

  // Test tab switching
  test('switches tabs when clicked', () => {
    render(<Tabs data={tabsData} />);

    // First tab is active by default
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();

    // Click on second tab
    fireEvent.click(screen.getByText('Tab 2'));

    // Second tab content should now be visible
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });

  // Test initial active tab
  test('respects the active prop for initial tab selection', () => {
    const tabsDataWithActive = [
      { value: 'tab1', title: 'Tab 1', content: 'Content 1' },
      { value: 'tab2', title: 'Tab 2', content: 'Content 2', active: true },
      { value: 'tab3', title: 'Tab 3', content: 'Content 3' }
    ];

    render(<Tabs data={tabsDataWithActive} />);

    // Second tab should be active by default
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });

  // Test different sizes
  test('renders with different sizes', () => {
    const { rerender } = render(<Tabs data={tabsData} size='sm' />);

    expect(screen.getByText('Tab 1').closest('.tabs')).toHaveClass('small');

    rerender(<Tabs data={tabsData} size='md' />);
    expect(screen.getByText('Tab 1').closest('.tabs')).toHaveClass('medium');
  });

  // Test different colors
  test('renders with different colors', () => {
    const { rerender } = render(<Tabs data={tabsData} color='neutral' />);

    expect(screen.getByText('Tab 1').closest('.tabs')).toHaveClass('neutral');

    rerender(<Tabs data={tabsData} color='accent' />);
    expect(screen.getByText('Tab 1').closest('.tabs')).toHaveClass('accent');
  });

  // Test different themes
  test('renders with different themes', () => {
    const { rerender } = render(<Tabs data={tabsData} theme='default' />);

    expect(screen.getByText('Tab 1').closest('.tabs')).toHaveClass('default');

    rerender(<Tabs data={tabsData} theme='alternative' />);
    expect(screen.getByText('Tab 1').closest('.tabs')).toHaveClass('alternative');
  });

  // Test different sides
  test('renders with tabs on different sides', () => {
    const sides: Array<'left' | 'right' | 'top' | 'bottom'> = ['left', 'right', 'top', 'bottom'];

    sides.forEach((side) => {
      const { unmount } = render(<Tabs data={tabsData} side={side} />);

      expect(screen.getByText('Tab 1').closest('.tabs')).toHaveClass(side);

      // Check for correct direction class
      if (side === 'left' || side === 'right') {
        expect(screen.getByText('Tab 1').closest('.tabs')).toHaveClass('vertical');
      } else {
        expect(screen.getByText('Tab 1').closest('.tabs')).toHaveClass('horizontal');
      }

      unmount();
    });
  });

  // Test flipped tabs
  test('renders with flipped tabs', () => {
    render(<Tabs data={tabsData} flipped />);

    expect(screen.getByText('Tab 1').closest('.tabs-nav-wrapper')).toHaveClass('flipped');
  });

  // Test indicator side
  test('renders with different indicator sides', () => {
    const { rerender } = render(<Tabs data={tabsData} indicatorSide='same' />);

    expect(screen.getByText('Tab 1').closest('.tabs-nav-wrapper')).toHaveClass('same');

    rerender(<Tabs data={tabsData} indicatorSide='opposite' />);
    expect(screen.getByText('Tab 1').closest('.tabs-nav-wrapper')).toHaveClass('opposite');
  });

  // Test scroll navigation
  test('renders scroll buttons when needed', () => {
    // Mock ResizeObserver
    const origResizeObserver = window.ResizeObserver;
    window.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn()
    }));

    // Mock Element.clientWidth and scrollWidth to simulate overflow
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', { configurable: true, value: 100 });
    Object.defineProperty(HTMLElement.prototype, 'scrollWidth', { configurable: true, value: 300 });

    render(<Tabs data={tabsData} />);

    // Scroll buttons should be visible for horizontal tabs
    expect(screen.getByTestId('scroll-left')).toBeInTheDocument();
    expect(screen.getByTestId('scroll-right')).toBeInTheDocument();

    // Restore mock
    window.ResizeObserver = origResizeObserver;
  });

  // Test custom props for nav and body
  test('passes custom props to nav and body', () => {
    render(
      <Tabs data={tabsData} navProps={{ 'data-testid': 'custom-nav' }} bodyProps={{ 'data-testid': 'custom-body' }} />
    );

    expect(screen.getByTestId('custom-nav')).toBeInTheDocument();
    expect(screen.getByTestId('custom-body')).toBeInTheDocument();
  });
});

describe('TabButton Component', () => {
  test('renders with basic props', () => {
    render(<TabButton value='tab1'>Tab 1</TabButton>);

    const button = screen.getByText('Tab 1');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('tab-button');
  });

  test('applies animation direction class', () => {
    const { rerender } = render(
      <TabButton value='tab1' amimatedDirection='from-left'>
        Tab 1
      </TabButton>
    );

    expect(screen.getByText('Tab 1')).toHaveClass('from-left');

    rerender(
      <TabButton value='tab1' amimatedDirection='from-right'>
        Tab 1
      </TabButton>
    );
    expect(screen.getByText('Tab 1')).toHaveClass('from-right');
  });

  test('handles click events', () => {
    const handleClick = jest.fn();
    render(
      <TabButton value='tab1' onClick={handleClick}>
        Tab 1
      </TabButton>
    );

    fireEvent.click(screen.getByText('Tab 1'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

describe('TabContent Component', () => {
  test('renders content with proper class', () => {
    render(<TabContent value='tab1'>Content 1</TabContent>);

    const content = screen.getByText('Content 1');
    expect(content).toBeInTheDocument();
    expect(content.closest('div')).toHaveClass('tab-content');
  });

  test('applies custom className', () => {
    render(
      <TabContent value='tab1' className='custom-content'>
        Content 1
      </TabContent>
    );

    expect(screen.getByText('Content 1').closest('div')).toHaveClass('tab-content', 'custom-content');
  });
});
