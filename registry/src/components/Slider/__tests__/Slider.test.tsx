import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Slider } from '../index';

// Mock the Tooltip component
jest.mock('../../Tooltip', () => ({
  Tooltip: ({ children, content, controlledOpen }: any) => (
    <div data-testid='tooltip' data-content={content} data-open={controlledOpen}>
      {children}
    </div>
  )
}));

describe('Slider Component', () => {
  // Test rendering with default props
  test('renders with default props', () => {
    render(<Slider />);

    // Check for slider container
    const slider = screen.getByRole('range');
    expect(slider).toBeInTheDocument();
    expect(slider).toHaveValue('0');
    expect(slider).not.toBeDisabled();
  });

  // Test rendering with custom min, max values
  test('renders with custom min, max values', () => {
    render(<Slider min={10} max={50} defaultValue={20} />);

    const slider = screen.getByRole('range');
    expect(slider).toHaveValue('20');
    expect(slider).toHaveAttribute('min', '10');
    expect(slider).toHaveAttribute('max', '50');
  });

  // Test disabled state
  test('renders disabled slider', () => {
    render(<Slider disabled />);

    const slider = screen.getByRole('range');
    expect(slider).toBeDisabled();
    expect(slider).toHaveAttribute('tabIndex', '-1');
  });

  // Test color variants
  test('renders with different colors', () => {
    const { container, rerender } = render(<Slider color='neutral' />);

    let progressElement = container.querySelector('.slider-progress');
    expect(progressElement).toHaveClass('neutral');

    rerender(<Slider color='accent' />);
    progressElement = container.querySelector('.slider-progress');
    expect(progressElement).toHaveClass('accent');
  });

  // Test vertical orientation
  test('renders with vertical orientation', () => {
    const { container } = render(<Slider orientation='vertical' />);

    expect(container.firstChild).toHaveClass('slider-vertical');
  });

  // Test range mode
  test('renders in range mode', () => {
    const { container } = render(<Slider mode='range' />);

    expect(container.firstChild).toHaveClass('slider-range');
    // In range mode, we should have two input elements
    const sliders = screen.getAllByRole('range');
    expect(sliders).toHaveLength(2);
    expect(sliders[0]).toHaveValue('0'); // Default min
    expect(sliders[1]).toHaveValue('50'); // Default max
  });

  // Test value change in single mode
  test('updates value on change in single mode', () => {
    const handleChange = jest.fn();
    render(<Slider onValueChange={handleChange} />);

    const slider = screen.getByRole('range');
    fireEvent.change(slider, { target: { value: '25' } });

    expect(handleChange).toHaveBeenCalledWith(25);
    expect(slider).toHaveValue('25');
  });

  // Test value change in range mode
  test('updates values on change in range mode', () => {
    const handleChange = jest.fn();
    render(<Slider mode='range' onValueChange={handleChange} />);

    const [minSlider, maxSlider] = screen.getAllByRole('range');

    // Change min value
    fireEvent.change(minSlider, { target: { value: '10' } });
    expect(handleChange).toHaveBeenCalledWith([10, 50]);

    // Change max value
    fireEvent.change(maxSlider, { target: { value: '75' } });
    expect(handleChange).toHaveBeenCalledWith([10, 75]);
  });

  // Test marks rendering
  test('renders marks correctly', () => {
    const marks = [
      { value: 0, label: 'Min' },
      { value: 50, label: 'Mid' },
      { value: 100, label: 'Max' }
    ];

    const { container } = render(<Slider marks={marks} />);

    expect(screen.getByText('Min')).toBeInTheDocument();
    expect(screen.getByText('Mid')).toBeInTheDocument();
    expect(screen.getByText('Max')).toBeInTheDocument();

    const markElements = container.querySelectorAll('.slider-marks-item');
    expect(markElements).toHaveLength(3);
  });

  // Test tooltip indicator
  test('renders tooltip indicator', () => {
    render(<Slider indicator='tooltip' defaultValue={30} />);

    // Focus the slider to show the tooltip
    const slider = screen.getByRole('range');
    fireEvent.mouseEnter(slider);

    const tooltip = screen.getByTestId('tooltip');
    expect(tooltip).toHaveAttribute('data-content', '30');
    expect(tooltip).toHaveAttribute('data-open', 'true');

    // Leave should hide tooltip
    fireEvent.mouseLeave(slider);
    expect(tooltip).toHaveAttribute('data-open', 'false');
  });

  // Test min/max constraints in range mode
  test('enforces min/max constraints in range mode', () => {
    const handleChange = jest.fn();
    render(<Slider mode='range' defaultValue={[20, 60]} onValueChange={handleChange} />);

    const [minSlider, maxSlider] = screen.getAllByRole('range');

    // Try to set min higher than max (should be ignored)
    fireEvent.change(minSlider, { target: { value: '70' } });
    expect(handleChange).not.toHaveBeenCalled();

    // Try to set max lower than min (should be ignored)
    fireEvent.change(maxSlider, { target: { value: '10' } });
    expect(handleChange).not.toHaveBeenCalled();
  });
});
