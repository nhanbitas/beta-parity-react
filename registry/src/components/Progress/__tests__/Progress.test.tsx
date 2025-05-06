import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, test, expect } from '@jest/globals';
import { Progress } from '../index';

describe('Progress Component', () => {
  // Test basic rendering of bar progress
  test('renders bar progress with default props', () => {
    render(<Progress />);

    // Progress container should exist
    const progressElement = screen.getByRole('progressbar');
    expect(progressElement).toBeInTheDocument();
    expect(progressElement).toHaveClass('progress');
    expect(progressElement).toHaveClass('bar');
    expect(progressElement).toHaveClass('neutral');
    expect(progressElement).toHaveClass('active');

    // Should have track and thumb elements
    const trackElement = progressElement.querySelector('.progress-track');
    expect(trackElement).not.toBeNull();

    const thumbElement = progressElement.querySelector('.progress-thumb');
    expect(thumbElement).not.toBeNull();
    expect(thumbElement).toHaveStyle({ width: '1%' }); // Default value is clamped to minimum 1%

    // ARIA attributes should be set
    expect(progressElement).toHaveAttribute('aria-valuemin', '0');
    expect(progressElement).toHaveAttribute('aria-valuemax', '100');
    expect(progressElement).toHaveAttribute('aria-valuenow', '1');
  });

  test('renders bar progress with specified value', () => {
    render(<Progress value={50} />);

    const progressElement = screen.getByRole('progressbar');
    expect(progressElement).toBeInTheDocument();

    const thumbElement = progressElement.querySelector('.progress-thumb');
    expect(thumbElement).not.toBeNull();
    expect(thumbElement).toHaveStyle({ width: '50%' });

    expect(progressElement).toHaveAttribute('aria-valuenow', '50');
  });

  // Test progress with title and helper text
  test('renders progress with title and helper text', () => {
    render(<Progress title='Loading Progress' helperText='Please wait while we process your request' value={50} />);

    expect(screen.getByText('Loading Progress')).toBeInTheDocument();
    expect(screen.getByText('Please wait while we process your request')).toBeInTheDocument();

    const progressElement = screen.getByRole('progressbar');
    expect(progressElement).toHaveAttribute('aria-valuenow', '50');

    const thumbElement = progressElement.querySelector('.progress-thumb');
    expect(thumbElement).not.toBeNull();
    expect(thumbElement).toHaveStyle({ width: '50%' });
  });

  // Test circle progress variant
  test('renders circle progress variant', () => {
    render(<Progress kind='circle' value={75} />);

    const progressElement = screen.getByRole('progressbar');
    expect(progressElement).toHaveClass('circle');
    expect(progressElement).toHaveClass('small'); // Default size is 'sm' which maps to 'small'

    // Circle progress should have SVG elements
    const svg = progressElement.querySelector('svg');
    expect(svg).not.toBeNull();

    // Should have two circles (track and thumb) and a text element
    const circles = progressElement.querySelectorAll('circle');
    expect(circles.length).toBe(2);
    expect(circles[0]).toHaveClass('progress-track');
    expect(circles[1]).toHaveClass('progress-thumb');

    // Should display percentage text
    const textElement = progressElement.querySelector('text');
    expect(textElement).not.toBeNull();
    expect(textElement.textContent).toBe('75%');

    // Helper text should still be present if it exists
    const helperTextElement = progressElement.querySelector('.progress-helper-text');
    expect(helperTextElement).not.toBeInTheDocument(); // No helper text was provided
  });

  test('renders circular progress variant', () => {
    render(<Progress variant='circular' value={75} />);

    const progressElement = screen.getByRole('progressbar');
    expect(progressElement).toHaveClass('circular');
    expect(progressElement).not.toHaveClass('bar');

    const circularTrack = progressElement.querySelector('.progress-circular-track');
    expect(circularTrack).not.toBeNull();

    const circularThumb = progressElement.querySelector('.progress-circular-thumb');
    expect(circularThumb).not.toBeNull();

    // For circular progress, check if the SVG elements are rendered correctly
    expect(progressElement.querySelectorAll('svg')).toHaveLength(1);
    expect(progressElement.querySelectorAll('circle')).toHaveLength(2);

    expect(progressElement).toHaveAttribute('aria-valuenow', '75');
  });

  // Test different circle progress sizes
  test('renders circle progress with medium size', () => {
    render(<Progress kind='circle' size='md' value={50} />);

    const progressElement = screen.getByRole('progressbar');
    expect(progressElement).toHaveClass('circle');
    expect(progressElement).toHaveClass('medium');

    // SVG should have the correct dimensions
    const svg = progressElement.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg).toHaveAttribute('width', '120');
    expect(svg).toHaveAttribute('height', '120');
  });

  // Test different color values
  test('renders progress with accent color', () => {
    render(<Progress color='accent' value={50} />);

    const progressElement = screen.getByRole('progressbar');
    expect(progressElement).toHaveClass('accent');
  });

  test('renders with different status variants', () => {
    const { rerender } = render(<Progress status='success' value={100} />);

    let progressElement = screen.getByRole('progressbar');
    expect(progressElement).toHaveClass('success');
    expect(progressElement).not.toHaveClass('neutral');

    rerender(<Progress status='error' value={50} />);
    progressElement = screen.getByRole('progressbar');
    expect(progressElement).toHaveClass('error');

    rerender(<Progress status='warning' value={75} />);
    progressElement = screen.getByRole('progressbar');
    expect(progressElement).toHaveClass('warning');
  });

  // Test success state with numeral
  test('renders bar progress in success state with numeral', () => {
    render(<Progress state='success' value={100} numeral={true} />);

    const progressElement = screen.getByRole('progressbar');
    expect(progressElement).toHaveClass('success');

    // Should display the progress percentage
    expect(screen.getByText('100%')).toBeInTheDocument();

    // Should have the success icon when not in active state and numeral is true
    const icon = progressElement.querySelector('.progress-icon');
    expect(icon).not.toBeNull();

    // SVG path for success icon should be present
    const svg = icon.querySelector('svg');
    expect(svg).not.toBeNull();
  });

  // Test error state with numeral
  test('renders bar progress in error state with numeral', () => {
    render(<Progress state='error' value={30} numeral={true} />);

    const progressElement = screen.getByRole('progressbar');
    expect(progressElement).toHaveClass('error');

    // Should display the progress percentage
    expect(screen.getByText('30%')).toBeInTheDocument();

    // Should have the error icon when not in active state and numeral is true
    const icon = progressElement.querySelector('.progress-icon');
    expect(icon).not.toBeNull();

    // SVG path for error icon should be present
    const svg = icon.querySelector('svg');
    expect(svg).not.toBeNull();
  });

  test('renders in inactive state', () => {
    render(<Progress state='inactive' />);

    const progressElement = screen.getByRole('progressbar');
    expect(progressElement).toHaveClass('inactive');
    expect(progressElement).not.toHaveClass('active');
  });

  // Test value clamping
  test('clamps progress values to be between 1 and 100', () => {
    const { rerender } = render(<Progress value={-10} />);

    let progressElement = screen.getByRole('progressbar');
    expect(progressElement).toHaveAttribute('aria-valuenow', '1');

    let thumbElement = progressElement.querySelector('.progress-thumb');
    expect(thumbElement).not.toBeNull();
    expect(thumbElement).toHaveStyle({ width: '1%' });

    rerender(<Progress value={150} />);

    progressElement = screen.getByRole('progressbar');
    expect(progressElement).toHaveAttribute('aria-valuenow', '100');

    thumbElement = progressElement.querySelector('.progress-thumb');
    expect(thumbElement).not.toBeNull();
    expect(thumbElement).toHaveStyle({ width: '100%' });
  });

  test('handles min and max props correctly', () => {
    render(<Progress min={20} max={80} value={50} />);

    const progressElement = screen.getByRole('progressbar');
    expect(progressElement).toHaveAttribute('aria-valuemin', '20');
    expect(progressElement).toHaveAttribute('aria-valuemax', '80');
    expect(progressElement).toHaveAttribute('aria-valuenow', '50');

    // The progress thumb should show 50% of the way between min and max (50 is halfway between 20 and 80)
    const thumbElement = progressElement.querySelector('.progress-thumb');
    expect(thumbElement).not.toBeNull();
    expect(thumbElement).toHaveStyle({ width: '50%' });
  });

  test('value is clamped between min and max', () => {
    const { rerender } = render(<Progress value={-10} />);

    let progressElement = screen.getByRole('progressbar');
    let thumbElement = progressElement.querySelector('.progress-thumb');
    expect(thumbElement).toHaveStyle({ width: '1%' }); // Clamped to minimum 1%
    expect(progressElement).toHaveAttribute('aria-valuenow', '1');

    rerender(<Progress value={150} />);
    progressElement = screen.getByRole('progressbar');
    thumbElement = progressElement.querySelector('.progress-thumb');
    expect(thumbElement).toHaveStyle({ width: '100%' });
    expect(progressElement).toHaveAttribute('aria-valuenow', '100');
  });

  // Test bar progress without numeral display
  test('does not display percentage in bar progress when numeral is false', () => {
    render(<Progress value={50} numeral={false} />);

    // Should not display the progress percentage
    expect(screen.queryByText('50%')).not.toBeInTheDocument();
  });

  // Test bar progress with numeral display in active state (no icon)
  test('displays percentage but no icon in bar progress when active and numeral is true', () => {
    render(<Progress state='active' value={50} numeral={true} />);

    // Should display the progress percentage
    expect(screen.getByText('50%')).toBeInTheDocument();

    // Should not have an icon when in active state
    const progressElement = screen.getByRole('progressbar');
    expect(progressElement.querySelector('.progress-icon')).toBeNull();
  });

  test('displays label when showLabel is true', () => {
    render(<Progress value={42} showLabel={true} />);

    const progressElement = screen.getByRole('progressbar');
    const labelElement = progressElement.querySelector('.progress-label');
    expect(labelElement).not.toBeNull();
    expect(labelElement?.textContent).toBe('42%');
  });

  // Test class name forwarding
  test('applies custom className', () => {
    render(<Progress className='custom-progress' value={50} />);

    const progressElement = screen.getByRole('progressbar');
    expect(progressElement).toHaveClass('custom-progress');
  });

  // Test forwarding of other HTML attributes
  test('forwards additional HTML attributes', () => {
    render(<Progress data-testid='test-progress' id='progress-1' value={50} />);

    const progressElement = screen.getByRole('progressbar');
    expect(progressElement).toHaveAttribute('data-testid', 'test-progress');
    expect(progressElement).toHaveAttribute('id', 'progress-1');
  });
});
