import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DateInput } from './index';

describe('DateInput Component', () => {
  describe('Rendering', () => {
    it('renders correctly', () => {
      const { container } = render(<DateInput />);
      expect(container.querySelector('input')).toBeInTheDocument();
    });

    it('renders with date type by default', () => {
      const { container } = render(<DateInput />);
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('type', 'date');
    });

    it('renders with custom type', () => {
      const { container } = render(<DateInput type="datetime-local" />);
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('type', 'datetime-local');
    });

    it('renders with placeholder', () => {
      const { container } = render(<DateInput placeholder="Select date" />);
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('placeholder', 'Select date');
    });
  });

  describe('Value handling', () => {
    it('accepts initial value', () => {
      const { container } = render(<DateInput value="2024-01-15" />);
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input.value).toBe('2024-01-15');
    });

    it('accepts default value', () => {
      const { container } = render(<DateInput defaultValue="2024-01-15" />);
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input.value).toBe('2024-01-15');
    });

    it('calls onChange when value changes', async () => {
      const handleChange = jest.fn();
      const { container } = render(<DateInput onChange={handleChange} />);
      const input = container.querySelector('input') as HTMLInputElement;

      await userEvent.type(input, '2024-01-15');
      expect(handleChange).toHaveBeenCalled();
    });
  });

  describe('States', () => {
    it('can be disabled', () => {
      const { container } = render(<DateInput disabled />);
      const input = container.querySelector('input');
      expect(input).toBeDisabled();
    });

    it('can be readOnly', () => {
      const { container } = render(<DateInput readOnly />);
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('readOnly');
    });

    it('can be required', () => {
      const { container } = render(<DateInput required />);
      const input = container.querySelector('input');
      expect(input).toBeRequired();
    });

    it('does not accept input when disabled', async () => {
      const handleChange = jest.fn();
      const { container } = render(<DateInput disabled onChange={handleChange} />);
      const input = container.querySelector('input') as HTMLInputElement;

      await userEvent.type(input, '2024-01-15');
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Min and Max constraints', () => {
    it('accepts min attribute', () => {
      const { container } = render(<DateInput min="2024-01-01" />);
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('min', '2024-01-01');
    });

    it('accepts max attribute', () => {
      const { container } = render(<DateInput max="2024-12-31" />);
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('max', '2024-12-31');
    });
  });

  describe('Event handlers', () => {
    it('calls onFocus when input gains focus', async () => {
      const handleFocus = jest.fn();
      const { container } = render(<DateInput onFocus={handleFocus} />);
      const input = container.querySelector('input') as HTMLInputElement;

      await userEvent.click(input);
      expect(handleFocus).toHaveBeenCalled();
    });

    it('calls onBlur when input loses focus', async () => {
      const handleBlur = jest.fn();
      const { container } = render(<DateInput onBlur={handleBlur} />);
      const input = container.querySelector('input') as HTMLInputElement;

      input.focus();
      input.blur();
      expect(handleBlur).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('forwards ref correctly', () => {
      const ref = jest.fn();
      render(<DateInput ref={ref} />);
      expect(ref).toHaveBeenCalled();
    });

    it('applies custom className', () => {
      const { container } = render(<DateInput className="custom-date-input" />);
      const input = container.querySelector('input');
      expect(input).toHaveClass('custom-date-input');
    });

    it('accepts aria-label', () => {
      const { container } = render(<DateInput aria-label="Select birth date" />);
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('aria-label', 'Select birth date');
    });

    it('accepts aria-describedby', () => {
      const { container } = render(<DateInput aria-describedby="date-help" />);
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('aria-describedby', 'date-help');
    });
  });

  describe('Name and ID attributes', () => {
    it('accepts name attribute', () => {
      const { container } = render(<DateInput name="birthdate" />);
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('name', 'birthdate');
    });

    it('accepts id attribute', () => {
      const { container } = render(<DateInput id="date-input" />);
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('id', 'date-input');
    });
  });
});
