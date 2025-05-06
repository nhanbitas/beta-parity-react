import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BaseInput } from '../index';

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  X: () => <div data-testid='x-icon' />,
  ChevronsUpDown: () => <div data-testid='chevrons-icon' />
}));

describe('BaseInput Component CSS Styling', () => {
  // Test rendering with default props and classes
  test('renders with default CSS classes', () => {
    render(<BaseInput id='test-input' type='text' />);

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('par-input', 'default');

    // Check for default wrapper classes
    const wrapper = input.closest('.input-wrapper');
    expect(wrapper).toBeInTheDocument();
  });

  // Test size variants
  test('applies correct CSS classes for different sizes', () => {
    const { rerender } = render(<BaseInput id='test-input' type='text' size='sm' />);

    // Small size is default, doesn't add a class
    let input = screen.getByRole('textbox');
    expect(input).not.toHaveClass('medium');

    // Medium size
    rerender(<BaseInput id='test-input' type='text' size='md' />);
    input = screen.getByRole('textbox');
    expect(input).toHaveClass('medium');
  });

  // Test theme variants
  test('applies correct CSS classes for different themes', () => {
    const { rerender } = render(<BaseInput id='test-input' type='text' theme='default' />);

    // Default theme
    let input = screen.getByRole('textbox');
    expect(input).toHaveClass('default');

    // Alternative theme
    rerender(<BaseInput id='test-input' type='text' theme='alternative' />);
    input = screen.getByRole('textbox');
    expect(input).toHaveClass('alternative');
  });

  // Test error state styling
  test('applies error state CSS classes', () => {
    render(<BaseInput id='test-input' type='text' isError errorMessage='This is an error' />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('error-state');

    // Error message should be visible
    expect(screen.getByText('This is an error')).toBeInTheDocument();
    expect(screen.getByText('This is an error')).toHaveClass('error-message');
  });

  // Test disabled state styling
  test('applies disabled state CSS classes', () => {
    render(<BaseInput id='test-input' type='text' disabled />);

    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();

    // Wrapper should have the appropriate class for styling
    const wrapper = input.closest('.input-wrapper');
    expect(wrapper).toHaveClass('disabled');
  });

  // Test hidden label styling
  test('correctly styles hidden label', () => {
    render(<BaseInput id='test-input' type='text' label='Test Label' hideLabel />);

    const label = screen.getByText('Test Label');
    expect(label).toHaveClass('sr-only');
  });

  // Test visible label styling
  test('correctly styles visible label', () => {
    render(<BaseInput id='test-input' type='text' label='Test Label' />);

    const label = screen.getByText('Test Label');
    expect(label).toBeInTheDocument();
    expect(label).not.toHaveClass('sr-only');
  });

  // Test floating label styling
  test('correctly styles floating label', () => {
    render(<BaseInput id='test-input' type='text' floatingLabel='Floating Label' />);

    const floatingLabel = screen.getByText('Floating Label');
    expect(floatingLabel).toHaveClass('floating-label');

    // Label container should have appropriate class
    const wrapper = floatingLabel.closest('.label-container');
    expect(wrapper).toBeInTheDocument();
  });

  // Test helper text styling
  test('correctly styles helper text', () => {
    render(<BaseInput id='test-input' type='text' helperText='Helper text' />);

    const helperText = screen.getByText('Helper text');
    expect(helperText).toHaveClass('helper-text');
  });

  // Test left icon styling
  test('correctly styles input with left icon', () => {
    const leftIconTestId = 'left-icon-test';
    render(<BaseInput id='test-input' type='text' leftIcon={<div data-testid={leftIconTestId} />} />);

    // Left icon should be present
    expect(screen.getByTestId(leftIconTestId)).toBeInTheDocument();

    // Input wrapper should have left-icon class
    const wrapper = screen.getByTestId(leftIconTestId).closest('.input-wrapper');
    expect(wrapper).toHaveClass('with-left-icon');
  });

  // Test right icon styling
  test('correctly styles input with right icon', () => {
    const rightIconTestId = 'right-icon-test';
    render(<BaseInput id='test-input' type='text' rightIcon={<div data-testid={rightIconTestId} />} />);

    // Right icon should be present
    expect(screen.getByTestId(rightIconTestId)).toBeInTheDocument();

    // Input wrapper should have right-icon class
    const wrapper = screen.getByTestId(rightIconTestId).closest('.input-wrapper');
    expect(wrapper).toHaveClass('with-right-icon');
  });

  // Test clearable input styling
  test('correctly styles clearable input', () => {
    render(<BaseInput id='test-input' type='text' isClearable value='Test value' onChange={() => {}} />);

    // Clear button should be present
    const clearButton = screen.getByRole('button');
    expect(clearButton).toBeInTheDocument();
    expect(screen.getByTestId('x-icon')).toBeInTheDocument();

    // Input wrapper should have appropriate class
    const wrapper = clearButton.closest('.input-wrapper');
    expect(wrapper).toHaveClass('with-right-element');
  });

  // Test action button styling
  test('correctly styles input with action button', () => {
    const actionBtnTestId = 'action-btn-test';
    render(<BaseInput id='test-input' type='text' ActionBtn={<button data-testid={actionBtnTestId}>Action</button>} />);

    // Action button should be present
    expect(screen.getByTestId(actionBtnTestId)).toBeInTheDocument();

    // Input wrapper should have appropriate class
    const wrapper = screen.getByTestId(actionBtnTestId).closest('.input-wrapper');
    expect(wrapper).toHaveClass('with-action');
  });

  // Test unit selector styling
  test('correctly styles input with unit selector', () => {
    render(
      <BaseInput
        id='test-input'
        type='text'
        unitSelector={
          <select>
            <option>Unit</option>
          </select>
        }
      />
    );

    // Unit selector should be present
    const unitSelector = screen.getByRole('combobox');
    expect(unitSelector).toBeInTheDocument();

    // Input wrapper should have appropriate class
    const wrapper = unitSelector.closest('.input-wrapper');
    expect(wrapper).toHaveClass('with-unit-selector');
  });

  // Test readonly state styling
  test('correctly styles readonly input', () => {
    render(<BaseInput id='test-input' type='text' readOnly />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('readonly');

    // Wrapper should have the appropriate class for styling
    const wrapper = input.closest('.input-wrapper');
    expect(wrapper).toHaveClass('readonly');
  });

  // Test focus state styling
  test('applies focus state CSS classes', () => {
    render(<BaseInput id='test-input' type='text' />);

    const input = screen.getByRole('textbox');

    // Focus the input
    fireEvent.focus(input);

    // Wrapper should have the focused class
    const wrapper = input.closest('.input-wrapper');
    expect(wrapper).toHaveClass('focused');

    // Blur the input
    fireEvent.blur(input);
    expect(wrapper).not.toHaveClass('focused');
  });

  // Test combined styling properties
  test('correctly combines multiple style variants', () => {
    render(
      <BaseInput
        id='test-input'
        type='text'
        size='md'
        theme='alternative'
        isError
        leftIcon={<div data-testid='left-icon' />}
        isClearable
        value='Test'
        onChange={() => {}}
      />
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('medium', 'alternative', 'error-state');

    const wrapper = input.closest('.input-wrapper');
    expect(wrapper).toHaveClass('with-left-icon', 'with-right-element');
  });
});
