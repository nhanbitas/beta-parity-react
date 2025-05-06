import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TextInput } from '../index';

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  X: () => <div data-testid='x-icon' />,
  ChevronsUpDown: () => <div data-testid='chevrons-icon' />
}));

describe('TextInput Component', () => {
  // Test rendering with default props
  test('renders with default props', () => {
    render(<TextInput />);

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('par-input', 'default');
    expect(input).not.toBeDisabled();
    expect(input).not.toHaveClass('error-state');
  });

  // Test placeholder
  test('renders with placeholder', () => {
    const placeholder = 'Enter text';
    render(<TextInput placeholder={placeholder} />);

    const input = screen.getByPlaceholderText(placeholder);
    expect(input).toBeInTheDocument();
  });

  // Test controlled input value
  test('works as controlled component', () => {
    const { rerender } = render(<TextInput value='initial value' />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('initial value');

    rerender(<TextInput value='updated value' />);
    expect(input).toHaveValue('updated value');
  });

  // Test input changes
  test('handles input changes', () => {
    const handleChange = jest.fn();
    render(<TextInput onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'new value' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(input).toHaveValue('new value');
  });

  // Test disabled state
  test('renders disabled input', () => {
    render(<TextInput disabled />);

    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  // Test readonly state
  test('renders readonly input', () => {
    render(<TextInput readOnly />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('readonly');
  });

  // Test error state and message
  test('renders error state and message', () => {
    const errorMessage = 'This field is required';
    render(<TextInput isError errorMessage={errorMessage} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('error-state');
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  // Test sizes
  test('renders with different sizes', () => {
    const { rerender } = render(<TextInput inputSize='sm' />);
    expect(screen.getByRole('textbox')).toHaveClass('small');

    rerender(<TextInput inputSize='md' />);
    expect(screen.getByRole('textbox')).toHaveClass('medium');
  });

  // Test themes
  test('renders with different themes', () => {
    const { rerender } = render(<TextInput theme='default' />);
    expect(screen.getByRole('textbox')).toHaveClass('default');

    rerender(<TextInput theme='alternative' />);
    expect(screen.getByRole('textbox')).toHaveClass('alternative');
  });

  // Test clearable input
  test('renders clearable input and handles clear', () => {
    const handleChange = jest.fn();
    const handleClear = jest.fn();

    render(<TextInput isClearable onClear={handleClear} onChange={handleChange} value='test value' />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('test value');

    // Clear button should be visible when there's a value
    const clearButton = screen.getByRole('button');
    expect(clearButton).toBeInTheDocument();
    expect(screen.getByTestId('x-icon')).toBeInTheDocument();

    // Click clear button
    fireEvent.click(clearButton);

    expect(handleClear).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledTimes(1);

    // Input should be automatically focused after clearing
    expect(document.activeElement).toBe(input);
  });

  // Test floating label
  test('renders with floating label', () => {
    const label = 'Username';
    render(<TextInput floatingLabel={label} />);

    expect(screen.getByText(label)).toBeInTheDocument();
  });

  // Test left icon
  test('renders with left icon', () => {
    const iconTestId = 'left-icon-test';
    render(<TextInput leftIcon={<div data-testid={iconTestId} />} />);

    expect(screen.getByTestId(iconTestId)).toBeInTheDocument();
  });

  // Test action button
  test('renders with action button', () => {
    const actionBtnTestId = 'action-btn-test';
    render(<TextInput ActionBtn={<button data-testid={actionBtnTestId}>Action</button>} />);

    expect(screen.getByTestId(actionBtnTestId)).toBeInTheDocument();
  });

  // Test focus and blur events
  test('handles focus and blur events', () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();

    render(<TextInput onFocus={handleFocus} onBlur={handleBlur} />);

    const input = screen.getByRole('textbox');

    // Focus the input
    fireEvent.focus(input);
    expect(handleFocus).toHaveBeenCalledTimes(1);

    // Blur the input
    fireEvent.blur(input);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  // Test custom wrapper props
  test('applies custom wrapper props', () => {
    render(<TextInput wrapperProps={{ 'data-testid': 'custom-wrapper', className: 'custom-wrapper-class' }} />);

    const wrapper = screen.getByTestId('custom-wrapper');
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveClass('custom-wrapper-class');
  });

  // Test type prop is passed correctly
  test('passes type prop to input element', () => {
    render(<TextInput type='email' />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'email');
  });
});
