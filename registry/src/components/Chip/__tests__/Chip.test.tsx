import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Chip } from '../index';

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Check: () => <div data-testid='check-icon' />,
  ChevronDown: () => <div data-testid='chevron-down-icon' />,
  ChevronUp: () => <div data-testid='chevron-up-icon' />
}));

describe('Chip Component', () => {
  // Basic rendering tests
  test('renders correctly with required props', () => {
    render(<Chip label='Test Chip' />);

    expect(screen.getByText('Test Chip')).toBeInTheDocument();
    const chip = screen.getByText('Test Chip').closest('.chip');
    expect(chip).toHaveClass('outlined', 'medium');
  });

  // Size variants
  test('applies correct CSS classes for different sizes', () => {
    const { rerender } = render(<Chip label='Test Chip' size='sm' />);

    let chip = screen.getByText('Test Chip').closest('.chip');
    expect(chip).toHaveClass('small');

    rerender(<Chip label='Test Chip' size='md' />);
    chip = screen.getByText('Test Chip').closest('.chip');
    expect(chip).toHaveClass('medium');

    rerender(<Chip label='Test Chip' size='lg' />);
    chip = screen.getByText('Test Chip').closest('.chip');
    expect(chip).toHaveClass('large');
  });

  // Kind variants
  test('applies correct CSS classes for different kinds', () => {
    const { rerender } = render(<Chip label='Test Chip' kind='outlined' />);

    let chip = screen.getByText('Test Chip').closest('.chip');
    expect(chip).toHaveClass('outlined');

    rerender(<Chip label='Test Chip' kind='glass' />);
    chip = screen.getByText('Test Chip').closest('.chip');
    expect(chip).toHaveClass('glass');
  });

  // Color variants
  test('applies correct CSS classes for different colors', () => {
    const { rerender } = render(<Chip label='Test Chip' color='neutral' />);

    let chip = screen.getByText('Test Chip').closest('.chip');
    // By default, toggle chips are neutral when not active
    expect(chip).toHaveClass('neutral');

    rerender(<Chip label='Test Chip' color='accent' checked />);
    chip = screen.getByText('Test Chip').closest('.chip');
    // When checked/active, it should use the specified color
    expect(chip).toHaveClass('accent');
  });

  // Toggle type tests
  describe('Toggle type Chip', () => {
    test('renders in unchecked state by default', () => {
      render(<Chip label='Toggle Chip' type='toggle' />);

      const chip = screen.getByText('Toggle Chip').closest('.chip');
      expect(chip).toHaveAttribute('role', 'toggle');
      expect(chip).toHaveAttribute('aria-checked', 'false');
      // Check icon should not be visible in active state
      const checkIcon = screen.getByTestId('check-icon').closest('.check-icon');
      expect(checkIcon).not.toHaveClass('active');
    });

    test('renders in checked state when checked prop is true', () => {
      render(<Chip label='Toggle Chip' type='toggle' checked />);

      const chip = screen.getByText('Toggle Chip').closest('.chip');
      expect(chip).toHaveAttribute('aria-checked', 'true');
      // Check icon should be visible in active state
      const checkIcon = screen.getByTestId('check-icon').closest('.check-icon');
      expect(checkIcon).toHaveClass('active');
    });

    test('calls onChange when clicked', () => {
      const handleChange = jest.fn();
      render(<Chip label='Toggle Chip' type='toggle' value='test-value' onChange={handleChange} />);

      const chip = screen.getByText('Toggle Chip').closest('.chip');
      fireEvent.click(chip!);

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith({
        value: 'test-value',
        checked: true
      });
    });

    test('toggles state when clicked (uncontrolled)', () => {
      render(<Chip label='Toggle Chip' type='toggle' />);

      const chip = screen.getByText('Toggle Chip').closest('.chip');
      expect(chip).toHaveAttribute('aria-checked', 'false');

      fireEvent.click(chip!);
      expect(chip).toHaveAttribute('aria-checked', 'true');

      fireEvent.click(chip!);
      expect(chip).toHaveAttribute('aria-checked', 'false');
    });

    test('does not toggle state when clicked (controlled)', () => {
      const handleChange = jest.fn();
      const { rerender } = render(<Chip label='Toggle Chip' type='toggle' checked={false} onChange={handleChange} />);

      const chip = screen.getByText('Toggle Chip').closest('.chip');
      expect(chip).toHaveAttribute('aria-checked', 'false');

      fireEvent.click(chip!);
      // Internal state doesn't change, only onChange is called
      expect(chip).toHaveAttribute('aria-checked', 'false');
      expect(handleChange).toHaveBeenCalledTimes(1);

      // Now update the controlled prop
      rerender(<Chip label='Toggle Chip' type='toggle' checked={true} onChange={handleChange} />);

      expect(chip).toHaveAttribute('aria-checked', 'true');
    });

    test('responds to keyboard Enter key', () => {
      const handleChange = jest.fn();
      render(<Chip label='Toggle Chip' type='toggle' value='test-value' onChange={handleChange} />);

      const chip = screen.getByText('Toggle Chip').closest('.chip');
      fireEvent.keyUp(chip!, { key: 'Enter' });

      expect(handleChange).toHaveBeenCalledTimes(1);
    });
  });

  // Dropdown type tests
  describe('Dropdown type Chip', () => {
    test('renders with correct icon based on active state', () => {
      const { rerender } = render(<Chip label='Dropdown Chip' type='dropdown' />);

      // Default is inactive (down icon)
      expect(screen.getByTestId('chevron-down-icon')).toBeInTheDocument();
      expect(screen.queryByTestId('chevron-up-icon')).not.toBeInTheDocument();

      rerender(<Chip label='Dropdown Chip' type='dropdown' isActive />);

      // When active, up icon
      expect(screen.getByTestId('chevron-up-icon')).toBeInTheDocument();
      expect(screen.queryByTestId('chevron-down-icon')).not.toBeInTheDocument();
    });

    test('shows check icon when value is provided', () => {
      render(<Chip label='Dropdown Chip' type='dropdown' value='selected-value' />);

      // Should show check icon when value is present
      const checkIcons = screen.getAllByTestId('check-icon');
      expect(checkIcons.length).toBe(1); // Only one check icon
    });

    test('does not show check icon when icon prop is provided', () => {
      const testIcon = <span data-testid='custom-icon'>icon</span>;
      render(<Chip label='Dropdown Chip' type='dropdown' value='selected-value' icon={testIcon} />);

      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
      // No check icon when custom icon is provided
      const checkIcons = screen.queryAllByTestId('check-icon').filter((icon) => {
        const parent = icon.parentElement;
        return parent && !parent.classList.contains('check-icon');
      });
      expect(checkIcons.length).toBe(0);
    });

    test('calls onChange when clicked', () => {
      const handleChange = jest.fn();
      render(<Chip label='Dropdown Chip' type='dropdown' value='test-value' onChange={handleChange} />);

      const chip = screen.getByText('Dropdown Chip').closest('.chip');
      fireEvent.click(chip!);

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith({
        value: 'test-value',
        active: true
      });
    });

    test('toggles active state when clicked (uncontrolled)', () => {
      render(<Chip label='Dropdown Chip' type='dropdown' />);

      // Initially shows down icon
      expect(screen.getByTestId('chevron-down-icon')).toBeInTheDocument();

      // Click to activate
      const chip = screen.getByText('Dropdown Chip').closest('.chip');
      fireEvent.click(chip!);

      // Now shows up icon
      expect(screen.getByTestId('chevron-up-icon')).toBeInTheDocument();
    });
  });

  // Disabled state
  test('applies disabled state correctly', () => {
    render(<Chip label='Disabled Chip' disabled />);

    const chip = screen.getByText('Disabled Chip').closest('.chip');
    expect(chip).toHaveAttribute('aria-disabled', 'true');
    expect(chip).toHaveAttribute('tabIndex', '-1');
  });

  test('prevents click handlers when disabled', () => {
    const handleClick = jest.fn();
    const handleChange = jest.fn();

    render(<Chip label='Disabled Chip' disabled onClick={handleClick} onChange={handleChange} />);

    const chip = screen.getByText('Disabled Chip').closest('.chip');
    fireEvent.click(chip!);

    expect(handleClick).not.toHaveBeenCalled();
    expect(handleChange).not.toHaveBeenCalled();
  });

  // Icon rendering
  test('renders icon when provided', () => {
    const testIcon = <span data-testid='test-icon'>icon</span>;
    render(<Chip label='Icon Chip' icon={testIcon} />);

    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  // Custom click handler
  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Chip label='Click Chip' onClick={handleClick} />);

    const chip = screen.getByText('Click Chip').closest('.chip');
    fireEvent.click(chip!);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // Classes combining
  test('correctly combines multiple style properties', () => {
    render(<Chip label='Styled Chip' size='lg' kind='glass' color='accent' className='custom-class' checked />);

    const chip = screen.getByText('Styled Chip').closest('.chip');
    expect(chip).toHaveClass('chip', 'large', 'glass', 'accent', 'custom-class');
  });

  // Ref forwarding
  test('forwards ref correctly', () => {
    const ref = React.createRef<HTMLElement>();
    render(<Chip label='Ref Chip' ref={ref} data-testid='ref-test' />);

    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('SPAN');
    expect(ref.current).toHaveAttribute('data-testid', 'ref-test');
  });
});
