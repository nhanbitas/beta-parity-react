import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from './index';

describe('Checkbox Component', () => {
  describe('Rendering', () => {
    it('renders correctly', () => {
      render(<Checkbox />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<Checkbox label="Accept terms" />);
      expect(screen.getByText('Accept terms')).toBeInTheDocument();
    });

    it('renders with sublabel', () => {
      render(<Checkbox label="Main" sublabel="Additional info" />);
      expect(screen.getByText('Additional info')).toBeInTheDocument();
    });

    it('renders label as React node', () => {
      render(<Checkbox label={<span data-testid="custom-label">Custom</span>} />);
      expect(screen.getByTestId('custom-label')).toBeInTheDocument();
    });

    it('does not render label wrapper when no label or sublabel', () => {
      const { container } = render(<Checkbox />);
      expect(container.querySelector('.input-label-wrapper')).not.toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('toggles checked state on click', async () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;

      expect(checkbox.checked).toBe(false);

      await userEvent.click(checkbox);
      expect(checkbox.checked).toBe(true);

      await userEvent.click(checkbox);
      expect(checkbox.checked).toBe(false);
    });

    it('calls onChange when clicked', async () => {
      const handleChange = jest.fn();
      render(<Checkbox onChange={handleChange} />);

      await userEvent.click(screen.getByRole('checkbox'));
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('does not toggle when disabled', async () => {
      const handleChange = jest.fn();
      render(<Checkbox disabled onChange={handleChange} />);
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;

      await userEvent.click(checkbox);
      expect(handleChange).not.toHaveBeenCalled();
      expect(checkbox.checked).toBe(false);
    });

    it('does not toggle when readOnly', async () => {
      const handleChange = jest.fn();
      render(<Checkbox readOnly onChange={handleChange} />);

      await userEvent.click(screen.getByRole('checkbox'));
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Controlled state', () => {
    it('can be controlled with checked prop', () => {
      const { rerender } = render(<Checkbox checked={false} />);
      let checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.checked).toBe(false);

      rerender(<Checkbox checked={true} />);
      checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.checked).toBe(true);
    });

    it('updates when checked prop changes', () => {
      const { rerender } = render(<Checkbox checked={false} />);
      rerender(<Checkbox checked={true} />);
      expect((screen.getByRole('checkbox') as HTMLInputElement).checked).toBe(true);
    });
  });

  describe('Indeterminate state', () => {
    it('sets indeterminate property on input element', () => {
      render(<Checkbox indeterminate />);
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.indeterminate).toBe(true);
    });

    it('updates indeterminate state when prop changes', () => {
      const { rerender } = render(<Checkbox indeterminate={false} />);
      let checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.indeterminate).toBe(false);

      rerender(<Checkbox indeterminate={true} />);
      checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.indeterminate).toBe(true);
    });
  });

  describe('Color variants', () => {
    it('renders neutral color by default', () => {
      const { container } = render(<Checkbox />);
      expect(container.querySelector('.par-checkbox.neutral')).toBeInTheDocument();
    });

    it('renders accent color', () => {
      const { container } = render(<Checkbox color="accent" />);
      expect(container.querySelector('.par-checkbox.accent')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has type="checkbox"', () => {
      render(<Checkbox />);
      expect(screen.getByRole('checkbox')).toHaveAttribute('type', 'checkbox');
    });

    it('forwards ref correctly', () => {
      const ref = jest.fn();
      render(<Checkbox ref={ref} />);
      expect(ref).toHaveBeenCalled();
    });

    it('wrapper has aria-disabled when disabled', () => {
      const { container } = render(<Checkbox disabled />);
      expect(container.querySelector('.checkbox-wrapper')).toHaveAttribute('aria-disabled', 'true');
    });

    it('spreads additional props to input', () => {
      render(<Checkbox data-testid="custom-checkbox" aria-label="Custom" />);
      const checkbox = screen.getByTestId('custom-checkbox');
      expect(checkbox).toHaveAttribute('aria-label', 'Custom');
    });
  });
});
