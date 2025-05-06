import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Switch } from '../index';

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Check: ({ className, size }) => (
    <div data-testid='check-icon' className={className} style={{ width: size, height: size }} />
  ),
  Minus: ({ className, size }) => (
    <div data-testid='minus-icon' className={className} style={{ width: size, height: size }} />
  )
}));

describe('Switch Component', () => {
  // Test rendering with default props
  test('renders correctly with default props', () => {
    render(<Switch />);

    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeInTheDocument();
    expect(switchElement).toHaveClass('switch', 'medium');
    expect(switchElement).toHaveAttribute('aria-checked', 'false');
    expect(switchElement).not.toBeDisabled();
  });

  // Test size variants
  test('applies correct CSS classes for different sizes', () => {
    const { rerender } = render(<Switch switchSize='sm' />);

    let switchElement = screen.getByRole('switch');
    expect(switchElement).toHaveClass('small');

    rerender(<Switch switchSize='md' />);
    switchElement = screen.getByRole('switch');
    expect(switchElement).toHaveClass('medium');

    rerender(<Switch switchSize='lg' />);
    switchElement = screen.getByRole('switch');
    expect(switchElement).toHaveClass('large');
  });

  // Test disabled state
  test('applies disabled state correctly', () => {
    render(<Switch disabled />);

    const switchElement = screen.getByRole('switch');
    expect(switchElement).toHaveAttribute('aria-disabled', 'true');
    expect(switchElement).toBeDisabled();
    expect(switchElement).toHaveAttribute('tabIndex', '-1');
  });

  // Test icon rendering for inactive state
  test('renders minus icon when icon prop is true and switch is inactive', () => {
    render(<Switch icon />);

    expect(screen.getByTestId('minus-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('check-icon')).not.toBeInTheDocument();
  });

  // Test icon rendering for active state
  test('renders check icon when icon prop is true and switch is active', () => {
    render(<Switch icon defaultActive />);

    expect(screen.getByTestId('check-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('minus-icon')).not.toBeInTheDocument();
  });

  // Test initial state with defaultActive
  test('renders in active state when defaultActive is true', () => {
    render(<Switch defaultActive />);

    const switchElement = screen.getByRole('switch');
    expect(switchElement).toHaveAttribute('aria-checked', 'true');
  });

  // Test controlled state
  test('follows the active prop in controlled mode', () => {
    const { rerender } = render(<Switch active={false} />);

    let switchElement = screen.getByRole('switch');
    expect(switchElement).toHaveAttribute('aria-checked', 'false');

    rerender(<Switch active={true} />);
    switchElement = screen.getByRole('switch');
    expect(switchElement).toHaveAttribute('aria-checked', 'true');
  });

  // Test toggling state (uncontrolled)
  test('toggles state when clicked in uncontrolled mode', () => {
    render(<Switch />);

    const switchElement = screen.getByRole('switch');
    expect(switchElement).toHaveAttribute('aria-checked', 'false');

    fireEvent.click(switchElement);
    expect(switchElement).toHaveAttribute('aria-checked', 'true');

    fireEvent.click(switchElement);
    expect(switchElement).toHaveAttribute('aria-checked', 'false');
  });

  // Test toggling state (controlled)
  test('calls onToggle but does not change state when clicked in controlled mode', () => {
    const handleToggle = jest.fn();
    const { rerender } = render(<Switch active={false} onToggle={handleToggle} />);

    const switchElement = screen.getByRole('switch');
    expect(switchElement).toHaveAttribute('aria-checked', 'false');

    fireEvent.click(switchElement);
    expect(handleToggle).toHaveBeenCalledWith(true);
    // State doesn't change based on click alone in controlled mode
    expect(switchElement).toHaveAttribute('aria-checked', 'false');

    // Simulate the parent updating the prop
    rerender(<Switch active={true} onToggle={handleToggle} />);
    expect(switchElement).toHaveAttribute('aria-checked', 'true');
  });

  // Test onClick handler
  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Switch onClick={handleClick} />);

    const switchElement = screen.getByRole('switch');
    fireEvent.click(switchElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // Test both onToggle and onClick handlers together
  test('calls both onToggle and onClick handlers when clicked', () => {
    const handleToggle = jest.fn();
    const handleClick = jest.fn();
    render(<Switch onToggle={handleToggle} onClick={handleClick} />);

    const switchElement = screen.getByRole('switch');
    fireEvent.click(switchElement);

    expect(handleToggle).toHaveBeenCalledWith(true);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // Test disabled state prevents interaction
  test('prevents interaction when disabled', () => {
    const handleToggle = jest.fn();
    const handleClick = jest.fn();
    render(<Switch disabled onToggle={handleToggle} onClick={handleClick} />);

    const switchElement = screen.getByRole('switch');
    fireEvent.click(switchElement);

    expect(handleToggle).not.toHaveBeenCalled();
    expect(handleClick).not.toHaveBeenCalled();
  });

  // Test ref forwarding
  test('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Switch ref={ref} data-testid='ref-test' />);

    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('BUTTON');
    expect(ref.current).toHaveAttribute('data-testid', 'ref-test');
  });

  // Test custom className
  test('merges custom className with default classes', () => {
    render(<Switch className='custom-class' />);

    const switchElement = screen.getByRole('switch');
    expect(switchElement).toHaveClass('switch', 'medium', 'custom-class');
  });
});
