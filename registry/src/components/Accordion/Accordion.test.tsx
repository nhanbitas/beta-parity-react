import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Accordion, AccordionItem, AccordionItemTrigger, AccordionItemContent } from './index';

describe('Accordion Component', () => {
  describe('Rendering', () => {
    it('renders correctly', () => {
      const { container } = render(
        <Accordion>
          <AccordionItem value="item-1">
            <AccordionItemTrigger>Item 1</AccordionItemTrigger>
            <AccordionItemContent>Content 1</AccordionItemContent>
          </AccordionItem>
        </Accordion>
      );
      expect(container.querySelector('.accordion')).toBeInTheDocument();
    });

    it('renders with items prop', () => {
      render(
        <Accordion
          items={[
            { value: '1', title: 'Title 1', content: 'Content 1' },
            { value: '2', title: 'Title 2', content: 'Content 2' }
          ]}
        />
      );
      expect(screen.getByText('Title 1')).toBeInTheDocument();
      expect(screen.getByText('Title 2')).toBeInTheDocument();
    });

    it('renders multiple accordion items', () => {
      render(
        <Accordion>
          <AccordionItem value="1">
            <AccordionItemTrigger>Item 1</AccordionItemTrigger>
            <AccordionItemContent>Content 1</AccordionItemContent>
          </AccordionItem>
          <AccordionItem value="2">
            <AccordionItemTrigger>Item 2</AccordionItemTrigger>
            <AccordionItemContent>Content 2</AccordionItemContent>
          </AccordionItem>
        </Accordion>
      );
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });
  });

  describe('Type variants', () => {
    it('renders single type by default', () => {
      const { container } = render(
        <Accordion>
          <AccordionItem value="1">
            <AccordionItemTrigger>Item 1</AccordionItemTrigger>
            <AccordionItemContent>Content 1</AccordionItemContent>
          </AccordionItem>
        </Accordion>
      );
      expect(container.querySelector('.accordion')).toBeInTheDocument();
    });

    it('renders multiple type', () => {
      render(
        <Accordion type="multiple">
          <AccordionItem value="1">
            <AccordionItemTrigger>Item 1</AccordionItemTrigger>
            <AccordionItemContent>Content 1</AccordionItemContent>
          </AccordionItem>
        </Accordion>
      );
      expect(screen.getByText('Item 1')).toBeInTheDocument();
    });
  });

  describe('Kind variants', () => {
    it('renders contained kind by default', () => {
      const { container } = render(
        <Accordion>
          <AccordionItem value="1">
            <AccordionItemTrigger>Item</AccordionItemTrigger>
            <AccordionItemContent>Content</AccordionItemContent>
          </AccordionItem>
        </Accordion>
      );
      expect(container.querySelector('.accordion.contained')).toBeInTheDocument();
    });

    it('renders flush kind', () => {
      const { container } = render(
        <Accordion kind="flush">
          <AccordionItem value="1">
            <AccordionItemTrigger>Item</AccordionItemTrigger>
            <AccordionItemContent>Content</AccordionItemContent>
          </AccordionItem>
        </Accordion>
      );
      expect(container.querySelector('.accordion.flush')).toBeInTheDocument();
    });
  });

  describe('Icon variants', () => {
    it('renders chevron icon by default', () => {
      const { container } = render(
        <Accordion>
          <AccordionItem value="1">
            <AccordionItemTrigger>Item</AccordionItemTrigger>
            <AccordionItemContent>Content</AccordionItemContent>
          </AccordionItem>
        </Accordion>
      );
      expect(container.querySelector('.chevron-trigger')).toBeInTheDocument();
    });

    it('renders cross icon', () => {
      const { container } = render(
        <Accordion icon="cross">
          <AccordionItem value="1">
            <AccordionItemTrigger>Item</AccordionItemTrigger>
            <AccordionItemContent>Content</AccordionItemContent>
          </AccordionItem>
        </Accordion>
      );
      expect(container.querySelector('.cross-trigger')).toBeInTheDocument();
    });
  });

  describe('Icon side', () => {
    it('renders icon on right by default', () => {
      const { container } = render(
        <Accordion>
          <AccordionItem value="1">
            <AccordionItemTrigger>Item</AccordionItemTrigger>
            <AccordionItemContent>Content</AccordionItemContent>
          </AccordionItem>
        </Accordion>
      );
      expect(container.querySelector('.icon-right')).toBeInTheDocument();
    });

    it('renders icon on left', () => {
      const { container } = render(
        <Accordion iconSide="left">
          <AccordionItem value="1">
            <AccordionItemTrigger>Item</AccordionItemTrigger>
            <AccordionItemContent>Content</AccordionItemContent>
          </AccordionItem>
        </Accordion>
      );
      expect(container.querySelector('.icon-left')).toBeInTheDocument();
    });
  });

  describe('Single mode interactions', () => {
    it('expands item on click', async () => {
      const { container } = render(
        <Accordion type="single">
          <AccordionItem value="1">
            <AccordionItemTrigger>Item 1</AccordionItemTrigger>
            <AccordionItemContent>Content 1</AccordionItemContent>
          </AccordionItem>
        </Accordion>
      );

      const trigger = screen.getByText('Item 1');
      await userEvent.click(trigger);

      expect(container.querySelector('.accordion-item.active')).toBeInTheDocument();
    });

    it('collapses expanded item on second click', async () => {
      const { container } = render(
        <Accordion type="single" defaultValue="1">
          <AccordionItem value="1">
            <AccordionItemTrigger>Item 1</AccordionItemTrigger>
            <AccordionItemContent>Content 1</AccordionItemContent>
          </AccordionItem>
        </Accordion>
      );

      const trigger = screen.getByText('Item 1');
      await userEvent.click(trigger);

      expect(container.querySelector('.accordion-item.active')).not.toBeInTheDocument();
    });

    it('expands only one item at a time', async () => {
      const { container } = render(
        <Accordion type="single">
          <AccordionItem value="1">
            <AccordionItemTrigger>Item 1</AccordionItemTrigger>
            <AccordionItemContent>Content 1</AccordionItemContent>
          </AccordionItem>
          <AccordionItem value="2">
            <AccordionItemTrigger>Item 2</AccordionItemTrigger>
            <AccordionItemContent>Content 2</AccordionItemContent>
          </AccordionItem>
        </Accordion>
      );

      await userEvent.click(screen.getByText('Item 1'));
      await userEvent.click(screen.getByText('Item 2'));

      const activeItems = container.querySelectorAll('.accordion-item.active');
      expect(activeItems.length).toBe(1);
    });

    it('calls onChange when item is expanded', async () => {
      const handleChange = jest.fn();
      render(
        <Accordion type="single" onChange={handleChange}>
          <AccordionItem value="1">
            <AccordionItemTrigger>Item 1</AccordionItemTrigger>
            <AccordionItemContent>Content 1</AccordionItemContent>
          </AccordionItem>
        </Accordion>
      );

      await userEvent.click(screen.getByText('Item 1'));
      expect(handleChange).toHaveBeenCalledWith('1');
    });
  });

  describe('Multiple mode interactions', () => {
    it('allows multiple items to be expanded', async () => {
      const { container } = render(
        <Accordion type="multiple">
          <AccordionItem value="1">
            <AccordionItemTrigger>Item 1</AccordionItemTrigger>
            <AccordionItemContent>Content 1</AccordionItemContent>
          </AccordionItem>
          <AccordionItem value="2">
            <AccordionItemTrigger>Item 2</AccordionItemTrigger>
            <AccordionItemContent>Content 2</AccordionItemContent>
          </AccordionItem>
        </Accordion>
      );

      await userEvent.click(screen.getByText('Item 1'));
      await userEvent.click(screen.getByText('Item 2'));

      const activeItems = container.querySelectorAll('.accordion-item.active');
      expect(activeItems.length).toBe(2);
    });

    it('calls onChange with array when item is expanded', async () => {
      const handleChange = jest.fn();
      render(
        <Accordion type="multiple" onChange={handleChange}>
          <AccordionItem value="1">
            <AccordionItemTrigger>Item 1</AccordionItemTrigger>
            <AccordionItemContent>Content 1</AccordionItemContent>
          </AccordionItem>
        </Accordion>
      );

      await userEvent.click(screen.getByText('Item 1'));
      expect(handleChange).toHaveBeenCalledWith(['1']);
    });
  });

  describe('Default value', () => {
    it('expands item with defaultValue in single mode', () => {
      const { container } = render(
        <Accordion type="single" defaultValue="1">
          <AccordionItem value="1">
            <AccordionItemTrigger>Item 1</AccordionItemTrigger>
            <AccordionItemContent>Content 1</AccordionItemContent>
          </AccordionItem>
        </Accordion>
      );

      expect(container.querySelector('.accordion-item.active')).toBeInTheDocument();
    });

    it('expands items with defaultValue in multiple mode', () => {
      const { container } = render(
        <Accordion type="multiple" defaultValue={['1', '2']}>
          <AccordionItem value="1">
            <AccordionItemTrigger>Item 1</AccordionItemTrigger>
            <AccordionItemContent>Content 1</AccordionItemContent>
          </AccordionItem>
          <AccordionItem value="2">
            <AccordionItemTrigger>Item 2</AccordionItemTrigger>
            <AccordionItemContent>Content 2</AccordionItemContent>
          </AccordionItem>
        </Accordion>
      );

      const activeItems = container.querySelectorAll('.accordion-item.active');
      expect(activeItems.length).toBe(2);
    });
  });

  describe('Disabled state', () => {
    it('disables accordion item', () => {
      render(
        <Accordion>
          <AccordionItem value="1" disabled>
            <AccordionItemTrigger>Item 1</AccordionItemTrigger>
            <AccordionItemContent>Content 1</AccordionItemContent>
          </AccordionItem>
        </Accordion>
      );

      const trigger = screen.getByText('Item 1');
      expect(trigger).toBeDisabled();
    });

    it('does not expand disabled item on click', async () => {
      const { container } = render(
        <Accordion>
          <AccordionItem value="1" disabled>
            <AccordionItemTrigger>Item 1</AccordionItemTrigger>
            <AccordionItemContent>Content 1</AccordionItemContent>
          </AccordionItem>
        </Accordion>
      );

      await userEvent.click(screen.getByText('Item 1'));
      expect(container.querySelector('.accordion-item.active')).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has aria-expanded on trigger', () => {
      render(
        <Accordion>
          <AccordionItem value="1">
            <AccordionItemTrigger>Item 1</AccordionItemTrigger>
            <AccordionItemContent>Content 1</AccordionItemContent>
          </AccordionItem>
        </Accordion>
      );

      const trigger = screen.getByText('Item 1');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });

    it('updates aria-expanded when expanded', async () => {
      render(
        <Accordion>
          <AccordionItem value="1">
            <AccordionItemTrigger>Item 1</AccordionItemTrigger>
            <AccordionItemContent>Content 1</AccordionItemContent>
          </AccordionItem>
        </Accordion>
      );

      const trigger = screen.getByText('Item 1');
      await userEvent.click(trigger);

      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });

    it('has aria-disabled on disabled item', () => {
      const { container } = render(
        <Accordion>
          <AccordionItem value="1" disabled>
            <AccordionItemTrigger>Item 1</AccordionItemTrigger>
            <AccordionItemContent>Content 1</AccordionItemContent>
          </AccordionItem>
        </Accordion>
      );

      expect(container.querySelector('.accordion-item')).toHaveAttribute('aria-disabled', 'true');
    });

    it('forwards ref correctly', () => {
      const ref = jest.fn();
      render(
        <Accordion ref={ref}>
          <AccordionItem value="1">
            <AccordionItemTrigger>Item</AccordionItemTrigger>
            <AccordionItemContent>Content</AccordionItemContent>
          </AccordionItem>
        </Accordion>
      );
      expect(ref).toHaveBeenCalled();
    });

    it('applies custom className', () => {
      const { container } = render(
        <Accordion className="custom-accordion">
          <AccordionItem value="1">
            <AccordionItemTrigger>Item</AccordionItemTrigger>
            <AccordionItemContent>Content</AccordionItemContent>
          </AccordionItem>
        </Accordion>
      );
      expect(container.querySelector('.accordion')).toHaveClass('custom-accordion');
    });
  });
});
