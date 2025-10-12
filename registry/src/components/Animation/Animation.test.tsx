import { render, screen, waitFor } from '@testing-library/react';
import { Animation } from './index';

describe('Animation Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  describe('Rendering', () => {
    it('renders child element', () => {
      render(
        <Animation in={true}>
          <div>Animated content</div>
        </Animation>
      );
      expect(screen.getByText('Animated content')).toBeInTheDocument();
    });

    it('applies animation class to child', () => {
      const { container } = render(
        <Animation in={true}>
          <div>Content</div>
        </Animation>
      );
      expect(container.firstChild).toHaveClass('animation-entered');
    });

    it('does not render when exited and unmountOnExit is true', () => {
      render(
        <Animation in={false} unmountOnExit>
          <div>Content</div>
        </Animation>
      );
      expect(screen.queryByText('Content')).not.toBeInTheDocument();
    });
  });

  describe('Animation states', () => {
    it('starts in exited state when in is false', () => {
      const { container } = render(
        <Animation in={false}>
          <div>Content</div>
        </Animation>
      );
      expect(container.firstChild).toHaveClass('animation-exited');
    });

    it('starts in entered state when in is true and firstAnimation is false', () => {
      const { container } = render(
        <Animation in={true} firstAnimation={false}>
          <div>Content</div>
        </Animation>
      );
      expect(container.firstChild).toHaveClass('animation-entered');
    });

    it('transitions to entering state when in becomes true', () => {
      const { container, rerender } = render(
        <Animation in={false}>
          <div>Content</div>
        </Animation>
      );

      rerender(
        <Animation in={true}>
          <div>Content</div>
        </Animation>
      );

      expect(container.firstChild).toHaveClass('animation-entering');
    });

    it('transitions to entered state after timeout', async () => {
      const { container, rerender } = render(
        <Animation in={false} timeout={300}>
          <div>Content</div>
        </Animation>
      );

      rerender(
        <Animation in={true} timeout={300}>
          <div>Content</div>
        </Animation>
      );

      jest.advanceTimersByTime(300);

      await waitFor(() => {
        expect(container.firstChild).toHaveClass('animation-entered');
      });
    });

    it('transitions to exiting state when in becomes false', () => {
      const { container, rerender } = render(
        <Animation in={true}>
          <div>Content</div>
        </Animation>
      );

      rerender(
        <Animation in={false}>
          <div>Content</div>
        </Animation>
      );

      jest.advanceTimersByTime(0);

      expect(container.firstChild).toHaveClass('animation-exiting');
    });
  });

  describe('Callbacks', () => {
    it('calls onEnter when animation starts entering', () => {
      const onEnter = jest.fn();
      const { rerender } = render(
        <Animation in={false} onEnter={onEnter}>
          <div>Content</div>
        </Animation>
      );

      rerender(
        <Animation in={true} onEnter={onEnter}>
          <div>Content</div>
        </Animation>
      );

      jest.advanceTimersByTime(0);
      expect(onEnter).toHaveBeenCalled();
    });

    it('calls onEntering when entering transition is active', () => {
      const onEntering = jest.fn();
      const { rerender } = render(
        <Animation in={false} onEntering={onEntering}>
          <div>Content</div>
        </Animation>
      );

      rerender(
        <Animation in={true} onEntering={onEntering}>
          <div>Content</div>
        </Animation>
      );

      expect(onEntering).toHaveBeenCalled();
    });

    it('calls onEntered when animation has fully entered', async () => {
      const onEntered = jest.fn();
      const { rerender } = render(
        <Animation in={false} timeout={300} onEntered={onEntered}>
          <div>Content</div>
        </Animation>
      );

      rerender(
        <Animation in={true} timeout={300} onEntered={onEntered}>
          <div>Content</div>
        </Animation>
      );

      jest.advanceTimersByTime(300);

      await waitFor(() => {
        expect(onEntered).toHaveBeenCalled();
      });
    });

    it('calls onExit when animation starts exiting', () => {
      const onExit = jest.fn();
      const { rerender } = render(
        <Animation in={true} onExit={onExit}>
          <div>Content</div>
        </Animation>
      );

      rerender(
        <Animation in={false} onExit={onExit}>
          <div>Content</div>
        </Animation>
      );

      jest.advanceTimersByTime(0);
      expect(onExit).toHaveBeenCalled();
    });

    it('calls onExiting when exiting transition is active', () => {
      const onExiting = jest.fn();
      const { rerender } = render(
        <Animation in={true} onExiting={onExiting}>
          <div>Content</div>
        </Animation>
      );

      rerender(
        <Animation in={false} onExiting={onExiting}>
          <div>Content</div>
        </Animation>
      );

      expect(onExiting).toHaveBeenCalled();
    });

    it('calls onExited when animation has fully exited', async () => {
      const onExited = jest.fn();
      const { rerender } = render(
        <Animation in={true} timeout={300} onExited={onExited}>
          <div>Content</div>
        </Animation>
      );

      rerender(
        <Animation in={false} timeout={300} onExited={onExited}>
          <div>Content</div>
        </Animation>
      );

      jest.advanceTimersByTime(300);

      await waitFor(() => {
        expect(onExited).toHaveBeenCalled();
      });
    });
  });

  describe('Timeout configuration', () => {
    it('uses number timeout for both enter and exit', async () => {
      const onEntered = jest.fn();
      const { rerender } = render(
        <Animation in={false} timeout={500} onEntered={onEntered}>
          <div>Content</div>
        </Animation>
      );

      rerender(
        <Animation in={true} timeout={500} onEntered={onEntered}>
          <div>Content</div>
        </Animation>
      );

      jest.advanceTimersByTime(500);

      await waitFor(() => {
        expect(onEntered).toHaveBeenCalled();
      });
    });

    it('uses separate enter and exit timeouts', async () => {
      const onEntered = jest.fn();
      const onExited = jest.fn();
      const { rerender } = render(
        <Animation in={false} timeout={{ enter: 200, exit: 400 }} onEntered={onEntered} onExited={onExited}>
          <div>Content</div>
        </Animation>
      );

      rerender(
        <Animation in={true} timeout={{ enter: 200, exit: 400 }} onEntered={onEntered} onExited={onExited}>
          <div>Content</div>
        </Animation>
      );

      jest.advanceTimersByTime(200);

      await waitFor(() => {
        expect(onEntered).toHaveBeenCalled();
      });

      rerender(
        <Animation in={false} timeout={{ enter: 200, exit: 400 }} onEntered={onEntered} onExited={onExited}>
          <div>Content</div>
        </Animation>
      );

      jest.advanceTimersByTime(400);

      await waitFor(() => {
        expect(onExited).toHaveBeenCalled();
      });
    });
  });

  describe('Animation templates', () => {
    const templates = ['fade', 'slide', 'zoom', 'rotate', 'flip', 'bounce', 'pulse', 'shake', 'tada', 'jello'] as const;

    templates.forEach((template) => {
      it(`applies ${template} template class`, () => {
        const { container } = render(
          <Animation in={true} template={template}>
            <div>Content</div>
          </Animation>
        );
        expect(container.firstChild).toHaveClass(`${template}-animation-entered`);
      });
    });
  });

  describe('Animation properties', () => {
    it('applies custom easing', () => {
      const { container } = render(
        <Animation in={true} easing='ease-in-out'>
          <div>Content</div>
        </Animation>
      );
      const element = container.firstChild as HTMLElement;
      expect(element.style.transition).toContain('ease-in-out');
    });

    it('applies custom duration', () => {
      const { container } = render(
        <Animation in={true} duration={500}>
          <div>Content</div>
        </Animation>
      );
      const element = container.firstChild as HTMLElement;
      expect(element.style.animationDuration).toBe('500ms');
    });

    it('applies custom delay', () => {
      const { container } = render(
        <Animation in={true} delay={100}>
          <div>Content</div>
        </Animation>
      );
      const element = container.firstChild as HTMLElement;
      expect(element.style.animationDelay).toBe('100ms');
    });

    it('applies custom direction', () => {
      const { container } = render(
        <Animation in={true} direction='reverse'>
          <div>Content</div>
        </Animation>
      );
      const element = container.firstChild as HTMLElement;
      expect(element.style.animationDirection).toBe('reverse');
    });

    it('applies custom iteration count', () => {
      const { container } = render(
        <Animation in={true} iterationCount={3}>
          <div>Content</div>
        </Animation>
      );
      const element = container.firstChild as HTMLElement;
      expect(element.style.animationIterationCount).toBe('3');
    });

    it('applies infinite iteration count', () => {
      const { container } = render(
        <Animation in={true} iterationCount='infinite'>
          <div>Content</div>
        </Animation>
      );
      const element = container.firstChild as HTMLElement;
      expect(element.style.animationIterationCount).toBe('infinite');
    });

    it('applies custom fill mode', () => {
      const { container } = render(
        <Animation in={true} fillMode='both'>
          <div>Content</div>
        </Animation>
      );
      const element = container.firstChild as HTMLElement;
      expect(element.style.animationFillMode).toBe('both');
    });
  });

  describe('Child props preservation', () => {
    it('preserves child className', () => {
      const { container } = render(
        <Animation in={true}>
          <div className='child-class'>Content</div>
        </Animation>
      );
      expect(container.firstChild).toHaveClass('child-class');
    });

    it('preserves child style', () => {
      const { container } = render(
        <Animation in={true}>
          <div style={{ color: 'red' }}>Content</div>
        </Animation>
      );
      const element = container.firstChild as HTMLElement;
      expect(element.style.color).toBe('red');
    });

    it('merges animation className with custom className', () => {
      const { container } = render(
        <Animation in={true} className='animation-custom'>
          <div>Content</div>
        </Animation>
      );
      expect(container.firstChild).toHaveClass('animation-custom', 'animation-entered');
    });
  });
});
