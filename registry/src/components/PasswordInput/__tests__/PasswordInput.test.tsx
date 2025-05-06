import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PasswordInput } from '../index';

describe('PasswordInput Component', () => {
  // Basic rendering tests
  test('renders password input correctly', () => {
    render(<PasswordInput placeholder='Enter password' />);
    expect(screen.getByPlaceholderText('Enter password')).toBeInTheDocument();
  });

  test('renders with default type as password', () => {
    render(<PasswordInput />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'password');
  });

  // Color variants tests
  test('renders neutral input by default', () => {
    render(<PasswordInput />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('neutral');
  });

  test('renders accent input when specified', () => {
    render(<PasswordInput color='accent' />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('accent');
  });

  // Default hidden state tests
  test('input is hidden by default', () => {
    render(<PasswordInput />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'password');
  });

  test('input is visible when defaultHidden is false', () => {
    render(<PasswordInput defaultHidden={false} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'text');
  });

  // Toggle visibility tests
  test('toggles input type when visibility button is clicked', () => {
    render(<PasswordInput />);
    const input = screen.getByRole('textbox');
    const toggleButton = screen.getByRole('button', { name: /toggle password visibility/i });

    // Initial state - password is hidden
    expect(input).toHaveAttribute('type', 'password');

    // Click to show password
    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute('type', 'text');

    // Click to hide password again
    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute('type', 'password');
  });

  // Focus behavior tests
  test('input maintains focus after toggling visibility', () => {
    render(<PasswordInput />);
    const input = screen.getByRole('textbox');
    const toggleButton = screen.getByRole('button', { name: /toggle password visibility/i });

    // Focus the input
    act(() => {
      input.focus();
    });
    expect(document.activeElement).toBe(input);

    // Toggle visibility and check if focus is maintained
    fireEvent.click(toggleButton);
    expect(document.activeElement).toBe(input);
  });

  // Disabled state tests
  test('disabled input cannot be interacted with', () => {
    render(<PasswordInput disabled />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  test('visibility toggle is disabled when input is disabled', () => {
    render(<PasswordInput disabled />);
    const toggleButton = screen.getByRole('button', { name: /toggle password visibility/i });
    expect(toggleButton).toBeDisabled();
  });

  // Value and onChange tests
  test('changes input value when typed', () => {
    const handleChange = jest.fn();
    render(<PasswordInput onChange={handleChange} />);
    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'password123' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('controlled component maintains value', () => {
    const { rerender } = render(<PasswordInput value='password123' />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('password123');

    rerender(<PasswordInput value='newpassword' />);
    expect(input).toHaveValue('newpassword');
  });

  // Error state tests
  test('shows error state when isError is true', () => {
    render(<PasswordInput isError errorMessage='Invalid password' />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('error-state');
    expect(screen.getByText('Invalid password')).toBeInTheDocument();
  });

  // Ref forwarding test
  test('forwards ref to the input element', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<PasswordInput ref={ref} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
