import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FileInput } from './index';

describe('FileInput Component', () => {
  describe('Rendering', () => {
    it('renders correctly', () => {
      const { container } = render(<FileInput />);
      expect(container.querySelector('.file-input-wrapper')).toBeInTheDocument();
    });

    it('renders with file type', () => {
      const { container } = render(<FileInput />);
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('type', 'file');
    });

    it('renders with default label', () => {
      render(<FileInput />);
      expect(screen.getByText('Choose file')).toBeInTheDocument();
    });

    it('renders with custom label', () => {
      render(<FileInput label="Upload document" />);
      expect(screen.getByText('Upload document')).toBeInTheDocument();
    });

    it('renders upload icon', () => {
      const { container } = render(<FileInput />);
      expect(container.querySelector('.file-input-icon')).toBeInTheDocument();
    });

    it('hides actual input element', () => {
      const { container } = render(<FileInput />);
      const input = container.querySelector('input');
      expect(input).toHaveStyle({ display: 'none' });
    });
  });

  describe('Theme variants', () => {
    it('renders default theme', () => {
      const { container } = render(<FileInput />);
      expect(container.querySelector('.file-input-wrapper')).toHaveClass('default');
    });

    it('renders alternative theme', () => {
      const { container } = render(<FileInput theme="alternative" />);
      expect(container.querySelector('.file-input-wrapper')).toHaveClass('alternative');
    });
  });

  describe('Supported formats', () => {
    it('accepts all formats by default', () => {
      const { container } = render(<FileInput />);
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('accept', '');
    });

    it('accepts specific formats', () => {
      const { container } = render(<FileInput supportedFormats={['image/png', 'image/jpeg']} />);
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('accept', 'image/png,image/jpeg');
    });

    it('accepts multiple format types', () => {
      const { container } = render(<FileInput supportedFormats={['application/pdf', 'text/plain', 'image/*']} />);
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('accept', 'application/pdf,text/plain,image/*');
    });
  });

  describe('Click interaction', () => {
    it('opens file dialog when wrapper is clicked', async () => {
      const { container } = render(<FileInput />);
      const wrapper = container.querySelector('.file-input-wrapper') as HTMLElement;
      const input = container.querySelector('input') as HTMLInputElement;

      const clickSpy = jest.spyOn(input, 'click');

      await userEvent.click(wrapper);
      expect(clickSpy).toHaveBeenCalled();
    });

    it('opens file dialog with Enter key', () => {
      const { container } = render(<FileInput />);
      const wrapper = container.querySelector('.file-input-wrapper') as HTMLElement;
      const input = container.querySelector('input') as HTMLInputElement;

      const clickSpy = jest.spyOn(input, 'click');

      fireEvent.keyDown(wrapper, { key: 'Enter' });
      expect(clickSpy).toHaveBeenCalled();
    });

    it('opens file dialog with Space key', () => {
      const { container } = render(<FileInput />);
      const wrapper = container.querySelector('.file-input-wrapper') as HTMLElement;
      const input = container.querySelector('input') as HTMLInputElement;

      const clickSpy = jest.spyOn(input, 'click');

      fireEvent.keyDown(wrapper, { key: ' ' });
      expect(clickSpy).toHaveBeenCalled();
    });
  });

  describe('Drag and drop', () => {
    it('applies drag-active class on dragOver', () => {
      const { container } = render(<FileInput />);
      const wrapper = container.querySelector('.file-input-wrapper') as HTMLElement;

      fireEvent.dragOver(wrapper);
      expect(wrapper).toHaveClass('drag-active');
    });

    it('removes drag-active class on dragLeave', () => {
      const { container } = render(<FileInput />);
      const wrapper = container.querySelector('.file-input-wrapper') as HTMLElement;

      fireEvent.dragOver(wrapper);
      expect(wrapper).toHaveClass('drag-active');

      fireEvent.dragLeave(wrapper);
      expect(wrapper).not.toHaveClass('drag-active');
    });

    it('removes drag-active class on drop', () => {
      const { container } = render(<FileInput />);
      const wrapper = container.querySelector('.file-input-wrapper') as HTMLElement;

      fireEvent.dragOver(wrapper);
      expect(wrapper).toHaveClass('drag-active');

      const file = new File(['content'], 'test.txt', { type: 'text/plain' });
      fireEvent.drop(wrapper, { dataTransfer: { files: [file] } });

      expect(wrapper).not.toHaveClass('drag-active');
    });

    it('handles file drop', () => {
      const { container } = render(<FileInput />);
      const wrapper = container.querySelector('.file-input-wrapper') as HTMLElement;
      const input = container.querySelector('input') as HTMLInputElement;

      const file = new File(['content'], 'test.txt', { type: 'text/plain' });
      fireEvent.drop(wrapper, { dataTransfer: { files: [file] } });

      expect(input.files).toHaveLength(1);
      expect(input.files?.[0]).toEqual(file);
    });

    it('filters files by supported formats on drop', () => {
      const { container } = render(<FileInput supportedFormats={['image/png']} />);
      const wrapper = container.querySelector('.file-input-wrapper') as HTMLElement;
      const input = container.querySelector('input') as HTMLInputElement;

      const pngFile = new File(['content'], 'test.png', { type: 'image/png' });
      const jpegFile = new File(['content'], 'test.jpg', { type: 'image/jpeg' });

      fireEvent.drop(wrapper, { dataTransfer: { files: [pngFile, jpegFile] } });

      expect(input.files).toHaveLength(1);
      expect(input.files?.[0].type).toBe('image/png');
    });
  });

  describe('Error state', () => {
    it('applies error-state class when isError is true', () => {
      const { container } = render(<FileInput isError />);
      expect(container.querySelector('.file-input-wrapper')).toHaveClass('error-state');
    });

    it('displays error message when isError is true', () => {
      render(<FileInput isError errorMessage="File is required" />);
      expect(screen.getByText('File is required')).toBeInTheDocument();
    });

    it('does not display error message when isError is false', () => {
      const { container } = render(<FileInput isError={false} errorMessage="File is required" />);
      expect(container.querySelector('.input-error-message')).not.toBeInTheDocument();
    });
  });

  describe('Event handlers', () => {
    it('calls onChange when file is selected', async () => {
      const handleChange = jest.fn();
      const { container } = render(<FileInput onChange={handleChange} />);
      const input = container.querySelector('input') as HTMLInputElement;

      const file = new File(['content'], 'test.txt', { type: 'text/plain' });
      await userEvent.upload(input, file);

      expect(handleChange).toHaveBeenCalled();
    });

    it('triggers change event on file drop', () => {
      const handleChange = jest.fn();
      const { container } = render(<FileInput onChange={handleChange} />);
      const wrapper = container.querySelector('.file-input-wrapper') as HTMLElement;

      const file = new File(['content'], 'test.txt', { type: 'text/plain' });
      fireEvent.drop(wrapper, { dataTransfer: { files: [file] } });

      expect(handleChange).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('has role button on wrapper', () => {
      const { container } = render(<FileInput />);
      const wrapper = container.querySelector('.file-input-wrapper');
      expect(wrapper).toHaveAttribute('role', 'button');
    });

    it('has tabIndex 0 for keyboard access', () => {
      const { container } = render(<FileInput />);
      const wrapper = container.querySelector('.file-input-wrapper');
      expect(wrapper).toHaveAttribute('tabIndex', '0');
    });

    it('forwards ref correctly', () => {
      const ref = jest.fn();
      render(<FileInput ref={ref} />);
      expect(ref).toHaveBeenCalled();
    });

    it('applies custom className', () => {
      const { container } = render(<FileInput className="custom-file-input" />);
      expect(container.querySelector('.file-input-wrapper')).toHaveClass('custom-file-input');
    });
  });

  describe('Multiple files', () => {
    it('accepts multiple attribute', () => {
      const { container } = render(<FileInput multiple />);
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('multiple');
    });

    it('handles multiple file drops', () => {
      const { container } = render(<FileInput multiple />);
      const wrapper = container.querySelector('.file-input-wrapper') as HTMLElement;
      const input = container.querySelector('input') as HTMLInputElement;

      const file1 = new File(['content1'], 'test1.txt', { type: 'text/plain' });
      const file2 = new File(['content2'], 'test2.txt', { type: 'text/plain' });

      fireEvent.drop(wrapper, { dataTransfer: { files: [file1, file2] } });

      expect(input.files).toHaveLength(2);
    });
  });

  describe('Name attribute', () => {
    it('accepts name attribute', () => {
      const { container } = render(<FileInput name="document" />);
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('name', 'document');
    });
  });
});
