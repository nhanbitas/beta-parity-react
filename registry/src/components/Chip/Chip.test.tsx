import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Chip } from './index';

describe('Chip Component', () => {
  describe('Rendering', () => {
    it('renders correctly', () => {
      const { container } = render(<Chip label="Test Chip" />);
      expect(container.querySelector('.chip')).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<Chip label="Feature" />);
      expect(screen.getByText('Feature')).toBeInTheDocument();
    });

    it('renders with icon', () => {
      render(<Chip label="Star" icon={<span data-testid="icon">★</span>} />);
      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });

    it('applies default classes', () => {
      const { container } = render(<Chip label="Test" />);
      const chip = container.querySelector('.chip');
      expect(chip).toHaveClass('outlined', 'medium', 'neutral');
    });
  });

  describe('Type variants', () => {
    it('renders toggle type by default', () => {
      const { container } = render(<Chip label="Toggle" />);
      expect(container.querySelector('.check-icon')).toBeInTheDocument();
    });

    it('renders dropdown type', () => {
      const { container } = render(<Chip type="dropdown" label="Dropdown" />);
      expect(container.querySelector('.chip-icon')).toBeInTheDocument();
    });
  });

  describe('Size variants', () => {
    it('renders small size', () => {
      const { container } = render(<Chip size="sm" label="SM" />);
      expect(container.querySelector('.chip')).toHaveClass('small');
    });

    it('renders medium size (default)', () => {
      const { container } = render(<Chip label="MD" />);
      expect(container.querySelector('.chip')).toHaveClass('medium');
    });

    it('renders large size', () => {
      const { container } = render(<Chip size="lg" label="LG" />);
      expect(container.querySelector('.chip')).toHaveClass('large');
    });
  });

  describe('Color variants', () => {
    it('renders neutral color by default', () => {
      const { container } = render(<Chip label="Test" />);
      expect(container.querySelector('.chip')).toHaveClass('neutral');
    });

    it('renders accent color when checked', () => {
      const { container } = render(<Chip label="Test" checked />);
      expect(container.querySelector('.chip')).toHaveClass('accent');
    });
  });

  describe('Kind variants', () => {
    it('renders outlined kind by default', () => {
      const { container } = render(<Chip label="Test" />);
      expect(container.querySelector('.chip')).toHaveClass('outlined');
    });

    it('renders glass kind', () => {
      const { container } = render(<Chip kind="glass" label="Test" />);
      expect(container.querySelector('.chip')).toHaveClass('glass');
    });
  });

  describe('Toggle type interactions', () => {
    it('toggles on click', async () => {
      const { container } = render(<Chip type="toggle" label="Toggle" />);
      const chip = container.querySelector('.chip');

      await userEvent.click(chip as HTMLElement);

      expect(container.querySelector('.check-icon.active')).toBeInTheDocument();
    });

    it('calls onChange when toggled', async () => {
      const handleChange = jest.fn();
      const { container } = render(<Chip type="toggle" label="Toggle" value="test" onChange={handleChange} />);

      await userEvent.click(container.querySelector('.chip') as HTMLElement);

      expect(handleChange).toHaveBeenCalledWith({ value: 'test', checked: true });
    });

    it('controlled checked state', () => {
      const { container } = render(<Chip type="toggle" label="Toggle" checked />);
      expect(container.querySelector('.chip')).toHaveClass('accent');
    });

    it('uncontrolled defaultChecked state', () => {
      const { container } = render(<Chip type="toggle" label="Toggle" defaultChecked />);
      expect(container.querySelector('.chip')).toHaveClass('accent');
    });
  });

  describe('Dropdown type interactions', () => {
    it('toggles active state on click', async () => {
      const { container } = render(<Chip type="dropdown" label="Dropdown" />);
      const chip = container.querySelector('.chip');

      await userEvent.click(chip as HTMLElement);

      expect(chip).toHaveClass('neutral');
    });

    it('calls onChange with active state', async () => {
      const handleChange = jest.fn();
      const { container } = render(<Chip type="dropdown" label="Dropdown" value="test" onChange={handleChange} />);

      await userEvent.click(container.querySelector('.chip') as HTMLElement);

      expect(handleChange).toHaveBeenCalledWith({ value: 'test', active: true });
    });

    it('shows value icon when value is present', () => {
      const { container } = render(<Chip type="dropdown" label="Dropdown" value="test" />);
      expect(container.querySelectorAll('.chip-icon').length).toBeGreaterThan(0);
    });
  });

  describe('Keyboard interactions', () => {
    it('toggles on Enter key', async () => {
      const { container } = render(<Chip type="toggle" label="Toggle" />);
      const chip = container.querySelector('.chip');

      chip?.focus();
      await userEvent.keyboard('{Enter}');

      expect(container.querySelector('.check-icon.active')).toBeInTheDocument();
    });
  });

  describe('States', () => {
    it('can be disabled', () => {
      const { container } = render(<Chip label="Test" disabled />);
      const chip = container.querySelector('.chip');
      expect(chip).toHaveAttribute('aria-disabled', 'true');
    });

    it('does not respond to clicks when disabled', async () => {
      const handleChange = jest.fn();
      const { container } = render(<Chip label="Test" disabled onChange={handleChange} />);

      await userEvent.click(container.querySelector('.chip') as HTMLElement);

      expect(handleChange).not.toHaveBeenCalled();
    });

    it('has tabIndex -1 when disabled', () => {
      const { container } = render(<Chip label="Test" disabled />);
      expect(container.querySelector('.chip')).toHaveAttribute('tabIndex', '-1');
    });

    it('has tabIndex 0 when enabled', () => {
      const { container } = render(<Chip label="Test" />);
      expect(container.querySelector('.chip')).toHaveAttribute('tabIndex', '0');
    });
  });

  describe('Accessibility', () => {
    it('has role attribute', () => {
      const { container } = render(<Chip type="toggle" label="Test" />);
      expect(container.querySelector('.chip')).toHaveAttribute('role', 'toggle');
    });

    it('has aria-label', () => {
      const { container } = render(<Chip label="Test Label" />);
      expect(container.querySelector('.chip')).toHaveAttribute('aria-label', 'test label');
    });

    it('has aria-checked for toggle type', () => {
      const { container } = render(<Chip type="toggle" label="Test" />);
      expect(container.querySelector('.chip')).toHaveAttribute('aria-checked');
    });

    it('has aria-selected for dropdown type', () => {
      const { container } = render(<Chip type="dropdown" label="Test" value="test" />);
      expect(container.querySelector('.chip')).toHaveAttribute('aria-selected', 'true');
    });

    it('forwards ref correctly', () => {
      const ref = jest.fn();
      render(<Chip ref={ref} label="Test" />);
      expect(ref).toHaveBeenCalled();
    });

    it('applies custom className', () => {
      const { container } = render(<Chip className="custom-chip" label="Test" />);
      expect(container.querySelector('.chip')).toHaveClass('custom-chip');
    });
  });
});
