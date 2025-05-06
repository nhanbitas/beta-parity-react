import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Radio, RadioGroup } from '../index';

describe('Radio Component', () => {
  // Test rendering with default props
  test('renders with default props', () => {
    render(<Radio />);

    const radio = screen.getByRole('radio');
    expect(radio).toBeInTheDocument();
    expect(radio).toHaveClass('par-radio', 'neutral');
    expect(radio).not.toBeDisabled();
    expect(radio).not.toBeChecked();
  });

  // Test with label and sublabel
  test('renders with label and sublabel', () => {
    const label = 'Radio Label';
    const sublabel = 'Radio Sublabel';
    render(<Radio label={label} sublabel={sublabel} />);

    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getByText(sublabel)).toBeInTheDocument();
  });

  // Test different colors
  test('renders with different colors', () => {
    const { rerender } = render(<Radio color='neutral' />);

    expect(screen.getByRole('radio')).toHaveClass('neutral');

    rerender(<Radio color='accent' />);
    expect(screen.getByRole('radio')).toHaveClass('accent');
  });

  // Test disabled state
  test('renders disabled radio', () => {
    render(<Radio disabled />);

    const radio = screen.getByRole('radio');
    expect(radio).toBeDisabled();

    // The wrapper should have aria-disabled attribute
    const wrapper = radio.closest('label');
    expect(wrapper).toHaveAttribute('aria-disabled', 'true');
  });

  // Test checked state
  test('renders checked radio', () => {
    render(<Radio checked />);

    const radio = screen.getByRole('radio');
    expect(radio).toBeChecked();
  });

  // Test radio with custom wrapper props
  test('applies custom wrapper props', () => {
    render(
      <Radio
        radioWrapperProps={{
          'data-testid': 'custom-wrapper',
          className: 'custom-wrapper-class'
        }}
      />
    );

    const wrapper = screen.getByTestId('custom-wrapper');
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveClass('custom-wrapper-class');
  });

  // Test radio with custom props
  test('passes custom props to input element', () => {
    render(<Radio data-testid='custom-radio' aria-label='Custom Radio' />);

    const radio = screen.getByTestId('custom-radio');
    expect(radio).toBeInTheDocument();
    expect(radio).toHaveAttribute('aria-label', 'Custom Radio');
  });
});

describe('RadioGroup Component', () => {
  // Test rendering with default props
  test('renders with default props', () => {
    render(
      <RadioGroup name='test-group'>
        <Radio value='option1' label='Option 1' />
        <Radio value='option2' label='Option 2' />
      </RadioGroup>
    );

    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(2);
    expect(radios[0]).toHaveAttribute('name', 'test-group');
    expect(radios[1]).toHaveAttribute('name', 'test-group');
  });

  // Test with label
  test('renders with group label', () => {
    const groupLabel = 'Group Label';
    render(
      <RadioGroup name='test-group' label={groupLabel}>
        <Radio value='option1' label='Option 1' />
      </RadioGroup>
    );

    expect(screen.getByText(groupLabel)).toBeInTheDocument();
  });

  // Test with items prop
  test('renders radios from items prop', () => {
    const items = [
      { value: 'item1', label: 'Item 1' },
      { value: 'item2', label: 'Item 2' },
      { value: 'item3', label: 'Item 3' }
    ];

    render(<RadioGroup name='items-group' items={items} />);

    items.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    });

    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(3);
  });

  // Test defaultValue
  test('selects default value', () => {
    render(
      <RadioGroup name='test-group' defaultValue='option2'>
        <Radio value='option1' label='Option 1' />
        <Radio value='option2' label='Option 2' />
        <Radio value='option3' label='Option 3' />
      </RadioGroup>
    );

    const radios = screen.getAllByRole('radio');
    expect(radios[0]).not.toBeChecked();
    expect(radios[1]).toBeChecked(); // option2 should be checked
    expect(radios[2]).not.toBeChecked();
  });

  // Test controlled component
  test('works as controlled component', () => {
    const { rerender } = render(
      <RadioGroup name='test-group' value='option1'>
        <Radio value='option1' label='Option 1' />
        <Radio value='option2' label='Option 2' />
      </RadioGroup>
    );

    let radios = screen.getAllByRole('radio');
    expect(radios[0]).toBeChecked();
    expect(radios[1]).not.toBeChecked();

    // Update the value prop
    rerender(
      <RadioGroup name='test-group' value='option2'>
        <Radio value='option1' label='Option 1' />
        <Radio value='option2' label='Option 2' />
      </RadioGroup>
    );

    radios = screen.getAllByRole('radio');
    expect(radios[0]).not.toBeChecked();
    expect(radios[1]).toBeChecked();
  });

  // Test onChange callback
  test('calls onChange when a radio is selected', () => {
    const handleChange = jest.fn();
    render(
      <RadioGroup name='test-group' onChange={handleChange}>
        <Radio value='option1' label='Option 1' />
        <Radio value='option2' label='Option 2' />
      </RadioGroup>
    );

    const radios = screen.getAllByRole('radio');
    fireEvent.click(radios[1]);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith('option2');
    expect(radios[1]).toBeChecked();
  });

  // Test disabled state for entire group
  test('disables all radios in group when disabled prop is true', () => {
    render(
      <RadioGroup name='test-group' disabled>
        <Radio value='option1' label='Option 1' />
        <Radio value='option2' label='Option 2' />
      </RadioGroup>
    );

    const radios = screen.getAllByRole('radio');
    radios.forEach((radio) => {
      expect(radio).toBeDisabled();
    });
  });

  // Test color prop is applied to all children
  test('applies color prop to all children', () => {
    render(
      <RadioGroup name='test-group' color='accent'>
        <Radio value='option1' label='Option 1' />
        <Radio value='option2' label='Option 2' />
      </RadioGroup>
    );

    const radios = screen.getAllByRole('radio');
    radios.forEach((radio) => {
      expect(radio).toHaveClass('accent');
    });
  });

  // Test individual radio can override group props
  test('allows individual radio to override group props', () => {
    render(
      <RadioGroup name='test-group' color='neutral'>
        <Radio value='option1' label='Option 1' />
        <Radio value='option2' label='Option 2' color='accent' />
      </RadioGroup>
    );

    const radios = screen.getAllByRole('radio');
    expect(radios[0]).toHaveClass('neutral');
    expect(radios[1]).toHaveClass('accent'); // Individual radio overrides group color
  });
});
