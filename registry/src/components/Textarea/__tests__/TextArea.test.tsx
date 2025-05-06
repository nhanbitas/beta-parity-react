import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Textarea } from '../index';

describe('Textarea Component', () => {
  // Basic rendering tests
  test('renders textarea correctly', () => {
    render(<Textarea placeholder='Enter text here' />);
    expect(screen.getByPlaceholderText('Enter text here')).toBeInTheDocument();
  });

  test('renders with default rows', () => {
    render(<Textarea />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('rows', '2'); // Default is 2 rows
  });

  test('renders with custom rows', () => {
    render(<Textarea rows={5} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('rows', '5');
  });

  // Theme/color tests
  test('renders with default theme', () => {
    render(<Textarea />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('default');
  });

  test('renders with custom theme', () => {
    render(<Textarea theme='custom-theme' />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('custom-theme');
  });

  // Value and onChange tests
  test('controlled component maintains value', () => {
    const { rerender } = render(<Textarea value='Initial text' />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveValue('Initial text');

    rerender(<Textarea value='Updated text' />);
    expect(textarea).toHaveValue('Updated text');
  });

  test('handles onChange event', () => {
    const handleChange = jest.fn();
    render(<Textarea onChange={handleChange} />);
    const textarea = screen.getByRole('textbox');

    fireEvent.change(textarea, { target: { value: 'New text content' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  // Character count and maxLength tests
  test('shows character count when maxLength is provided', () => {
    render(<Textarea maxLength={100} value='Hello' />);
    expect(screen.getByText('5/100')).toBeInTheDocument();
  });

  test('updates character count when value changes', () => {
    render(<Textarea maxLength={100} />);
    const textarea = screen.getByRole('textbox');

    fireEvent.change(textarea, { target: { value: 'Hello world' } });
    expect(screen.getByText('11/100')).toBeInTheDocument();
  });

  test('prevents input beyond maxLength', () => {
    const handleChange = jest.fn();
    render(<Textarea maxLength={5} onChange={handleChange} />);
    const textarea = screen.getByRole('textbox');

    // Simulate typing more characters than maxLength
    fireEvent.change(textarea, { target: { value: '123456' } });

    // The change event should not trigger when max length is exceeded
    expect(handleChange).not.toHaveBeenCalled();
  });

  // Clear button tests
  test('shows clear button when isClearable is true and has value', () => {
    render(<Textarea isClearable value='Some text' />);
    expect(screen.getByText('Clear')).toBeInTheDocument();
  });

  test('does not show clear button when there is no value', () => {
    render(<Textarea isClearable value='' />);
    expect(screen.queryByText('Clear')).not.toBeInTheDocument();
  });

  test('clears text when clear button is clicked', () => {
    const handleChange = jest.fn();
    render(<Textarea isClearable value='Some text' onChange={handleChange} />);

    fireEvent.click(screen.getByText('Clear'));

    expect(handleChange).toHaveBeenCalledTimes(1);
    // Check that onChange was called with an empty string value
    expect(handleChange.mock.calls[0][0].target.value).toBe('');
  });

  test('uses custom clearBtnText when provided', () => {
    render(<Textarea isClearable value='Some text' clearBtnText='Reset' />);
    expect(screen.getByText('Reset')).toBeInTheDocument();
  });

  // Disabled and readOnly states
  test('renders in disabled state', () => {
    render(<Textarea disabled />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeDisabled();
  });

  test('does not show clear button when disabled', () => {
    render(<Textarea isClearable value='Some text' disabled />);
    expect(screen.queryByText('Clear')).not.toBeInTheDocument();
  });

  test('renders in readOnly state', () => {
    render(<Textarea readOnly />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('readonly');
  });

  test('does not show clear button when readOnly', () => {
    render(<Textarea isClearable value='Some text' readOnly />);
    expect(screen.queryByText('Clear')).not.toBeInTheDocument();
  });

  // Error state tests
  test('shows error state when isError is true', () => {
    render(<Textarea isError errorMessage='Invalid input' />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('error-state');
    expect(screen.getByText('Invalid input')).toBeInTheDocument();
  });

  // Footer tests
  test('shows footer when there is maxLength or isClearable', () => {
    const { rerender } = render(<Textarea maxLength={100} />);
    expect(screen.getByText('0/100')).toBeInTheDocument();

    rerender(<Textarea isClearable value='text' />);
    expect(screen.getByText('Clear')).toBeInTheDocument();
  });

  test('does not show footer when disabled', () => {
    render(<Textarea maxLength={100} disabled />);
    expect(screen.queryByText('0/100')).not.toBeInTheDocument();
  });

  // Ref forwarding test
  test('forwards ref to the textarea element', () => {
    const ref = React.createRef<HTMLTextAreaElement>();
    render(<Textarea ref={ref} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });
});
