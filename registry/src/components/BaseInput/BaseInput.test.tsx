import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input, InputWrapper, ErrorMessage, ValueInputWrapper, UnitSelector } from './index';

describe('BaseInput Components', () => {
  describe('Input Component', () => {
    describe('Rendering', () => {
      it('renders correctly', () => {
        render(<Input />);
        expect(screen.getByRole('textbox')).toBeInTheDocument();
      });

      it('renders with placeholder', () => {
        render(<Input placeholder='Enter text' />);
        expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
      });

      it('renders with value', () => {
        render(<Input value='Test value' onChange={() => {}} />);
        expect(screen.getByDisplayValue('Test value')).toBeInTheDocument();
      });

      it('renders with floatingLabel', () => {
        render(<Input floatingLabel='Label' />);
        expect(screen.getByText('Label')).toBeInTheDocument();
      });

      it('renders with leftIcon', () => {
        render(<Input leftIcon={<span data-testid='left-icon'>Icon</span>} />);
        expect(screen.getByTestId('left-icon')).toBeInTheDocument();
      });
    });

    describe('Interactions', () => {
      it('calls onChange when value changes', async () => {
        const handleChange = jest.fn();
        render(<Input onChange={handleChange} />);

        await userEvent.type(screen.getByRole('textbox'), 'test');
        expect(handleChange).toHaveBeenCalled();
      });

      it('does not call onChange when disabled', async () => {
        const handleChange = jest.fn();
        render(<Input disabled onChange={handleChange} />);

        const input = screen.getByRole('textbox');
        await userEvent.type(input, 'test');
        expect(handleChange).not.toHaveBeenCalled();
      });

      it('does not call onChange when readOnly', async () => {
        const handleChange = jest.fn();
        render(<Input readOnly onChange={handleChange} />);

        const input = screen.getByRole('textbox');
        await userEvent.type(input, 'test');
        expect(handleChange).not.toHaveBeenCalled();
      });

      it('calls onClear when clear button is clicked', async () => {
        const handleClear = jest.fn();
        render(<Input isClearable value='test' onClear={handleClear} onChange={() => {}} />);

        const clearButton = screen.getByRole('button');
        await userEvent.click(clearButton);
        expect(handleClear).toHaveBeenCalled();
      });
    });

    describe('States', () => {
      it('disables input when disabled prop is true', () => {
        render(<Input disabled />);
        expect(screen.getByRole('textbox')).toBeDisabled();
      });

      it('makes input readOnly when readOnly prop is true', () => {
        render(<Input readOnly />);
        expect(screen.getByRole('textbox')).toHaveAttribute('readOnly');
      });

      it('shows error message when isError is true', () => {
        render(<Input isError errorMessage='Error text' />);
        expect(screen.getByText('Error text')).toBeInTheDocument();
      });

      it('applies error-state class when isError is true', () => {
        render(<Input isError />);
        expect(screen.getByRole('textbox')).toHaveClass('error-state');
      });

      it('shows clear button when isClearable and has value', () => {
        render(<Input isClearable value='test' onChange={() => {}} />);
        expect(screen.getByRole('button')).toBeInTheDocument();
      });

      it('hides clear button when no value', () => {
        render(<Input isClearable value='' onChange={() => {}} />);
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
      });

      it('hides clear button when readOnly', () => {
        render(<Input isClearable readOnly value='test' onChange={() => {}} />);
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
      });

      it('hides clear button when disabled', () => {
        render(<Input isClearable disabled value='test' onChange={() => {}} />);
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
      });
    });

    describe('Size variants', () => {
      it('renders small size', () => {
        render(<Input inputSize='sm' />);
        expect(screen.getByRole('textbox')).toHaveClass('small');
      });

      it('renders medium size', () => {
        render(<Input inputSize='md' />);
        expect(screen.getByRole('textbox')).toHaveClass('medium');
      });
    });

    describe('Theme variants', () => {
      it('renders default theme', () => {
        render(<Input theme='default' />);
        expect(screen.getByRole('textbox')).toHaveClass('default');
      });

      it('renders alternative theme', () => {
        render(<Input theme='alternative' />);
        expect(screen.getByRole('textbox')).toHaveClass('alternative');
      });
    });

    describe('Accessibility', () => {
      it('forwards ref correctly', () => {
        const ref = jest.fn();
        render(<Input ref={ref} />);
        expect(ref).toHaveBeenCalled();
      });

      it('applies custom className', () => {
        render(<Input className='custom-input' />);
        expect(screen.getByRole('textbox')).toHaveClass('custom-input');
      });
    });
  });

  describe('InputWrapper Component', () => {
    it('renders correctly', () => {
      const { container } = render(
        <InputWrapper>
          <input />
        </InputWrapper>
      );
      expect(container.querySelector('.input-wrapper')).toBeInTheDocument();
    });

    it('renders with leftElement', () => {
      render(
        <InputWrapper leftElement={<span data-testid='left'>Left</span>}>
          <input />
        </InputWrapper>
      );
      expect(screen.getByTestId('left')).toBeInTheDocument();
    });

    it('renders with rightElement', () => {
      render(
        <InputWrapper rightElement={<span data-testid='right'>Right</span>}>
          <input />
        </InputWrapper>
      );
      expect(screen.getByTestId('right')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <InputWrapper className='custom-wrapper'>
          <input />
        </InputWrapper>
      );
      expect(container.querySelector('.input-wrapper')).toHaveClass('custom-wrapper');
    });

    it('forwards ref correctly', () => {
      const ref = jest.fn();
      render(
        <InputWrapper ref={ref}>
          <input />
        </InputWrapper>
      );
      expect(ref).toHaveBeenCalled();
    });
  });

  describe('ErrorMessage Component', () => {
    it('renders correctly', () => {
      render(<ErrorMessage>Error text</ErrorMessage>);
      expect(screen.getByText('Error text')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<ErrorMessage className='custom-error'>Error</ErrorMessage>);
      expect(container.querySelector('.input-error-message')).toHaveClass('custom-error');
    });

    it('forwards ref correctly', () => {
      const ref = jest.fn();
      render(<ErrorMessage ref={ref}>Error</ErrorMessage>);
      expect(ref).toHaveBeenCalled();
    });
  });

  describe('ValueInputWrapper Component', () => {
    it('renders correctly', () => {
      const { container } = render(<ValueInputWrapper>Content</ValueInputWrapper>);
      expect(container.querySelector('.value-input-wrapper')).toBeInTheDocument();
    });

    it('renders default theme', () => {
      const { container } = render(<ValueInputWrapper theme='default'>Content</ValueInputWrapper>);
      expect(container.querySelector('.value-input-wrapper')).toHaveClass('default');
    });

    it('renders alternative theme', () => {
      const { container } = render(<ValueInputWrapper theme='alternative'>Content</ValueInputWrapper>);
      expect(container.querySelector('.value-input-wrapper')).toHaveClass('alternative');
    });

    it('applies custom className', () => {
      const { container } = render(<ValueInputWrapper className='custom'>Content</ValueInputWrapper>);
      expect(container.querySelector('.value-input-wrapper')).toHaveClass('custom');
    });

    it('forwards ref correctly', () => {
      const ref = jest.fn();
      render(<ValueInputWrapper ref={ref}>Content</ValueInputWrapper>);
      expect(ref).toHaveBeenCalled();
    });
  });

  describe('UnitSelector Component', () => {
    it('renders single unit as text', () => {
      render(<UnitSelector unit='px' />);
      expect(screen.getByText('px')).toBeInTheDocument();
    });

    it('renders array of units as select', () => {
      render(<UnitSelector unit={['px', 'em', 'rem']} />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('calls onUnitChange when unit changes', async () => {
      const handleChange = jest.fn();
      render(<UnitSelector unit={['px', 'em', 'rem']} onUnitChange={handleChange} />);

      await userEvent.selectOptions(screen.getByRole('combobox'), 'em');
      expect(handleChange).toHaveBeenCalled();
    });

    it('disables selector when disabled prop is true', () => {
      render(<UnitSelector unit={['px', 'em']} disabled />);
      expect(screen.getByRole('combobox')).toBeDisabled();
    });

    it('does not call onUnitChange when disabled', async () => {
      const handleChange = jest.fn();
      render(<UnitSelector unit={['px', 'em']} disabled onUnitChange={handleChange} />);

      await userEvent.selectOptions(screen.getByRole('combobox'), 'em');
      expect(handleChange).not.toHaveBeenCalled();
    });

    it('uses unitValue as controlled value', () => {
      render(<UnitSelector unit={['px', 'em', 'rem']} unitValue='em' />);
      expect(screen.getByRole('combobox')).toHaveValue('em');
    });

    it('renders default theme', () => {
      render(<UnitSelector unit={['px', 'em']} theme='default' />);
      expect(screen.getByRole('combobox')).toHaveClass('default');
    });

    it('renders alternative theme', () => {
      render(<UnitSelector unit={['px', 'em']} theme='alternative' />);
      expect(screen.getByRole('combobox')).toHaveClass('alternative');
    });

    it('returns null when unit is not provided', () => {
      const { container } = render(<UnitSelector />);
      expect(container.firstChild).toBeNull();
    });
  });
});
