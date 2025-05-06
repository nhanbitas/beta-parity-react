import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DateInput } from '../index';

// Since DateInput is a wrapper around Input component, we'll mock the Input component
jest.mock('../../BaseInput', () => ({
  Input: React.forwardRef(({ type, ...props }, ref) => (
    <input data-testid='mocked-input' type={type} ref={ref} {...props} />
  ))
}));

describe('DateInput Component', () => {
  test('renders with default type="date"', () => {
    render(<DateInput data-testid='date-input' />);

    const input = screen.getByTestId('mocked-input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'date');
  });

  test('forwards additional props to Input component', () => {
    render(<DateInput placeholder='Select a date' required aria-label='Date selection' />);

    const input = screen.getByTestId('mocked-input');
    expect(input).toHaveAttribute('placeholder', 'Select a date');
    expect(input).toHaveAttribute('required');
    expect(input).toHaveAttribute('aria-label', 'Date selection');
  });

  test('forwards ref to Input component', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<DateInput ref={ref} />);

    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('INPUT');
    expect(ref.current?.getAttribute('type')).toBe('date');
  });

  test('allows type override', () => {
    render(<DateInput type='datetime-local' />);

    const input = screen.getByTestId('mocked-input');
    expect(input).toHaveAttribute('type', 'datetime-local');
  });
});
