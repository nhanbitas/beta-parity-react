import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Popover } from '../index';

describe('Popover Component', () => {
  test('renders correctly with default props', () => {
    render(<Popover />);

    const popoverElement = screen.getByText('Popover');
    expect(popoverElement).toBeInTheDocument();
    expect(popoverElement).toHaveClass('badge', 'outlined', 'gray', 'md');
    expect(popoverElement).not.toHaveClass('dotted');
  });

  test('applies custom class name', () => {
    render(<Popover className='custom-class' />);

    const popoverElement = screen.getByText('Popover');
    expect(popoverElement).toHaveClass('custom-class');
  });

  test('applies different colors', () => {
    const { rerender } = render(<Popover color='blue' />);

    let popoverElement = screen.getByText('Popover');
    expect(popoverElement).toHaveClass('blue');

    rerender(<Popover color='red' />);
    popoverElement = screen.getByText('Popover');
    expect(popoverElement).toHaveClass('red');
  });

  test('applies different sizes', () => {
    const { rerender } = render(<Popover size='sm' />);

    let popoverElement = screen.getByText('Popover');
    expect(popoverElement).toHaveClass('sm');

    rerender(<Popover size='xs' />);
    popoverElement = screen.getByText('Popover');
    expect(popoverElement).toHaveClass('xs');
  });

  test('applies different variants', () => {
    const { rerender } = render(<Popover variant='filled' />);

    let popoverElement = screen.getByText('Popover');
    expect(popoverElement).toHaveClass('filled');

    rerender(<Popover variant='glass' />);
    popoverElement = screen.getByText('Popover');
    expect(popoverElement).toHaveClass('glass');
  });

  test('applies dot styling when enabled', () => {
    render(<Popover dot />);

    const popoverElement = screen.getByText('Popover');
    expect(popoverElement).toHaveClass('dotted');
  });

  test('forwards ref to the span element', () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<Popover ref={ref} />);

    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('SPAN');
    expect(ref.current?.textContent).toBe('Popover');
  });
});
