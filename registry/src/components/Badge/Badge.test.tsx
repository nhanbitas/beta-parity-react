import { render, screen } from '@testing-library/react';
import { Badge } from './index';

describe('Badge Component', () => {
  describe('Rendering', () => {
    it('renders with label', () => {
      render(<Badge label="New" />);
      expect(screen.getByText('New')).toBeInTheDocument();
    });

    it('renders with children', () => {
      render(<Badge>Badge text</Badge>);
      expect(screen.getByText('Badge text')).toBeInTheDocument();
    });

    it('renders with icon', () => {
      render(<Badge icon={<span data-testid="icon">★</span>} label="Star" />);
      expect(screen.getByTestId('icon')).toBeInTheDocument();
      expect(screen.getByText('Star')).toBeInTheDocument();
    });

    it('renders with dot', () => {
      const { container } = render(<Badge dot label="Status" />);
      expect(container.querySelector('.dot')).toBeInTheDocument();
    });

    it('dot overrides icon', () => {
      const { container } = render(<Badge dot icon={<span data-testid="icon">★</span>} label="Status" />);
      expect(container.querySelector('.dot')).toBeInTheDocument();
      expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
    });

    it('applies default classes', () => {
      const { container } = render(<Badge label="Test" />);
      const badge = container.querySelector('.badge');
      expect(badge).toHaveClass('outlined', 'gray', 'medium');
    });
  });

  describe('Size variants', () => {
    it('renders extra-small size', () => {
      const { container } = render(<Badge size="xs" label="XS" />);
      expect(container.querySelector('.badge')).toHaveClass('extra-small');
    });

    it('renders small size', () => {
      const { container } = render(<Badge size="sm" label="SM" />);
      expect(container.querySelector('.badge')).toHaveClass('small');
    });

    it('renders medium size (default)', () => {
      const { container } = render(<Badge label="MD" />);
      expect(container.querySelector('.badge')).toHaveClass('medium');
    });
  });

  describe('Color variants', () => {
    const colors = ['gray', 'orange', 'violet', 'green', 'red', 'yellow', 'blue', 'lime', 'cyan'] as const;

    colors.forEach((color) => {
      it(`renders ${color} color`, () => {
        const { container } = render(<Badge color={color} label="Test" />);
        expect(container.querySelector('.badge')).toHaveClass(color);
      });
    });

    it('renders gray color by default', () => {
      const { container } = render(<Badge label="Test" />);
      expect(container.querySelector('.badge')).toHaveClass('gray');
    });
  });

  describe('Variant styles', () => {
    it('renders outlined variant (default)', () => {
      const { container } = render(<Badge label="Test" />);
      expect(container.querySelector('.badge')).toHaveClass('outlined');
    });

    it('renders solid variant', () => {
      const { container } = render(<Badge variant="solid" label="Test" />);
      expect(container.querySelector('.badge')).toHaveClass('solid');
    });

    it('renders glass variant', () => {
      const { container } = render(<Badge variant="glass" label="Test" />);
      expect(container.querySelector('.badge')).toHaveClass('glass');
    });
  });

  describe('Accessibility', () => {
    it('forwards ref correctly', () => {
      const ref = jest.fn();
      render(<Badge ref={ref} label="Test" />);
      expect(ref).toHaveBeenCalled();
    });

    it('applies custom className', () => {
      const { container } = render(<Badge className="custom-badge" label="Test" />);
      expect(container.querySelector('.badge')).toHaveClass('custom-badge');
    });

    it('spreads additional props', () => {
      const { container } = render(<Badge data-testid="badge" aria-label="Badge label" label="Test" />);
      const badge = container.querySelector('[data-testid="badge"]');
      expect(badge).toHaveAttribute('aria-label', 'Badge label');
    });
  });
});
