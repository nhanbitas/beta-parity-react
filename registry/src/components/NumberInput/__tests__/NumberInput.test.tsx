import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NumberInput } from '../index';

// Mock the necessary dependencies
jest.mock('lucide-react', () => ({
  ChevronDown: () => <span data-testid='chevron-down'>↓</span>,
  ChevronUp: () => <span data-testid='chevron-up'>↑</span>,
  MinusIcon: () => <span data-testid='minus-icon'>-</span>,
  PlusIcon: () => <span data-testid='plus-icon'>+</span>
}));

// Mock the BaseInput components
jest.mock('../../BaseInput', () => {
  const React = require('react');

  const Input = React.forwardRef(
    ({ className, ActionBtn, leftIcon, wrapperProps, onClear, isClearable, ...props }, ref) => (
      <div className={className} data-testid='mock-input-wrapper'>
        {wrapperProps?.leftElement && <div data-testid='left-element'>{wrapperProps.leftElement}</div>}
        <input data-testid='input-element' ref={ref} {...props} />
        {isClearable && (
          <button data-testid='clear-button' onClick={onClear}>
            ×
          </button>
        )}
        {ActionBtn && <div data-testid='action-btn'>{ActionBtn}</div>}
      </div>
    )
  );

  const UnitSelector = ({ unit, onUnitChange, unitValue, disabled, theme }) => {
    // Simple implementation for a select component
    const options = Array.isArray(unit) ? unit : [unit];

    return (
      <select
        data-testid='unit-selector'
        value={unitValue || ''}
        onChange={onUnitChange}
        disabled={disabled}
        data-theme={theme}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  };

  return { Input, UnitSelector };
});

// Mock react-number-format
jest.mock('react-number-format', () => {
  const React = require('react');

  const NumericFormat = ({ customInput: CustomInput, onValueChange, value, isAllowed, getInputRef, ...props }) => {
    const handleChange = (e) => {
      const value = e.target.value;
      const numValue = parseFloat(value);

      // If the value is allowed, trigger onValueChange
      const isValid = isAllowed({ floatValue: isNaN(numValue) ? undefined : numValue });
      if (isValid) {
        onValueChange?.({
          floatValue: isNaN(numValue) ? undefined : numValue,
          value: value,
          formattedValue: value
        });
      }
    };

    return <CustomInput ref={getInputRef} value={value} onChange={handleChange} {...props} />;
  };

  return {
    NumericFormat,
    numericFormatter: (val) => val.toString()
  };
});

describe('NumberInput Component', () => {
  test('renders correctly with default props', () => {
    render(<NumberInput data-testid='number-input' />);

    const inputWrapper = screen.getByTestId('mock-input-wrapper');
    expect(inputWrapper).toBeInTheDocument();
    expect(inputWrapper).toHaveClass('number-input');

    const input = screen.getByTestId('input-element');
    expect(input).toBeInTheDocument();
  });

  test('applies custom className', () => {
    render(<NumberInput className='custom-class' />);

    const inputWrapper = screen.getByTestId('mock-input-wrapper');
    expect(inputWrapper).toHaveClass('custom-class');
  });

  test('renders unit selector when unit prop is provided', () => {
    render(<NumberInput unit='USD' />);

    const unitSelector = screen.getByTestId('unit-selector');
    expect(unitSelector).toBeInTheDocument();
    expect(screen.getByText('USD')).toBeInTheDocument();
  });

  test('renders multiple units in selector when unit is an array', () => {
    const units = ['USD', 'EUR', 'GBP'];
    render(<NumberInput unit={units} />);

    const unitSelector = screen.getByTestId('unit-selector');
    expect(unitSelector).toBeInTheDocument();

    units.forEach((unit) => {
      expect(screen.getByText(unit)).toBeInTheDocument();
    });
  });

  test('calls onUnitChange when unit selection changes', () => {
    const handleUnitChange = jest.fn();
    const units = ['USD', 'EUR', 'GBP'];

    render(<NumberInput unit={units} onUnitChange={handleUnitChange} />);

    const unitSelector = screen.getByTestId('unit-selector');
    fireEvent.change(unitSelector, { target: { value: 'EUR' } });

    expect(handleUnitChange).toHaveBeenCalledWith('EUR');
  });

  test('uses selectedUnit prop when provided', () => {
    const units = ['USD', 'EUR', 'GBP'];
    render(<NumberInput unit={units} selectedUnit='EUR' />);

    const unitSelector = screen.getByTestId('unit-selector');
    expect(unitSelector).toHaveValue('EUR');
  });

  test('renders auto stepper correctly', () => {
    render(<NumberInput stepper='auto' />);

    const inputWrapper = screen.getByTestId('mock-input-wrapper');
    expect(inputWrapper).toHaveClass('auto-stepper');

    // Check for both buttons in the stepper
    expect(screen.getByTestId('minus-icon')).toBeInTheDocument();
    expect(screen.getByTestId('plus-icon')).toBeInTheDocument();
  });

  test('renders chevron stepper correctly', () => {
    render(<NumberInput stepper='chevron' />);

    const inputWrapper = screen.getByTestId('mock-input-wrapper');
    expect(inputWrapper).toHaveClass('chevron-stepper');

    // Check for chevron icons in the stepper
    expect(screen.getByTestId('chevron-up')).toBeInTheDocument();
    expect(screen.getByTestId('chevron-down')).toBeInTheDocument();
  });

  test('renders separate stepper correctly', () => {
    render(<NumberInput stepper='separate' />);

    const inputWrapper = screen.getByTestId('mock-input-wrapper');
    expect(inputWrapper).toHaveClass('separate-stepper');

    // In separate stepper, minus is on left and plus is on right
    const leftElement = screen.getByTestId('left-element');
    expect(leftElement).toBeInTheDocument();
    expect(leftElement).toContainElement(screen.getByTestId('minus-icon'));

    const actionBtn = screen.getByTestId('action-btn');
    expect(actionBtn).toBeInTheDocument();
    expect(actionBtn).toContainElement(screen.getByTestId('plus-icon'));
  });

  test('disables input when allowInput is false', () => {
    render(<NumberInput stepper='auto' allowInput={false} />);

    const input = screen.getByTestId('input-element');
    expect(input).toHaveAttribute('readOnly');
  });

  test('increments value when plus button is clicked', () => {
    const onChange = jest.fn();
    const onValueChange = jest.fn();

    render(<NumberInput stepper='auto' value={5} onChange={onChange} onValueChange={onValueChange} />);

    const plusButton = screen.getByTestId('plus-icon').closest('button');
    fireEvent.mouseDown(plusButton);
    fireEvent.mouseUp(plusButton);

    expect(onValueChange).toHaveBeenCalledWith(expect.objectContaining({ floatValue: 6 }), expect.anything());
  });

  test('decrements value when minus button is clicked', () => {
    const onChange = jest.fn();
    const onValueChange = jest.fn();

    render(<NumberInput stepper='auto' value={5} onChange={onChange} onValueChange={onValueChange} />);

    const minusButton = screen.getByTestId('minus-icon').closest('button');
    fireEvent.mouseDown(minusButton);
    fireEvent.mouseUp(minusButton);

    expect(onValueChange).toHaveBeenCalledWith(expect.objectContaining({ floatValue: 4 }), expect.anything());
  });

  test('respects min value constraint', () => {
    const onValueChange = jest.fn();

    render(<NumberInput stepper='auto' value={1} min={1} onValueChange={onValueChange} />);

    const minusButton = screen.getByTestId('minus-icon').closest('button');
    expect(minusButton).toBeDisabled();

    fireEvent.mouseDown(minusButton);
    expect(onValueChange).not.toHaveBeenCalled();
  });

  test('respects max value constraint', () => {
    const onValueChange = jest.fn();

    render(<NumberInput stepper='auto' value={10} max={10} onValueChange={onValueChange} />);

    const plusButton = screen.getByTestId('plus-icon').closest('button');
    expect(plusButton).toBeDisabled();

    fireEvent.mouseDown(plusButton);
    expect(onValueChange).not.toHaveBeenCalled();
  });

  test('uses stepControl for increment/decrement amount', () => {
    const onValueChange = jest.fn();

    render(<NumberInput stepper='auto' value={5} stepControl={2.5} onValueChange={onValueChange} />);

    const plusButton = screen.getByTestId('plus-icon').closest('button');
    fireEvent.mouseDown(plusButton);
    fireEvent.mouseUp(plusButton);

    expect(onValueChange).toHaveBeenCalledWith(expect.objectContaining({ floatValue: 7.5 }), expect.anything());

    // Reset mock
    onValueChange.mockReset();

    const minusButton = screen.getByTestId('minus-icon').closest('button');
    fireEvent.mouseDown(minusButton);
    fireEvent.mouseUp(minusButton);

    expect(onValueChange).toHaveBeenCalledWith(expect.objectContaining({ floatValue: 5 - 2.5 }), expect.anything());
  });

  test('disables stepper buttons when input is disabled', () => {
    render(<NumberInput stepper='auto' disabled />);

    const plusButton = screen.getByTestId('plus-icon').closest('button');
    const minusButton = screen.getByTestId('minus-icon').closest('button');

    expect(plusButton).toBeDisabled();
    expect(minusButton).toBeDisabled();
  });

  test('disables stepper buttons when input is readOnly', () => {
    render(<NumberInput stepper='auto' readOnly />);

    const plusButton = screen.getByTestId('plus-icon').closest('button');
    const minusButton = screen.getByTestId('minus-icon').closest('button');

    expect(plusButton).toBeDisabled();
    expect(minusButton).toBeDisabled();
  });

  test('clears value when clear button is clicked', () => {
    const onClear = jest.fn();

    render(<NumberInput value='123' isClearable onClear={onClear} />);

    const clearButton = screen.getByTestId('clear-button');
    fireEvent.click(clearButton);

    expect(onClear).toHaveBeenCalled();
  });

  test('does not render clear button when stepper is provided', () => {
    render(<NumberInput value='123' stepper='auto' isClearable />);

    expect(screen.queryByTestId('clear-button')).not.toBeInTheDocument();
  });

  test('updates value on input change', () => {
    const onChange = jest.fn();
    const onValueChange = jest.fn();

    render(<NumberInput onValueChange={onValueChange} onChange={onChange} />);

    const input = screen.getByTestId('input-element');
    fireEvent.change(input, { target: { value: '42' } });

    expect(onValueChange).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalled();
  });

  test('forwards ref to input element', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<NumberInput ref={ref} />);

    expect(ref.current).not.toBeNull();
  });
});
