import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Badge } from '../index';

// Mock the Dot component
jest.mock('../../Dot', () => ({
  Dot: ({ size }) => (
    <span data-testid='dot-icon' data-size={size}>
      ●
    </span>
  )
}));

describe('Badge Component', () => {
  test('renders correctly with default props', () => {
    render(<Badge data-testid='badge'>Default Badge</Badge>);

    const badge = screen.getByTestId('badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('badge');
    expect(badge).toHaveClass('outlined'); // default variant
    expect(badge).toHaveClass('gray'); // default color
    expect(badge).toHaveClass('medium'); // default size is 'md' which maps to 'medium'
    expect(badge).toHaveTextContent('Default Badge');
  });

  test('renders with label prop', () => {
    render(<Badge label='Status' data-testid='badge' />);

    const badge = screen.getByTestId('badge');
    expect(badge).toHaveTextContent('Status');
  });

  test('prioritizes label over children', () => {
    render(
      <Badge label='Label Text' data-testid='badge'>
        Children Text
      </Badge>
    );

    const badge = screen.getByTestId('badge');
    expect(badge).toHaveTextContent('Label Text');
    expect(badge).not.toHaveTextContent('Children Text');
  });

  test('renders with custom icon', () => {
    const mockIcon = <span data-testid='custom-icon'>🔔</span>;

    render(
      <Badge icon={mockIcon} data-testid='badge'>
        With Icon
      </Badge>
    );

    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    expect(screen.getByTestId('badge')).toHaveTextContent('With Icon');
  });

  test('renders with dot and overrides icon when dot is true', () => {
    const mockIcon = <span data-testid='custom-icon'>🔔</span>;

    render(
      <Badge dot icon={mockIcon} data-testid='badge'>
        With Dot
      </Badge>
    );

    // Dot should be rendered
    expect(screen.getByTestId('dot-icon')).toBeInTheDocument();

    // Custom icon should not be rendered when dot is true
    expect(screen.queryByTestId('custom-icon')).not.toBeInTheDocument();

    // Badge should have the dotted class
    expect(screen.getByTestId('badge')).toHaveClass('dotted');
  });

  test('applies different size classes correctly', () => {
    const sizes = [
      { prop: 'xs', className: 'extra-small' },
      { prop: 'sm', className: 'small' },
      { prop: 'md', className: 'medium' }
    ];

    sizes.forEach(({ prop, className }) => {
      const { unmount } = render(
        <Badge size={prop as any} data-testid='badge'>
          {className} Badge
        </Badge>
      );

      expect(screen.getByTestId('badge')).toHaveClass(className);
      unmount();
    });
  });

  test('applies different color classes correctly', () => {
    const colors = ['gray', 'orange', 'violet', 'green', 'red', 'yellow', 'blue', 'lime', 'cyan'];

    colors.forEach((color) => {
      const { unmount } = render(
        <Badge color={color as any} data-testid='badge'>
          {color} Badge
        </Badge>
      );

      expect(screen.getByTestId('badge')).toHaveClass(color);
      unmount();
    });
  });

  test('applies different variant classes correctly', () => {
    const variants = ['outlined', 'solid', 'glass'];

    variants.forEach((variant) => {
      const { unmount } = render(
        <Badge variant={variant as any} data-testid='badge'>
          {variant} Badge
        </Badge>
      );

      expect(screen.getByTestId('badge')).toHaveClass(variant);
      unmount();
    });
  });

  test('applies custom className', () => {
    render(
      <Badge className='custom-badge' data-testid='badge'>
        Custom Class
      </Badge>
    );

    expect(screen.getByTestId('badge')).toHaveClass('custom-badge');
  });

  test('passes correct size to Dot component when dot prop is true', () => {
    const sizes = ['xs', 'sm', 'md'];

    sizes.forEach((size) => {
      const { unmount } = render(
        <Badge dot size={size as any} data-testid='badge'>
          With {size} Dot
        </Badge>
      );

      const dotEl = screen.getByTestId('dot-icon');
      expect(dotEl).toHaveAttribute('data-size', size);

      unmount();
    });
  });

  test('forwards ref to span element', () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<Badge ref={ref}>Ref Test</Badge>);

    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('SPAN');
  });

  test('passes other HTML attributes to the span element', () => {
    render(
      <Badge data-testid='badge' id='test-badge' title='Badge title' aria-label='Status indicator'>
        HTML Attributes
      </Badge>
    );

    const badge = screen.getByTestId('badge');
    expect(badge).toHaveAttribute('id', 'test-badge');
    expect(badge).toHaveAttribute('title', 'Badge title');
    expect(badge).toHaveAttribute('aria-label', 'Status indicator');
  });
});
