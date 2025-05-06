import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CornerIndicator } from '../index';

// Mock the Badge and Dot components
jest.mock('../../Badge', () => ({
  Badge: ({ label, color, size, variant, icon, ...props }) => (
    <div
      data-testid='mock-badge'
      data-color={color}
      data-size={size}
      data-variant={variant}
      data-has-icon={icon ? 'true' : 'false'}
      {...props}
    >
      {label}
    </div>
  )
}));

jest.mock('../../Dot', () => ({
  Dot: ({ color, size, pulse, ...props }) => (
    <div data-testid='mock-dot' data-color={color} data-size={size} data-pulse={pulse ? 'true' : 'false'} {...props} />
  )
}));

describe('CornerIndicator Component', () => {
  test('renders children without indicator when disabled', () => {
    render(
      <CornerIndicator disable>
        <div data-testid='content'>Content</div>
      </CornerIndicator>
    );

    // Check that the content is rendered
    expect(screen.getByTestId('content')).toBeInTheDocument();

    // Check that the container is not rendered
    expect(screen.queryByTestId('mock-badge')).not.toBeInTheDocument();
    expect(screen.queryByTestId('mock-dot')).not.toBeInTheDocument();
  });

  test('renders dot indicator when no label is provided', () => {
    render(
      <CornerIndicator>
        <div data-testid='content'>Content</div>
      </CornerIndicator>
    );

    // Check that the content is rendered
    const content = screen.getByTestId('content');
    expect(content).toBeInTheDocument();

    // Check that the dot is rendered
    const dot = screen.getByTestId('mock-dot');
    expect(dot).toBeInTheDocument();

    // Check default props passed to Dot
    expect(dot).toHaveAttribute('data-color', 'gray');
    expect(dot).toHaveAttribute('data-size', 'lg'); // md CornerIndicator size maps to lg Dot size
    expect(dot).toHaveAttribute('data-pulse', 'false');
  });

  test('renders badge indicator when label is provided', () => {
    render(
      <CornerIndicator label='New'>
        <div data-testid='content'>Content</div>
      </CornerIndicator>
    );

    // Check that the content is rendered
    const content = screen.getByTestId('content');
    expect(content).toBeInTheDocument();

    // Check that the badge is rendered with the label
    const badge = screen.getByTestId('mock-badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent('New');

    // Check default props passed to Badge
    expect(badge).toHaveAttribute('data-color', 'gray');
    expect(badge).toHaveAttribute('data-size', 'md');
    expect(badge).toHaveAttribute('data-variant', 'solid');
  });

  test('applies outline styling when specified', () => {
    render(
      <CornerIndicator outline label='New'>
        <div>Content</div>
      </CornerIndicator>
    );

    const container = screen.getByText('New').parentElement;
    expect(container).toHaveClass('bordered');
  });

  test('applies pulse effect to Dot', () => {
    render(
      <CornerIndicator pulse>
        <div>Content</div>
      </CornerIndicator>
    );

    const dot = screen.getByTestId('mock-dot');
    expect(dot).toHaveAttribute('data-pulse', 'true');
  });

  test('applies position class to container', () => {
    const { rerender } = render(
      <CornerIndicator position='top-left' label='TL'>
        <div>Content</div>
      </CornerIndicator>
    );

    let container = screen.getByText('TL').parentElement;
    expect(container).toHaveClass('top-left');

    rerender(
      <CornerIndicator position='bottom-right' label='BR'>
        <div>Content</div>
      </CornerIndicator>
    );

    container = screen.getByText('BR').parentElement;
    expect(container).toHaveClass('bottom-right');
  });

  test('applies different colors', () => {
    render(
      <CornerIndicator color='red' label='Error'>
        <div>Content</div>
      </CornerIndicator>
    );

    const badge = screen.getByTestId('mock-badge');
    expect(badge).toHaveAttribute('data-color', 'red');
  });

  test('applies different sizes', () => {
    const { rerender } = render(
      <CornerIndicator size='xs' label='XS'>
        <div>Content</div>
      </CornerIndicator>
    );

    let badge = screen.getByTestId('mock-badge');
    expect(badge).toHaveAttribute('data-size', 'xs');

    rerender(
      <CornerIndicator size='lg'>
        <div>Content</div>
      </CornerIndicator>
    );

    const dot = screen.getByTestId('mock-dot');
    expect(dot).toHaveAttribute('data-size', 'xl'); // lg CornerIndicator size maps to xl Dot size
  });

  test('applies different variants to Badge', () => {
    render(
      <CornerIndicator variant='outlined' label='Outlined'>
        <div>Content</div>
      </CornerIndicator>
    );

    const badge = screen.getByTestId('mock-badge');
    expect(badge).toHaveAttribute('data-variant', 'outlined');
  });

  test('passes icon to Badge', () => {
    render(
      <CornerIndicator label='With Icon' icon={<span>Icon</span>}>
        <div>Content</div>
      </CornerIndicator>
    );

    const badge = screen.getByTestId('mock-badge');
    expect(badge).toHaveAttribute('data-has-icon', 'true');
  });

  test('applies CSS variables for offset', () => {
    render(
      <CornerIndicator offset={10} xOffset={5} yOffset={15} label='Offset'>
        <div>Content</div>
      </CornerIndicator>
    );

    const container = screen.getByText('Offset').parentElement;

    // Due to how JSDOM handles CSS variables, we need to check the inline style directly
    expect(container?.style.getPropertyValue('--par-y-offset')).toBe('25px'); // offset + yOffset
    // xOffset calculation depends on growDirection, which defaults to 'symmetric'
    expect(container?.style.getPropertyValue('--par-x-offset')).toBe('15px'); // offset + xOffset
  });

  test('applies grow direction CSS variables', () => {
    const { rerender } = render(
      <CornerIndicator growDirection='inward' label='Inward'>
        <div>Content</div>
      </CornerIndicator>
    );

    let container = screen.getByText('Inward').parentElement;
    expect(container?.style.getPropertyValue('--par-x-origin')).toBe('0');

    rerender(
      <CornerIndicator growDirection='outward' label='Outward'>
        <div>Content</div>
      </CornerIndicator>
    );

    container = screen.getByText('Outward').parentElement;
    expect(container?.style.getPropertyValue('--par-x-origin')).toBe('100');

    rerender(
      <CornerIndicator growDirection='symmetric' label='Symmetric'>
        <div>Content</div>
      </CornerIndicator>
    );

    container = screen.getByText('Symmetric').parentElement;
    expect(container?.style.getPropertyValue('--par-x-origin')).toBe('50');
  });

  test('forwards ref to container element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <CornerIndicator ref={ref} label='Ref Test'>
        <div>Content</div>
      </CornerIndicator>
    );

    expect(ref.current).not.toBeNull();
    expect(ref.current?.className).toContain('corner-indicator-container');
  });

  test('passes indicatorProps to Badge or Dot', () => {
    const { rerender } = render(
      <CornerIndicator label='Badge Props' indicatorProps={{ className: 'custom-badge-class' }}>
        <div>Content</div>
      </CornerIndicator>
    );

    let indicator = screen.getByTestId('mock-badge');
    expect(indicator).toHaveClass('custom-badge-class');

    rerender(
      <CornerIndicator indicatorProps={{ className: 'custom-dot-class' }}>
        <div>Content</div>
      </CornerIndicator>
    );

    indicator = screen.getByTestId('mock-dot');
    expect(indicator).toHaveClass('custom-dot-class');
  });
});
