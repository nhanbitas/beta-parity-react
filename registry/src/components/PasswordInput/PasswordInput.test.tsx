import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PasswordInput } from './index';

describe('PasswordInput Component', () => {
  describe('Rendering', () => {
    it('renders correctly', () => {
      render(<PasswordInput />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('has type="password" by default', () => {
      render(<PasswordInput />);
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'password');
    });

    it('renders eye toggle button', () => {
      const { container } = render(<PasswordInput />);
      expect(container.querySelector('.square-icon')).toBeInTheDocument();
    });

    it('renders with placeholder', () => {
      render(<PasswordInput placeholder="Enter password" />);
      expect(screen.getByPlaceholderText('Enter password')).toBeInTheDocument();
    });
  });

  describe('Show/Hide password', () => {
    it('toggles password visibility on button click', async () => {
      const { container } = render(<PasswordInput />);
      const input = screen.getByRole('textbox');
      const toggleButton = container.querySelector('.square-icon') as HTMLButtonElement;

      expect(input).toHaveAttribute('type', 'password');

      await userEvent.click(toggleButton);
      expect(input).toHaveAttribute('type', 'text');

      await userEvent.click(toggleButton);
      expect(input).toHaveAttribute('type', 'password');
    });

    it('starts with password visible when defaultHidden is false', () => {
      render(<PasswordInput defaultHidden={false} />);
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
    });

    it('starts with password hidden when defaultHidden is true', () => {
      render(<PasswordInput defaultHidden={true} />);
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'password');
    });

    it('applies "showed" class when password is visible', async () => {
      const { container } = render(<PasswordInput />);
      const toggleButton = container.querySelector('.square-icon') as HTMLButtonElement;

      await userEvent.click(toggleButton);

      expect(container.querySelector('.showed')).toBeInTheDocument();
    });
  });

  describe('Input interactions', () => {
    it('handles password input', async () => {
      render(<PasswordInput />);
      const input = screen.getByRole('textbox');

      await userEvent.type(input, 'SecurePassword123');
      expect(input).toHaveValue('SecurePassword123');
    });

    it('calls onChange when value changes', async () => {
      const handleChange = jest.fn();
      render(<PasswordInput onChange={handleChange} />);

      await userEvent.type(screen.getByRole('textbox'), 'p');
      expect(handleChange).toHaveBeenCalled();
    });
  });

  describe('States', () => {
    it('can be disabled', () => {
      render(<PasswordInput disabled />);
      expect(screen.getByRole('textbox')).toBeDisabled();
    });

    it('disables toggle button when disabled', () => {
      const { container } = render(<PasswordInput disabled />);
      const toggleButton = container.querySelector('.square-icon') as HTMLButtonElement;
      expect(toggleButton).toBeDisabled();
    });
  });

  describe('Color variants', () => {
    it('applies neutral color by default', async () => {
      const { container } = render(<PasswordInput />);
      const toggleButton = container.querySelector('.square-icon') as HTMLButtonElement;

      await userEvent.click(toggleButton);

      expect(container.querySelector('.btn.neutral')).toBeInTheDocument();
    });

    it('applies accent color when specified', async () => {
      const { container } = render(<PasswordInput color="accent" />);
      const toggleButton = container.querySelector('.square-icon') as HTMLButtonElement;

      await userEvent.click(toggleButton);

      expect(container.querySelector('.btn.accent')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('forwards ref correctly', () => {
      const ref = jest.fn();
      render(<PasswordInput ref={ref} />);
      expect(ref).toHaveBeenCalled();
    });

    it('applies custom className', () => {
      render(<PasswordInput className="custom-password" />);
      expect(screen.getByRole('textbox')).toHaveClass('custom-password');
    });
  });
});
