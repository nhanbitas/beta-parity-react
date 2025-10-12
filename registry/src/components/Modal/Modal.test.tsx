import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal, ModalHeader, ModalBody, ModalFooter, ModalTrigger } from './index';

describe('Modal Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  describe('Rendering', () => {
    it('renders when isActive is true', () => {
      render(
        <Modal isActive={true}>
          <div>Modal content</div>
        </Modal>
      );
      expect(screen.getByText('Modal content')).toBeInTheDocument();
    });

    it('does not render when isActive is false', () => {
      render(
        <Modal isActive={false}>
          <div>Modal content</div>
        </Modal>
      );
      expect(screen.queryByText('Modal content')).not.toBeInTheDocument();
    });

    it('renders with modal-dialog wrapper', () => {
      const { container } = render(
        <Modal isActive={true}>
          <div>Content</div>
        </Modal>
      );
      expect(container.querySelector('.modal-dialog')).toBeInTheDocument();
    });

    it('applies default medium size', () => {
      const { container } = render(
        <Modal isActive={true}>
          <div>Content</div>
        </Modal>
      );
      expect(container.querySelector('.modal.medium')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <Modal isActive={true} className="custom-modal">
          <div>Content</div>
        </Modal>
      );
      expect(container.querySelector('.modal.custom-modal')).toBeInTheDocument();
    });
  });

  describe('Size variants', () => {
    it('renders small size', () => {
      const { container } = render(
        <Modal isActive={true} size="small">
          <div>Content</div>
        </Modal>
      );
      expect(container.querySelector('.modal.small')).toBeInTheDocument();
    });

    it('renders medium size', () => {
      const { container } = render(
        <Modal isActive={true} size="medium">
          <div>Content</div>
        </Modal>
      );
      expect(container.querySelector('.modal.medium')).toBeInTheDocument();
    });

    it('renders large size', () => {
      const { container } = render(
        <Modal isActive={true} size="large">
          <div>Content</div>
        </Modal>
      );
      expect(container.querySelector('.modal.large')).toBeInTheDocument();
    });

    it('renders extra-large size', () => {
      const { container } = render(
        <Modal isActive={true} size="extra-large">
          <div>Content</div>
        </Modal>
      );
      expect(container.querySelector('.modal.extra-large')).toBeInTheDocument();
    });
  });

  describe('Opening and closing', () => {
    it('calls onOpen when modal opens', () => {
      const handleOpen = jest.fn();
      render(
        <Modal isActive={true} onOpen={handleOpen}>
          <div>Content</div>
        </Modal>
      );
      expect(handleOpen).toHaveBeenCalledTimes(1);
    });

    it('calls onClose when modal closes', () => {
      const handleClose = jest.fn();
      const { rerender } = render(
        <Modal isActive={true} onClose={handleClose}>
          <div>Content</div>
        </Modal>
      );

      rerender(
        <Modal isActive={false} onClose={handleClose}>
          <div>Content</div>
        </Modal>
      );

      expect(handleClose).toHaveBeenCalled();
    });

    it('adds active class after opening', async () => {
      const { container } = render(
        <Modal isActive={true}>
          <div>Content</div>
        </Modal>
      );

      jest.advanceTimersByTime(100);

      await waitFor(() => {
        expect(container.querySelector('.modal.active')).toBeInTheDocument();
      });
    });

    it('removes modal from DOM after closing animation', async () => {
      const { rerender } = render(
        <Modal isActive={true}>
          <div>Content</div>
        </Modal>
      );

      rerender(
        <Modal isActive={false}>
          <div>Content</div>
        </Modal>
      );

      jest.advanceTimersByTime(100);

      await waitFor(() => {
        expect(screen.queryByText('Content')).not.toBeInTheDocument();
      });
    });
  });

  describe('Backdrop click behavior', () => {
    it('closes modal on backdrop click when not isStatic', async () => {
      const handleClose = jest.fn();
      const { container } = render(
        <Modal isActive={true} onClose={handleClose}>
          <div>Content</div>
        </Modal>
      );

      const modal = container.querySelector('.modal');
      if (modal) {
        await userEvent.click(modal);
      }

      expect(handleClose).toHaveBeenCalled();
    });

    it('does not close on dialog content click', async () => {
      const handleClose = jest.fn();
      render(
        <Modal isActive={true} onClose={handleClose}>
          <div>Content</div>
        </Modal>
      );

      await userEvent.click(screen.getByText('Content'));
      expect(handleClose).not.toHaveBeenCalled();
    });

    it('shows warning animation when clicking backdrop on static modal', async () => {
      const { container } = render(
        <Modal isActive={true} isStatic>
          <div>Content</div>
        </Modal>
      );

      const modal = container.querySelector('.modal');
      if (modal) {
        await userEvent.click(modal);
      }

      await waitFor(() => {
        expect(container.querySelector('.modal-static-animation')).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('forwards ref correctly', () => {
      const ref = jest.fn();
      render(
        <Modal isActive={true} ref={ref}>
          <div>Content</div>
        </Modal>
      );
      expect(ref).toHaveBeenCalled();
    });

    it('spreads additional props', () => {
      const { container } = render(
        <Modal isActive={true} data-testid="custom-modal">
          <div>Content</div>
        </Modal>
      );
      expect(container.querySelector('[data-testid="custom-modal"]')).toBeInTheDocument();
    });
  });
});

describe('ModalHeader Component', () => {
  it('renders correctly', () => {
    render(<ModalHeader>Header Content</ModalHeader>);
    expect(screen.getByText('Header Content')).toBeInTheDocument();
  });

  it('applies modal-header class', () => {
    const { container } = render(<ModalHeader>Header</ModalHeader>);
    expect(container.querySelector('.modal-header')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<ModalHeader className="custom">Header</ModalHeader>);
    expect(container.querySelector('.modal-header.custom')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = jest.fn();
    render(<ModalHeader ref={ref}>Header</ModalHeader>);
    expect(ref).toHaveBeenCalled();
  });
});

describe('ModalBody Component', () => {
  it('renders correctly', () => {
    render(<ModalBody>Body Content</ModalBody>);
    expect(screen.getByText('Body Content')).toBeInTheDocument();
  });

  it('applies modal-body class', () => {
    const { container } = render(<ModalBody>Body</ModalBody>);
    expect(container.querySelector('.modal-body')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<ModalBody className="custom">Body</ModalBody>);
    expect(container.querySelector('.modal-body.custom')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = jest.fn();
    render(<ModalBody ref={ref}>Body</ModalBody>);
    expect(ref).toHaveBeenCalled();
  });
});

describe('ModalFooter Component', () => {
  it('renders correctly', () => {
    render(<ModalFooter>Footer Content</ModalFooter>);
    expect(screen.getByText('Footer Content')).toBeInTheDocument();
  });

  it('applies modal-footer class', () => {
    const { container } = render(<ModalFooter>Footer</ModalFooter>);
    expect(container.querySelector('.modal-footer')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<ModalFooter className="custom">Footer</ModalFooter>);
    expect(container.querySelector('.modal-footer.custom')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = jest.fn();
    render(<ModalFooter ref={ref}>Footer</ModalFooter>);
    expect(ref).toHaveBeenCalled();
  });
});

describe('ModalTrigger Component', () => {
  it('renders as button', () => {
    render(<ModalTrigger>Open Modal</ModalTrigger>);
    expect(screen.getByRole('button', { name: 'Open Modal' })).toBeInTheDocument();
  });

  it('applies modal-trigger class', () => {
    const { container } = render(<ModalTrigger>Trigger</ModalTrigger>);
    expect(container.querySelector('.modal-trigger')).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = jest.fn();
    render(<ModalTrigger onClick={handleClick}>Open</ModalTrigger>);
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('forwards ref', () => {
    const ref = jest.fn();
    render(<ModalTrigger ref={ref}>Trigger</ModalTrigger>);
    expect(ref).toHaveBeenCalled();
  });
});

describe('Modal Integration', () => {
  it('renders full modal structure', () => {
    render(
      <Modal isActive={true}>
        <ModalHeader>Title</ModalHeader>
        <ModalBody>Content</ModalBody>
        <ModalFooter>Actions</ModalFooter>
      </Modal>
    );

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.getByText('Actions')).toBeInTheDocument();
  });
});
