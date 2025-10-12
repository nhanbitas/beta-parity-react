import { render, screen } from '@testing-library/react';
import { CornerIndicator } from './index';

describe('CornerIndicator Component', () => {
  describe('Rendering', () => {
    it('renders correctly with children', () => {
      const { container } = render(
        <CornerIndicator label='New'>
          <div>Content</div>
        </CornerIndicator>
      );
      expect(container.querySelector('.corner-indicator-container')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('renders badge type when label is provided', () => {
      render(
        <CornerIndicator label='Badge'>
          <div>Content</div>
        </CornerIndicator>
      );
      expect(screen.getByText('Badge')).toBeInTheDocument();
    });

    it('renders dot type when label is not provided', () => {
      const { container } = render(
        <CornerIndicator>
          <div>Content</div>
        </CornerIndicator>
      );
      expect(container.querySelector('.dot')).toBeInTheDocument();
    });

    it('renders with icon', () => {
      render(
        <CornerIndicator label='Star' icon={<span data-testid='icon'>★</span>}>
          <div>Content</div>
        </CornerIndicator>
      );
      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });

    it('does not render indicator when disable is true', () => {
      const { container } = render(
        <CornerIndicator label='Test' disable>
          <div>Content</div>
        </CornerIndicator>
      );
      expect(container.querySelector('.corner-indicator-container')).not.toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
    });
  });

  describe('Position variants', () => {
    it('renders top-right position by default', () => {
      const { container } = render(
        <CornerIndicator label='Test'>
          <div>Content</div>
        </CornerIndicator>
      );
      expect(container.querySelector('.corner-indicator-container')).toHaveClass('top-right');
    });

    it('renders top-left position', () => {
      const { container } = render(
        <CornerIndicator label='Test' position='top-left'>
          <div>Content</div>
        </CornerIndicator>
      );
      expect(container.querySelector('.corner-indicator-container')).toHaveClass('top-left');
    });

    it('renders bottom-right position', () => {
      const { container } = render(
        <CornerIndicator label='Test' position='bottom-right'>
          <div>Content</div>
        </CornerIndicator>
      );
      expect(container.querySelector('.corner-indicator-container')).toHaveClass('bottom-right');
    });

    it('renders bottom-left position', () => {
      const { container } = render(
        <CornerIndicator label='Test' position='bottom-left'>
          <div>Content</div>
        </CornerIndicator>
      );
      expect(container.querySelector('.corner-indicator-container')).toHaveClass('bottom-left');
    });
  });

  describe('Size variants', () => {
    it('renders medium size by default', () => {
      const { container } = render(
        <CornerIndicator label='Test'>
          <div>Content</div>
        </CornerIndicator>
      );
      expect(container.querySelector('.badge')).toHaveClass('medium');
    });

    it('renders small size', () => {
      const { container } = render(
        <CornerIndicator label='Test' size='sm'>
          <div>Content</div>
        </CornerIndicator>
      );
      expect(container.querySelector('.badge')).toHaveClass('small');
    });

    it('renders extra-small size', () => {
      const { container } = render(
        <CornerIndicator label='Test' size='xs'>
          <div>Content</div>
        </CornerIndicator>
      );
      expect(container.querySelector('.badge')).toHaveClass('extra-small');
    });

    it('renders large dot size', () => {
      const { container } = render(
        <CornerIndicator size='lg'>
          <div>Content</div>
        </CornerIndicator>
      );
      expect(container.querySelector('.dot')).toHaveClass('extra-large');
    });
  });

  describe('Color variants', () => {
    const colors = ['gray', 'orange', 'violet', 'green', 'red', 'yellow', 'blue', 'lime', 'cyan'] as const;

    colors.forEach((color) => {
      it(`renders ${color} color`, () => {
        const { container } = render(
          <CornerIndicator label='Test' color={color}>
            <div>Content</div>
          </CornerIndicator>
        );
        expect(container.querySelector('.badge')).toHaveClass(color);
      });
    });

    it('renders gray color by default', () => {
      const { container } = render(
        <CornerIndicator label='Test'>
          <div>Content</div>
        </CornerIndicator>
      );
      expect(container.querySelector('.badge')).toHaveClass('gray');
    });
  });

  describe('Variant styles', () => {
    it('renders solid variant by default', () => {
      const { container } = render(
        <CornerIndicator label='Test'>
          <div>Content</div>
        </CornerIndicator>
      );
      expect(container.querySelector('.badge')).toHaveClass('solid');
    });

    it('renders outlined variant', () => {
      const { container } = render(
        <CornerIndicator label='Test' variant='outlined'>
          <div>Content</div>
        </CornerIndicator>
      );
      expect(container.querySelector('.badge')).toHaveClass('outlined');
    });

    it('renders glass variant', () => {
      const { container } = render(
        <CornerIndicator label='Test' variant='glass'>
          <div>Content</div>
        </CornerIndicator>
      );
      expect(container.querySelector('.badge')).toHaveClass('glass');
    });
  });

  describe('Special props', () => {
    it('renders with outline border', () => {
      const { container } = render(
        <CornerIndicator label='Test' outline>
          <div>Content</div>
        </CornerIndicator>
      );
      expect(container.querySelector('.corner-indicator-container')).toHaveClass('bordered');
    });

    it('renders pulsing dot', () => {
      const { container } = render(
        <CornerIndicator pulse>
          <div>Content</div>
        </CornerIndicator>
      );
      expect(container.querySelector('.dot')).toBeInTheDocument();
    });

    it('applies custom offset', () => {
      const { container } = render(
        <CornerIndicator label='Test' offset={10}>
          <div>Content</div>
        </CornerIndicator>
      );
      const indicator = container.querySelector('.corner-indicator-container') as HTMLElement;
      expect(indicator.style.getPropertyValue('--par-x-offset')).toBe('10px');
      expect(indicator.style.getPropertyValue('--par-y-offset')).toBe('10px');
    });

    it('applies custom xOffset', () => {
      const { container } = render(
        <CornerIndicator label='Test' xOffset={20}>
          <div>Content</div>
        </CornerIndicator>
      );
      const indicator = container.querySelector('.corner-indicator-container') as HTMLElement;
      expect(indicator.style.getPropertyValue('--par-x-offset')).toBe('20px');
    });

    it('applies custom yOffset', () => {
      const { container } = render(
        <CornerIndicator label='Test' yOffset={15}>
          <div>Content</div>
        </CornerIndicator>
      );
      const indicator = container.querySelector('.corner-indicator-container') as HTMLElement;
      expect(indicator.style.getPropertyValue('--par-y-offset')).toBe('15px');
    });
  });

  describe('Grow direction', () => {
    it('renders symmetric grow direction by default', () => {
      const { container } = render(
        <CornerIndicator label='Test'>
          <div>Content</div>
        </CornerIndicator>
      );
      const indicator = container.querySelector('.corner-indicator-container') as HTMLElement;
      expect(indicator.style.getPropertyValue('--par-x-origin')).toBe('50');
    });

    it('renders inward grow direction', () => {
      const { container } = render(
        <CornerIndicator label='Test' growDirection='inward'>
          <div>Content</div>
        </CornerIndicator>
      );
      const indicator = container.querySelector('.corner-indicator-container') as HTMLElement;
      expect(indicator.style.getPropertyValue('--par-x-origin')).toBe('0');
    });

    it('renders outward grow direction', () => {
      const { container } = render(
        <CornerIndicator label='Test' growDirection='outward'>
          <div>Content</div>
        </CornerIndicator>
      );
      const indicator = container.querySelector('.corner-indicator-container') as HTMLElement;
      expect(indicator.style.getPropertyValue('--par-x-origin')).toBe('100');
    });
  });

  describe('Accessibility', () => {
    it('forwards ref correctly', () => {
      const ref = jest.fn();
      render(
        <CornerIndicator ref={ref} label='Test'>
          <div>Content</div>
        </CornerIndicator>
      );
      expect(ref).toHaveBeenCalled();
    });

    it('applies custom className', () => {
      const { container } = render(
        <CornerIndicator className='custom-indicator' label='Test'>
          <div>Content</div>
        </CornerIndicator>
      );
      expect(container.querySelector('.corner-indicator-container')).toHaveClass('custom-indicator');
    });

    it('spreads additional props', () => {
      const { container } = render(
        <CornerIndicator data-testid='indicator' label='Test'>
          <div>Content</div>
        </CornerIndicator>
      );
      expect(container.querySelector('.corner-indicator-container')).toHaveAttribute('data-testid', 'indicator');
    });
  });
});
