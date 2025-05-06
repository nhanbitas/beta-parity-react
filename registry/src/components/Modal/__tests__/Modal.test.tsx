import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Modal, ModalTrigger, ModalDialog, ModalHeader, ModalBody, ModalFooter } from '../index';

// Mock Portal component for testing
jest.mock('../../Portal', () => ({
  Portal: ({ children }: { children: React.ReactNode }) => <div data-testid='portal-mock'>{children}</div>
}));

// Mock setTimeout and clearTimeout
jest.useFakeTimers();

describe('Modal Component', () => {
  // Test basic rendering
  test('renders modal when isActive is true', () => {
    render(
      <Modal isActive={true}>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalBody>Modal Content</ModalBody>
        <ModalFooter>
          <button>Cancel</button>
          <button>Submit</button>
        </ModalFooter>
      </Modal>
    );

    expect(screen.getByText('Modal Title')).toBeInTheDocument();
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  // Test modal doesn't render when inactive
  test('does not render modal when isActive is false', () => {
    render(
      <Modal isActive={false}>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalBody>Modal Content</ModalBody>
      </Modal>
    );

    expect(screen.queryByText('Modal Title')).not.toBeInTheDocument();
    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });

  // Test modal animation states
  test('applies active class after timeout when isActive changes to true', () => {
    const { rerender } = render(
      <Modal isActive={false}>
        <ModalBody>Modal Content</ModalBody>
      </Modal>
    );

    // Change to active and advance timers
    rerender(
      <Modal isActive={true}>
        <ModalBody>Modal Content</ModalBody>
      </Modal>
    );

    // First it should be displayed but without active class
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
    expect(screen.getByTestId('portal-mock').firstChild).not.toHaveClass('active');

    // After the timeout, it should have active class
    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(screen.getByTestId('portal-mock').firstChild).toHaveClass('active');
  });

  // Test closing animation
  test('removes active class before unmounting when isActive changes to false', () => {
    const { rerender } = render(
      <Modal isActive={true}>
        <ModalBody>Modal Content</ModalBody>
      </Modal>
    );

    // Advance past the initial animation
    act(() => {
      jest.advanceTimersByTime(100);
    });

    // Change to inactive
    rerender(
      <Modal isActive={false}>
        <ModalBody>Modal Content</ModalBody>
      </Modal>
    );

    // Modal should still be in the DOM but without active class
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
    expect(screen.getByTestId('portal-mock').firstChild).not.toHaveClass('active');

    // After timeout, it should be removed
    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });

  // Test different sizes
  test('renders different sizes correctly', () => {
    const sizes = ['small', 'medium', 'large', 'extra-large'];

    for (const size of sizes) {
      const { unmount } = render(
        <Modal isActive={true} size={size as any}>
          <ModalBody>Modal with {size} size</ModalBody>
        </Modal>
      );

      expect(screen.getByTestId('portal-mock').firstChild).toHaveClass(size);
      unmount();
    }
  });

  // Test static modal behavior
  test('adds warning animation when clicking outside a static modal', () => {
    render(
      <Modal isActive={true} isStatic={true}>
        <ModalBody>Static Modal</ModalBody>
      </Modal>
    );

    // Advance past the initial animation
    act(() => {
      jest.advanceTimersByTime(100);
    });

    // Click outside modal dialog
    fireEvent.click(screen.getByTestId('portal-mock').firstChild as HTMLElement);

    // Modal dialog should have warning animation class
    const modalDialog = screen.getByText('Static Modal').closest('.modal-dialog');
    expect(modalDialog).toHaveClass('modal-static-animation');

    // Class should be removed after animation completes
    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(modalDialog).not.toHaveClass('modal-static-animation');

    // Modal should still be visible
    expect(screen.getByText('Static Modal')).toBeInTheDocument();
  });

  // Test non-static modal closing on outside click
  test('closes when clicking outside a non-static modal', () => {
    const onCloseMock = jest.fn();

    render(
      <Modal isActive={true} isStatic={false} onClose={onCloseMock}>
        <ModalBody>Non-Static Modal</ModalBody>
      </Modal>
    );

    // Advance past the initial animation
    act(() => {
      jest.advanceTimersByTime(100);
    });

    // Click outside modal dialog
    fireEvent.click(screen.getByTestId('portal-mock').firstChild as HTMLElement);

    // onClose should be called
    expect(onCloseMock).toHaveBeenCalled();
  });

  // Test onOpen callback
  test('calls onOpen when modal becomes active', () => {
    const onOpenMock = jest.fn();

    const { rerender } = render(
      <Modal isActive={false} onOpen={onOpenMock}>
        <ModalBody>Modal Content</ModalBody>
      </Modal>
    );

    expect(onOpenMock).not.toHaveBeenCalled();

    rerender(
      <Modal isActive={true} onOpen={onOpenMock}>
        <ModalBody>Modal Content</ModalBody>
      </Modal>
    );

    expect(onOpenMock).toHaveBeenCalled();
  });

  // Test forwarded ref
  test('forwards ref to underlying div element', () => {
    const ref = React.createRef<HTMLDivElement>();

    render(
      <Modal isActive={true} ref={ref}>
        <ModalBody>Modal Content</ModalBody>
      </Modal>
    );

    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
    expect(ref.current).toHaveClass('modal');
  });
});

describe('Modal Subcomponents', () => {
  // Test ModalTrigger
  test('renders ModalTrigger correctly', () => {
    const onClick = jest.fn();

    render(
      <ModalTrigger onClick={onClick} className='custom-trigger'>
        Open Modal
      </ModalTrigger>
    );

    const trigger = screen.getByRole('button', { name: 'Open Modal' });
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveClass('modal-trigger');
    expect(trigger).toHaveClass('custom-trigger');

    fireEvent.click(trigger);
    expect(onClick).toHaveBeenCalled();
  });

  // Test ModalDialog
  test('renders ModalDialog correctly', () => {
    render(
      <ModalDialog className='custom-dialog'>
        <div>Dialog Content</div>
      </ModalDialog>
    );

    const dialog = screen.getByText('Dialog Content').parentElement;
    expect(dialog).toHaveClass('modal-dialog');
    expect(dialog).toHaveClass('custom-dialog');
  });

  // Test ModalHeader
  test('renders ModalHeader correctly', () => {
    render(<ModalHeader className='custom-header'>Modal Title</ModalHeader>);

    const header = screen.getByText('Modal Title').parentElement;
    expect(header).toHaveClass('modal-header');
    expect(header).toHaveClass('custom-header');
  });

  // Test ModalBody
  test('renders ModalBody correctly', () => {
    render(<ModalBody className='custom-body'>Modal Content</ModalBody>);

    const body = screen.getByText('Modal Content').parentElement;
    expect(body).toHaveClass('modal-body');
    expect(body).toHaveClass('custom-body');
  });

  // Test ModalFooter
  test('renders ModalFooter correctly', () => {
    render(
      <ModalFooter className='custom-footer'>
        <button>Cancel</button>
        <button>Submit</button>
      </ModalFooter>
    );

    const footer = screen.getByText('Cancel').parentElement?.parentElement;
    expect(footer).toHaveClass('modal-footer');
    expect(footer).toHaveClass('custom-footer');
  });

  // Test forwarded refs for all subcomponents
  test('forwards refs to subcomponents', () => {
    const triggerRef = React.createRef<HTMLButtonElement>();
    const dialogRef = React.createRef<HTMLDivElement>();
    const headerRef = React.createRef<HTMLDivElement>();
    const bodyRef = React.createRef<HTMLDivElement>();
    const footerRef = React.createRef<HTMLDivElement>();

    render(
      <>
        <ModalTrigger ref={triggerRef}>Open Modal</ModalTrigger>
        <ModalDialog ref={dialogRef}>
          <ModalHeader ref={headerRef}>Modal Title</ModalHeader>
          <ModalBody ref={bodyRef}>Modal Content</ModalBody>
          <ModalFooter ref={footerRef}>
            <button>Actions</button>
          </ModalFooter>
        </ModalDialog>
      </>
    );

    expect(triggerRef.current).not.toBeNull();
    expect(triggerRef.current?.tagName).toBe('BUTTON');

    expect(dialogRef.current).not.toBeNull();
    expect(dialogRef.current?.tagName).toBe('DIV');
    expect(dialogRef.current).toHaveClass('modal-dialog');

    expect(headerRef.current).not.toBeNull();
    expect(headerRef.current?.tagName).toBe('DIV');
    expect(headerRef.current).toHaveClass('modal-header');

    expect(bodyRef.current).not.toBeNull();
    expect(bodyRef.current?.tagName).toBe('DIV');
    expect(bodyRef.current).toHaveClass('modal-body');

    expect(footerRef.current).not.toBeNull();
    expect(footerRef.current?.tagName).toBe('DIV');
    expect(footerRef.current).toHaveClass('modal-footer');
  });
});

// Test complete modal interaction flow
describe('Modal Integration', () => {
  test('shows and hides modal with trigger', () => {
    // Create a component that manages modal state
    const TestModalComponent = () => {
      const [isActive, setIsActive] = React.useState(false);
      return (
        <>
          <ModalTrigger onClick={() => setIsActive(true)}>Open Modal</ModalTrigger>
          <Modal isActive={isActive} onClose={() => setIsActive(false)}>
            <ModalHeader>Test Modal</ModalHeader>
            <ModalBody>Modal Content</ModalBody>
            <ModalFooter>
              <button onClick={() => setIsActive(false)}>Close</button>
            </ModalFooter>
          </Modal>
        </>
      );
    };

    render(<TestModalComponent />);

    // Modal should be closed initially
    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();

    // Open the modal
    fireEvent.click(screen.getByText('Open Modal'));

    // Advance past the initial animation
    act(() => {
      jest.advanceTimersByTime(100);
    });

    // Modal should now be visible
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Modal Content')).toBeInTheDocument();

    // Close the modal by clicking the close button
    fireEvent.click(screen.getByText('Close'));

    // Advance past the closing animation
    act(() => {
      jest.advanceTimersByTime(100);
    });

    // Modal should be gone
    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
  });
});
