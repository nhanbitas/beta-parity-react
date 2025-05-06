import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FileItem } from '../index';

// Mock the Lucide icons
jest.mock('lucide-react', () => ({
  Check: () => <span data-testid='check-icon'>✓</span>,
  Minus: () => <span data-testid='minus-icon'>−</span>,
  RefreshCw: () => <span data-testid='refresh-icon'>↻</span>,
  Trash2: () => <span data-testid='trash-icon'>🗑️</span>
}));

// Mock the Spinner component
jest.mock('../../Spinner', () => ({
  Spinner: ({ size, variant }) => (
    <span data-testid='spinner' data-size={size} data-variant={variant}>
      ⟳
    </span>
  )
}));

describe('FileItem Component', () => {
  test('renders with default props', () => {
    render(<FileItem data-testid='file-item' />);

    const fileItem = screen.getByTestId('file-item');
    expect(fileItem).toBeInTheDocument();
    expect(fileItem).toHaveClass('file-item');
    expect(fileItem).toHaveClass('completed');

    // Default filename should be "Choose file"
    expect(screen.getByText('Choose file')).toBeInTheDocument();

    // Default file size should be "0.00 B"
    expect(screen.getByText('0.00 B')).toBeInTheDocument();
  });

  test('renders with custom filename and filesize', () => {
    render(
      <FileItem
        fileName='document.pdf'
        fileSize={1024 * 1024} // 1 MB
        data-testid='file-item'
      />
    );

    // Check that the filename is rendered correctly
    expect(screen.getByText('.pdf')).toBeInTheDocument();

    // Check that the filesize is rendered correctly (1 MB)
    expect(screen.getByText('1.00 MB')).toBeInTheDocument();
  });

  test('handles filename formatting with extension', () => {
    render(<FileItem fileName='very-long-document-name.pdf' />);

    // Should show the file extension correctly
    expect(screen.getByText('.pdf')).toBeInTheDocument();

    // Should have prefix and suffix for the filename
    const nameElement = screen.getByText('very-long-document-name.pdf', { exact: false });
    expect(nameElement).toBeInTheDocument();

    // Should have the expected classes for each part
    const container = nameElement.closest('.file-item-name');
    expect(container?.querySelector('.file-item-name-prefix')).toBeInTheDocument();
    expect(container?.querySelector('.file-item-name-suffix')).toBeInTheDocument();
    expect(container?.querySelector('.file-item-name-type')).toBeInTheDocument();
  });

  test('handles filename without extension', () => {
    render(<FileItem fileName='README' />);

    // The entire string should be treated as a single name with no formatting
    expect(screen.getByText('README')).toBeInTheDocument();
    expect(screen.queryByText('.', { exact: false })).not.toBeInTheDocument();
  });

  test('renders in loading state with progress bar', () => {
    render(<FileItem loading={45} data-testid='file-item' />);

    const fileItem = screen.getByTestId('file-item');
    expect(fileItem).toHaveClass('loading');

    // Spinner should be visible
    expect(screen.getByTestId('spinner')).toBeInTheDocument();

    // Progress bar should be present
    const progressTrack = screen.getByClassName('file-item-progress-track');
    expect(progressTrack).toBeInTheDocument();

    // Progress thumb should have correct width
    const progressThumb = screen.getByClassName('file-item-progress-thumb');
    expect(progressThumb).toHaveStyle('width: 45%');
  });

  test('renders in error state with retry and remove buttons', () => {
    render(<FileItem status='error' data-testid='file-item' />);

    const fileItem = screen.getByTestId('file-item');
    expect(fileItem).toHaveClass('error');

    // Error icon should be visible
    expect(screen.getByTestId('minus-icon')).toBeInTheDocument();

    // Action buttons should be present
    const retryButton = screen.getByText('Retry').closest('button');
    expect(retryButton).toBeInTheDocument();
    expect(retryButton).toContainElement(screen.getByTestId('refresh-icon'));

    const removeButton = screen.getByText('Remove').closest('button');
    expect(removeButton).toBeInTheDocument();
    expect(removeButton).toContainElement(screen.getByTestId('trash-icon'));
  });

  test('renders in success state with check icon', () => {
    render(<FileItem status='success' data-testid='file-item' />);

    const fileItem = screen.getByTestId('file-item');
    expect(fileItem).toHaveClass('success');

    // Success icon should be visible
    expect(screen.getByTestId('check-icon')).toBeInTheDocument();
  });

  test('renders in completed state with remove button', () => {
    render(<FileItem status='completed' data-testid='file-item' />);

    const fileItem = screen.getByTestId('file-item');
    expect(fileItem).toHaveClass('completed');

    // Remove button should be present
    const removeButton = screen.getByLabelText('Remove file');
    expect(removeButton).toBeInTheDocument();
    expect(removeButton).toContainElement(screen.getByTestId('trash-icon'));
  });

  test('calls onRetry callback when retry button is clicked', () => {
    const handleRetry = jest.fn();
    render(<FileItem status='error' onRetry={handleRetry} />);

    const retryButton = screen.getByText('Retry').closest('button');
    fireEvent.click(retryButton!);

    expect(handleRetry).toHaveBeenCalledTimes(1);
  });

  test('calls onRemove callback when remove button is clicked', () => {
    const handleRemove = jest.fn();

    // Test in completed state (remove button is different from error state)
    render(<FileItem status='completed' onRemove={handleRemove} />);

    const removeButton = screen.getByLabelText('Remove file');
    fireEvent.click(removeButton);

    expect(handleRemove).toHaveBeenCalledTimes(1);
  });

  test('calls onRemove callback when remove button is clicked in error state', () => {
    const handleRemove = jest.fn();

    // Test in error state
    render(<FileItem status='error' onRemove={handleRemove} />);

    const removeButton = screen.getByText('Remove').closest('button');
    fireEvent.click(removeButton!);

    expect(handleRemove).toHaveBeenCalledTimes(1);
  });

  test('disables buttons when disabled prop is true', () => {
    render(<FileItem status='error' disabled data-testid='file-item' />);

    const fileItem = screen.getByTestId('file-item');
    expect(fileItem).toHaveClass('disabled');

    const retryButton = screen.getByText('Retry').closest('button');
    expect(retryButton).toBeDisabled();

    const removeButton = screen.getByText('Remove').closest('button');
    expect(removeButton).toBeDisabled();
  });

  test('disables remove button when disabled prop is true in completed state', () => {
    render(<FileItem status='completed' disabled />);

    const removeButton = screen.getByLabelText('Remove file');
    expect(removeButton).toBeDisabled();
  });

  test('formats file sizes correctly', () => {
    // Test bytes
    const { rerender } = render(<FileItem fileSize={500} />);
    expect(screen.getByText('500.00 B')).toBeInTheDocument();

    // Test kilobytes
    rerender(<FileItem fileSize={1536} />);
    expect(screen.getByText('1.50 KB')).toBeInTheDocument();

    // Test megabytes
    rerender(<FileItem fileSize={1.5 * 1024 * 1024} />);
    expect(screen.getByText('1.50 MB')).toBeInTheDocument();

    // Test gigabytes
    rerender(<FileItem fileSize={2.25 * 1024 * 1024 * 1024} />);
    expect(screen.getByText('2.25 GB')).toBeInTheDocument();
  });

  test('forwards ref to the div element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<FileItem ref={ref} />);

    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
  });

  test('applies custom className', () => {
    render(<FileItem className='custom-file-item' data-testid='file-item' />);

    const fileItem = screen.getByTestId('file-item');
    expect(fileItem).toHaveClass('custom-file-item');
  });
});
