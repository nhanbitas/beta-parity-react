import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Switch } from './index';

describe('Switch Component', () => {
  describe('Rendering', () => {
    it('renders correctly', () => {
      render(<Switch />);
      expect(screen.getByRole('switch')).toBeInTheDocument();
    });

    it('applies default classes', () => {
      render(<Switch />);
      expect(screen.getByRole('switch')).toHaveClass('switch', 'medium');
    });

    it('renders as inactive by default', () => {
      render(<Switch />);
      expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
    });

    it('renders with defaultActive', () => {
      render(<Switch defaultActive />);
      expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
    });

    it('renders without icon by default', () => {
      const { container } = render(<Switch />);
      expect(container.querySelector('.switch-icon')).not.toBeInTheDocument();
    });

    it('renders Check icon when active and icon prop is true', () => {
      const { container } = render(<Switch defaultActive icon />);
      expect(container.querySelector('.switch-icon')).toBeInTheDocument();
    });

    it('renders Minus icon when inactive and icon prop is true', () => {
      const { container } = render(<Switch icon />);
      expect(container.querySelector('.switch-icon')).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('toggles state on click', async () => {
      render(<Switch />);
      const switchEl = screen.getByRole('switch');

      expect(switchEl).toHaveAttribute('aria-checked', 'false');

      await userEvent.click(switchEl);
      expect(switchEl).toHaveAttribute('aria-checked', 'true');

      await userEvent.click(switchEl);
      expect(switchEl).toHaveAttribute('aria-checked', 'false');
    });

    it('calls onToggle with new state', async () => {
      const handleToggle = jest.fn();
      render(<Switch onToggle={handleToggle} />);

      await userEvent.click(screen.getByRole('switch'));
      expect(handleToggle).toHaveBeenCalledWith(true);

      await userEvent.click(screen.getByRole('switch'));
      expect(handleToggle).toHaveBeenCalledWith(false);
    });

    it('calls onClick handler', async () => {
      const handleClick = jest.fn();
      render(<Switch onClick={handleClick} />);

      await userEvent.click(screen.getByRole('switch'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not toggle when disabled', async () => {
      const handleToggle = jest.fn();
      render(<Switch disabled onToggle={handleToggle} />);

      await userEvent.click(screen.getByRole('switch'));
      expect(handleToggle).not.toHaveBeenCalled();
    });
  });

  describe('Controlled state', () => {
    it('works as controlled component with active prop', () => {
      const { rerender } = render(<Switch active={false} />);
      expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');

      rerender(<Switch active={true} />);
      expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
    });

    it('updates when active prop changes', () => {
      const { rerender } = render(<Switch active={false} />);
      rerender(<Switch active={true} />);
      expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
    });

    it('does not change internal state when controlled', async () => {
      const { rerender } = render(<Switch active={false} />);

      await userEvent.click(screen.getByRole('switch'));

      rerender(<Switch active={false} />);
      expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
    });
  });

  describe('Uncontrolled state', () => {
    it('works as uncontrolled component', async () => {
      render(<Switch />);
      const switchEl = screen.getByRole('switch');

      await userEvent.click(switchEl);
      expect(switchEl).toHaveAttribute('aria-checked', 'true');

      await userEvent.click(switchEl);
      expect(switchEl).toHaveAttribute('aria-checked', 'false');
    });

    it('respects defaultActive prop', () => {
      render(<Switch defaultActive={true} />);
      expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
    });
  });

  describe('Size variants', () => {
    it('renders small size', () => {
      render(<Switch switchSize="sm" />);
      expect(screen.getByRole('switch')).toHaveClass('small');
    });

    it('renders medium size (default)', () => {
      render(<Switch />);
      expect(screen.getByRole('switch')).toHaveClass('medium');
    });

    it('renders large size', () => {
      render(<Switch switchSize="lg" />);
      expect(screen.getByRole('switch')).toHaveClass('large');
    });
  });

  describe('Disabled state', () => {
    it('can be disabled', () => {
      render(<Switch disabled />);
      expect(screen.getByRole('switch')).toBeDisabled();
    });

    it('has aria-disabled when disabled', () => {
      render(<Switch disabled />);
      expect(screen.getByRole('switch')).toHaveAttribute('aria-disabled', 'true');
    });

    it('has tabIndex -1 when disabled', () => {
      render(<Switch disabled />);
      expect(screen.getByRole('switch')).toHaveAttribute('tabIndex', '-1');
    });

    it('has tabIndex 0 when not disabled', () => {
      render(<Switch />);
      expect(screen.getByRole('switch')).toHaveAttribute('tabIndex', '0');
    });
  });

  describe('Accessibility', () => {
    it('has role="switch"', () => {
      render(<Switch />);
      expect(screen.getByRole('switch')).toHaveAttribute('role', 'switch');
    });

    it('has correct aria-checked attribute', () => {
      render(<Switch defaultActive={false} />);
      expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
    });

    it('updates aria-checked on toggle', async () => {
      render(<Switch />);
      const switchEl = screen.getByRole('switch');

      await userEvent.click(switchEl);
      expect(switchEl).toHaveAttribute('aria-checked', 'true');
    });

    it('forwards ref correctly', () => {
      const ref = jest.fn();
      render(<Switch ref={ref} />);
      expect(ref).toHaveBeenCalled();
    });

    it('spreads additional props', () => {
      render(<Switch data-testid="custom-switch" aria-label="Toggle feature" />);
      const switchEl = screen.getByTestId('custom-switch');
      expect(switchEl).toHaveAttribute('aria-label', 'Toggle feature');
    });
  });

  describe('Icon display', () => {
    it('shows Check icon when active with icon prop', () => {
      const { container } = render(<Switch defaultActive icon />);
      const iconElement = container.querySelector('.switch-icon');
      expect(iconElement).toBeInTheDocument();
    });

    it('shows Minus icon when inactive with icon prop', () => {
      const { container } = render(<Switch icon />);
      const iconElement = container.querySelector('.switch-icon');
      expect(iconElement).toBeInTheDocument();
    });

    it('toggles icon when state changes', async () => {
      const { container } = render(<Switch icon />);

      expect(container.querySelector('.switch-icon')).toBeInTheDocument();

      await userEvent.click(screen.getByRole('switch'));

      expect(container.querySelector('.switch-icon')).toBeInTheDocument();
    });

    it('does not show icon when icon prop is false', () => {
      const { container } = render(<Switch icon={false} />);
      expect(container.querySelector('.switch-icon')).not.toBeInTheDocument();
    });
  });
});
