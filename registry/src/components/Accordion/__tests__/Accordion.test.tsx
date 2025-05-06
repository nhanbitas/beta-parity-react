import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Accordion, AccordionItem, AccordionItemTrigger, AccordionItemContent } from '../index';

// Mock Lucide icons
jest.mock('lucide-react', () => ({
  ChevronDown: () => <div data-testid='chevron-down-icon' />,
  Minus: () => <div data-testid='minus-icon' />,
  Plus: () => <div data-testid='plus-icon' />
}));

// Test data
const accordionItems = [
  { title: 'Item 1', content: 'Content 1', value: 'item1' },
  { title: 'Item 2', content: 'Content 2', value: 'item2' },
  { title: 'Item 3', content: 'Content 3', value: 'item3', itemProps: { disabled: true } }
];

describe('Accordion Component', () => {
  // Test basic rendering with items prop
  test('renders accordion with items prop', () => {
    render(<Accordion items={accordionItems} />);

    // Check if all item titles are rendered
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();

    // Initially, all content should be hidden in single mode
    expect(screen.queryByText('Content 1')).toBeInTheDocument();
    expect(screen.queryByText('Content 2')).toBeInTheDocument();
    expect(screen.queryByText('Content 3')).toBeInTheDocument();

    // Third item should be disabled
    const thirdItemBtn = screen.getByText('Item 3').closest('button');
    expect(thirdItemBtn).toBeDisabled();
  });

  // Test rendering with children components
  test('renders accordion with children components', () => {
    render(
      <Accordion>
        <AccordionItem value='item1'>
          <AccordionItemTrigger>Item 1</AccordionItemTrigger>
          <AccordionItemContent>Content 1</AccordionItemContent>
        </AccordionItem>
        <AccordionItem value='item2'>
          <AccordionItemTrigger>Item 2</AccordionItemTrigger>
          <AccordionItemContent>Content 2</AccordionItemContent>
        </AccordionItem>
        <AccordionItem value='item3' disabled>
          <AccordionItemTrigger>Item 3</AccordionItemTrigger>
          <AccordionItemContent>Content 3</AccordionItemContent>
        </AccordionItem>
      </Accordion>
    );

    // Check if all item titles are rendered
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();

    // Initially, all content should be in the DOM but visually hidden
    expect(screen.queryByText('Content 1')).toBeInTheDocument();
    expect(screen.queryByText('Content 2')).toBeInTheDocument();
    expect(screen.queryByText('Content 3')).toBeInTheDocument();

    // Third item should be disabled
    const thirdItemBtn = screen.getByText('Item 3').closest('button');
    expect(thirdItemBtn).toHaveAttribute('disabled');
  });

  // Test item expansion in single mode
  test('expands item when clicked in single mode', () => {
    render(<Accordion items={accordionItems} />);

    // Click the first item
    fireEvent.click(screen.getByText('Item 1'));

    // First accordion item should have 'active' class
    const firstItem = screen.getByText('Item 1').closest('.accordion-item');
    expect(firstItem).toHaveClass('active');

    // Click the second item
    fireEvent.click(screen.getByText('Item 2'));

    // First item should no longer be active, but second item should be
    expect(firstItem).not.toHaveClass('active');
    const secondItem = screen.getByText('Item 2').closest('.accordion-item');
    expect(secondItem).toHaveClass('active');
  });

  // Test item expansion in multiple mode
  test('expands multiple items when clicked in multiple mode', () => {
    render(<Accordion items={accordionItems} type='multiple' />);

    // Click the first item
    fireEvent.click(screen.getByText('Item 1'));

    // First accordion item should have 'active' class
    const firstItem = screen.getByText('Item 1').closest('.accordion-item');
    expect(firstItem).toHaveClass('active');

    // Click the second item
    fireEvent.click(screen.getByText('Item 2'));

    // Both items should be active
    expect(firstItem).toHaveClass('active');
    const secondItem = screen.getByText('Item 2').closest('.accordion-item');
    expect(secondItem).toHaveClass('active');
  });

  // Test item collapse when clicked again
  test('collapses item when clicked again', () => {
    render(<Accordion items={accordionItems} />);

    // Click the first item to expand
    fireEvent.click(screen.getByText('Item 1'));

    // First accordion item should have 'active' class
    const firstItem = screen.getByText('Item 1').closest('.accordion-item');
    expect(firstItem).toHaveClass('active');

    // Click the first item again to collapse
    fireEvent.click(screen.getByText('Item 1'));

    // First item should no longer be active
    expect(firstItem).not.toHaveClass('active');
  });

  // Test default value in single mode
  test('respects defaultValue in single mode', () => {
    render(<Accordion items={accordionItems} defaultValue='item2' />);

    // Second accordion item should be active by default
    const secondItem = screen.getByText('Item 2').closest('.accordion-item');
    expect(secondItem).toHaveClass('active');
  });

  // Test default value in multiple mode
  test('respects defaultValue in multiple mode', () => {
    render(<Accordion items={accordionItems} type='multiple' defaultValue={['item1', 'item3']} />);

    // First and third accordion items should be active by default
    const firstItem = screen.getByText('Item 1').closest('.accordion-item');
    expect(firstItem).toHaveClass('active');

    const thirdItem = screen.getByText('Item 3').closest('.accordion-item');
    expect(thirdItem).toHaveClass('active');
  });

  // Test controlled component with value prop
  test('works as controlled component with value prop', () => {
    const { rerender } = render(<Accordion items={accordionItems} value='item1' />);

    // First accordion item should be active
    const firstItem = screen.getByText('Item 1').closest('.accordion-item');
    expect(firstItem).toHaveClass('active');

    // Update the value prop
    rerender(<Accordion items={accordionItems} value='item2' />);

    // Second accordion item should now be active
    const secondItem = screen.getByText('Item 2').closest('.accordion-item');
    expect(secondItem).toHaveClass('active');
    expect(firstItem).not.toHaveClass('active');
  });

  // Test controlled component with multiple values
  test('works as controlled component with multiple values', () => {
    const { rerender } = render(<Accordion items={accordionItems} type='multiple' value={['item1', 'item2']} />);

    // First and second accordion items should be active
    const firstItem = screen.getByText('Item 1').closest('.accordion-item');
    const secondItem = screen.getByText('Item 2').closest('.accordion-item');
    expect(firstItem).toHaveClass('active');
    expect(secondItem).toHaveClass('active');

    // Update the value prop
    rerender(<Accordion items={accordionItems} type='multiple' value={['item2']} />);

    // Only second accordion item should now be active
    expect(firstItem).not.toHaveClass('active');
    expect(secondItem).toHaveClass('active');
  });

  // Test onChange callback in single mode
  test('calls onChange when item is clicked in single mode', () => {
    const handleChange = jest.fn();
    render(<Accordion items={accordionItems} onChange={handleChange} />);

    // Click the first item
    fireEvent.click(screen.getByText('Item 1'));

    expect(handleChange).toHaveBeenCalledWith('item1');

    // Click the second item
    fireEvent.click(screen.getByText('Item 2'));

    expect(handleChange).toHaveBeenCalledWith('item2');

    // Click the second item again to collapse
    fireEvent.click(screen.getByText('Item 2'));

    expect(handleChange).toHaveBeenCalledWith('');
  });

  // Test onChange callback in multiple mode
  test('calls onChange when item is clicked in multiple mode', () => {
    const handleChange = jest.fn();
    render(<Accordion items={accordionItems} type='multiple' onChange={handleChange} />);

    // Click the first item
    fireEvent.click(screen.getByText('Item 1'));

    expect(handleChange).toHaveBeenCalledWith(['item1']);

    // Click the second item
    fireEvent.click(screen.getByText('Item 2'));

    expect(handleChange).toHaveBeenCalledWith(['item1', 'item2']);

    // Click the first item again to collapse
    fireEvent.click(screen.getByText('Item 1'));

    expect(handleChange).toHaveBeenCalledWith(['item2']);
  });

  // Test different kinds
  test('renders with different kinds', () => {
    const { rerender } = render(<Accordion items={accordionItems} kind='contained' />);

    expect(screen.getByText('Item 1').closest('.accordion')).toHaveClass('contained');

    rerender(<Accordion items={accordionItems} kind='flush' />);

    expect(screen.getByText('Item 1').closest('.accordion')).toHaveClass('flush');
  });

  // Test icon types
  test('renders with different icon types', () => {
    const { rerender } = render(<Accordion items={accordionItems} icon='chevron' />);

    // Default is chevron
    expect(screen.getAllByTestId('chevron-down-icon').length).toBeGreaterThan(0);
    expect(screen.queryByTestId('plus-icon')).not.toBeInTheDocument();

    rerender(<Accordion items={accordionItems} icon='cross' />);

    // Should use plus/minus icons
    expect(screen.getAllByTestId('plus-icon').length).toBeGreaterThan(0);
    expect(screen.queryByTestId('chevron-down-icon')).not.toBeInTheDocument();
  });

  // Test icon side
  test('renders icon on different sides', () => {
    const { rerender } = render(<Accordion items={accordionItems} iconSide='right' />);

    let triggers = screen.getAllByRole('button');
    triggers.forEach((trigger) => {
      expect(trigger).toHaveClass('icon-right');
      expect(trigger).not.toHaveClass('icon-left');
    });

    rerender(<Accordion items={accordionItems} iconSide='left' />);

    triggers = screen.getAllByRole('button');
    triggers.forEach((trigger) => {
      expect(trigger).toHaveClass('icon-left');
      expect(trigger).not.toHaveClass('icon-right');
    });
  });

  // Test nested accordions
  test('renders nested accordions', () => {
    render(
      <Accordion>
        <AccordionItem value='item1'>
          <AccordionItemTrigger>Item 1</AccordionItemTrigger>
          <AccordionItemContent>
            <Accordion>
              <AccordionItem value='nested1'>
                <AccordionItemTrigger>Nested 1</AccordionItemTrigger>
                <AccordionItemContent>Nested Content 1</AccordionItemContent>
              </AccordionItem>
            </Accordion>
          </AccordionItemContent>
        </AccordionItem>
      </Accordion>
    );

    // Click outer accordion
    fireEvent.click(screen.getByText('Item 1'));

    // Inner accordion should be visible
    expect(screen.getByText('Nested 1')).toBeInTheDocument();

    // Click inner accordion
    fireEvent.click(screen.getByText('Nested 1'));

    // Inner content should be visible
    expect(screen.getByText('Nested Content 1')).toBeInTheDocument();
  });
});

