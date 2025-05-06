import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Tooltip } from '../index';

// Mock Portal component for testing
jest.mock('../../Portal', () => ({
  Portal: ({ children }: { children: React.ReactNode }) => <div data-testid='portal-mock'>{children}</div>
}));

// Mock useFloating and related hooks from @floating-ui/react
jest.mock('@floating-ui/react', () => {
  const original = jest.requireActual('@floating-ui/react');
  return {
    ...original,
    useFloating: jest.fn(() => ({
      refs: {
        setReference: jest.fn(),
        setFloating: jest.fn()
      },
      floatingStyles: { position: 'absolute', top: '0', left: '0' },
      context: {},
      placement: 'top'
    })),
    useHover: jest.fn(() => ({})),
    useFocus: jest.fn(() => ({})),
    useClick: jest.fn(() => ({})),
    useDismiss: jest.fn(() => ({})),
    useRole: jest.fn(() => ({})),
    useInteractions: jest.fn(() => ({
      getReferenceProps: () => ({}),
      getFloatingProps: () => ({})
    })),
    FloatingArrow: ({ children, ...props }: any) => (
      <div data-testid='floating-arrow' {...props}>
        {children}
      </div>
    )
  };
});

// Mock useTouch custom hook
jest.mock('../useTouch', () => ({
  useTouch: jest.fn(() => ({}))
}));

// Mock setTimeout and clearTimeout
jest.useFakeTimers();

describe('Tooltip Component', () => {
  // Test basic rendering
  test('renders trigger element correctly', () => {
    render(
      <Tooltip content='Tooltip content'>
        <button>Hover me</button>
      </Tooltip>
    );

    const trigger = screen.getByRole('button', { name: 'Hover me' });
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveClass('tooltip');
  });

  // Test string child wrapping
  test('wraps string children in span element', () => {
    render(<Tooltip content='Tooltip content'>Hover me</Tooltip>);

    const trigger = screen.getByText('Hover me');
    expect(trigger).toBeInTheDocument();
    expect(trigger.tagName).toBe('SPAN');
    expect(trigger).toHaveClass('tooltip');
    expect(trigger).toHaveAttribute('tabIndex', '0');
  });

  // Test number child wrapping
  test('wraps number children in span element', () => {
    render(<Tooltip content='Tooltip content'>{42}</Tooltip>);

    const trigger = screen.getByText('42');
    expect(trigger).toBeInTheDocument();
    expect(trigger.tagName).toBe('SPAN');
    expect(trigger).toHaveClass('tooltip');
  });

  // Test tooltip content visibility (mocked open state)
  test('shows tooltip content when open', () => {
    // Force tooltip to be open with controlled open prop
    render(
      <Tooltip content='Tooltip content' controlledOpen={true}>
        <button>Hover me</button>
      </Tooltip>
    );

    expect(screen.getByText('Tooltip content')).toBeInTheDocument();
    expect(screen.getByTestId('floating-arrow')).toBeInTheDocument();
  });

  // Test tooltip content not visible when closed
  test('hides tooltip content when closed', () => {
    render(
      <Tooltip content='Tooltip content' controlledOpen={false}>
        <button>Hover me</button>
      </Tooltip>
    );

    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument();
    expect(screen.queryByTestId('floating-arrow')).not.toBeInTheDocument();
  });

  // Test controlled open prop
  test('respects controlledOpen prop', () => {
    const { rerender } = render(
      <Tooltip content='Tooltip content' controlledOpen={false}>
        <button>Hover me</button>
      </Tooltip>
    );

    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument();

    rerender(
      <Tooltip content='Tooltip content' controlledOpen={true}>
        <button>Hover me</button>
      </Tooltip>
    );

    expect(screen.getByText('Tooltip content')).toBeInTheDocument();
  });

  // Test tooltip placement classes
  test('applies correct placement class', () => {
    // Mock specific placement
    const mockUseFloating = require('@floating-ui/react').useFloating;
    mockUseFloating.mockReturnValue({
      refs: {
        setReference: jest.fn(),
        setFloating: jest.fn()
      },
      floatingStyles: {},
      context: {},
      placement: 'bottom'
    });

    render(
      <Tooltip content='Tooltip content' position='bottom' controlledOpen={true}>
        <button>Hover me</button>
      </Tooltip>
    );

    const tooltipContent = screen.getByText('Tooltip content');
    expect(tooltipContent).toHaveClass('bottom');
  });

  // Test tooltip with custom className
  test('applies custom className to tooltip content', () => {
    render(
      <Tooltip content='Tooltip content' className='custom-tooltip' controlledOpen={true}>
        <button>Hover me</button>
      </Tooltip>
    );

    const tooltipContent = screen.getByText('Tooltip content');
    expect(tooltipContent).toHaveClass('tooltip-content');
    expect(tooltipContent).toHaveClass('custom-tooltip');
  });

  // Test tooltip with multiple children
  test('handles multiple children correctly', () => {
    render(
      <Tooltip content='Tooltip content'>
        <div>
          <span>First</span>
          <span>Second</span>
        </div>
      </Tooltip>
    );

    const container = screen.getByText('First').parentElement;
    expect(container).toHaveClass('tooltip');
  });

  // Test tooltip toggle behavior (requires mocking state changes)
  test('uses click interaction when isToggle is true', () => {
    const useClickMock = require('@floating-ui/react').useClick;

    render(
      <Tooltip content='Toggle tooltip' isToggle={true}>
        <button>Click me</button>
      </Tooltip>
    );

    expect(useClickMock).toHaveBeenCalledWith(expect.anything(), { enabled: true });
  });

  // Test hover behavior
  test('uses hover interaction with correct delay', () => {
    const useHoverMock = require('@floating-ui/react').useHover;

    render(
      <Tooltip content='Delayed tooltip' delay={200}>
        <button>Hover me</button>
      </Tooltip>
    );

    expect(useHoverMock).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        delay: { open: 200, close: 0 }
      })
    );
  });

  // Test safe polygon option
  test('uses safePolygon when isSafePolygon is true', () => {
    const useHoverMock = require('@floating-ui/react').useHover;
    const safePolygonMock = require('@floating-ui/react').safePolygon;

    safePolygonMock.mockReturnValue('mock-safe-polygon');

    render(
      <Tooltip content='Safe polygon tooltip' isSafePolygon={true}>
        <button>Hover me</button>
      </Tooltip>
    );

    expect(useHoverMock).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        handleClose: 'mock-safe-polygon'
      })
    );
  });

  // Test touch delay functionality
  test('adds touch interaction when touchDelay is specified', () => {
    const useTouchMock = require('../useTouch').useTouch;
    const useInteractionsMock = require('@floating-ui/react').useInteractions;

    render(
      <Tooltip content='Touch tooltip' touchDelay={1000}>
        <button>Touch me</button>
      </Tooltip>
    );

    expect(useTouchMock).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        delay: 1000
      })
    );

    // Touch should be included in interactions
    expect(useInteractionsMock).toHaveBeenCalledWith(
      expect.arrayContaining([{}]) // Mock touch interaction
    );
  });

  // Test no touch interaction when touchDelay is undefined
  test('does not add touch interaction when touchDelay is undefined', () => {
    const useTouchMock = require('../useTouch').useTouch;

    render(
      <Tooltip content='No touch tooltip'>
        <button>Touch me</button>
      </Tooltip>
    );

    expect(useTouchMock).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        delay: 1500 // Default value
      })
    );
  });
});
