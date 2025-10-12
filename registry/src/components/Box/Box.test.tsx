import { render, screen } from '@testing-library/react';
import { Box } from './index';

describe('Box Component', () => {
  describe('Rendering', () => {
    it('renders correctly', () => {
      const { container } = render(<Box>Content</Box>);
      expect(container.querySelector('.box')).toBeInTheDocument();
    });

    it('renders with children', () => {
      render(<Box>Box content</Box>);
      expect(screen.getByText('Box content')).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      const { container } = render(<Box className='custom-box'>Content</Box>);
      expect(container.querySelector('.box')).toHaveClass('custom-box');
    });

    it('renders as div by default', () => {
      const { container } = render(<Box>Content</Box>);
      expect(container.querySelector('.box')?.tagName).toBe('DIV');
    });
  });

  describe('Polymorphic component', () => {
    it('renders as custom element when component prop is provided', () => {
      const { container } = render(<Box component='section'>Content</Box>);
      expect(container.querySelector('section.box')).toBeInTheDocument();
    });

    it('renders as span element', () => {
      const { container } = render(<Box component='span'>Content</Box>);
      expect(container.querySelector('span.box')).toBeInTheDocument();
    });

    it('renders as article element', () => {
      const { container } = render(<Box component='article'>Content</Box>);
      expect(container.querySelector('article.box')).toBeInTheDocument();
    });
  });

  describe('Base props', () => {
    it('applies style props through Base component', () => {
      const { container } = render(
        <Box m={10} p={20}>
          Content
        </Box>
      );
      const box = container.querySelector('.box') as HTMLElement;
      expect(box.style.margin).toBe('10px');
      expect(box.style.padding).toBe('20px');
    });

    it('forwards style prop', () => {
      const { container } = render(<Box style={{ color: 'red' }}>Content</Box>);
      const box = container.querySelector('.box') as HTMLElement;
      expect(box.style.color).toBe('red');
    });
  });

  describe('Accessibility', () => {
    it('forwards ref correctly', () => {
      const ref = jest.fn();
      render(<Box ref={ref}>Content</Box>);
      expect(ref).toHaveBeenCalled();
    });

    it('spreads additional props', () => {
      const { container } = render(
        <Box data-testid='custom-box' aria-label='Test box'>
          Content
        </Box>
      );
      const box = container.querySelector('.box');
      expect(box).toHaveAttribute('data-testid', 'custom-box');
      expect(box).toHaveAttribute('aria-label', 'Test box');
    });
  });
});
