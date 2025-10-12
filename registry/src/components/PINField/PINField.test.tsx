import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PINField } from './index';

describe('PINField Component', () => {
  describe('Rendering', () => {
    it('renders correctly', () => {
      const { container } = render(<PINField />);
      expect(container.querySelector('.pinfield')).toBeInTheDocument();
    });

    it('renders default 4 inputs', () => {
      const { container } = render(<PINField />);
      const inputs = container.querySelectorAll('.pinfield-input');
      expect(inputs.length).toBe(4);
    });

    it('renders custom number of inputs', () => {
      const { container } = render(<PINField groups={[6]} />);
      const inputs = container.querySelectorAll('.pinfield-input');
      expect(inputs.length).toBe(6);
    });

    it('renders grouped inputs with separators', () => {
      const { container } = render(<PINField groups={[3, 3]} />);
      const inputs = container.querySelectorAll('.pinfield-input');
      const separators = container.querySelectorAll('.pinfield-separator');
      expect(inputs.length).toBe(6);
      expect(separators.length).toBe(1);
    });

    it('renders with custom separator', () => {
      const { container } = render(<PINField groups={[2, 2]} separator="*" />);
      const separator = container.querySelector('.pinfield-separator');
      expect(separator).toHaveTextContent('*');
    });

    it('renders default separator as dash', () => {
      const { container } = render(<PINField groups={[2, 2]} />);
      const separator = container.querySelector('.pinfield-separator');
      expect(separator).toHaveTextContent('-');
    });
  });

  describe('Size variants', () => {
    it('renders small size', () => {
      const { container } = render(<PINField size="sm" />);
      expect(container.querySelector('.pinfield')).toHaveClass('pinfield-small');
    });

    it('renders medium size (default)', () => {
      const { container } = render(<PINField />);
      expect(container.querySelector('.pinfield')).toHaveClass('pinfield-medium');
    });
  });

  describe('Theme variants', () => {
    it('does not apply alternative theme by default', () => {
      const { container } = render(<PINField />);
      expect(container.querySelector('.pinfield')).not.toHaveClass('pinfield-alternative');
    });

    it('applies alternative theme', () => {
      const { container } = render(<PINField theme="alternative" />);
      expect(container.querySelector('.pinfield')).toHaveClass('pinfield-alternative');
    });
  });

  describe('Input interactions', () => {
    it('accepts numeric input', async () => {
      const { container } = render(<PINField />);
      const inputs = container.querySelectorAll('.pinfield-input') as NodeListOf<HTMLInputElement>;

      await userEvent.type(inputs[0], '1');
      expect(inputs[0].value).toBe('1');
    });

    it('accepts alphabetic input', async () => {
      const { container } = render(<PINField />);
      const inputs = container.querySelectorAll('.pinfield-input') as NodeListOf<HTMLInputElement>;

      await userEvent.type(inputs[0], 'A');
      expect(inputs[0].value).toBe('A');
    });

    it('auto-focuses next input after entering value', async () => {
      const { container } = render(<PINField />);
      const inputs = container.querySelectorAll('.pinfield-input') as NodeListOf<HTMLInputElement>;

      await userEvent.type(inputs[0], '1');
      expect(document.activeElement).toBe(inputs[1]);
    });

    it('fills all inputs sequentially', async () => {
      const { container } = render(<PINField groups={[4]} />);
      const firstInput = container.querySelectorAll('.pinfield-input')[0] as HTMLInputElement;

      await userEvent.type(firstInput, '1234');

      const inputs = container.querySelectorAll('.pinfield-input') as NodeListOf<HTMLInputElement>;
      expect(inputs[0].value).toBe('1');
      expect(inputs[1].value).toBe('2');
      expect(inputs[2].value).toBe('3');
      expect(inputs[3].value).toBe('4');
    });

    it('calls onChange when value changes', async () => {
      const handleChange = jest.fn();
      const { container } = render(<PINField onChange={handleChange} />);
      const input = container.querySelectorAll('.pinfield-input')[0] as HTMLInputElement;

      await userEvent.type(input, '1');
      expect(handleChange).toHaveBeenCalledWith('1');
    });

    it('calls onComplete when all inputs are filled', async () => {
      const handleComplete = jest.fn();
      const { container } = render(<PINField groups={[2]} onComplete={handleComplete} />);
      const firstInput = container.querySelectorAll('.pinfield-input')[0] as HTMLInputElement;

      await userEvent.type(firstInput, '12');
      expect(handleComplete).toHaveBeenCalledWith('12');
    });
  });

  describe('Keyboard navigation', () => {
    it('moves to previous input on backspace', async () => {
      const { container } = render(<PINField />);
      const inputs = container.querySelectorAll('.pinfield-input') as NodeListOf<HTMLInputElement>;

      await userEvent.type(inputs[0], '1');
      expect(document.activeElement).toBe(inputs[1]);

      await userEvent.keyboard('{Backspace}');
      expect(document.activeElement).toBe(inputs[0]);
    });

    it('clears current input on backspace', async () => {
      const { container } = render(<PINField />);
      const input = container.querySelectorAll('.pinfield-input')[0] as HTMLInputElement;

      await userEvent.type(input, '1');
      await userEvent.click(input);
      await userEvent.keyboard('{Backspace}');

      expect(input.value).toBe('');
    });

    it('moves focus left with ArrowLeft', async () => {
      const { container } = render(<PINField />);
      const inputs = container.querySelectorAll('.pinfield-input') as NodeListOf<HTMLInputElement>;

      await userEvent.type(inputs[0], '12');
      await userEvent.keyboard('{ArrowLeft}');

      expect(document.activeElement).toBe(inputs[0]);
    });

    it('moves focus right with ArrowRight', async () => {
      const { container } = render(<PINField />);
      const inputs = container.querySelectorAll('.pinfield-input') as NodeListOf<HTMLInputElement>;

      inputs[0].focus();
      await userEvent.keyboard('{ArrowRight}');

      expect(document.activeElement).toBe(inputs[1]);
    });
  });

  describe('Paste functionality', () => {
    it('handles paste event', async () => {
      const { container } = render(<PINField groups={[4]} />);
      const input = container.querySelectorAll('.pinfield-input')[0] as HTMLInputElement;

      input.focus();
      await userEvent.paste('1234');

      const inputs = container.querySelectorAll('.pinfield-input') as NodeListOf<HTMLInputElement>;
      expect(inputs[0].value).toBe('1');
      expect(inputs[1].value).toBe('2');
      expect(inputs[2].value).toBe('3');
      expect(inputs[3].value).toBe('4');
    });
  });

  describe('Masked mode', () => {
    it('uses password type when masked', () => {
      const { container } = render(<PINField masked />);
      const inputs = container.querySelectorAll('.pinfield-input') as NodeListOf<HTMLInputElement>;
      inputs.forEach((input) => {
        expect(input).toHaveAttribute('type', 'password');
      });
    });

    it('uses text type when not masked', () => {
      const { container } = render(<PINField />);
      const inputs = container.querySelectorAll('.pinfield-input') as NodeListOf<HTMLInputElement>;
      inputs.forEach((input) => {
        expect(input).toHaveAttribute('type', 'text');
      });
    });

    it('applies masked class', () => {
      const { container } = render(<PINField masked />);
      expect(container.querySelector('.pinfield')).toHaveClass('pinfield-masked');
    });
  });

  describe('States', () => {
    it('can be disabled', () => {
      const { container } = render(<PINField disabled />);
      const inputs = container.querySelectorAll('.pinfield-input') as NodeListOf<HTMLInputElement>;
      inputs.forEach((input) => {
        expect(input).toBeDisabled();
      });
      expect(container.querySelector('.pinfield')).toHaveClass('pinfield-disabled');
    });

    it('can be readOnly', () => {
      const { container } = render(<PINField readOnly />);
      const inputs = container.querySelectorAll('.pinfield-input') as NodeListOf<HTMLInputElement>;
      inputs.forEach((input) => {
        expect(input).toHaveAttribute('readOnly');
      });
      expect(container.querySelector('.pinfield')).toHaveClass('pinfield-read-only');
    });

    it('can be invalid', () => {
      const { container } = render(<PINField invalid />);
      const inputs = container.querySelectorAll('.pinfield-input') as NodeListOf<HTMLInputElement>;
      inputs.forEach((input) => {
        expect(input).toHaveAttribute('aria-invalid', 'true');
      });
      expect(container.querySelector('.pinfield')).toHaveClass('pinfield-invalid');
    });

    it('does not accept input when disabled', async () => {
      const handleChange = jest.fn();
      const { container } = render(<PINField disabled onChange={handleChange} />);
      const input = container.querySelectorAll('.pinfield-input')[0] as HTMLInputElement;

      await userEvent.type(input, '1');
      expect(handleChange).not.toHaveBeenCalled();
    });

    it('does not accept input when readOnly', async () => {
      const handleChange = jest.fn();
      const { container } = render(<PINField readOnly onChange={handleChange} />);
      const input = container.querySelectorAll('.pinfield-input')[0] as HTMLInputElement;

      await userEvent.type(input, '1');
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Reset functionality', () => {
    it('clears all inputs when reset is true', async () => {
      const { container, rerender } = render(<PINField />);
      const firstInput = container.querySelectorAll('.pinfield-input')[0] as HTMLInputElement;

      await userEvent.type(firstInput, '1234');

      rerender(<PINField reset />);

      const inputs = container.querySelectorAll('.pinfield-input') as NodeListOf<HTMLInputElement>;
      inputs.forEach((input) => {
        expect(input.value).toBe('');
      });
    });
  });

  describe('Placeholder', () => {
    it('shows default placeholder', () => {
      const { container } = render(<PINField />);
      const placeholders = container.querySelectorAll('.pinfield-placeholder');
      expect(placeholders.length).toBeGreaterThan(0);
      expect(placeholders[0]).toHaveTextContent('•');
    });

    it('shows custom placeholder', () => {
      const { container } = render(<PINField placeholder="*" />);
      const placeholder = container.querySelector('.pinfield-placeholder');
      expect(placeholder).toHaveTextContent('*');
    });
  });

  describe('Accessibility', () => {
    it('forwards ref correctly', () => {
      const ref = jest.fn();
      render(<PINField ref={ref} />);
      expect(ref).toHaveBeenCalled();
    });

    it('applies custom className', () => {
      const { container } = render(<PINField className="custom-pinfield" />);
      expect(container.querySelector('.pinfield')).toHaveClass('custom-pinfield');
    });

    it('inputs have inputMode numeric', () => {
      const { container } = render(<PINField />);
      const inputs = container.querySelectorAll('.pinfield-input') as NodeListOf<HTMLInputElement>;
      inputs.forEach((input) => {
        expect(input).toHaveAttribute('inputMode', 'numeric');
      });
    });

    it('inputs have autoComplete off', () => {
      const { container } = render(<PINField />);
      const inputs = container.querySelectorAll('.pinfield-input') as NodeListOf<HTMLInputElement>;
      inputs.forEach((input) => {
        expect(input).toHaveAttribute('autoComplete', 'off');
      });
    });
  });
});
