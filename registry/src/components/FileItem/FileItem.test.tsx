import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FileItem } from './index';

describe('FileItem Component', () => {
  describe('Rendering', () => {
    it('renders correctly', () => {
      const { container } = render(<FileItem />);
      expect(container.querySelector('.file-item')).toBeInTheDocument();
    });

    it('renders with default file name', () => {
      render(<FileItem />);
      expect(screen.getByText(/Choose file/)).toBeInTheDocument();
    });

    it('renders with custom file name', () => {
      render(<FileItem fileName='document.pdf' />);
      expect(screen.getByText(/document/)).toBeInTheDocument();
      expect(screen.getByText(/.pdf/)).toBeInTheDocument();
    });

    it('renders with file size', () => {
      render(<FileItem fileSize={1024} />);
      expect(screen.getByText('1.00 KB')).toBeInTheDocument();
    });

    it('formats large file sizes correctly', () => {
      render(<FileItem fileSize={1048576} />);
      expect(screen.getByText('1.00 MB')).toBeInTheDocument();
    });
  });

  describe('Status states', () => {
    it('renders completed status by default', () => {
      const { container } = render(<FileItem />);
      expect(container.querySelector('.file-item')).toHaveClass('completed');
    });

    it('renders error status', () => {
      const { container } = render(<FileItem status='error' />);
      expect(container.querySelector('.file-item')).toHaveClass('error');
    });

    it('renders success status', () => {
      const { container } = render(<FileItem status='success' />);
      expect(container.querySelector('.file-item')).toHaveClass('success');
    });

    it('shows error actions when status is error', () => {
      render(<FileItem status='error' />);
      expect(screen.getByLabelText('Retry upload')).toBeInTheDocument();
      expect(screen.getByText('Retry')).toBeInTheDocument();
    });

    it('shows success icon when status is success', () => {
      const { container } = render(<FileItem status='success' />);
      expect(container.querySelector('.success-icon')).toBeInTheDocument();
    });

    it('shows error icon when status is error', () => {
      const { container } = render(<FileItem status='error' />);
      expect(container.querySelector('.error-icon')).toBeInTheDocument();
    });
  });

  describe('Loading state', () => {
    it('shows loading state when loading prop is greater than 0', () => {
      const { container } = render(<FileItem loading={50} />);
      expect(container.querySelector('.file-item')).toHaveClass('loading');
    });

    it('shows spinner when loading', () => {
      const { container } = render(<FileItem loading={50} />);
      expect(container.querySelector('.spinner')).toBeInTheDocument();
    });

    it('shows progress bar when loading', () => {
      const { container } = render(<FileItem loading={50} />);
      expect(container.querySelector('.file-item-progress-track')).toBeInTheDocument();
    });

    it('sets correct progress bar width', () => {
      const { container } = render(<FileItem loading={75} />);
      const progressBar = container.querySelector('.file-item-progress-thumb') as HTMLElement;
      expect(progressBar.style.width).toBe('75%');
    });

    it('does not show remove button when loading', () => {
      render(<FileItem loading={50} />);
      expect(screen.queryByLabelText('Remove file')).not.toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('calls onRemove when remove button is clicked', async () => {
      const handleRemove = jest.fn();
      render(<FileItem onRemove={handleRemove} />);

      await userEvent.click(screen.getByLabelText('Remove file'));
      expect(handleRemove).toHaveBeenCalledTimes(1);
    });

    it('calls onRetry when retry button is clicked', async () => {
      const handleRetry = jest.fn();
      render(<FileItem status='error' onRetry={handleRetry} />);

      await userEvent.click(screen.getByLabelText('Retry upload'));
      expect(handleRetry).toHaveBeenCalledTimes(1);
    });

    it('does not call onRemove when disabled', async () => {
      const handleRemove = jest.fn();
      render(<FileItem disabled onRemove={handleRemove} />);

      const removeButton = screen.getByLabelText('Remove file');
      await userEvent.click(removeButton);
      expect(handleRemove).not.toHaveBeenCalled();
    });

    it('does not call onRetry when disabled', async () => {
      const handleRetry = jest.fn();
      render(<FileItem status='error' disabled onRetry={handleRetry} />);

      const retryButton = screen.getByLabelText('Retry upload');
      await userEvent.click(retryButton);
      expect(handleRetry).not.toHaveBeenCalled();
    });
  });

  describe('Disabled state', () => {
    it('applies disabled class when disabled prop is true', () => {
      const { container } = render(<FileItem disabled />);
      expect(container.querySelector('.file-item')).toHaveClass('disabled');
    });

    it('disables remove button when disabled', () => {
      render(<FileItem disabled />);
      expect(screen.getByLabelText('Remove file')).toBeDisabled();
    });

    it('disables retry button when disabled', () => {
      render(<FileItem status='error' disabled />);
      expect(screen.getByLabelText('Retry upload')).toBeDisabled();
    });
  });

  describe('File name formatting', () => {
    it('displays full file name for short names', () => {
      render(<FileItem fileName='file.txt' />);
      expect(screen.getByText(/file/)).toBeInTheDocument();
      expect(screen.getByText(/.txt/)).toBeInTheDocument();
    });

    it('truncates long file names', () => {
      render(<FileItem fileName='very-long-file-name-that-should-be-truncated.pdf' />);
      expect(screen.getByText(/.pdf/)).toBeInTheDocument();
    });

    it('handles file names without extension', () => {
      render(<FileItem fileName='noextension' />);
      expect(screen.getByText('noextension')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('forwards ref correctly', () => {
      const ref = jest.fn();
      render(<FileItem ref={ref} />);
      expect(ref).toHaveBeenCalled();
    });

    it('applies custom className', () => {
      const { container } = render(<FileItem className='custom-file-item' />);
      expect(container.querySelector('.file-item')).toHaveClass('custom-file-item');
    });

    it('has proper aria-label for retry button', () => {
      render(<FileItem status='error' />);
      expect(screen.getByLabelText('Retry upload')).toBeInTheDocument();
    });

    it('has proper aria-label for remove button', () => {
      render(<FileItem />);
      expect(screen.getByLabelText('Remove file')).toBeInTheDocument();
    });
  });
});
