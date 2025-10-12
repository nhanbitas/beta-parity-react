import { render, screen } from '@testing-library/react';
import { Base } from './index';

describe('Base Component', () => {
  describe('Rendering', () => {
    it('renders correctly', () => {
      render(<Base>Content</Base>);
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('renders with children', () => {
      render(<Base>Base content</Base>);
      expect(screen.getByText('Base content')).toBeInTheDocument();
    });

    it('renders as div by default', () => {
      const { container } = render(<Base>Content</Base>);
      expect(container.firstChild?.nodeName).toBe('DIV');
    });
  });

  describe('Polymorphic component', () => {
    it('renders as custom element when component prop is provided', () => {
      const { container } = render(<Base component='section'>Content</Base>);
      expect(container.querySelector('section')).toBeInTheDocument();
    });

    it('renders as span element', () => {
      const { container } = render(<Base component='span'>Content</Base>);
      expect(container.querySelector('span')).toBeInTheDocument();
    });

    it('renders as article element', () => {
      const { container } = render(<Base component='article'>Content</Base>);
      expect(container.querySelector('article')).toBeInTheDocument();
    });
  });

  describe('Style props', () => {
    it('applies margin prop', () => {
      const { container } = render(<Base m={10}>Content</Base>);
      const element = container.firstChild as HTMLElement;
      expect(element.style.margin).toBe('10px');
    });

    it('applies padding prop', () => {
      const { container } = render(<Base p={20}>Content</Base>);
      const element = container.firstChild as HTMLElement;
      expect(element.style.padding).toBe('20px');
    });

    it('applies marginX prop', () => {
      const { container } = render(<Base mx={15}>Content</Base>);
      const element = container.firstChild as HTMLElement;
      expect(element.style.marginLeft).toBe('15px');
      expect(element.style.marginRight).toBe('15px');
    });

    it('applies marginY prop', () => {
      const { container } = render(<Base my={15}>Content</Base>);
      const element = container.firstChild as HTMLElement;
      expect(element.style.marginTop).toBe('15px');
      expect(element.style.marginBottom).toBe('15px');
    });

    it('applies paddingX prop', () => {
      const { container } = render(<Base px={15}>Content</Base>);
      const element = container.firstChild as HTMLElement;
      expect(element.style.paddingLeft).toBe('15px');
      expect(element.style.paddingRight).toBe('15px');
    });

    it('applies paddingY prop', () => {
      const { container } = render(<Base py={15}>Content</Base>);
      const element = container.firstChild as HTMLElement;
      expect(element.style.paddingTop).toBe('15px');
      expect(element.style.paddingBottom).toBe('15px');
    });

    it('applies width prop', () => {
      const { container } = render(<Base w={100}>Content</Base>);
      const element = container.firstChild as HTMLElement;
      expect(element.style.width).toBe('100px');
    });

    it('applies height prop', () => {
      const { container } = render(<Base h={100}>Content</Base>);
      const element = container.firstChild as HTMLElement;
      expect(element.style.height).toBe('100px');
    });

    it('applies multiple style props', () => {
      const { container } = render(
        <Base m={10} p={20} w={200} h={150}>
          Content
        </Base>
      );
      const element = container.firstChild as HTMLElement;
      expect(element.style.margin).toBe('10px');
      expect(element.style.padding).toBe('20px');
      expect(element.style.width).toBe('200px');
      expect(element.style.height).toBe('150px');
    });

    it('merges style props with style attribute', () => {
      const { container } = render(
        <Base m={10} style={{ color: 'red' }}>
          Content
        </Base>
      );
      const element = container.firstChild as HTMLElement;
      expect(element.style.margin).toBe('10px');
      expect(element.style.color).toBe('red');
    });
  });

  describe('Accessibility', () => {
    it('forwards ref correctly', () => {
      const ref = jest.fn();
      render(<Base ref={ref}>Content</Base>);
      expect(ref).toHaveBeenCalled();
    });

    it('spreads additional props', () => {
      render(
        <Base data-testid='custom-base' aria-label='Test base'>
          Content
        </Base>
      );
      const element = screen.getByTestId('custom-base');
      expect(element).toHaveAttribute('aria-label', 'Test base');
    });

    it('applies className', () => {
      render(<Base className='custom-class'>Content</Base>);
      expect(screen.getByText('Content')).toHaveClass('custom-class');
    });
  });
});
