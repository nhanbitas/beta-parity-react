import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InlineLink } from './index';

describe('InlineLink Component', () => {
  describe('Rendering', () => {
    it('renders correctly', () => {
      render(<InlineLink href="/test">Link</InlineLink>);
      expect(screen.getByText('Link')).toBeInTheDocument();
    });

    it('renders as anchor element', () => {
      const { container } = render(<InlineLink href="/test">Link</InlineLink>);
      expect(container.querySelector('a.inline-link')).toBeInTheDocument();
    });

    it('renders with href', () => {
      render(<InlineLink href="/test">Link</InlineLink>);
      expect(screen.getByText('Link')).toHaveAttribute('href', '/test');
    });

    it('applies default classes', () => {
      const { container } = render(<InlineLink href="/test">Link</InlineLink>);
      const link = container.querySelector('.inline-link');
      expect(link).toHaveClass('standard', 'medium', 'underline-hover');
    });
  });

  describe('Size variants', () => {
    it('renders small size', () => {
      const { container } = render(
        <InlineLink size="sm" href="/test">
          Link
        </InlineLink>
      );
      expect(container.querySelector('.inline-link')).toHaveClass('small');
    });

    it('renders medium size (default)', () => {
      const { container } = render(<InlineLink href="/test">Link</InlineLink>);
      expect(container.querySelector('.inline-link')).toHaveClass('medium');
    });

    it('renders large size', () => {
      const { container } = render(
        <InlineLink size="lg" href="/test">
          Link
        </InlineLink>
      );
      expect(container.querySelector('.inline-link')).toHaveClass('large');
    });
  });

  describe('Color variants', () => {
    it('renders standard color by default', () => {
      const { container } = render(<InlineLink href="/test">Link</InlineLink>);
      expect(container.querySelector('.inline-link')).toHaveClass('standard');
    });

    it('renders neutral color', () => {
      const { container } = render(
        <InlineLink color="neutral" href="/test">
          Link
        </InlineLink>
      );
      expect(container.querySelector('.inline-link')).toHaveClass('neutral');
    });
  });

  describe('Underline variants', () => {
    it('renders hover underline by default', () => {
      const { container } = render(<InlineLink href="/test">Link</InlineLink>);
      expect(container.querySelector('.inline-link')).toHaveClass('underline-hover');
    });

    it('renders always underline', () => {
      const { container } = render(
        <InlineLink underline="always" href="/test">
          Link
        </InlineLink>
      );
      expect(container.querySelector('.inline-link')).toHaveClass('underline-always');
    });

    it('renders no underline', () => {
      const { container } = render(
        <InlineLink underline="none" href="/test">
          Link
        </InlineLink>
      );
      expect(container.querySelector('.inline-link')).toHaveClass('underline-none');
    });
  });

  describe('IconOnly mode', () => {
    it('applies icon-only class', () => {
      const { container } = render(
        <InlineLink iconOnly href="/test">
          <span>Icon</span>
        </InlineLink>
      );
      expect(container.querySelector('.inline-link')).toHaveClass('icon-only');
    });

    it('renders without text wrapper in icon-only mode', () => {
      const { container } = render(
        <InlineLink iconOnly href="/test">
          <span data-testid="icon">★</span>
        </InlineLink>
      );
      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });
  });

  describe('Disabled state', () => {
    it('applies disabled class', () => {
      const { container } = render(
        <InlineLink disabled href="/test">
          Link
        </InlineLink>
      );
      expect(container.querySelector('.inline-link')).toHaveClass('disabled');
    });

    it('has aria-disabled when disabled', () => {
      render(
        <InlineLink disabled href="/test">
          Link
        </InlineLink>
      );
      expect(screen.getByText('Link')).toHaveAttribute('aria-disabled', 'true');
    });

    it('has tabIndex -1 when disabled', () => {
      render(
        <InlineLink disabled href="/test">
          Link
        </InlineLink>
      );
      expect(screen.getByText('Link')).toHaveAttribute('tabIndex', '-1');
    });

    it('removes href when disabled', () => {
      render(
        <InlineLink disabled href="/test">
          Link
        </InlineLink>
      );
      expect(screen.getByText('Link')).not.toHaveAttribute('href');
    });
  });

  describe('AsChild prop', () => {
    it('renders as child element when asChild is true', () => {
      const { container } = render(
        <InlineLink asChild href="/test">
          <button>Custom Button</button>
        </InlineLink>
      );
      expect(container.querySelector('button')).toBeInTheDocument();
      expect(container.querySelector('button')).toHaveClass('inline-link');
    });

    it('merges className with child element', () => {
      const { container } = render(
        <InlineLink asChild className="custom-link" href="/test">
          <button className="custom-button">Button</button>
        </InlineLink>
      );
      const button = container.querySelector('button');
      expect(button).toHaveClass('custom-button', 'inline-link', 'custom-link');
    });

    it('applies accessibility props to child element', () => {
      const { container } = render(
        <InlineLink asChild disabled href="/test">
          <button>Disabled Button</button>
        </InlineLink>
      );
      const button = container.querySelector('button');
      expect(button).toHaveAttribute('aria-disabled', 'true');
      expect(button).toHaveAttribute('tabIndex', '-1');
    });
  });

  describe('Interactions', () => {
    it('can be clicked', async () => {
      const handleClick = jest.fn();
      render(
        <InlineLink href="/test" onClick={handleClick}>
          Link
        </InlineLink>
      );

      await userEvent.click(screen.getByText('Link'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not prevent click when disabled', async () => {
      const handleClick = jest.fn();
      render(
        <InlineLink disabled href="/test" onClick={handleClick}>
          Link
        </InlineLink>
      );

      await userEvent.click(screen.getByText('Link'));
      expect(handleClick).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('has tabIndex 0 by default', () => {
      render(<InlineLink href="/test">Link</InlineLink>);
      expect(screen.getByText('Link')).toHaveAttribute('tabIndex', '0');
    });

    it('forwards ref correctly', () => {
      const ref = jest.fn();
      render(
        <InlineLink ref={ref} href="/test">
          Link
        </InlineLink>
      );
      expect(ref).toHaveBeenCalled();
    });

    it('applies custom className', () => {
      const { container } = render(
        <InlineLink className="custom-link" href="/test">
          Link
        </InlineLink>
      );
      expect(container.querySelector('.inline-link')).toHaveClass('custom-link');
    });

    it('spreads additional props', () => {
      render(
        <InlineLink href="/test" data-testid="link" aria-label="Test Link">
          Link
        </InlineLink>
      );
      const link = screen.getByTestId('link');
      expect(link).toHaveAttribute('aria-label', 'Test Link');
    });
  });
});
