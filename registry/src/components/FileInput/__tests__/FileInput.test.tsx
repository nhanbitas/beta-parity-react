import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FileInput } from '../index';

// Mock the lucide-react Upload icon
jest.mock('lucide-react', () => ({
  Upload: () => <div data-testid='upload-icon' />
}));

describe('FileInput Component', () => {
  test('renders correctly with default props', () => {
    render(<FileInput />);

    // Check that the wrapper is rendered
    const wrapper = screen.getByRole('button');
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveClass('file-input-wrapper');

    // Check that the default label is rendered
    const label = screen.getByText('Choose file');
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass('file-input-text');

    // Check that the upload icon is rendered
    const icon = screen.getByTestId('upload-icon');
    expect(icon).toBeInTheDocument();

    // Check that the input is hidden but present in the DOM
    const input = document.querySelector('input[type="file"]');
    expect(input).toBeInTheDocument();
    expect(input).toHaveStyle({ display: 'none' });
  });

  test('applies custom label', () => {
    render(<FileInput label='Upload your files' />);

    const label = screen.getByText('Upload your files');
    expect(label).toBeInTheDocument();
  });

  test('applies error state and shows error message', () => {
    render(<FileInput isError errorMessage='File is required' />);

    const wrapper = screen.getByRole('button');
    expect(wrapper).toHaveClass('error-state');

    const errorMessage = screen.getByText('File is required');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass('input-error-message');
  });

  test('applies supported formats to the input accept attribute', () => {
    const formats = ['image/jpeg', 'image/png'];
    render(<FileInput supportedFormats={formats} />);

    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    expect(input).toHaveAttribute('accept', formats.join(','));
  });

  test('forwards additional props to input element', () => {
    render(<FileInput multiple name='files' />);

    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    expect(input).toHaveAttribute('multiple');
    expect(input).toHaveAttribute('name', 'files');
  });

  test('clicking the wrapper triggers the file input click', () => {
    render(<FileInput />);

    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const clickSpy = jest.spyOn(input, 'click');

    const wrapper = screen.getByRole('button');
    fireEvent.click(wrapper);

    expect(clickSpy).toHaveBeenCalled();
    clickSpy.mockRestore();
  });

  test('keyboard navigation triggers the file input click', () => {
    render(<FileInput />);

    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const clickSpy = jest.spyOn(input, 'click');

    const wrapper = screen.getByRole('button');

    // Enter key should trigger click
    fireEvent.keyDown(wrapper, { key: 'Enter' });
    expect(clickSpy).toHaveBeenCalledTimes(1);

    // Space key should trigger click
    fireEvent.keyDown(wrapper, { key: ' ' });
    expect(clickSpy).toHaveBeenCalledTimes(2);

    // Other keys should not trigger click
    fireEvent.keyDown(wrapper, { key: 'Tab' });
    expect(clickSpy).toHaveBeenCalledTimes(2);

    clickSpy.mockRestore();
  });

  test('drag events set the correct visual state', () => {
    render(<FileInput />);

    const wrapper = screen.getByRole('button');

    // Drag over should add drag-active class
    fireEvent.dragOver(wrapper);
    expect(wrapper).toHaveClass('drag-active');

    // Drag leave should remove drag-active class
    fireEvent.dragLeave(wrapper);
    expect(wrapper).not.toHaveClass('drag-active');
  });

  test('forwards ref to the input element', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<FileInput ref={ref} />);

    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('INPUT');
    expect(ref.current?.type).toBe('file');
  });

  test('applies custom className to the wrapper', () => {
    render(<FileInput className='custom-class' />);

    const wrapper = screen.getByRole('button');
    expect(wrapper).toHaveClass('custom-class');
  });

  // Testing the drop functionality requires more complex mocking of DataTransfer
  // This is a simplified test that checks if the drop handler prevents default
  test('drop handler prevents default behavior', () => {
    render(<FileInput />);

    const wrapper = screen.getByRole('button');

    const mockEvent = {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
      dataTransfer: {
        files: []
      }
    };

    // TypeScript requires explicit casting here since we're using a mock event
    fireEvent.drop(wrapper, mockEvent as unknown as React.DragEvent);

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(mockEvent.stopPropagation).toHaveBeenCalled();
    expect(wrapper).not.toHaveClass('drag-active');
  });
});
