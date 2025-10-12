import { render, screen, fireEvent } from '@testing-library/react';
import { Avatar, AvatarGroup, AvatarTrigger } from './index';

describe('Avatar Component', () => {
  describe('Rendering', () => {
    it('renders with image', () => {
      render(<Avatar src="https://example.com/avatar.jpg" alt="User" />);
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('src', 'https://example.com/avatar.jpg');
      expect(img).toHaveAttribute('alt', 'User');
    });

    it('renders with initials when no image', () => {
      render(<Avatar initials="AB" />);
      expect(screen.getByText('AB')).toBeInTheDocument();
    });

    it('shows placeholder icon when no image and no initials', () => {
      const { container } = render(<Avatar />);
      expect(container.querySelector('.avatar-placeholder')).toBeInTheDocument();
    });

    it('renders custom children', () => {
      render(<Avatar><span data-testid="custom">Custom</span></Avatar>);
      expect(screen.getByTestId('custom')).toBeInTheDocument();
    });

    it('falls back to initials on image error', () => {
      render(<Avatar src="invalid-url.jpg" initials="AB" />);
      const img = screen.getByRole('img');
      fireEvent.error(img);
      expect(screen.getByText('AB')).toBeInTheDocument();
    });
  });

  describe('Size variants', () => {
    const sizes = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl'] as const;

    sizes.forEach((size) => {
      it(`renders ${size} size`, () => {
        const { container } = render(<Avatar size={size} initials="A" />);
        expect(container.querySelector(`.avatar.${size}`)).toBeInTheDocument();
      });
    });

    it('renders medium size by default', () => {
      const { container } = render(<Avatar initials="A" />);
      expect(container.querySelector('.avatar.md')).toBeInTheDocument();
    });
  });

  describe('Status', () => {
    it('renders with dot status', () => {
      const { container } = render(<Avatar initials="A" status={{ type: 'dot', color: 'green' }} />);
      expect(container.querySelector('.avatar-dot')).toBeInTheDocument();
    });

    it('renders with border status', () => {
      const { container } = render(<Avatar initials="A" status={{ type: 'border', color: 'green' }} />);
      expect(container.querySelector('.avatar-border')).toBeInTheDocument();
    });

    it('renders pulsing status', () => {
      const { container } = render(<Avatar initials="A" status={{ type: 'dot', pulse: true }} />);
      expect(container.querySelector('.pulse')).toBeInTheDocument();
    });

    it('applies status color', () => {
      const { container } = render(<Avatar initials="A" status={{ type: 'border', color: 'red' }} />);
      const border = container.querySelector('.avatar-border');
      expect(border).toHaveAttribute('data-status-color', 'red');
    });

    it('applies alternative border style', () => {
      const { container } = render(<Avatar initials="A" status={{ borderStyle: 'alternative' }} />);
      expect(container.querySelector('.border-alternative')).toBeInTheDocument();
    });

    it('hides border with none borderStyle', () => {
      const { container } = render(<Avatar initials="A" status={{ borderStyle: 'none' }} />);
      expect(container.querySelector('.avatar-border')).not.toBeInTheDocument();
    });
  });

  describe('States', () => {
    it('can be disabled', () => {
      const { container } = render(<Avatar initials="A" disabled />);
      expect(container.querySelector('.avatar.disabled')).toBeInTheDocument();
    });

    it('applies framePadding', () => {
      const { container } = render(<Avatar initials="A" framePadding={5} status={{ type: 'border', color: 'green' }} />);
      const frame = container.querySelector('.avatar-frame');
      expect(frame).toHaveStyle({ '--avatar-frame-gap': '5px' });
    });
  });

  describe('Accessibility', () => {
    it('forwards ref correctly', () => {
      const ref = jest.fn();
      render(<Avatar ref={ref} initials="A" />);
      expect(ref).toHaveBeenCalled();
    });

    it('applies custom className', () => {
      const { container } = render(<Avatar className="custom-avatar" initials="A" />);
      expect(container.querySelector('.avatar')).toHaveClass('custom-avatar');
    });

    it('spreads additional props', () => {
      render(<Avatar data-testid="avatar" aria-label="User avatar" initials="A" />);
      const avatar = screen.getByTestId('avatar');
      expect(avatar).toHaveAttribute('aria-label', 'User avatar');
    });
  });
});

