import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Toast, toast } from './index';

describe('Toast Component', () => {
  const mockRemoveToast = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  describe('Rendering', () => {
    it('renders correctly', () => {
      const { container } = render(<Toast id="1" removeToast={mockRemoveToast} message="Test message" />);
      expect(container.querySelector('.toast')).toBeInTheDocument();
    });

    it('renders message', () => {
      render(<Toast id="1" removeToast={mockRemoveToast} message="Test message" />);
      expect(screen.getByText('Test message')).toBeInTheDocument();
    });

    it('renders title and message', () => {
      render(<Toast id="1" removeToast={mockRemoveToast} title="Title" message="Message" />);
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Message')).toBeInTheDocument();
    });

    it('renders without title in compact height', () => {
      render(<Toast id="1" removeToast={mockRemoveToast} title="Title" message="Message" height="compact" />);
      expect(screen.queryByText('Title')).not.toBeInTheDocument();
      expect(screen.getByText('Message')).toBeInTheDocument();
    });
  });

  describe('Kind variants', () => {
    it('renders generic kind by default', () => {
      const { container } = render(<Toast id="1" removeToast={mockRemoveToast} message="Test" />);
      expect(container.querySelector('.toast')).toHaveClass('generic');
    });

    it('renders information kind', () => {
      const { container } = render(<Toast id="1" removeToast={mockRemoveToast} message="Test" kind="information" />);
      expect(container.querySelector('.toast')).toHaveClass('information');
    });

    it('renders affirmative kind', () => {
      const { container } = render(<Toast id="1" removeToast={mockRemoveToast} message="Test" kind="affirmative" />);
      expect(container.querySelector('.toast')).toHaveClass('affirmative');
    });

    it('renders cautionary kind', () => {
      const { container } = render(<Toast id="1" removeToast={mockRemoveToast} message="Test" kind="cautionary" />);
      expect(container.querySelector('.toast')).toHaveClass('cautionary');
    });

    it('renders adverse kind', () => {
      const { container } = render(<Toast id="1" removeToast={mockRemoveToast} message="Test" kind="adverse" />);
      expect(container.querySelector('.toast')).toHaveClass('adverse');
    });
  });

  describe('Height variants', () => {
    it('renders flexible height by default', () => {
      const { container } = render(<Toast id="1" removeToast={mockRemoveToast} message="Test" />);
      expect(container.querySelector('.toast')).toHaveClass('height-flexible');
    });

    it('renders compact height', () => {
      const { container } = render(<Toast id="1" removeToast={mockRemoveToast} message="Test" height="compact" />);
      expect(container.querySelector('.toast')).toHaveClass('height-compact');
    });
  });

  describe('Emphasis variants', () => {
    it('renders high emphasis by default', () => {
      const { container } = render(<Toast id="1" removeToast={mockRemoveToast} message="Test" />);
      expect(container.querySelector('.toast')).toHaveClass('emphasis-high');
    });

    it('renders normal emphasis', () => {
      const { container } = render(<Toast id="1" removeToast={mockRemoveToast} message="Test" emphasis="normal" />);
      expect(container.querySelector('.toast')).toHaveClass('emphasis-normal');
    });
  });

  describe('Dismiss button', () => {
    it('renders dismiss button by default', () => {
      const { container } = render(<Toast id="1" removeToast={mockRemoveToast} message="Test" />);
      expect(container.querySelector('.toast-close')).toBeInTheDocument();
    });

    it('hides dismiss button when dismissButton is false', () => {
      const { container } = render(<Toast id="1" removeToast={mockRemoveToast} message="Test" dismissButton={false} />);
      expect(container.querySelector('.toast-close')).not.toBeInTheDocument();
    });

    it('calls removeToast when dismiss button is clicked', async () => {
      const { container } = render(<Toast id="toast-1" removeToast={mockRemoveToast} message="Test" />);

      const dismissButton = container.querySelector('.toast-close') as HTMLButtonElement;
      await userEvent.click(dismissButton);

      jest.advanceTimersByTime(250);

      expect(mockRemoveToast).toHaveBeenCalledWith('toast-1');
    });
  });

  describe('Action element', () => {
    it('renders action element', () => {
      render(
        <Toast id="1" removeToast={mockRemoveToast} message="Test" action={<button>Undo</button>} />
      );
      expect(screen.getByText('Undo')).toBeInTheDocument();
    });

    it('renders action in body for flexible height', () => {
      const { container } = render(
        <Toast id="1" removeToast={mockRemoveToast} message="Test" action={<button>Undo</button>} height="flexible" />
      );
      expect(container.querySelector('.toast-body .toast-action')).toBeInTheDocument();
    });

    it('renders action in action-section for compact height', () => {
      const { container } = render(
        <Toast id="1" removeToast={mockRemoveToast} message="Test" action={<button>Undo</button>} height="compact" />
      );
      expect(container.querySelector('.action-section .toast-action')).toBeInTheDocument();
    });
  });

  describe('Icon', () => {
    it('renders custom icon', () => {
      render(
        <Toast id="1" removeToast={mockRemoveToast} message="Test" icon={<span data-testid="custom-icon">★</span>} />
      );
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });

    it('renders spinner when pending', () => {
      const { container } = render(<Toast id="1" removeToast={mockRemoveToast} message="Test" pending />);
      expect(container.querySelector('.spinner')).toBeInTheDocument();
    });

    it('does not render icon for generic kind', () => {
      const { container } = render(<Toast id="1" removeToast={mockRemoveToast} message="Test" kind="generic" />);
      expect(container.querySelector('.toast-icon')).not.toBeInTheDocument();
    });

    it('renders icon for information kind', () => {
      const { container } = render(<Toast id="1" removeToast={mockRemoveToast} message="Test" kind="information" />);
      expect(container.querySelector('.toast-icon')).toBeInTheDocument();
    });
  });

  describe('Pending state', () => {
    it('shows spinner when pending', () => {
      const { container } = render(<Toast id="1" removeToast={mockRemoveToast} message="Loading..." pending />);
      expect(container.querySelector('.spinner')).toBeInTheDocument();
    });

    it('hides dismiss button when pending', () => {
      const { container } = render(<Toast id="1" removeToast={mockRemoveToast} message="Loading..." pending />);
      expect(container.querySelector('.toast-close')).not.toBeInTheDocument();
    });

    it('uses generic kind when pending', () => {
      const { container } = render(
        <Toast id="1" removeToast={mockRemoveToast} message="Loading..." pending kind="affirmative" />
      );
      expect(container.querySelector('.toast')).toHaveClass('generic');
    });
  });

  describe('Progress bar', () => {
    it('does not show progress bar by default', () => {
      const { container } = render(<Toast id="1" removeToast={mockRemoveToast} message="Test" autoDismiss />);
      expect(container.querySelector('.toast-progress-bar')).not.toBeInTheDocument();
    });

    it('shows progress bar when progressBar is true', () => {
      const { container } = render(
        <Toast id="1" removeToast={mockRemoveToast} message="Test" autoDismiss progressBar />
      );
      expect(container.querySelector('.toast-progress-bar')).toBeInTheDocument();
    });

    it('does not show progress bar when pending', () => {
      const { container } = render(
        <Toast id="1" removeToast={mockRemoveToast} message="Test" autoDismiss progressBar pending />
      );
      expect(container.querySelector('.toast-progress-bar')).not.toBeInTheDocument();
    });
  });

  describe('Auto dismiss', () => {
    it('auto dismisses after duration', () => {
      render(<Toast id="1" removeToast={mockRemoveToast} message="Test" autoDismiss duration={1000} />);

      jest.advanceTimersByTime(1250);

      expect(mockRemoveToast).toHaveBeenCalledWith('1');
    });

    it('does not auto dismiss when autoDismiss is false', () => {
      render(<Toast id="1" removeToast={mockRemoveToast} message="Test" autoDismiss={false} duration={1000} />);

      jest.advanceTimersByTime(1250);

      expect(mockRemoveToast).not.toHaveBeenCalled();
    });

    it('does not auto dismiss when pending', () => {
      render(<Toast id="1" removeToast={mockRemoveToast} message="Test" autoDismiss duration={1000} pending />);

      jest.advanceTimersByTime(1250);

      expect(mockRemoveToast).not.toHaveBeenCalled();
    });
  });

  describe('onDismissed callback', () => {
    it('calls onDismissed when toast is dismissed', async () => {
      const handleDismissed = jest.fn();
      const { container } = render(
        <Toast id="1" removeToast={mockRemoveToast} message="Test" onDismissed={handleDismissed} />
      );

      const dismissButton = container.querySelector('.toast-close') as HTMLButtonElement;
      await userEvent.click(dismissButton);

      jest.advanceTimersByTime(250);

      expect(handleDismissed).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('has tabIndex for keyboard access', () => {
      const { container } = render(<Toast id="1" removeToast={mockRemoveToast} message="Test" />);
      expect(container.querySelector('.toast')).toHaveAttribute('tabIndex', '0');
    });

    it('applies custom className', () => {
      const { container } = render(
        <Toast id="1" removeToast={mockRemoveToast} message="Test" className="custom-toast" />
      );
      expect(container.querySelector('.toast')).toHaveClass('custom-toast');
    });
  });
});

describe('toast function', () => {
  it('creates toast with default values', () => {
    const toastInstance = toast({ message: 'Test message' });
    const detail = toastInstance.getDetail();

    expect(detail.message).toBe('Test message');
    expect(detail.kind).toBe('generic');
    expect(detail.position).toBe('top-right');
  });

  it('creates toast with custom kind', () => {
    const toastInstance = toast({ message: 'Test', kind: 'affirmative' });
    const detail = toastInstance.getDetail();

    expect(detail.kind).toBe('affirmative');
  });

  it('creates toast with custom position', () => {
    const toastInstance = toast({ message: 'Test', position: 'bottom-center' });
    const detail = toastInstance.getDetail();

    expect(detail.position).toBe('bottom-center');
  });

  it('has start method', () => {
    const toastInstance = toast({ message: 'Test' });
    expect(toastInstance.start).toBeDefined();
    expect(typeof toastInstance.start).toBe('function');
  });

  it('has stop method', () => {
    const toastInstance = toast({ message: 'Test' });
    expect(toastInstance.stop).toBeDefined();
    expect(typeof toastInstance.stop).toBe('function');
  });

  it('has update method', () => {
    const toastInstance = toast({ message: 'Test' });
    expect(toastInstance.update).toBeDefined();
    expect(typeof toastInstance.update).toBe('function');
  });

  it('has getDetail method', () => {
    const toastInstance = toast({ message: 'Test' });
    expect(toastInstance.getDetail).toBeDefined();
    expect(typeof toastInstance.getDetail).toBe('function');
  });
});
