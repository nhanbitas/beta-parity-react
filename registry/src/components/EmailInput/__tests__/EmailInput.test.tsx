import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { EmailInput } from '../index';

// Mock the BaseInput components
jest.mock('../../BaseInput', () => {
  const React = require('react');

  const Input = React.forwardRef(({ type, ActionBtn, ...props }, ref) => (
    <div data-testid='mock-input' data-type={type}>
      <input type={type} data-testid='input-element' ref={ref} {...props} />
      {ActionBtn && <div data-testid='action-btn'>{ActionBtn}</div>}
    </div>
  ));

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

describe('EmailInput Component', () => {
  test('renders as email input by default', () => {
    render(<EmailInput />);

    const input = screen.getByTestId('mock-input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('data-type', 'email');
  });

  test('forwards ref to the input element', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<EmailInput ref={ref} />);

    expect(ref.current).not.toBeNull();
  });

  test('renders without domain selector when no domain is provided', () => {
    render(<EmailInput placeholder='Enter email' />);

    expect(screen.queryByTestId('unit-selector')).not.toBeInTheDocument();
  });

  test('renders with domain selector when domain is provided as string', () => {
    render(<EmailInput domain='example.com' />);

    const selector = screen.getByTestId('unit-selector');
    expect(selector).toBeInTheDocument();

    // Check that domain is available as an option
    const option = screen.getByText('example.com');
    expect(option).toBeInTheDocument();
  });

  test('renders with domain selector when domain is provided as array', () => {
    const domains = ['example.com', 'test.com', 'company.org'];
    render(<EmailInput domain={domains} />);

    const selector = screen.getByTestId('unit-selector');
    expect(selector).toBeInTheDocument();

    // Check that all domains are available as options
    domains.forEach((domain) => {
      const option = screen.getByText(domain);
      expect(option).toBeInTheDocument();
    });
  });

  test('calls onDomainChange when domain selection changes', () => {
    const handleDomainChange = jest.fn();
    const domains = ['example.com', 'test.com'];

    render(<EmailInput domain={domains} onDomainChange={handleDomainChange} />);

    const selector = screen.getByTestId('unit-selector');
    fireEvent.change(selector, { target: { value: 'test.com' } });

    expect(handleDomainChange).toHaveBeenCalledWith('test.com');
  });

  test('uses domainValue prop when provided', () => {
    const domains = ['example.com', 'test.com', 'company.org'];
    render(<EmailInput domain={domains} domainValue='company.org' />);

    const selector = screen.getByTestId('unit-selector');
    expect(selector).toHaveValue('company.org');
  });

  test('disables domain selector when input is disabled', () => {
    render(<EmailInput domain='example.com' disabled />);

    const selector = screen.getByTestId('unit-selector');
    expect(selector).toBeDisabled();
  });

  test('disables domain selector when input is readOnly', () => {
    render(<EmailInput domain='example.com' readOnly />);

    const selector = screen.getByTestId('unit-selector');
    expect(selector).toBeDisabled();
  });

  test('passes theme prop to domain selector', () => {
    render(<EmailInput domain='example.com' theme='dark' />);

    const selector = screen.getByTestId('unit-selector');
    expect(selector).toHaveAttribute('data-theme', 'dark');
  });

  test('passes action button when no domain is provided', () => {
    const CustomAction = () => <button data-testid='custom-action'>Action</button>;
    render(<EmailInput ActionBtn={<CustomAction />} />);

    const actionBtn = screen.getByTestId('action-btn');
    expect(actionBtn).toBeInTheDocument();

    const customAction = screen.getByTestId('custom-action');
    expect(customAction).toBeInTheDocument();
  });

  test('domain selector takes precedence over ActionBtn prop', () => {
    const CustomAction = () => <button data-testid='custom-action'>Action</button>;
    render(<EmailInput domain='example.com' ActionBtn={<CustomAction />} />);

    const selector = screen.getByTestId('unit-selector');
    expect(selector).toBeInTheDocument();

    // Custom action button should be replaced by domain selector
    expect(screen.queryByTestId('custom-action')).not.toBeInTheDocument();
  });

  test('passes additional props to the input component', () => {
    render(<EmailInput placeholder='Enter your email' required aria-label='Email Address' />);

    const input = screen.getByTestId('input-element');
    expect(input).toHaveAttribute('placeholder', 'Enter your email');
    expect(input).toHaveAttribute('required');
    expect(input).toHaveAttribute('aria-label', 'Email Address');
  });
});
