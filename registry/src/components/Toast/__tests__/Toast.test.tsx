import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Toast, toast, ToastContainer } from '../index';

// Mock ReactDOM portal to render directly in the document
jest.mock('react-dom', () => {
  return {
    ...jest.requireActual('react-dom'),
    createPortal: (element: React.ReactNode) => element
  };
});

// Mock Lucide icon
jest.mock('lucide-react', () => ({
  X: () => <div data-testid='close-icon'>✕</div>
}));

// Mock Spinner component
jest.mock('../../Spinner', () => ({
  Spinner: () => <div data-testid='spinner'>Loading...</div>
}));

// Set up to handle custom events
const mockDispatchEvent = jest.fn();
Object.defineProperty(window, 'dispatchEvent', {
  writable: true,
  value: mockDispatchEvent
});

describe('Toast Component', () => {
  // Setup mock timers for animations and auto-dismiss
  beforeEach(() => {
    jest.useFakeTimers();
    mockDispatchEvent.mockClear();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  // Test basic rendering with required props
  test('renders toast with basic content', () => {
    const removeToast = jest.fn();

    render(<Toast id='test-toast' removeToast={removeToast} title='Test Title' message='Test message content' />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test message content')).toBeInTheDocument();
  });

  // Test different kinds of toasts (with icons)
  test('renders different kinds of toasts with appropriate icons', () => {
    const removeToast = jest.fn();
    const { rerender } = render(
      <Toast id='test-toast' removeToast={removeToast} kind='generic' message='Generic toast' />
    );

    // Generic toast should not have an icon
    expect(screen.queryByText('Generic toast')).toBeInTheDocument();
    expect(screen.queryByTestId('toast-icon')).not.toBeInTheDocument();

    // Test information toast
    rerender(<Toast id='test-toast' removeToast={removeToast} kind='information' message='Info toast' />);

    expect(screen.queryByText('Info toast')).toBeInTheDocument();
    expect(screen.getByRole('presentation').querySelector('.toast-icon svg')).toBeInTheDocument();

    // Test success toast
    rerender(<Toast id='test-toast' removeToast={removeToast} kind='affirmative' message='Success toast' />);

    expect(screen.queryByText('Success toast')).toBeInTheDocument();
    expect(screen.getByRole('presentation').querySelector('.toast-icon svg')).toBeInTheDocument();

    // Test warning toast
    rerender(<Toast id='test-toast' removeToast={removeToast} kind='cautionary' message='Warning toast' />);

    expect(screen.queryByText('Warning toast')).toBeInTheDocument();
    expect(screen.getByRole('presentation').querySelector('.toast-icon svg')).toBeInTheDocument();

    // Test error toast
    rerender(<Toast id='test-toast' removeToast={removeToast} kind='adverse' message='Error toast' />);

    expect(screen.queryByText('Error toast')).toBeInTheDocument();
    expect(screen.getByRole('presentation').querySelector('.toast-icon svg')).toBeInTheDocument();
  });

  // Test pending state with spinner
  test('renders spinner in pending state', () => {
    const removeToast = jest.fn();

    render(<Toast id='test-toast' removeToast={removeToast} message='Loading...' pending={true} />);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(screen.queryByTestId('close-icon')).not.toBeInTheDocument(); // Close button should be hidden during pending
  });

  // Test dismiss button
  test('handles dismiss button click', () => {
    const removeToast = jest.fn();

    render(<Toast id='test-toast' removeToast={removeToast} message='Click to dismiss' />);

    const closeButton = screen.getByTestId('close-icon').closest('button');
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton!);

    // Wait for animation timeout
    act(() => {
      jest.advanceTimersByTime(250);
    });

    expect(removeToast).toHaveBeenCalledWith('test-toast');
  });

  // Test auto-dismiss functionality
  test('auto dismisses after duration', () => {
    const removeToast = jest.fn();
    const onDismissed = jest.fn();

    render(
      <Toast
        id='test-toast'
        removeToast={removeToast}
        message='Auto dismiss'
        autoDismiss={true}
        duration={3000}
        pauseOnHover={false} // To simplify test
        onDismissed={onDismissed}
      />
    );

    // Auto dismiss should trigger after duration
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    // Wait for animation timeout
    act(() => {
      jest.advanceTimersByTime(250);
    });

    expect(removeToast).toHaveBeenCalledWith('test-toast');
    expect(onDismissed).toHaveBeenCalled();
  });

  // Test pause on hover functionality
  test('pauses auto-dismiss on hover', () => {
    const removeToast = jest.fn();

    render(
      <Toast
        id='test-toast'
        removeToast={removeToast}
        message='Hover to pause'
        autoDismiss={true}
        duration={3000}
        pauseOnHover={true}
      />
    );

    const toast = screen.getByText('Hover to pause').closest('.toast');

    // Simulate hovering over toast
    fireEvent.mouseEnter(toast!);

    // Auto dismiss should not trigger while hovering
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(removeToast).not.toHaveBeenCalled();

    // Move mouse out and auto dismiss should resume
    fireEvent.mouseLeave(toast!);

    // Auto dismiss should trigger after remaining duration
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    // Wait for animation timeout
    act(() => {
      jest.advanceTimersByTime(250);
    });

    expect(removeToast).toHaveBeenCalledWith('test-toast');
  });

  // Test progress bar
  test('renders progress bar when specified', () => {
    const removeToast = jest.fn();

    render(
      <Toast
        id='test-toast'
        removeToast={removeToast}
        message='With progress'
        autoDismiss={true}
        duration={5000}
        progressBar={true}
      />
    );

    const progressBar = screen.getByRole('presentation').querySelector('.toast-progress-bar');
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveStyle('animation-duration: 5000ms');
  });

  // Test custom action
  test('renders custom action', () => {
    const removeToast = jest.fn();
    const handleAction = jest.fn();

    render(
      <Toast
        id='test-toast'
        removeToast={removeToast}
        message='With action'
        action={<button onClick={handleAction}>Action</button>}
      />
    );

    const actionButton = screen.getByText('Action');
    expect(actionButton).toBeInTheDocument();

    fireEvent.click(actionButton);
    expect(handleAction).toHaveBeenCalled();
  });

  // Test compact height
  test('renders in compact mode', () => {
    const removeToast = jest.fn();

    render(
      <Toast
        id='test-toast'
        removeToast={removeToast}
        title='Title'
        message='Compact message'
        action={<button>Action</button>}
        height='compact'
      />
    );

    expect(screen.getByRole('presentation')).toHaveClass('height-compact');
    expect(screen.queryByText('Title')).not.toBeInTheDocument(); // Title shouldn't be visible in compact mode

    // Action should be in the action section in compact mode
    const actionSection = screen.getByRole('presentation').querySelector('.action-section');
    expect(actionSection?.querySelector('button')).toBeInTheDocument();
  });

  // Test emphasis
  test('applies correct emphasis class', () => {
    const removeToast = jest.fn();
    const { rerender } = render(
      <Toast id='test-toast' removeToast={removeToast} message='Normal emphasis' emphasis='normal' />
    );

    expect(screen.getByRole('presentation')).toHaveClass('emphasis-normal');

    rerender(<Toast id='test-toast' removeToast={removeToast} message='High emphasis' emphasis='high' />);

    expect(screen.getByRole('presentation')).toHaveClass('emphasis-high');
  });
});

describe('toast Function', () => {
  beforeEach(() => {
    mockDispatchEvent.mockClear();
  });

  test('creates toast with correct event details', () => {
    const myToast = toast({
      kind: 'affirmative',
      position: 'bottom-left',
      message: 'Task completed!'
    });

    // Check detail has been created with correct properties
    const detail = myToast.getDetail();
    expect(detail.kind).toBe('affirmative');
    expect(detail.position).toBe('bottom-left');
    expect(detail.message).toBe('Task completed!');
    expect(detail.id).toBeDefined();

    // Toast shouldn't be shown until start() is called
    expect(mockDispatchEvent).not.toHaveBeenCalled();
  });

  test('dispatches add event when start is called', () => {
    const myToast = toast({ message: 'Starting toast' });
    myToast.start();

    expect(mockDispatchEvent).toHaveBeenCalledTimes(1);
    const event = mockDispatchEvent.mock.calls[0][0];
    expect(event.type).toBe('parity-add-toast');
    expect(event.detail.message).toBe('Starting toast');
  });

  test('dispatches update event when update is called', () => {
    const myToast = toast({ message: 'Original message' });
    myToast.update({ message: 'Updated message' });

    expect(mockDispatchEvent).toHaveBeenCalledTimes(1);
    const event = mockDispatchEvent.mock.calls[0][0];
    expect(event.type).toBe('parity-update-toast');
    expect(event.detail.message).toBe('Updated message');
  });

  test('dispatches remove event when stop is called', () => {
    const myToast = toast({ message: 'Stopping toast' });
    myToast.stop();

    expect(mockDispatchEvent).toHaveBeenCalledTimes(1);
    const event = mockDispatchEvent.mock.calls[0][0];
    expect(event.type).toBe('parity-remove-toast');
    expect(event.detail.message).toBe('Stopping toast');
  });

  test('uses default values when not specified', () => {
    const myToast = toast({ message: 'Simple toast' });
    const detail = myToast.getDetail();

    expect(detail.kind).toBe('generic'); // Default kind
    expect(detail.position).toBe('top-right'); // Default position
  });
});

describe('ToastContainer Component', () => {
  let originalCreatePortal: any;

  beforeAll(() => {
    originalCreatePortal = ReactDOM.createPortal;
    // @ts-ignore - overriding for testing purposes
    ReactDOM.createPortal = (element: React.ReactNode) => element;
  });

  afterAll(() => {
    // @ts-ignore - restore original implementation
    ReactDOM.createPortal = originalCreatePortal;
  });

  beforeEach(() => {
    jest.spyOn(window, 'addEventListener');
    jest.spyOn(window, 'removeEventListener');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('registers event listeners on mount', () => {
    render(<ToastContainer />);

    expect(window.addEventListener).toHaveBeenCalledWith('parity-add-toast', expect.any(Function));
    expect(window.addEventListener).toHaveBeenCalledWith('parity-remove-toast', expect.any(Function));
    expect(window.addEventListener).toHaveBeenCalledWith('parity-update-toast', expect.any(Function));
  });

  test('removes event listeners on unmount', () => {
    const { unmount } = render(<ToastContainer />);
    unmount();

    expect(window.removeEventListener).toHaveBeenCalledWith('parity-add-toast', expect.any(Function));
    expect(window.removeEventListener).toHaveBeenCalledWith('parity-remove-toast', expect.any(Function));
    expect(window.removeEventListener).toHaveBeenCalledWith('parity-update-toast', expect.any(Function));
  });

  test('renders toast containers for different positions', () => {
    // Mock implementation to simulate toast events
    const mockAddEventListener = jest.fn((event, callback) => {
      if (event === 'parity-add-toast') {
        // Simulate four toasts at different positions
        callback({
          detail: { id: '1', message: 'Top right toast', position: 'top-right' }
        });
        callback({
          detail: { id: '2', message: 'Top center toast', position: 'top-center' }
        });
        callback({
          detail: { id: '3', message: 'Bottom right toast', position: 'bottom-right' }
        });
        callback({
          detail: { id: '4', message: 'Bottom center toast', position: 'bottom-center' }
        });
      }
    });

    window.addEventListener = mockAddEventListener;

    render(<ToastContainer />);

    // Should render containers for all positions that have toasts
    expect(screen.getByText('Top right toast')).toBeInTheDocument();
    expect(screen.getByText('Top center toast')).toBeInTheDocument();
    expect(screen.getByText('Bottom right toast')).toBeInTheDocument();
    expect(screen.getByText('Bottom center toast')).toBeInTheDocument();

    // Check correct container classes
    expect(screen.getByText('Top right toast').closest('.toast-container')).toHaveClass('top-right');
    expect(screen.getByText('Top center toast').closest('.toast-container')).toHaveClass('top-center');
    expect(screen.getByText('Bottom right toast').closest('.toast-container')).toHaveClass('bottom-right');
    expect(screen.getByText('Bottom center toast').closest('.toast-container')).toHaveClass('bottom-center');
  });

  test('limits number of toasts when limit prop is provided', () => {
    // Mock implementation to simulate toast events
    const mockAddEventListener = jest.fn((event, callback) => {
      if (event === 'parity-add-toast') {
        // Simulate three toasts
        callback({ detail: { id: '1', message: 'Toast 1', position: 'top-right' } });
        callback({ detail: { id: '2', message: 'Toast 2', position: 'top-right' } });
        callback({ detail: { id: '3', message: 'Toast 3', position: 'top-right' } });
      }
    });

    window.addEventListener = mockAddEventListener;

    render(<ToastContainer limit={2} stacked={false} />);

    // With limit=2 and stacked=false, only the last 2 toasts should be visible
    expect(screen.queryByText('Toast 1')).not.toBeInTheDocument();
    expect(screen.getByText('Toast 2')).toBeInTheDocument();
    expect(screen.getByText('Toast 3')).toBeInTheDocument();
  });

  test('sorts toasts by importance when sortImportance is true', () => {
    // Mock implementation to simulate toast events
    const mockAddEventListener = jest.fn((event, callback) => {
      if (event === 'parity-add-toast') {
        // Simulate three toasts with different importance
        callback({
          detail: { id: '1', message: 'Low importance', importance: 0, position: 'top-right' }
        });
        callback({
          detail: { id: '2', message: 'High importance', importance: 2, position: 'top-right' }
        });
        callback({
          detail: { id: '3', message: 'Medium importance', importance: 1, position: 'top-right' }
        });
      }
    });

    window.addEventListener = mockAddEventListener;

    render(<ToastContainer sortImportance={true} />);

    // Toasts should be rendered in order of increasing importance
    const toastElements = screen.getAllByRole('presentation');
    expect(toastElements[0]).toHaveTextContent('Low importance');
    expect(toastElements[1]).toHaveTextContent('Medium importance');
    expect(toastElements[2]).toHaveTextContent('High importance');
  });
});
