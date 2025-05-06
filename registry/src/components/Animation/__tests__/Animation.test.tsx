import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Animation } from '../index';

// Mock timers for more predictable testing
jest.useFakeTimers();

describe('Animation Component', () => {
  test('renders children correctly', () => {
    render(
      <Animation>
        <div data-testid='animated-content'>Test Content</div>
      </Animation>
    );

    const content = screen.getByTestId('animated-content');
    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent('Test Content');
  });

  test('applies animation classes based on state', () => {
    render(
      <Animation in={true} template='fade'>
        <div data-testid='animated-content'>Animate Me</div>
      </Animation>
    );

    const content = screen.getByTestId('animated-content');
    expect(content.className).toContain('fade-animation-entering');

    // Advance timers to transition to 'entered' state
    act(() => {
      jest.advanceTimersByTime(300); // Default timeout
    });

    expect(content.className).toContain('fade-animation-entered');
  });

  test('applies custom animation duration via timeout prop', () => {
    render(
      <Animation in={true} timeout={500}>
        <div data-testid='animated-content'>Custom Duration</div>
      </Animation>
    );

    const content = screen.getByTestId('animated-content');
    expect(content.style.transition).toContain('500ms');
  });

  test('supports object timeout for different enter/exit durations', () => {
    render(
      <Animation in={true} timeout={{ enter: 600, exit: 400 }}>
        <div data-testid='animated-content'>Different Durations</div>
      </Animation>
    );

    const content = screen.getByTestId('animated-content');
    expect(content.style.transition).toContain('600ms');
  });

  test('applies different animation templates', () => {
    const { rerender } = render(
      <Animation in={true} template='zoom'>
        <div data-testid='animated-content'>Zoom Animation</div>
      </Animation>
    );

    let content = screen.getByTestId('animated-content');
    expect(content.className).toContain('zoom-animation-entering');

    rerender(
      <Animation in={true} template='slide'>
        <div data-testid='animated-content'>Slide Animation</div>
      </Animation>
    );

    content = screen.getByTestId('animated-content');
    expect(content.className).toContain('slide-animation-entering');
  });

  test('handles exit animations', async () => {
    const { rerender } = render(
      <Animation in={true} template='fade'>
        <div data-testid='animated-content'>Fading Content</div>
      </Animation>
    );

    // Advance timers to entered state
    act(() => {
      jest.advanceTimersByTime(300);
    });

    // Trigger exit animation
    rerender(
      <Animation in={false} template='fade'>
        <div data-testid='animated-content'>Fading Content</div>
      </Animation>
    );

    const content = screen.getByTestId('animated-content');
    expect(content.className).toContain('fade-animation-exiting');

    // Advance timers to exited state
    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(content.className).toContain('fade-animation-exited');
  });

  test('respects unmountOnExit prop', async () => {
    const { rerender } = render(
      <Animation in={true} unmountOnExit={true}>
        <div data-testid='animated-content'>Unmounting Content</div>
      </Animation>
    );

    // Content is initially rendered
    expect(screen.getByTestId('animated-content')).toBeInTheDocument();

    // Advance timers to entered state
    act(() => {
      jest.advanceTimersByTime(300);
    });

    // Trigger exit animation
    rerender(
      <Animation in={false} unmountOnExit={true}>
        <div data-testid='animated-content'>Unmounting Content</div>
      </Animation>
    );

    // Advance timers to exited state
    act(() => {
      jest.advanceTimersByTime(300);
    });

    // Content should be unmounted
    expect(screen.queryByTestId('animated-content')).not.toBeInTheDocument();
  });

  test('calls lifecycle callbacks at appropriate times', () => {
    const callbacks = {
      onEnter: jest.fn(),
      onEntering: jest.fn(),
      onEntered: jest.fn(),
      onExit: jest.fn(),
      onExiting: jest.fn(),
      onExited: jest.fn()
    };

    const { rerender } = render(
      <Animation in={true} {...callbacks}>
        <div data-testid='animated-content'>Callback Testing</div>
      </Animation>
    );

    // onEnter and onEntering should be called immediately
    expect(callbacks.onEnter).toHaveBeenCalledTimes(1);
    expect(callbacks.onEntering).toHaveBeenCalledTimes(1);

    // onEntered should be called after timeout
    expect(callbacks.onEntered).not.toHaveBeenCalled();
    act(() => {
      jest.advanceTimersByTime(300);
    });
    expect(callbacks.onEntered).toHaveBeenCalledTimes(1);

    // Trigger exit animation
    rerender(
      <Animation in={false} {...callbacks}>
        <div data-testid='animated-content'>Callback Testing</div>
      </Animation>
    );

    // onExit and onExiting should be called immediately
    expect(callbacks.onExit).toHaveBeenCalledTimes(1);
    expect(callbacks.onExiting).toHaveBeenCalledTimes(1);

    // onExited should be called after timeout
    expect(callbacks.onExited).not.toHaveBeenCalled();
    act(() => {
      jest.advanceTimersByTime(300);
    });
    expect(callbacks.onExited).toHaveBeenCalledTimes(1);
  });

  test('applies animation style props correctly', () => {
    render(
      <Animation
        in={true}
        easing='ease-in-out'
        direction='alternate'
        delay={200}
        duration={800}
        iterationCount={3}
        fillMode='both'
      >
        <div data-testid='animated-content'>Styled Animation</div>
      </Animation>
    );

    const content = screen.getByTestId('animated-content');

    expect(content.style.transition).toContain('ease-in-out');
    expect(content.style.animationDirection).toBe('alternate');
    expect(content.style.animationDelay).toBe('200ms');
    expect(content.style.animationDuration).toBe('800ms');
    expect(content.style.animationIterationCount).toBe('3');
    expect(content.style.animationFillMode).toBe('both');
  });

  test('supports infinite iterations', () => {
    render(
      <Animation in={true} iterationCount='infinite'>
        <div data-testid='animated-content'>Infinite Animation</div>
      </Animation>
    );

    const content = screen.getByTestId('animated-content');
    expect(content.style.animationIterationCount).toBe('infinite');
  });

  test('preserves original className from child', () => {
    render(
      <Animation in={true}>
        <div className='original-class' data-testid='animated-content'>
          Class Preservation
        </div>
      </Animation>
    );

    const content = screen.getByTestId('animated-content');
    expect(content.className).toContain('original-class');
    expect(content.className).toContain('animation-entering');
  });

  test('applies firstAnimation prop correctly', () => {
    render(
      <Animation in={true} firstAnimation={true}>
        <div data-testid='animated-content'>First Animation</div>
      </Animation>
    );

    // Since firstAnimation is true, it should start in 'exited' state
    const content = screen.getByTestId('animated-content');
    expect(content.className).toContain('animation-entering');
  });

  test('preserves child props', () => {
    const onClick = jest.fn();

    render(
      <Animation in={true}>
        <div data-testid='animated-content' onClick={onClick} aria-label='Animated element'>
          Props Preservation
        </div>
      </Animation>
    );

    const content = screen.getByTestId('animated-content');
    expect(content).toHaveAttribute('aria-label', 'Animated element');

    // The onClick handler should be preserved
    content.click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
