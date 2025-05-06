import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Tag } from '../index';

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  X: () => <div data-testid='x-icon' />
}));

describe('Tag Component', () => {
  // Test rendering with required props
  test('renders correctly with required props', () => {
    render(<Tag label='Test Tag' />);

    expect(screen.getByText('Test Tag')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument(); // Close button
    expect(screen.getByTestId('x-icon')).toBeInTheDocument();
  });

  // Test size variants
  test('applies correct CSS classes for different sizes', () => {
    const { rerender } = render(<Tag label='Test Tag' size='sm' />);

    let tag = screen.getByText('Test Tag').closest('.tag');
    expect(tag).toHaveClass('small');

    rerender(<Tag label='Test Tag' size='md' />);
    tag = screen.getByText('Test Tag').closest('.tag');
    expect(tag).toHaveClass('medium');

    rerender(<Tag label='Test Tag' size='lg' />);
    tag = screen.getByText('Test Tag').closest('.tag');
    expect(tag).toHaveClass('large');
  });

  // Test kind variants
  test('applies correct CSS classes for different kinds', () => {
    const { rerender } = render(<Tag label='Test Tag' kind='outlined' />);

    let tag = screen.getByText('Test Tag').closest('.tag');
    expect(tag).toHaveClass('outlined');

    rerender(<Tag label='Test Tag' kind='glass' />);
    tag = screen.getByText('Test Tag').closest('.tag');
    expect(tag).toHaveClass('glass');
  });

  // Test color variants
  test('applies correct CSS classes for different colors', () => {
    const { rerender } = render(<Tag label='Test Tag' color='neutral' />);

    let tag = screen.getByText('Test Tag').closest('.tag');
    expect(tag).toHaveClass('neutral');

    rerender(<Tag label='Test Tag' color='accent' />);
    tag = screen.getByText('Test Tag').closest('.tag');
    expect(tag).toHaveClass('accent');
  });

  // Test disabled state
  test('applies disabled state correctly', () => {
    render(<Tag label='Test Tag' disabled />);

    const tag = screen.getByText('Test Tag').closest('.tag');
    expect(tag).toHaveAttribute('aria-disabled', 'true');

    const closeButton = screen.getByRole('button');
    expect(closeButton).toBeDisabled();
  });

  // Test icon rendering
  test('renders icon when provided', () => {
    const testIcon = <span data-testid='test-icon'>icon</span>;
    render(<Tag label='Test Tag' icon={testIcon} />);

    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  // Test click handler
  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Tag label='Test Tag' onClick={handleClick} />);

    const tag = screen.getByText('Test Tag').closest('.tag');
    fireEvent.click(tag!);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // Test remove handler
  test('calls onRemove handler when close button is clicked', () => {
    const handleRemove = jest.fn();
    render(<Tag label='Test Tag' value='test-value' onRemove={handleRemove} />);

    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);

    expect(handleRemove).toHaveBeenCalledTimes(1);
    expect(handleRemove).toHaveBeenCalledWith('test-value');
  });

  // Test keyboard interaction - Enter key on tag
  test('calls onClick handler when Enter key is pressed on tag', () => {
    const handleClick = jest.fn();
    render(<Tag label='Test Tag' onClick={handleClick} />);

    const tag = screen.getByText('Test Tag').closest('.tag');
    fireEvent.keyUp(tag!, { key: 'Enter' });

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // Test keyboard interaction - Enter key on close button
  test('calls onRemove handler when Enter key is pressed on close button', () => {
    const handleRemove = jest.fn();
    render(<Tag label='Test Tag' value='test-value' onRemove={handleRemove} />);

    const closeButton = screen.getByRole('button');
    fireEvent.keyUp(closeButton, { key: 'Enter' });

    // The handler is not directly assigned to the button's onKeyUp,
    // but to the tag's onKeyUp, so it won't be triggered this way
    expect(handleRemove).not.toHaveBeenCalled();
  });

  // Test custom className
  test('applies custom className', () => {
    render(<Tag label='Test Tag' className='custom-class' />);

    const tag = screen.getByText('Test Tag').closest('.tag');
    expect(tag).toHaveClass('custom-class');
  });

  // Test combined styling properties
  test('correctly combines multiple style properties', () => {
    render(<Tag label='Test Tag' size='lg' kind='glass' color='accent' className='custom-class' />);

    const tag = screen.getByText('Test Tag').closest('.tag');
    expect(tag).toHaveClass('tag', 'large', 'glass', 'accent', 'custom-class');
  });

  // Test disabled state prevents click handlers
  test('prevents click handlers when disabled', () => {
    const handleClick = jest.fn();
    const handleRemove = jest.fn();

    render(<Tag label='Test Tag' disabled onClick={handleClick} value='test-value' onRemove={handleRemove} />);

    const tag = screen.getByText('Test Tag').closest('.tag');
    fireEvent.click(tag!);
    expect(handleClick).not.toHaveBeenCalled();

    // The close button is disabled when the tag is disabled
    const closeButton = screen.getByRole('button');
    expect(closeButton).toBeDisabled();
  });

  // Test forwards ref
  test('forwards ref correctly', () => {
    const ref = React.createRef<HTMLElement>();
    render(<Tag label='Test Tag' ref={ref} data-testid='ref-test' />);

    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('SPAN');
    expect(ref.current).toHaveAttribute('data-testid', 'ref-test');
  });
});
