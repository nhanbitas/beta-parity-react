import { render } from '@testing-library/react';
import { Spinner } from './index';

describe('Spinner Component', () => {
  describe('Rendering', () => {
    it('renders correctly', () => {
      const { container } = render(<Spinner />);
      expect(container.querySelector('.spinner')).toBeInTheDocument();
    });

    it('renders with SVG element', () => {
      const { container } = render(<Spinner />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('applies default classes', () => {
      const { container } = render(<Spinner />);
      const spinner = container.querySelector('.spinner');
      expect(spinner).toHaveClass('circular', 'neutral', 'medium');
    });
  });

  describe('Variant types', () => {
    it('renders circular variant by default', () => {
      const { container } = render(<Spinner />);
      expect(container.querySelector('.spinner.circular')).toBeInTheDocument();
    });

    it('renders circular variant', () => {
      const { container } = render(<Spinner variant="circular" />);
      expect(container.querySelector('.spinner.circular')).toBeInTheDocument();
    });

    it('renders dotted variant', () => {
      const { container } = render(<Spinner variant="dotted" />);
      expect(container.querySelector('.spinner.dotted')).toBeInTheDocument();
    });

    it('renders sunburst variant', () => {
      const { container } = render(<Spinner variant="sunburst" />);
      expect(container.querySelector('.spinner.sunburst')).toBeInTheDocument();
    });
  });

  describe('Size variants', () => {
    it('renders small size', () => {
      const { container } = render(<Spinner size="sm" />);
      expect(container.querySelector('.spinner')).toHaveClass('small');
    });

    it('renders medium size (default)', () => {
      const { container } = render(<Spinner />);
      expect(container.querySelector('.spinner')).toHaveClass('medium');
    });

    it('renders large size', () => {
      const { container } = render(<Spinner size="lg" />);
      expect(container.querySelector('.spinner')).toHaveClass('large');
    });

    it('renders extra-large size', () => {
      const { container } = render(<Spinner size="xl" />);
      expect(container.querySelector('.spinner')).toHaveClass('extra-large');
    });
  });

  describe('Color variants', () => {
    it('renders neutral color by default', () => {
      const { container } = render(<Spinner />);
      expect(container.querySelector('.spinner')).toHaveClass('neutral');
    });

    it('renders neutral color', () => {
      const { container } = render(<Spinner color="neutral" />);
      expect(container.querySelector('.spinner')).toHaveClass('neutral');
    });

    it('renders accent color', () => {
      const { container } = render(<Spinner color="accent" />);
      expect(container.querySelector('.spinner')).toHaveClass('accent');
    });
  });

  describe('Accessibility', () => {
    it('forwards ref correctly', () => {
      const ref = jest.fn();
      render(<Spinner ref={ref} />);
      expect(ref).toHaveBeenCalled();
    });

    it('applies custom className', () => {
      const { container } = render(<Spinner className="custom-spinner" />);
      expect(container.querySelector('.spinner')).toHaveClass('custom-spinner');
    });

    it('spreads additional props', () => {
      const { container } = render(<Spinner data-testid="spinner" aria-label="Loading" />);
      const spinner = container.querySelector('[data-testid="spinner"]');
      expect(spinner).toHaveAttribute('aria-label', 'Loading');
    });
  });
});
