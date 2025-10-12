import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Textarea } from './index';

describe('Textarea Component', () => {
  describe('Rendering', () => {
    it('renders correctly', () => {
      const { container } = render(<Textarea />);
      expect(container.querySelector('.par-textarea')).toBeInTheDocument();
    });

    it('renders with placeholder', () => {
      render(<Textarea placeholder="Enter text..." />);
      expect(screen.getByPlaceholderText('Enter text...')).toBeInTheDocument();
    });

    it('renders with default rows', () => {
      const { container } = render(<Textarea />);
      expect(container.querySelector('textarea')).toHaveAttribute('rows', '2');
    });

    it('renders with custom rows', () => {
      const { container } = render(<Textarea rows={5} />);
      expect(container.querySelector('textarea')).toHaveAttribute('rows', '5');
    });
  });

  describe('Theme variants', () => {
    it('applies default theme', () => {
      const { container } = render(<Textarea />);
      expect(container.querySelector('.par-textarea')).toHaveClass('default');
    });

    it('applies alternative theme', () => {
      const { container } = render(<Textarea theme="alternative" />);
      expect(container.querySelector('.par-textarea')).toHaveClass('alternative');
    });
  });

  describe('Input interactions', () => {
    it('handles text input', async () => {
      const { container } = render(<Textarea />);
      const textarea = container.querySelector('textarea') as HTMLTextAreaElement;

      await userEvent.type(textarea, 'Hello world');
      expect(textarea).toHaveValue('Hello world');
    });

    it('calls onChange when value changes', async () => {
      const handleChange = jest.fn();
      const { container } = render(<Textarea onChange={handleChange} />);

      await userEvent.type(container.querySelector('textarea') as HTMLTextAreaElement, 'a');
      expect(handleChange).toHaveBeenCalled();
    });

    it('controlled value', () => {
      const { container } = render(<Textarea value="Controlled text" onChange={() => {}} />);
      expect(container.querySelector('textarea')).toHaveValue('Controlled text');
    });

    it('uncontrolled defaultValue', () => {
      const { container } = render(<Textarea defaultValue="Default text" />);
      expect(container.querySelector('textarea')).toHaveValue('Default text');
    });
  });

  describe('MaxLength', () => {
    it('shows character count when maxLength is set', () => {
      const { container } = render(<Textarea maxLength={100} />);
      expect(container.querySelector('.textarea-footer-count')).toBeInTheDocument();
      expect(screen.getByText('0/100')).toBeInTheDocument();
    });

    it('updates character count on input', async () => {
      const { container } = render(<Textarea maxLength={100} />);
      const textarea = container.querySelector('textarea') as HTMLTextAreaElement;

      await userEvent.type(textarea, 'Hello');
      expect(screen.getByText('5/100')).toBeInTheDocument();
    });

    it('prevents input beyond maxLength', async () => {
      const { container } = render(<Textarea maxLength={5} />);
      const textarea = container.querySelector('textarea') as HTMLTextAreaElement;

      await userEvent.type(textarea, 'Hello World');
      expect(textarea).toHaveValue('Hello');
    });
  });

  describe('Clearable', () => {
    it('shows clear button when isClearable and has value', async () => {
      const { container } = render(<Textarea isClearable />);
      const textarea = container.querySelector('textarea') as HTMLTextAreaElement;

      await userEvent.type(textarea, 'Text');
      expect(container.querySelector('.textarea-clear-btn')).toBeInTheDocument();
    });

    it('does not show clear button when empty', () => {
      const { container } = render(<Textarea isClearable />);
      expect(container.querySelector('.textarea-clear-btn')).not.toBeInTheDocument();
    });

    it('clears value on button click', async () => {
      const { container } = render(<Textarea isClearable />);
      const textarea = container.querySelector('textarea') as HTMLTextAreaElement;

      await userEvent.type(textarea, 'Text to clear');
      const clearBtn = container.querySelector('.textarea-clear-btn') as HTMLButtonElement;
      await userEvent.click(clearBtn);

      expect(textarea).toHaveValue('');
    });

    it('calls onChange when cleared', async () => {
      const handleChange = jest.fn();
      const { container } = render(<Textarea isClearable onChange={handleChange} />);

      await userEvent.type(container.querySelector('textarea') as HTMLTextAreaElement, 'Text');
      await userEvent.click(container.querySelector('.textarea-clear-btn') as HTMLButtonElement);

      expect(handleChange).toHaveBeenLastCalledWith(expect.objectContaining({ target: { value: '' } }));
    });

    it('renders custom clear button text', async () => {
      const { container } = render(<Textarea isClearable clearBtnText="Remove" />);

      await userEvent.type(container.querySelector('textarea') as HTMLTextAreaElement, 'Text');
      expect(screen.getByText('Remove')).toBeInTheDocument();
    });
  });

  describe('Error state', () => {
    it('applies error class when isError', () => {
      const { container } = render(<Textarea isError />);
      expect(container.querySelector('.par-textarea')).toHaveClass('error-state');
    });

    it('shows error message', () => {
      render(<Textarea isError errorMessage="This field is required" />);
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('does not show error message when isError is false', () => {
      render(<Textarea errorMessage="Error message" />);
      expect(screen.queryByText('Error message')).not.toBeInTheDocument();
    });
  });

  describe('States', () => {
    it('can be disabled', () => {
      const { container } = render(<Textarea disabled />);
      expect(container.querySelector('textarea')).toBeDisabled();
    });

    it('can be readOnly', () => {
      const { container } = render(<Textarea readOnly />);
      expect(container.querySelector('textarea')).toHaveAttribute('readOnly');
    });

    it('does not show clear button when disabled', async () => {
      const { container } = render(<Textarea isClearable disabled />);

      await userEvent.type(container.querySelector('textarea') as HTMLTextAreaElement, 'Text');
      expect(container.querySelector('.textarea-clear-btn')).not.toBeInTheDocument();
    });

    it('does not show clear button when readOnly', async () => {
      const { container } = render(<Textarea isClearable readOnly value="Text" onChange={() => {}} />);
      expect(container.querySelector('.textarea-clear-btn')).not.toBeInTheDocument();
    });
  });

  describe('Footer', () => {
    it('shows footer when maxLength is set', () => {
      const { container } = render(<Textarea maxLength={100} />);
      expect(container.querySelector('.par-textarea-footer')).toBeInTheDocument();
    });

    it('shows footer when isClearable and not disabled', async () => {
      const { container } = render(<Textarea isClearable />);

      await userEvent.type(container.querySelector('textarea') as HTMLTextAreaElement, 'Text');
      expect(container.querySelector('.par-textarea-footer')).toBeInTheDocument();
    });

    it('does not show footer when disabled', () => {
      const { container } = render(<Textarea maxLength={100} disabled />);
      expect(container.querySelector('.par-textarea-footer')).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('forwards ref correctly', () => {
      const ref = jest.fn();
      render(<Textarea ref={ref} />);
      expect(ref).toHaveBeenCalled();
    });

    it('applies custom className', () => {
      const { container } = render(<Textarea className="custom-textarea" />);
      expect(container.querySelector('.par-textarea')).toHaveClass('custom-textarea');
    });

    it('spreads additional props', () => {
      const { container } = render(<Textarea data-testid="textarea" aria-label="Description" />);
      const textarea = container.querySelector('[data-testid="textarea"]');
      expect(textarea).toHaveAttribute('aria-label', 'Description');
    });
  });
});