describe('AccordionItem Component', () => {
  test('renders with correct attributes', () => {
    render(
      <AccordionItem value='test' disabled>
        <div>Test Content</div>
      </AccordionItem>
    );

    const item = screen.getByText('Test Content').closest('.accordion-item');
    expect(item).toHaveAttribute('aria-disabled', 'true');
  });
});

describe('AccordionItemTrigger Component', () => {
  test('renders with correct attributes and icons', () => {
    const { rerender } = render(
      <AccordionItemTrigger icon='chevron' iconSide='right' isExpanded={false}>
        Trigger Text
      </AccordionItemTrigger>
    );

    const trigger = screen.getByText('Trigger Text').closest('button');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger).toHaveClass('icon-right');
    expect(screen.getByTestId('chevron-down-icon')).toBeInTheDocument();

    rerender(
      <AccordionItemTrigger icon='cross' iconSide='left' isExpanded={true}>
        Trigger Text
      </AccordionItemTrigger>
    );

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(trigger).toHaveClass('icon-left');
    expect(screen.getByTestId('minus-icon')).toBeInTheDocument();
  });

  test('calls handleChange when clicked', () => {
    const handleChange = jest.fn();
    render(<AccordionItemTrigger handleChange={handleChange}>Trigger Text</AccordionItemTrigger>);

    fireEvent.click(screen.getByText('Trigger Text'));
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});

describe('AccordionItemContent Component', () => {
  test('renders content', () => {
    render(<AccordionItemContent>Content Text</AccordionItemContent>);

    expect(screen.getByText('Content Text')).toBeInTheDocument();
    expect(screen.getByText('Content Text').closest('div')).toHaveClass('accordion-item-content');
  });

  test('applies custom className', () => {
    render(<AccordionItemContent className='custom-class'>Content Text</AccordionItemContent>);

    expect(screen.getByText('Content Text').closest('div')).toHaveClass('accordion-item-content', 'custom-class');
  });
});
