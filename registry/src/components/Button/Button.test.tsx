import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './index';

describe('Button Component', () => {
  describe('Rendering', () => {
    it('renders with text', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button')).toHaveTextContent('Click me');
    });

    it('wraps string children in span.btn-text', () => {
      const { container } = render(<Button>Text</Button>);
      expect(container.querySelector('.btn-text')).toHaveTextContent('Text');
    });

    it('wraps number children in span.btn-text', () => {
      const { container } = render(<Button>123</Button>);
      expect(container.querySelector('.btn-text')).toHaveTextContent('123');
    });

    it('does not wrap React elements in span.btn-text', () => {
      const { container } = render(
        <Button>
          <span>Icon</span>
        </Button>
      );
      const btnText = container.querySelector('.btn-text');
      expect(btnText).not.toBeInTheDocument();
    });

    it('applies default classes', () => {
      render(<Button>Test</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('btn', 'neutral', 'solid', 'medium');
    });

    it('applies custom className', () => {
      render(<Button className="custom-class">Test</Button>);
      expect(screen.getByRole('button')).toHaveClass('custom-class');
    });
  });

  describe('Interactions', () => {
    it('calls onClick when clicked', async () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Click me</Button>);

      await userEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', async () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick} disabled>Click me</Button>);

      await userEvent.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('does not call onClick when isPending', async () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick} isPending>Click me</Button>);

      await userEvent.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('States', () => {
    it('shows spinner when isPending', () => {
      const { container } = render(<Button isPending>Loading</Button>);
      expect(container.querySelector('.spinner')).toBeInTheDocument();
    });

    it('disables button when disabled prop is true', () => {
      render(<Button disabled>Test</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('disables button when isPending', () => {
      render(<Button isPending>Test</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('adds loading class when isPending', () => {
      render(<Button isPending>Test</Button>);
      expect(screen.getByRole('button')).toHaveClass('loading');
    });

    it('adds icon-only class when iconOnly is true', () => {
      render(<Button iconOnly>Test</Button>);
      expect(screen.getByRole('button')).toHaveClass('icon-only');
    });
  });

  describe('Size variants', () => {
    it('renders small size', () => {
      render(<Button size="sm">Small</Button>);
      expect(screen.getByRole('button')).toHaveClass('small');
    });

    it('renders medium size (default)', () => {
      render(<Button>Medium</Button>);
      expect(screen.getByRole('button')).toHaveClass('medium');
    });

    it('renders large size', () => {
      render(<Button size="lg">Large</Button>);
      expect(screen.getByRole('button')).toHaveClass('large');
    });
  });

  describe('Color variants', () => {
    it('renders accent color', () => {
      render(<Button color="accent">Accent</Button>);
      expect(screen.getByRole('button')).toHaveClass('accent');
    });

    it('renders neutral color (default)', () => {
      render(<Button>Neutral</Button>);
      expect(screen.getByRole('button')).toHaveClass('neutral');
    });

    it('renders adverse color', () => {
      render(<Button color="adverse">Adverse</Button>);
      expect(screen.getByRole('button')).toHaveClass('adverse');
    });
  });

  describe('Kind variants', () => {
    it('renders solid kind (default)', () => {
      render(<Button>Solid</Button>);
      expect(screen.getByRole('button')).toHaveClass('solid');
    });

    it('renders outlined kind', () => {
      render(<Button kind="outlined">Outlined</Button>);
      expect(screen.getByRole('button')).toHaveClass('outlined');
    });

    it('renders ghost kind', () => {
      render(<Button kind="ghost">Ghost</Button>);
      expect(screen.getByRole('button')).toHaveClass('ghost');
    });

    it('renders glass kind', () => {
      render(<Button kind="glass">Glass</Button>);
      expect(screen.getByRole('button')).toHaveClass('glass');
    });
  });

  describe('Accessibility', () => {
    it('has type="button" by default', () => {
      render(<Button>Test</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
    });

    it('forwards ref correctly', () => {
      const ref = jest.fn();
      render(<Button ref={ref}>Test</Button>);
      expect(ref).toHaveBeenCalled();
    });

    it('spreads additional props', () => {
      render(<Button data-testid="custom-btn" aria-label="Test button">Test</Button>);
      const button = screen.getByTestId('custom-btn');
      expect(button).toHaveAttribute('aria-label', 'Test button');
    });
  });
});
