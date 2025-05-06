import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FloatingLabel, ContainedLabel } from '../index';

describe('ContainedLabel Component', () => {
  test('renders correctly with default props', () => {
    render(<ContainedLabel>Label Text</ContainedLabel>);

    const label = screen.getByText('Label Text');
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass('floating-label');
    expect(label).not.toHaveClass('active');
  });

  test('applies active class when isActive is true', () => {
    render(<ContainedLabel isActive>Active Label</ContainedLabel>);

    const label = screen.getByText('Active Label');
    expect(label).toHaveClass('active');
  });

  test('applies custom className', () => {
    render(<ContainedLabel className='custom-class'>Custom Label</ContainedLabel>);

    const label = screen.getByText('Custom Label');
    expect(label).toHaveClass('custom-class');
  });

  test('passes HTML attributes to the label element', () => {
    render(<ContainedLabel htmlFor='test-input'>For Input</ContainedLabel>);

    const label = screen.getByText('For Input');
    expect(label).toHaveAttribute('for', 'test-input');
  });

  test('forwards ref to the label element', () => {
    const ref = React.createRef<HTMLLabelElement>();
    render(<ContainedLabel ref={ref}>Ref Label</ContainedLabel>);

    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('LABEL');
    expect(ref.current?.textContent).toBe('Ref Label');
  });
});

describe('FloatingLabel Component', () => {
  test('renders correctly with default props', () => {
    render(
      <FloatingLabel label='Email'>
        <input type='email' data-testid='input' />
      </FloatingLabel>
    );

    const wrapper = screen.getByText('Email').parentElement;
    expect(wrapper).toHaveClass('floating-label-wrapper');

    const label = screen.getByText('Email');
    expect(label).toHaveClass('floating-label');
    expect(label).not.toHaveClass('active');

    const input = screen.getByTestId('input');
    expect(input).toBeInTheDocument();
  });

  test('applies custom className and wrapperClassname', () => {
    render(
      <FloatingLabel label='Username' className='label-class' wrapperClassname='wrapper-class'>
        <input data-testid='input' />
      </FloatingLabel>
    );

    const wrapper = screen.getByTestId('input').parentElement;
    expect(wrapper).toHaveClass('wrapper-class');

    const label = screen.getByText('Username');
    expect(label).toHaveClass('label-class');
  });

  test('activates label on input focus', () => {
    render(
      <FloatingLabel label='Focus Test'>
        <input data-testid='input' />
      </FloatingLabel>
    );

    const input = screen.getByTestId('input');
    const label = screen.getByText('Focus Test');

    // Initially, label should not be active
    expect(label).not.toHaveClass('active');

    // Focus the input
    fireEvent.focus(input);

    // Label should now be active
    expect(label).toHaveClass('active');
  });

  test('keeps label active when input has value', () => {
    render(
      <FloatingLabel label='Value Test'>
        <input data-testid='input' />
      </FloatingLabel>
    );

    const input = screen.getByTestId('input');
    const label = screen.getByText('Value Test');

    // Initially, label should not be active
    expect(label).not.toHaveClass('active');

    // Focus and enter text
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'test value' } });

    // Label should be active
    expect(label).toHaveClass('active');

    // Blur the input
    fireEvent.blur(input);

    // Label should still be active since input has value
    expect(label).toHaveClass('active');
  });

  test('deactivates label when input is blurred and empty', () => {
    render(
      <FloatingLabel label='Blur Test'>
        <input data-testid='input' />
      </FloatingLabel>
    );

    const input = screen.getByTestId('input');
    const label = screen.getByText('Blur Test');

    // Focus the input to activate the label
    fireEvent.focus(input);
    expect(label).toHaveClass('active');

    // Blur the input with no value
    fireEvent.blur(input);

    // Label should no longer be active
    expect(label).not.toHaveClass('active');
  });

  test('forwards ref to the wrapper element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <FloatingLabel label='Ref Test' ref={ref}>
        <input data-testid='input' />
      </FloatingLabel>
    );

    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
    expect(ref.current?.className).toContain('floating-label-wrapper');
  });

  test('preserves custom input event handlers', () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();
    const handleChange = jest.fn();

    render(
      <FloatingLabel label='Events Test'>
        <input data-testid='input' onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange} />
      </FloatingLabel>
    );

    const input = screen.getByTestId('input');

    // Trigger events
    fireEvent.focus(input);
    expect(handleFocus).toHaveBeenCalledTimes(1);

    fireEvent.change(input, { target: { value: 'new value' } });
    expect(handleChange).toHaveBeenCalledTimes(1);

    fireEvent.blur(input);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  test('supports React.ReactNode as label', () => {
    render(
      <FloatingLabel label={<span data-testid='custom-label'>Custom Label</span>}>
        <input data-testid='input' />
      </FloatingLabel>
    );

    const customLabel = screen.getByTestId('custom-label');
    expect(customLabel).toBeInTheDocument();
    expect(customLabel.textContent).toBe('Custom Label');
  });

  test('works with different input elements', () => {
    render(
      <FloatingLabel label='Textarea Test'>
        <textarea data-testid='textarea' />
      </FloatingLabel>
    );

    const textarea = screen.getByTestId('textarea');
    const label = screen.getByText('Textarea Test');

    // Focus the textarea
    fireEvent.focus(textarea);
    expect(label).toHaveClass('active');

    // Blur with no value
    fireEvent.blur(textarea);
    expect(label).not.toHaveClass('active');
  });
});
