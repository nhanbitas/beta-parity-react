import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EmailInput } from './index';

describe('EmailInput Component', () => {
  describe('Rendering', () => {
    it('renders correctly', () => {
      render(<EmailInput />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('has type="email" when domain is provided', () => {
      render(<EmailInput domain="example.com" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');
    });

    it('has type="text" when no domain', () => {
      render(<EmailInput />);
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
    });

    it('renders with placeholder', () => {
      render(<EmailInput placeholder="Enter email" />);
      expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument();
    });
  });

  describe('Domain selector', () => {
    it('renders domain selector when domain is string', () => {
      const { container } = render(<EmailInput domain="example.com" />);
      expect(container.querySelector('.unit-selector')).toBeInTheDocument();
    });

    it('renders domain selector when domain is array', () => {
      const { container } = render(<EmailInput domain={['example.com', 'test.com']} />);
      const selector = container.querySelector('.unit-selector') as HTMLSelectElement;
      expect(selector).toBeInTheDocument();
      expect(selector.querySelectorAll('option').length).toBe(2);
    });

    it('calls onDomainChange when domain is changed', async () => {
      const handleDomainChange = jest.fn();
      const { container } = render(
        <EmailInput
          domain={['example.com', 'test.com']}
          onDomainChange={handleDomainChange}
        />
      );

      const selector = container.querySelector('.unit-selector') as HTMLSelectElement;
      await userEvent.selectOptions(selector, 'test.com');

      expect(handleDomainChange).toHaveBeenCalledWith('test.com');
    });

    it('controlled domain value', () => {
      const { container } = render(
        <EmailInput
          domain={['example.com', 'test.com']}
          domainValue="test.com"
        />
      );

      const selector = container.querySelector('.unit-selector') as HTMLSelectElement;
      expect(selector).toHaveValue('test.com');
    });

    it('disables domain selector when input is disabled', () => {
      const { container } = render(<EmailInput domain="example.com" disabled />);
      const selector = container.querySelector('.unit-selector') as HTMLSelectElement;
      expect(selector).toBeDisabled();
    });

    it('disables domain selector when input is readOnly', () => {
      const { container } = render(<EmailInput domain="example.com" readOnly />);
      const selector = container.querySelector('.unit-selector') as HTMLSelectElement;
      expect(selector).toBeDisabled();
    });
  });

  describe('Input interactions', () => {
    it('handles text input', async () => {
      render(<EmailInput />);
      const input = screen.getByRole('textbox');

      await userEvent.type(input, 'user@example.com');
      expect(input).toHaveValue('user@example.com');
    });

    it('calls onChange when value changes', async () => {
      const handleChange = jest.fn();
      render(<EmailInput onChange={handleChange} />);

      await userEvent.type(screen.getByRole('textbox'), 'a');
      expect(handleChange).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('forwards ref correctly', () => {
      const ref = jest.fn();
      render(<EmailInput ref={ref} />);
      expect(ref).toHaveBeenCalled();
    });

    it('applies custom className', () => {
      render(<EmailInput className="custom-email" />);
      expect(screen.getByRole('textbox')).toHaveClass('custom-email');
    });
  });
});
