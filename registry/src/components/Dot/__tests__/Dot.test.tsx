import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Dot } from '../index';

describe('Dot Component', () => {
  // Test rendering with default props
  test('renders correctly with default props', () => {
    render(<Dot />);

    const dot = screen.getByRole('presentation', { hidden: true });
    expect(dot).toBeInTheDocument();
    expect(dot).toHaveClass('dot');
    expect(dot).toHaveClass('medium'); // Default size is 'md' which maps to 'medium'
    expect(dot).not.toHaveClass('pulse');
  });

  // Test size variants
  test('applies correct CSS classes for different sizes', () => {
    const { rerender } = render(<Dot size='xs' />);

    let dot = screen.getByRole('presentation', { hidden: true });
    expect(dot).toHaveClass('extra-small');

    rerender(<Dot size='sm' />);
    dot = screen.getByRole('presentation', { hidden: true });
    expect(dot).toHaveClass('small');

    rerender(<Dot size='md' />);
    dot = screen.getByRole('presentation', { hidden: true });
    expect(dot).toHaveClass('medium');

    rerender(<Dot size='lg' />);
    dot = screen.getByRole('presentation', { hidden: true });
    expect(dot).toHaveClass('large');

    rerender(<Dot size='xl' />);
    dot = screen.getByRole('presentation', { hidden: true });
    expect(dot).toHaveClass('extra-large');
  });

  // Test color variants
  test('applies correct CSS classes for different colors', () => {
    const colors = ['gray', 'orange', 'violet', 'green', 'red', 'yellow', 'blue', 'lime', 'cyan'];

    for (const color of colors) {
      const { unmount } = render(<Dot color={color as any} />);
      const dot = screen.getByRole('presentation', { hidden: true });
      expect(dot).toHaveClass(color);
      unmount();
    }
  });

  // Test pulse animation
  test('applies pulse class when pulse prop is true', () => {
    render(<Dot pulse />);

    const dot = screen.getByRole('presentation', { hidden: true });
    expect(dot).toHaveClass('pulse');
  });

  // Test custom className
  test('applies custom className', () => {
    render(<Dot className='custom-class' />);

    const dot = screen.getByRole('presentation', { hidden: true });
    expect(dot).toHaveClass('custom-class');
  });

  // Test combined props
  test('correctly combines multiple props', () => {
    render(<Dot size='lg' color='blue' pulse className='custom-class' />);

    const dot = screen.getByRole('presentation', { hidden: true });
    expect(dot).toHaveClass('dot', 'large', 'blue', 'pulse', 'custom-class');
  });

  // Test forwarded ref works
  test('forwards ref correctly', () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<Dot ref={ref} data-testid='ref-test' />);

    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('SPAN');
    expect(ref.current).toHaveAttribute('data-testid', 'ref-test');
  });
});
