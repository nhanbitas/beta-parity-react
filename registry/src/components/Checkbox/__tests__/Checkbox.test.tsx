import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Checkbox } from '../index';

describe('Checkbox Component', () => {
  // Basic rendering tests
  test('renders checkbox with label', () => {
    render(<Checkbox label='Test Label' />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  test('renders checkbox with sublabel', () => {
    render(<Checkbox label='Main Label' sublabel='Sub Label' />);
    expect(screen.getByText('Main Label')).toBeInTheDocument();
    expect(screen.getByText('Sub Label')).toBeInTheDocument();
  });

  test('renders checkbox without label or sublabel', () => {
    render(<Checkbox />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.queryByText('Test Label')).not.toBeInTheDocument();
  });

  // Color variants tests
  test('renders neutral checkbox by default', () => {
    render(<Checkbox />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveClass('neutral');
  });

  test('renders accent checkbox when specified', () => {
    render(<Checkbox color='accent' />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveClass('accent');
  });

  // Checked state tests
  test('checkbox is unchecked by default', () => {
    render(<Checkbox />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  test('checkbox with checked prop is checked', () => {
    render(<Checkbox checked={true} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  // Indeterminate state tests
  test('checkbox with indeterminate prop has indeterminate set', () => {
    // Note: We need to spy on HTMLInputElement.prototype because indeterminate is not
    // part of the DOM API accessible via testing library
    const spy = jest.spyOn(HTMLInputElement.prototype, 'indeterminate', 'set');
    render(<Checkbox indeterminate={true} />);
    expect(spy).toHaveBeenCalledWith(true);
    spy.mockRestore();
  });

  // Disabled state tests
  test('checkbox with disabled prop is disabled', () => {
    render(<Checkbox disabled={true} label='Disabled Checkbox' />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();

    // The wrapper should have aria-disabled attribute
    const wrapper = screen.getByText('Disabled Checkbox').closest('label');
    expect(wrapper).toHaveAttribute('aria-disabled', 'true');
  });

  test('disabled checkbox cannot be clicked', () => {
    const handleChange = jest.fn();
    render(<Checkbox disabled={true} onChange={handleChange} />);
    const checkbox = screen.getByRole('checkbox');

    fireEvent.click(checkbox);
    expect(handleChange).not.toHaveBeenCalled();
    expect(checkbox).not.toBeChecked();
  });

  // Interaction tests
  test('checkbox onChange is called when clicked', () => {
    const handleChange = jest.fn();
    render(<Checkbox onChange={handleChange} />);
    const checkbox = screen.getByRole('checkbox');

    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(2);
    expect(checkbox).not.toBeChecked();
  });

  test('controlled checkbox maintains checked state', () => {
    const { rerender } = render(<Checkbox checked={true} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();

    rerender(<Checkbox checked={false} />);
    expect(checkbox).not.toBeChecked();
  });

  // Additional wrapper props test
  test('passes checkboxWrapperProps to wrapper', () => {
    render(<Checkbox checkboxWrapperProps={{ 'data-testid': 'test-wrapper' }} />);
    expect(screen.getByTestId('test-wrapper')).toBeInTheDocument();
  });
});
