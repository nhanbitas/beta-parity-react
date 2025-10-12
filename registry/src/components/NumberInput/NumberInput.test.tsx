import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NumberInput } from './index';

describe('NumberInput Component', () => {
  describe('Rendering', () => {
    it('renders correctly', () => {
      const { container } = render(<NumberInput />);
      expect(container.querySelector('.number-input')).toBeInTheDocument();
    });

    it('renders with placeholder', () => {
      render(<NumberInput placeholder="Enter number" />);
      expect(screen.getByPlaceholderText('Enter number')).toBeInTheDocument();
    });

    it('has type text (for numeric formatting)', () => {
      const { container } = render(<NumberInput />);
      expect(container.querySelector('input')).toHaveAttribute('type', 'text');
    });
  });

  describe('Value props', () => {
    it('renders with value', () => {
      const { container } = render(<NumberInput value={100} />);
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input.value).toBe('100');
    });

    it('renders with defaultValue', () => {
      const { container } = render(<NumberInput defaultValue={50} />);
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input.value).toBe('50');
    });
  });

  describe('Min and Max', () => {
    it('respects min value', async () => {
      const { container } = render(<NumberInput min={10} onValueChange={() => {}} />);
      const input = container.querySelector('input') as HTMLInputElement;

      await userEvent.clear(input);
      await userEvent.type(input, '5');

      expect(Number(input.value)).toBeGreaterThanOrEqual(10);
    });

    it('respects max value', async () => {
      const { container } = render(<NumberInput max={100} onValueChange={() => {}} />);
      const input = container.querySelector('input') as HTMLInputElement;

      await userEvent.clear(input);
      await userEvent.type(input, '200');

      expect(Number(input.value)).toBeLessThanOrEqual(100);
    });
  });

  describe('Stepper variants', () => {
    it('does not show stepper by default', () => {
      const { container } = render(<NumberInput />);
      expect(container.querySelector('.number-stepper-wrapper')).not.toBeInTheDocument();
    });

    it('renders auto stepper', () => {
      const { container } = render(<NumberInput stepper="auto" />);
      expect(container.querySelector('.number-input')).toHaveClass('auto-stepper');
      expect(container.querySelector('.number-stepper-wrapper')).toBeInTheDocument();
    });

    it('renders chevron stepper', () => {
      const { container } = render(<NumberInput stepper="chevron" />);
      expect(container.querySelector('.number-input')).toHaveClass('chevron-stepper');
      expect(container.querySelector('.chevron-stepper-container')).toBeInTheDocument();
    });

    it('renders separate stepper', () => {
      const { container } = render(<NumberInput stepper="separate" />);
      expect(container.querySelector('.number-input')).toHaveClass('separate-stepper');
    });

    it('auto stepper shows minus and plus buttons', () => {
      const { container } = render(<NumberInput stepper="auto" />);
      const buttons = container.querySelectorAll('.square-icon');
      expect(buttons.length).toBe(2);
    });

    it('separate stepper splits buttons left and right', () => {
      const { container } = render(<NumberInput stepper="separate" />);
      const wrappers = container.querySelectorAll('.number-stepper-wrapper');
      expect(wrappers.length).toBe(2);
    });
  });

  describe('Stepper interactions', () => {
    it('increments value on plus button click', async () => {
      const { container } = render(<NumberInput stepper="auto" defaultValue={10} />);
      const buttons = container.querySelectorAll('.square-icon');
      const plusButton = buttons[1] as HTMLButtonElement;

      await userEvent.click(plusButton);

      const input = container.querySelector('input') as HTMLInputElement;
      expect(input.value).toBe('11');
    });

    it('decrements value on minus button click', async () => {
      const { container } = render(<NumberInput stepper="auto" defaultValue={10} />);
      const buttons = container.querySelectorAll('.square-icon');
      const minusButton = buttons[0] as HTMLButtonElement;

      await userEvent.click(minusButton);

      const input = container.querySelector('input') as HTMLInputElement;
      expect(input.value).toBe('9');
    });

    it('respects stepControl prop', async () => {
      const { container } = render(<NumberInput stepper="auto" defaultValue={10} stepControl={5} />);
      const buttons = container.querySelectorAll('.square-icon');
      const plusButton = buttons[1] as HTMLButtonElement;

      await userEvent.click(plusButton);

      const input = container.querySelector('input') as HTMLInputElement;
      expect(input.value).toBe('15');
    });

    it('disables minus button at min value', () => {
      const { container } = render(<NumberInput stepper="auto" defaultValue={0} min={0} />);
      const buttons = container.querySelectorAll('.square-icon');
      const minusButton = buttons[0] as HTMLButtonElement;
      expect(minusButton).toBeDisabled();
    });

    it('disables plus button at max value', () => {
      const { container } = render(<NumberInput stepper="auto" defaultValue={100} max={100} />);
      const buttons = container.querySelectorAll('.square-icon');
      const plusButton = buttons[1] as HTMLButtonElement;
      expect(plusButton).toBeDisabled();
    });
  });

  describe('AllowInput prop', () => {
    it('allows input by default with stepper', async () => {
      const { container } = render(<NumberInput stepper="auto" />);
      const input = container.querySelector('input') as HTMLInputElement;

      await userEvent.type(input, '123');
      expect(input.value).toContain('123');
    });

    it('prevents input when allowInput is false', () => {
      const { container } = render(<NumberInput stepper="auto" allowInput={false} />);
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input).toHaveAttribute('readOnly');
    });
  });

  describe('Unit selector', () => {
    it('renders unit selector when unit is string', () => {
      const { container } = render(<NumberInput unit="kg" />);
      expect(container.querySelector('.unit-selector')).toBeInTheDocument();
    });

    it('renders unit selector when unit is array', () => {
      const { container } = render(<NumberInput unit={['kg', 'g', 'mg']} />);
      const selector = container.querySelector('.unit-selector') as HTMLSelectElement;
      expect(selector).toBeInTheDocument();
      expect(selector.querySelectorAll('option').length).toBe(3);
    });

    it('calls onUnitChange when unit is changed', async () => {
      const handleUnitChange = jest.fn();
      const { container } = render(<NumberInput unit={['kg', 'g']} onUnitChange={handleUnitChange} />);

      const selector = container.querySelector('.unit-selector') as HTMLSelectElement;
      await userEvent.selectOptions(selector, 'g');

      expect(handleUnitChange).toHaveBeenCalledWith('g');
    });

    it('controlled unit value', () => {
      const { container } = render(<NumberInput unit={['kg', 'g']} selectedUnit="g" />);
      const selector = container.querySelector('.unit-selector') as HTMLSelectElement;
      expect(selector).toHaveValue('g');
    });

    it('disables unit selector when input is disabled', () => {
      const { container } = render(<NumberInput unit="kg" disabled />);
      const selector = container.querySelector('.unit-selector') as HTMLSelectElement;
      expect(selector).toBeDisabled();
    });

    it('hides unit selector when stepper is present', () => {
      const { container } = render(<NumberInput stepper="auto" unit="kg" />);
      expect(container.querySelector('.unit-selector')).not.toBeInTheDocument();
    });
  });

  describe('Input interactions', () => {
    it('handles numeric input', async () => {
      const { container } = render(<NumberInput />);
      const input = container.querySelector('input') as HTMLInputElement;

      await userEvent.type(input, '123');
      expect(input.value).toContain('123');
    });

    it('calls onValueChange when value changes', async () => {
      const handleChange = jest.fn();
      const { container } = render(<NumberInput onValueChange={handleChange} />);

      await userEvent.type(container.querySelector('input') as HTMLInputElement, '5');
      expect(handleChange).toHaveBeenCalled();
    });

    it('calls onChange when value changes', async () => {
      const handleChange = jest.fn();
      const { container } = render(<NumberInput onChange={handleChange} />);

      await userEvent.type(container.querySelector('input') as HTMLInputElement, '5');
      expect(handleChange).toHaveBeenCalled();
    });
  });

  describe('Clearable', () => {
    it('does not show clear button with stepper', () => {
      const { container } = render(<NumberInput isClearable stepper="auto" />);
      expect(container.querySelector('.clear-btn')).not.toBeInTheDocument();
    });

    it('shows clear button without stepper', async () => {
      const { container } = render(<NumberInput isClearable />);
      const input = container.querySelector('input') as HTMLInputElement;

      await userEvent.type(input, '123');
      expect(container.querySelector('.clear-btn')).toBeInTheDocument();
    });
  });

  describe('States', () => {
    it('can be disabled', () => {
      const { container } = render(<NumberInput disabled />);
      expect(container.querySelector('input')).toBeDisabled();
    });

    it('can be readOnly', () => {
      const { container } = render(<NumberInput readOnly />);
      expect(container.querySelector('input')).toHaveAttribute('readOnly');
    });

    it('disables stepper buttons when disabled', () => {
      const { container } = render(<NumberInput stepper="auto" disabled />);
      const buttons = container.querySelectorAll('.square-icon');
      buttons.forEach((button) => {
        expect(button).toBeDisabled();
      });
    });

    it('disables stepper buttons when readOnly', () => {
      const { container } = render(<NumberInput stepper="auto" readOnly />);
      const buttons = container.querySelectorAll('.square-icon');
      buttons.forEach((button) => {
        expect(button).toBeDisabled();
      });
    });
  });

  describe('Number formatting', () => {
    it('formats with thousand separator', async () => {
      const { container } = render(<NumberInput thousandSeparator="," defaultValue={1000} />);
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input.value).toBe('1,000');
    });

    it('formats with prefix', () => {
      const { container } = render(<NumberInput prefix="$" defaultValue={100} />);
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input.value).toBe('$100');
    });

    it('formats with suffix', () => {
      const { container } = render(<NumberInput suffix="%" defaultValue={50} />);
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input.value).toBe('50%');
    });
  });

  describe('Accessibility', () => {
    it('forwards ref correctly', () => {
      const ref = jest.fn();
      render(<NumberInput ref={ref} />);
      expect(ref).toHaveBeenCalled();
    });

    it('applies custom className', () => {
      const { container } = render(<NumberInput className="custom-number-input" />);
      expect(container.querySelector('.number-input')).toHaveClass('custom-number-input');
    });
  });
});
