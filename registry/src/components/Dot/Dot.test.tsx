import { render } from '@testing-library/react';
import { Dot } from './index';

describe('Dot Component', () => {
  describe('Rendering', () => {
    it('renders correctly', () => {
      const { container } = render(<Dot />);
      expect(container.querySelector('.dot')).toBeInTheDocument();
    });

    it('renders as span element', () => {
      const { container } = render(<Dot />);
      expect(container.querySelector('span.dot')).toBeInTheDocument();
    });
  });

  describe('Size variants', () => {
    it('renders extra-small size', () => {
      const { container } = render(<Dot size="xs" />);
      expect(container.querySelector('.dot')).toHaveClass('extra-small');
    });

    it('renders small size', () => {
      const { container } = render(<Dot size="sm" />);
      expect(container.querySelector('.dot')).toHaveClass('small');
    });

    it('renders medium size (default)', () => {
      const { container } = render(<Dot />);
      expect(container.querySelector('.dot')).toHaveClass('medium');
    });

    it('renders large size', () => {
      const { container } = render(<Dot size="lg" />);
      expect(container.querySelector('.dot')).toHaveClass('large');
    });

    it('renders extra-large size', () => {
      const { container } = render(<Dot size="xl" />);
      expect(container.querySelector('.dot')).toHaveClass('extra-large');
    });
  });

  describe('Color variants', () => {
    it('renders gray color', () => {
      const { container } = render(<Dot color="gray" />);
      expect(container.querySelector('.dot')).toHaveClass('gray');
    });

    it('renders orange color', () => {
      const { container } = render(<Dot color="orange" />);
      expect(container.querySelector('.dot')).toHaveClass('orange');
    });

    it('renders violet color', () => {
      const { container } = render(<Dot color="violet" />);
      expect(container.querySelector('.dot')).toHaveClass('violet');
    });

    it('renders green color', () => {
      const { container } = render(<Dot color="green" />);
      expect(container.querySelector('.dot')).toHaveClass('green');
    });

    it('renders red color', () => {
      const { container } = render(<Dot color="red" />);
      expect(container.querySelector('.dot')).toHaveClass('red');
    });

    it('renders yellow color', () => {
      const { container } = render(<Dot color="yellow" />);
      expect(container.querySelector('.dot')).toHaveClass('yellow');
    });

    it('renders blue color', () => {
      const { container } = render(<Dot color="blue" />);
      expect(container.querySelector('.dot')).toHaveClass('blue');
    });

    it('renders lime color', () => {
      const { container } = render(<Dot color="lime" />);
      expect(container.querySelector('.dot')).toHaveClass('lime');
    });

    it('renders cyan color', () => {
      const { container } = render(<Dot color="cyan" />);
      expect(container.querySelector('.dot')).toHaveClass('cyan');
    });
  });

  describe('Pulse animation', () => {
    it('does not pulse by default', () => {
      const { container } = render(<Dot />);
      expect(container.querySelector('.dot')).not.toHaveClass('pulse');
    });

    it('applies pulse class when pulse is true', () => {
      const { container } = render(<Dot pulse />);
      expect(container.querySelector('.dot')).toHaveClass('pulse');
    });
  });

  describe('Accessibility', () => {
    it('forwards ref correctly', () => {
      const ref = jest.fn();
      render(<Dot ref={ref} />);
      expect(ref).toHaveBeenCalled();
    });

    it('applies custom className', () => {
      const { container } = render(<Dot className="custom-dot" />);
      expect(container.querySelector('.dot')).toHaveClass('custom-dot');
    });

    it('spreads additional props', () => {
      const { container } = render(<Dot data-testid="dot" aria-label="Status indicator" />);
      const dot = container.querySelector('[data-testid="dot"]');
      expect(dot).toHaveAttribute('aria-label', 'Status indicator');
    });
  });
});
