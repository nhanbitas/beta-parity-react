import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Spinner, sizeMap } from '../index';

describe('Spinner Component', () => {
  // Test basic rendering
  test('renders spinner with default props', () => {
    render(<Spinner />);

    const spinner = screen.getByRole('presentation', { hidden: true });
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('spinner');
    expect(spinner).toHaveClass('circular');
    expect(spinner).toHaveClass('neutral');
    expect(spinner).toHaveClass('medium'); // default size is 'md' which maps to 'medium'
  });

  // Test different variants
  test('renders different spinner variants', () => {
    const { rerender } = render(<Spinner variant='circular' />);

    let spinner = screen.getByRole('presentation', { hidden: true });
    expect(spinner).toHaveClass('circular');
    expect(spinner.querySelector('svg')).toBeInTheDocument();

    rerender(<Spinner variant='dotted' />);
    spinner = screen.getByRole('presentation', { hidden: true });
    expect(spinner).toHaveClass('dotted');
    const dottedSvg = spinner.querySelector('svg');
    expect(dottedSvg).toBeInTheDocument();
    expect(dottedSvg?.querySelectorAll('circle').length).toBe(8); // Dotted variant has 8 circles

    rerender(<Spinner variant='sunburst' />);
    spinner = screen.getByRole('presentation', { hidden: true });
    expect(spinner).toHaveClass('sunburst');
    const sunburstSvg = spinner.querySelector('svg');
    expect(sunburstSvg).toBeInTheDocument();
    expect(sunburstSvg?.querySelectorAll('rect').length).toBe(8); // Sunburst variant has 8 rectangles
  });

  // Test different colors
  test('renders different spinner colors', () => {
    const { rerender } = render(<Spinner color='neutral' />);

    let spinner = screen.getByRole('presentation', { hidden: true });
    expect(spinner).toHaveClass('neutral');

    rerender(<Spinner color='accent' />);
    spinner = screen.getByRole('presentation', { hidden: true });
    expect(spinner).toHaveClass('accent');
  });

  // Test different sizes
  test('renders different spinner sizes', () => {
    const sizesToTest = Object.entries(sizeMap);

    // Test each size
    for (const [sizeKey, sizeClass] of sizesToTest) {
      const { unmount } = render(<Spinner size={sizeKey as any} />);

      const spinner = screen.getByRole('presentation', { hidden: true });
      expect(spinner).toHaveClass(sizeClass);

      unmount();
    }
  });

  // Test custom class name
  test('applies custom class name', () => {
    render(<Spinner className='custom-spinner' />);

    const spinner = screen.getByRole('presentation', { hidden: true });
    expect(spinner).toHaveClass('custom-spinner');
    expect(spinner).toHaveClass('spinner'); // Should also have the default class
  });

  // Test forwarded ref
  test('forwards ref to underlying span element', () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<Spinner ref={ref} />);

    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('SPAN');
    expect(ref.current).toHaveClass('spinner');
  });

  // Test that animation delays are applied to elements in dotted variant
  test('applies animation delays to dotted variant elements', () => {
    render(<Spinner variant='dotted' />);

    const spinner = screen.getByRole('presentation', { hidden: true });
    const circles = spinner.querySelectorAll('circle');

    // Check that first circle has no delay and others have increasing delays
    expect(circles[0]).toHaveStyle('animation-delay: 0s');
    expect(circles[1]).toHaveStyle('animation-delay: 0.875s');
    expect(circles[2]).toHaveStyle('animation-delay: 0.75s');
    // ...and so on for other circles
  });

  // Test that animation delays are applied to elements in sunburst variant
  test('applies animation delays to sunburst variant elements', () => {
    render(<Spinner variant='sunburst' />);

    const spinner = screen.getByRole('presentation', { hidden: true });
    const rects = spinner.querySelectorAll('rect');

    // Check that first rectangle has no delay and others have increasing delays
    expect(rects[0]).toHaveStyle('animation-delay: 0s');
    expect(rects[1]).toHaveStyle('animation-delay: 0.875s');
    expect(rects[2]).toHaveStyle('animation-delay: 0.75s');
    // ...and so on for other rectangles
  });

  // Test that correct color tokens are applied in circular variant
  test('applies correct color tokens to circular variant', () => {
    const { rerender } = render(<Spinner variant='circular' color='neutral' />);

    let spinner = screen.getByRole('presentation', { hidden: true });
    let paths = spinner.querySelectorAll('path');

    // First path should use inactive color, second should use interactive color
    expect(paths[0]).toHaveAttribute('stroke', 'var(--par-color-stroke-spinner-inactive)');
    expect(paths[1]).toHaveAttribute('stroke', 'var(--par-color-stroke-spinner-interactive-neutral)');

    rerender(<Spinner variant='circular' color='accent' />);
    spinner = screen.getByRole('presentation', { hidden: true });
    paths = spinner.querySelectorAll('path');

    expect(paths[0]).toHaveAttribute('stroke', 'var(--par-color-stroke-spinner-inactive)');
    expect(paths[1]).toHaveAttribute('stroke', 'var(--par-color-stroke-spinner-interactive-accent)');
  });

  // Test spinner accessibility
  test('has correct accessibility attributes', () => {
    render(<Spinner aria-label='Loading content' />);

    const spinner = screen.getByRole('presentation', { hidden: true });
    expect(spinner).toHaveAttribute('aria-label', 'Loading content');
  });
});
