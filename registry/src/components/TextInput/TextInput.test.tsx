import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextInput } from './index';

describe('TextInput Component', () => {
  describe('Rendering', () => {
    it('renders correctly', () => {
      render(<TextInput />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('has type="text" by default', () => {
      render(<TextInput />);
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
    });

    it('renders with placeholder', () => {
      render(<TextInput placeholder="Enter text" />);
      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    });

    it('renders with value', () => {
      render(<TextInput value="Test value" onChange={() => {}} />);
      expect(screen.getByRole('textbox')).toHaveValue('Test value');
    });

    it('renders with floating label', () => {
      render(<TextInput floatingLabel="Username" />);
      expect(screen.getByText('Username')).toBeInTheDocument();
    });

    it('renders with left icon', () => {
      const { container } = render(<TextInput leftIcon={<span data-testid="icon">I</span>} />);
      expect(screen.getByTestId('icon')).toBeInTheDocument();
      expect(container.querySelector('.input-icon')).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('handles text input', async () => {
      render(<TextInput />);
      const input = screen.getByRole('textbox');

      await userEvent.type(input, 'Hello');
      expect(input).toHaveValue('Hello');
    });

    it('calls onChange when value changes', async () => {
      const handleChange = jest.fn();
      render(<TextInput onChange={handleChange} />);

      await userEvent.type(screen.getByRole('textbox'), 'a');
      expect(handleChange).toHaveBeenCalled();
    });

    it('calls onFocus when focused', async () => {
      const handleFocus = jest.fn();
      render(<TextInput onFocus={handleFocus} />);

      await userEvent.click(screen.getByRole('textbox'));
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it('calls onBlur when blurred', async () => {
      const handleBlur = jest.fn();
      render(<TextInput onBlur={handleBlur} />);

      const input = screen.getByRole('textbox');
      await userEvent.click(input);
      await userEvent.tab();
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe('Clearable input', () => {
    it('shows clear button when isClearable and has value', async () => {
      const { container } = render(<TextInput isClearable />);
      const input = screen.getByRole('textbox');

      await userEvent.type(input, 'text');
      expect(container.querySelector('.clear-button')).toBeInTheDocument();
    });

    it('hides clear button when input is empty', () => {
      const { container } = render(<TextInput isClearable value="" />);
      expect(container.querySelector('.clear-button')).not.toBeInTheDocument();
    });

    it('clears value when clear button is clicked', async () => {
      const handleChange = jest.fn();
      const { container } = render(<TextInput isClearable onChange={handleChange} />);
      const input = screen.getByRole('textbox');

      await userEvent.type(input, 'text');
      const clearButton = container.querySelector('.clear-button') as HTMLButtonElement;
      await userEvent.click(clearButton);

      expect(input).toHaveValue('');
      expect(handleChange).toHaveBeenCalled();
    });

    it('calls onClear when clear button is clicked', async () => {
      const handleClear = jest.fn();
      const { container } = render(<TextInput isClearable onClear={handleClear} />);

      await userEvent.type(screen.getByRole('textbox'), 'text');
      const clearButton = container.querySelector('.clear-button') as HTMLButtonElement;
      await userEvent.click(clearButton);

      expect(handleClear).toHaveBeenCalledTimes(1);
    });

    it('does not show clear button when disabled', async () => {
      const { container } = render(<TextInput isClearable disabled value="text" />);
      expect(container.querySelector('.clear-button')).not.toBeInTheDocument();
    });

    it('does not show clear button when readOnly', async () => {
      const { container } = render(<TextInput isClearable readOnly value="text" />);
      expect(container.querySelector('.clear-button')).not.toBeInTheDocument();
    });
  });

  describe('States', () => {
    it('can be disabled', () => {
      render(<TextInput disabled />);
      expect(screen.getByRole('textbox')).toBeDisabled();
    });

    it('can be readOnly', () => {
      render(<TextInput readOnly />);
      expect(screen.getByRole('textbox')).toHaveAttribute('readOnly');
    });

    it('shows error state', () => {
      render(<TextInput isError />);
      expect(screen.getByRole('textbox')).toHaveClass('error-state');
    });

    it('shows error message when isError', () => {
      render(<TextInput isError errorMessage="Invalid input" />);
      expect(screen.getByText('Invalid input')).toBeInTheDocument();
    });

    it('does not show error message when not isError', () => {
      render(<TextInput errorMessage="Invalid input" />);
      expect(screen.queryByText('Invalid input')).not.toBeInTheDocument();
    });

    it('hides placeholder when disabled', () => {
      render(<TextInput disabled placeholder="Enter text" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', '');
    });
  });

  describe('Controlled vs Uncontrolled', () => {
    it('works as uncontrolled component', async () => {
      render(<TextInput />);
      const input = screen.getByRole('textbox');

      await userEvent.type(input, 'uncontrolled');
      expect(input).toHaveValue('uncontrolled');
    });

    it('works as controlled component', () => {
      const { rerender } = render(<TextInput value="initial" onChange={() => {}} />);
      expect(screen.getByRole('textbox')).toHaveValue('initial');

      rerender(<TextInput value="updated" onChange={() => {}} />);
      expect(screen.getByRole('textbox')).toHaveValue('updated');
    });

    it('updates when controlled value changes', () => {
      const { rerender } = render(<TextInput value="first" onChange={() => {}} />);
      rerender(<TextInput value="second" onChange={() => {}} />);
      expect(screen.getByRole('textbox')).toHaveValue('second');
    });
  });

  describe('Size variants', () => {
    it('renders small size by default', () => {
      render(<TextInput />);
      expect(screen.getByRole('textbox')).toHaveClass('small');
    });

    it('renders medium size', () => {
      render(<TextInput inputSize="md" />);
      expect(screen.getByRole('textbox')).toHaveClass('medium');
    });
  });

  describe('Theme variants', () => {
    it('renders default theme', () => {
      render(<TextInput />);
      expect(screen.getByRole('textbox')).toHaveClass('default');
    });

    it('renders alternative theme', () => {
      render(<TextInput theme="alternative" />);
      expect(screen.getByRole('textbox')).toHaveClass('alternative');
    });
  });

  describe('Accessibility', () => {
    it('forwards ref correctly', () => {
      const ref = jest.fn();
      render(<TextInput ref={ref} />);
      expect(ref).toHaveBeenCalled();
    });

    it('spreads additional props', () => {
      render(<TextInput data-testid="custom-input" aria-label="Custom input" />);
      const input = screen.getByTestId('custom-input');
      expect(input).toHaveAttribute('aria-label', 'Custom input');
    });

    it('applies custom className', () => {
      render(<TextInput className="custom-class" />);
      expect(screen.getByRole('textbox')).toHaveClass('custom-class');
    });
  });
});
