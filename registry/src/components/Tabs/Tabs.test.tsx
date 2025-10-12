import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs, TabButton, TabContent } from './index';

describe('Tabs Component', () => {
  const mockData = [
    { value: '1', title: 'Tab 1', content: 'Content 1' },
    { value: '2', title: 'Tab 2', content: 'Content 2' },
    { value: '3', title: 'Tab 3', content: 'Content 3' }
  ];

  describe('Rendering', () => {
    it('renders correctly', () => {
      const { container } = render(<Tabs data={mockData} />);
      expect(container.querySelector('.tabs')).toBeInTheDocument();
    });

    it('renders with data prop', () => {
      render(<Tabs data={mockData} />);
      expect(screen.getByText('Tab 1')).toBeInTheDocument();
      expect(screen.getByText('Tab 2')).toBeInTheDocument();
      expect(screen.getByText('Tab 3')).toBeInTheDocument();
    });

    it('renders with children', () => {
      render(
        <Tabs>
          <TabButton value="1">Button 1</TabButton>
          <TabContent value="1">Content 1</TabContent>
        </Tabs>
      );
      expect(screen.getByText('Button 1')).toBeInTheDocument();
    });

    it('shows first tab content by default', () => {
      render(<Tabs data={mockData} />);
      expect(screen.getByText('Content 1')).toBeInTheDocument();
    });
  });

  describe('Size variants', () => {
    it('renders small size', () => {
      const { container } = render(<Tabs size="sm" data={mockData} />);
      expect(container.querySelector('.tabs')).toHaveClass('small');
    });

    it('renders medium size (default)', () => {
      const { container } = render(<Tabs data={mockData} />);
      expect(container.querySelector('.tabs')).toHaveClass('medium');
    });
  });

  describe('Color variants', () => {
    it('renders neutral color by default', () => {
      const { container } = render(<Tabs data={mockData} />);
      expect(container.querySelector('.tabs')).toHaveClass('neutral');
    });

    it('renders accent color', () => {
      const { container } = render(<Tabs color="accent" data={mockData} />);
      expect(container.querySelector('.tabs')).toHaveClass('accent');
    });
  });

  describe('Theme variants', () => {
    it('renders default theme', () => {
      const { container } = render(<Tabs data={mockData} />);
      expect(container.querySelector('.tabs')).toHaveClass('default');
    });

    it('renders alternative theme', () => {
      const { container } = render(<Tabs theme="alternative" data={mockData} />);
      expect(container.querySelector('.tabs')).toHaveClass('alternative');
    });
  });

  describe('Side variants', () => {
    it('renders left side by default', () => {
      const { container } = render(<Tabs data={mockData} />);
      expect(container.querySelector('.tabs')).toHaveClass('left');
    });

    it('renders right side', () => {
      const { container } = render(<Tabs side="right" data={mockData} />);
      expect(container.querySelector('.tabs')).toHaveClass('right');
    });

    it('renders top side', () => {
      const { container } = render(<Tabs side="top" data={mockData} />);
      expect(container.querySelector('.tabs')).toHaveClass('top');
    });

    it('renders bottom side', () => {
      const { container } = render(<Tabs side="bottom" data={mockData} />);
      expect(container.querySelector('.tabs')).toHaveClass('bottom');
    });
  });

  describe('Orientation', () => {
    it('has horizontal direction for left/right sides', () => {
      const { container } = render(<Tabs side="left" data={mockData} />);
      expect(container.querySelector('.tabs')).toHaveClass('vertical');
    });

    it('has horizontal direction for top/bottom sides', () => {
      const { container } = render(<Tabs side="top" data={mockData} />);
      expect(container.querySelector('.tabs')).toHaveClass('horizontal');
    });
  });

  describe('Tab interactions', () => {
    it('switches tab on click', async () => {
      render(<Tabs data={mockData} />);

      await userEvent.click(screen.getByText('Tab 2'));

      expect(screen.getByText('Content 2')).toBeInTheDocument();
      expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    });

    it('marks active tab', async () => {
      const { container } = render(<Tabs data={mockData} />);

      await userEvent.click(screen.getByText('Tab 2'));

      const buttons = container.querySelectorAll('.tab-button');
      expect(buttons[1]).toHaveClass('active');
    });

    it('shows only one tab content at a time', async () => {
      const { container } = render(<Tabs data={mockData} />);

      await userEvent.click(screen.getByText('Tab 2'));

      const contents = container.querySelectorAll('.tab-content');
      expect(contents.length).toBe(1);
    });
  });

  describe('Default active tab', () => {
    it('activates tab with active prop', () => {
      const dataWithActive = [
        { value: '1', title: 'Tab 1', content: 'Content 1' },
        { value: '2', title: 'Tab 2', content: 'Content 2', active: true },
        { value: '3', title: 'Tab 3', content: 'Content 3' }
      ];

      render(<Tabs data={dataWithActive} />);
      expect(screen.getByText('Content 2')).toBeInTheDocument();
    });
  });

  describe('Disabled tabs', () => {
    it('disables tab button', () => {
      const dataWithDisabled = [
        { value: '1', title: 'Tab 1', content: 'Content 1' },
        { value: '2', title: 'Tab 2', content: 'Content 2', disabled: true }
      ];

      render(<Tabs data={dataWithDisabled} />);

      const buttons = screen.getAllByRole('button');
      const disabledButton = buttons.find((btn) => btn.textContent === 'Tab 2');
      expect(disabledButton).toBeDisabled();
    });

    it('does not switch to disabled tab on click', async () => {
      const dataWithDisabled = [
        { value: '1', title: 'Tab 1', content: 'Content 1' },
        { value: '2', title: 'Tab 2', content: 'Content 2', disabled: true }
      ];

      render(<Tabs data={dataWithDisabled} />);

      const buttons = screen.getAllByRole('button');
      const disabledButton = buttons.find((btn) => btn.textContent === 'Tab 2');
      await userEvent.click(disabledButton as HTMLButtonElement);

      expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
    });
  });

  describe('Flipped prop', () => {
    it('applies flipped class', () => {
      const { container } = render(<Tabs flipped data={mockData} />);
      expect(container.querySelector('.tabs-nav-wrapper')).toHaveClass('flipped');
    });
  });

  describe('Indicator side', () => {
    it('renders same indicator side by default', () => {
      const { container } = render(<Tabs data={mockData} />);
      expect(container.querySelector('.tabs-nav-wrapper')).toHaveClass('same');
    });

    it('renders opposite indicator side', () => {
      const { container } = render(<Tabs indicatorSide="opposite" data={mockData} />);
      expect(container.querySelector('.tabs-nav-wrapper')).toHaveClass('opposite');
    });
  });

  describe('Custom props', () => {
    it('applies navProps to nav wrapper', () => {
      const { container } = render(<Tabs data={mockData} navProps={{ className: 'custom-nav' }} />);
      expect(container.querySelector('.tabs-nav')).toHaveClass('custom-nav');
    });

    it('applies bodyProps to body wrapper', () => {
      const { container } = render(<Tabs data={mockData} bodyProps={{ className: 'custom-body' }} />);
      expect(container.querySelector('.tabs-body')).toHaveClass('custom-body');
    });
  });

  describe('Accessibility', () => {
    it('tab buttons have type="button"', () => {
      render(<Tabs data={mockData} />);
      const buttons = screen.getAllByRole('button');
      buttons.forEach((button) => {
        expect(button).toHaveAttribute('type', 'button');
      });
    });

    it('forwards ref correctly', () => {
      const ref = jest.fn();
      render(<Tabs ref={ref} data={mockData} />);
      expect(ref).toHaveBeenCalled();
    });

    it('applies custom className', () => {
      const { container } = render(<Tabs className="custom-tabs" data={mockData} />);
      expect(container.querySelector('.tabs')).toHaveClass('custom-tabs');
    });
  });
});
