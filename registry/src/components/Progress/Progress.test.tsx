import { render, screen } from '@testing-library/react';
import { Progress } from './index';

describe('Progress Component', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      const { container } = render(<Progress />);
      expect(container.querySelector('.progress')).toBeInTheDocument();
    });

    it('renders with title', () => {
      render(<Progress title="Loading" />);
      expect(screen.getByText('Loading')).toBeInTheDocument();
    });

    it('renders with helper text', () => {
      render(<Progress helperText="Please wait" />);
      expect(screen.getByText('Please wait')).toBeInTheDocument();
    });

    it('renders as bar by default', () => {
      const { container } = render(<Progress />);
      expect(container.querySelector('.progress.bar')).toBeInTheDocument();
    });

    it('renders as circle', () => {
      const { container } = render(<Progress kind="circle" />);
      expect(container.querySelector('.progress.circle')).toBeInTheDocument();
      expect(container.querySelector('svg')).toBeInTheDocument();
    });
  });

  describe('Value and numeral', () => {
    it('displays progress value', () => {
      render(<Progress value={50} numeral />);
      expect(screen.getByText('50%')).toBeInTheDocument();
    });

    it('clamps value to 100', () => {
      render(<Progress value={150} numeral />);
      expect(screen.getByText('100%')).toBeInTheDocument();
    });

    it('clamps value to minimum 1', () => {
      render(<Progress value={-10} numeral />);
      expect(screen.getByText('1%')).toBeInTheDocument();
    });

    it('shows numeral when prop is true', () => {
      render(<Progress value={75} numeral />);
      expect(screen.getByText('75%')).toBeInTheDocument();
    });

    it('hides numeral by default', () => {
      render(<Progress value={75} />);
      expect(screen.queryByText('75%')).not.toBeInTheDocument();
    });

    it('displays percentage in circle kind', () => {
      render(<Progress kind="circle" value={60} />);
      expect(screen.getByText('60%')).toBeInTheDocument();
    });
  });

  describe('Kind variants', () => {
    it('renders bar progress', () => {
      const { container } = render(<Progress kind="bar" />);
      expect(container.querySelector('.progress-track')).toBeInTheDocument();
      expect(container.querySelector('.progress-thumb')).toBeInTheDocument();
    });

    it('renders circle progress with SVG', () => {
      const { container } = render(<Progress kind="circle" value={50} />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg?.querySelectorAll('circle').length).toBe(2);
    });
  });

  describe('States', () => {
    it('renders active state by default', () => {
      const { container } = render(<Progress />);
      expect(container.querySelector('.progress.active')).toBeInTheDocument();
    });

    it('renders success state', () => {
      const { container } = render(<Progress state="success" numeral value={100} />);
      expect(container.querySelector('.progress.success')).toBeInTheDocument();
      expect(container.querySelector('.progress-icon')).toBeInTheDocument();
    });

    it('renders error state', () => {
      const { container } = render(<Progress state="error" numeral value={50} />);
      expect(container.querySelector('.progress.error')).toBeInTheDocument();
      expect(container.querySelector('.progress-icon')).toBeInTheDocument();
    });

    it('does not show state icon in circle kind', () => {
      const { container } = render(<Progress kind="circle" state="success" numeral value={100} />);
      expect(container.querySelector('.progress-icon')).not.toBeInTheDocument();
    });

    it('does not show state icon when numeral is false', () => {
      const { container } = render(<Progress state="success" value={100} />);
      expect(container.querySelector('.progress-icon')).not.toBeInTheDocument();
    });
  });

  describe('Size variants', () => {
    it('renders small size by default', () => {
      const { container } = render(<Progress kind="circle" />);
      expect(container.querySelector('.progress.small')).toBeInTheDocument();
    });

    it('renders medium size', () => {
      const { container } = render(<Progress kind="circle" size="md" />);
      expect(container.querySelector('.progress.medium')).toBeInTheDocument();
    });
  });

  describe('Color variants', () => {
    it('renders neutral color by default', () => {
      const { container } = render(<Progress />);
      expect(container.querySelector('.progress.neutral')).toBeInTheDocument();
    });

    it('renders accent color', () => {
      const { container } = render(<Progress color="accent" />);
      expect(container.querySelector('.progress.accent')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has progressbar role', () => {
      const { container } = render(<Progress value={50} />);
      const progress = container.querySelector('.progress');
      expect(progress).toHaveAttribute('role', 'progressbar');
    });

    it('has correct aria attributes', () => {
      const { container } = render(<Progress value={50} />);
      const progress = container.querySelector('.progress');
      expect(progress).toHaveAttribute('aria-valuemin', '0');
      expect(progress).toHaveAttribute('aria-valuemax', '100');
      expect(progress).toHaveAttribute('aria-valuenow', '50');
    });

    it('forwards ref correctly', () => {
      const ref = jest.fn();
      render(<Progress ref={ref} />);
      expect(ref).toHaveBeenCalled();
    });

    it('applies custom className', () => {
      const { container } = render(<Progress className="custom-progress" />);
      expect(container.querySelector('.progress')).toHaveClass('custom-progress');
    });
  });
});
