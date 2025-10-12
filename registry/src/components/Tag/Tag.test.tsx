import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tag } from './index';

describe('Tag Component', () => {
  describe('Rendering', () => {
    it('renders with label', () => {
      render(<Tag label="Feature" />);
      expect(screen.getByText('Feature')).toBeInTheDocument();
    });

    it('renders with children', () => {
      render(<Tag>Tag content</Tag>);
      expect(screen.getByText('Tag content')).toBeInTheDocument();
    });

    it('renders with icon', () => {
      render(<Tag icon={<span data-testid="icon">★</span>} label="Star" />);
      expect(screen.getByTestId('icon')).toBeInTheDocument();
      expect(screen.getByText('Star')).toBeInTheDocument();
    });

    it('renders remove button', () => {
      const { container } = render(<Tag label="Test" value="test" />);
      expect(container.querySelector('.tag-close-btn')).toBeInTheDocument();
    });

    it('applies default classes', () => {
      const { container } = render(<Tag label="Test" />);
      const tag = container.querySelector('.tag');
      expect(tag).toHaveClass('outlined', 'medium', 'neutral');
    });
  });

  describe('Size variants', () => {
    it('renders small size', () => {
      const { container } = render(<Tag size="sm" label="SM" />);
      expect(container.querySelector('.tag')).toHaveClass('small');
    });

    it('renders medium size (default)', () => {
      const { container } = render(<Tag label="MD" />);
      expect(container.querySelector('.tag')).toHaveClass('medium');
    });

    it('renders large size', () => {
      const { container } = render(<Tag size="lg" label="LG" />);
      expect(container.querySelector('.tag')).toHaveClass('large');
    });
  });

  describe('Color variants', () => {
    it('renders neutral color by default', () => {
      const { container } = render(<Tag label="Test" />);
      expect(container.querySelector('.tag')).toHaveClass('neutral');
    });

    it('renders accent color', () => {
      const { container } = render(<Tag color="accent" label="Test" />);
      expect(container.querySelector('.tag')).toHaveClass('accent');
    });
  });

  describe('Kind variants', () => {
    it('renders outlined kind by default', () => {
      const { container } = render(<Tag label="Test" />);
      expect(container.querySelector('.tag')).toHaveClass('outlined');
    });

    it('renders glass kind', () => {
      const { container } = render(<Tag kind="glass" label="Test" />);
      expect(container.querySelector('.tag')).toHaveClass('glass');
    });
  });

  describe('Interactions', () => {
    it('calls onRemove when remove button is clicked', async () => {
      const handleRemove = jest.fn();
      const { container } = render(<Tag label="Test" value="test" onRemove={handleRemove} />);

      const removeButton = container.querySelector('.tag-close-btn') as HTMLButtonElement;
      await userEvent.click(removeButton);

      expect(handleRemove).toHaveBeenCalledWith('test');
      expect(handleRemove).toHaveBeenCalledTimes(1);
    });

    it('calls onRemove when Enter is pressed on remove button', async () => {
      const handleRemove = jest.fn();
      const { container } = render(<Tag label="Test" value="test" onRemove={handleRemove} />);

      const removeButton = container.querySelector('.tag-close-btn') as HTMLButtonElement;
      removeButton.focus();
      await userEvent.keyboard('{Enter}');

      expect(handleRemove).toHaveBeenCalledWith('test');
    });

    it('calls onClick when tag is clicked', async () => {
      const handleClick = jest.fn();
      const { container } = render(<Tag label="Test" onClick={handleClick} />);

      const tag = container.querySelector('.tag') as HTMLElement;
      await userEvent.click(tag);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('stops propagation when remove button is clicked', async () => {
      const handleClick = jest.fn();
      const handleRemove = jest.fn();
      const { container } = render(<Tag label="Test" value="test" onClick={handleClick} onRemove={handleRemove} />);

      const removeButton = container.querySelector('.tag-close-btn') as HTMLButtonElement;
      await userEvent.click(removeButton);

      expect(handleRemove).toHaveBeenCalledTimes(1);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('States', () => {
    it('can be disabled', () => {
      const { container } = render(<Tag label="Test" disabled />);
      const tag = container.querySelector('.tag');
      expect(tag).toHaveAttribute('aria-disabled', 'true');
    });

    it('does not call onClick when disabled', async () => {
      const handleClick = jest.fn();
      const { container } = render(<Tag label="Test" disabled onClick={handleClick} />);

      const tag = container.querySelector('.tag') as HTMLElement;
      await userEvent.click(tag);

      expect(handleClick).not.toHaveBeenCalled();
    });

    it('disables remove button when disabled', () => {
      const { container } = render(<Tag label="Test" value="test" disabled />);
      const removeButton = container.querySelector('.tag-close-btn') as HTMLButtonElement;
      expect(removeButton).toBeDisabled();
    });
  });

  describe('Accessibility', () => {
    it('has role="tag"', () => {
      const { container } = render(<Tag label="Test" />);
      expect(container.querySelector('.tag')).toHaveAttribute('role', 'tag');
    });

    it('has aria-label', () => {
      const { container } = render(<Tag label="Test label" />);
      expect(container.querySelector('.tag')).toHaveAttribute('aria-label', 'Test label');
    });

    it('has aria-disabled when disabled', () => {
      const { container } = render(<Tag label="Test" disabled />);
      expect(container.querySelector('.tag')).toHaveAttribute('aria-disabled', 'true');
    });

    it('forwards ref correctly', () => {
      const ref = jest.fn();
      render(<Tag ref={ref} label="Test" />);
      expect(ref).toHaveBeenCalled();
    });

    it('applies custom className', () => {
      const { container } = render(<Tag className="custom-tag" label="Test" />);
      expect(container.querySelector('.tag')).toHaveClass('custom-tag');
    });
  });
});