describe('AvatarGroup Component', () => {
  describe('Rendering', () => {
    it('renders multiple avatars', () => {
      render(
        <AvatarGroup>
          <Avatar initials="A" />
          <Avatar initials="B" />
          <Avatar initials="C" />
        </AvatarGroup>
      );
      expect(screen.getByText('A')).toBeInTheDocument();
      expect(screen.getByText('B')).toBeInTheDocument();
      expect(screen.getByText('C')).toBeInTheDocument();
    });

    it('limits visible avatars to max', () => {
      render(
        <AvatarGroup max={2}>
          <Avatar initials="A" />
          <Avatar initials="B" />
          <Avatar initials="C" />
          <Avatar initials="D" />
        </AvatarGroup>
      );
      expect(screen.getByText('A')).toBeInTheDocument();
      expect(screen.getByText('B')).toBeInTheDocument();
      expect(screen.queryByText('C')).not.toBeInTheDocument();
      expect(screen.getByText('+2')).toBeInTheDocument();
    });

    it('shows overflow count', () => {
      render(
        <AvatarGroup max={3}>
          <Avatar initials="A" />
          <Avatar initials="B" />
          <Avatar initials="C" />
          <Avatar initials="D" />
          <Avatar initials="E" />
        </AvatarGroup>
      );
      expect(screen.getByText('+2')).toBeInTheDocument();
    });

    it('applies custom renderOverflow', () => {
      const customOverflow = (count: number) => <div data-testid="custom-overflow">+{count} more</div>;
      render(
        <AvatarGroup max={2} renderOverflow={customOverflow}>
          <Avatar initials="A" />
          <Avatar initials="B" />
          <Avatar initials="C" />
        </AvatarGroup>
      );
      expect(screen.getByTestId('custom-overflow')).toHaveTextContent('+1 more');
    });

    it('renders in column direction', () => {
      const { container } = render(
        <AvatarGroup direction="column">
          <Avatar initials="A" />
          <Avatar initials="B" />
        </AvatarGroup>
      );
      expect(container.querySelector('.avatar-group.direction-column')).toBeInTheDocument();
    });

    it('renders in row direction by default', () => {
      const { container } = render(
        <AvatarGroup>
          <Avatar initials="A" />
          <Avatar initials="B" />
        </AvatarGroup>
      );
      expect(container.querySelector('.avatar-group.direction-row')).toBeInTheDocument();
    });

    it('applies custom spacing', () => {
      const { container } = render(
        <AvatarGroup spacing="-1rem">
          <Avatar initials="A" />
          <Avatar initials="B" />
        </AvatarGroup>
      );
      const group = container.querySelector('.avatar-group');
      expect(group).toHaveStyle({ '--avatar-group-spacing': '-1rem' });
    });

    it('propagates size to children', () => {
      const { container } = render(
        <AvatarGroup size="lg">
          <Avatar initials="A" />
          <Avatar initials="B" />
        </AvatarGroup>
      );
      const avatars = container.querySelectorAll('.avatar.lg');
      expect(avatars.length).toBe(2);
    });

    it('propagates borderStyle to children', () => {
      const { container } = render(
        <AvatarGroup borderStyle="alternative">
          <Avatar initials="A" />
          <Avatar initials="B" />
        </AvatarGroup>
      );
      const borders = container.querySelectorAll('.border-alternative');
      expect(borders.length).toBeGreaterThan(0);
    });
  });

  describe('Interactions', () => {
    it('calls onOverflowClick when overflow avatar is clicked', () => {
      const handleClick = jest.fn();
      render(
        <AvatarGroup max={2} onOverflowClick={handleClick}>
          <Avatar initials="A" />
          <Avatar initials="B" />
          <Avatar initials="C" />
        </AvatarGroup>
      );
      const overflow = screen.getByText('+1').closest('.avatar-trigger');
      fireEvent.click(overflow!);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
    it('forwards ref correctly', () => {
      const ref = jest.fn();
      render(
        <AvatarGroup ref={ref}>
          <Avatar initials="A" />
        </AvatarGroup>
      );
      expect(ref).toHaveBeenCalled();
    });

    it('applies custom className', () => {
      const { container } = render(
        <AvatarGroup className="custom-group">
          <Avatar initials="A" />
        </AvatarGroup>
      );
      expect(container.querySelector('.avatar-group')).toHaveClass('custom-group');
    });
  });
});

describe('AvatarTrigger Component', () => {
  describe('Rendering', () => {
    it('renders as avatar with trigger class', () => {
      const { container } = render(<AvatarTrigger initials="A" />);
      expect(container.querySelector('.avatar-trigger')).toBeInTheDocument();
    });

    it('applies active state', () => {
      const { container } = render(<AvatarTrigger initials="A" active />);
      expect(container.querySelector('.avatar-trigger.active')).toBeInTheDocument();
    });

    it('is focusable', () => {
      const { container } = render(<AvatarTrigger initials="A" />);
      const trigger = container.querySelector('.avatar-trigger');
      expect(trigger).toHaveAttribute('tabIndex', '0');
    });
  });

  describe('Accessibility', () => {
    it('forwards ref correctly', () => {
      const ref = jest.fn();
      render(<AvatarTrigger ref={ref} initials="A" />);
      expect(ref).toHaveBeenCalled();
    });

    it('applies custom className', () => {
      const { container } = render(<AvatarTrigger className="custom-trigger" initials="A" />);
      expect(container.querySelector('.avatar-trigger')).toHaveClass('custom-trigger');
    });
  });
});
