import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Breadcrumb, BreadcrumbItem } from './index';

describe('Breadcrumb Component', () => {
  const mockBreadcrumbList = [
    { href: '/', children: 'Home' },
    { href: '/products', children: 'Products' },
    { href: '/products/shoes', children: 'Shoes' }
  ];

  describe('Rendering', () => {
    it('renders correctly', () => {
      const { container } = render(<Breadcrumb breadcrumbList={mockBreadcrumbList} />);
      expect(container.querySelector('.breadcrumb')).toBeInTheDocument();
    });

    it('renders as nav element', () => {
      const { container } = render(<Breadcrumb breadcrumbList={mockBreadcrumbList} />);
      expect(container.querySelector('nav.breadcrumb')).toBeInTheDocument();
    });

    it('renders with breadcrumbList prop', () => {
      render(<Breadcrumb breadcrumbList={mockBreadcrumbList} />);
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Products')).toBeInTheDocument();
      expect(screen.getByText('Shoes')).toBeInTheDocument();
    });

    it('renders with children', () => {
      render(
        <Breadcrumb>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/products">Products</BreadcrumbItem>
        </Breadcrumb>
      );
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Products')).toBeInTheDocument();
    });

    it('returns null when no items', () => {
      const { container } = render(<Breadcrumb />);
      expect(container.querySelector('.breadcrumb')).not.toBeInTheDocument();
    });

    it('has aria-label', () => {
      const { container } = render(<Breadcrumb breadcrumbList={mockBreadcrumbList} />);
      expect(container.querySelector('nav')).toHaveAttribute('aria-label', 'Breadcrumb');
    });
  });

  describe('Separator variants', () => {
    it('renders chevron separator by default', () => {
      const { container } = render(<Breadcrumb breadcrumbList={mockBreadcrumbList} />);
      expect(container.querySelector('.breadcrumb')).toHaveClass('chevron');
    });

    it('renders dash separator', () => {
      const { container } = render(<Breadcrumb separator="dash" breadcrumbList={mockBreadcrumbList} />);
      expect(container.querySelector('.breadcrumb')).toHaveClass('dash');
    });

    it('renders slash separator', () => {
      const { container } = render(<Breadcrumb separator="slash" breadcrumbList={mockBreadcrumbList} />);
      expect(container.querySelector('.breadcrumb')).toHaveClass('slash');
    });
  });

  describe('Last item as active', () => {
    it('renders last item as active breadcrumb', () => {
      const { container } = render(<Breadcrumb breadcrumbList={mockBreadcrumbList} />);
      expect(container.querySelector('.breadcrumb-active')).toBeInTheDocument();
    });

    it('last item is not a link', () => {
      const { container } = render(<Breadcrumb breadcrumbList={mockBreadcrumbList} />);
      const activeItem = container.querySelector('.breadcrumb-active');
      expect(activeItem?.querySelector('a')).not.toBeInTheDocument();
      expect(activeItem?.querySelector('span')).toBeInTheDocument();
    });

    it('displays last item text', () => {
      render(<Breadcrumb breadcrumbList={mockBreadcrumbList} />);
      const activeItem = screen.getByText('Shoes').closest('.breadcrumb-active');
      expect(activeItem).toBeInTheDocument();
    });
  });

  describe('Limit prop', () => {
    const manyItems = [
      { href: '/', children: 'Home' },
      { href: '/level1', children: 'Level 1' },
      { href: '/level2', children: 'Level 2' },
      { href: '/level3', children: 'Level 3' },
      { href: '/level4', children: 'Level 4' },
      { href: '/level5', children: 'Current' }
    ];

    it('shows menu button when limit is set', () => {
      render(<Breadcrumb breadcrumbList={manyItems} limit={3} />);
      expect(screen.getByText('. . .')).toBeInTheDocument();
    });

    it('shows first and last items when limit is set', () => {
      render(<Breadcrumb breadcrumbList={manyItems} limit={3} />);
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Current')).toBeInTheDocument();
    });

    it('shows all items when no limit', () => {
      render(<Breadcrumb breadcrumbList={mockBreadcrumbList} />);
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Products')).toBeInTheDocument();
      expect(screen.getByText('Shoes')).toBeInTheDocument();
    });
  });

  describe('Link props inheritance', () => {
    it('applies size to all items', () => {
      const { container } = render(<Breadcrumb breadcrumbList={mockBreadcrumbList} size="lg" />);
      const links = container.querySelectorAll('.inline-link');
      links.forEach((link) => {
        expect(link).toHaveClass('large');
      });
    });

    it('applies color to all items', () => {
      const { container } = render(<Breadcrumb breadcrumbList={mockBreadcrumbList} color="neutral" />);
      const links = container.querySelectorAll('.inline-link');
      links.forEach((link) => {
        expect(link).toHaveClass('neutral');
      });
    });

    it('applies underline to all items', () => {
      const { container } = render(<Breadcrumb breadcrumbList={mockBreadcrumbList} underline="always" />);
      const links = container.querySelectorAll('.inline-link');
      links.forEach((link) => {
        expect(link).toHaveClass('underline-always');
      });
    });

    it('applies disabled to all items', () => {
      render(<Breadcrumb breadcrumbList={mockBreadcrumbList} disabled />);
      const links = screen.getAllByRole('link');
      links.forEach((link) => {
        expect(link).toHaveAttribute('aria-disabled', 'true');
      });
    });
  });

  describe('BreadcrumbItem', () => {
    it('renders as list item with link', () => {
      const { container } = render(
        <Breadcrumb>
          <BreadcrumbItem href="/test">Test</BreadcrumbItem>
        </Breadcrumb>
      );
      expect(container.querySelector('li.breadcrumb-item')).toBeInTheDocument();
      expect(screen.getByRole('link')).toHaveAttribute('href', '/test');
    });

    it('renders with isMenuItem prop', () => {
      const { container } = render(
        <Breadcrumb>
          <BreadcrumbItem href="/test" isMenuItem>
            Test
          </BreadcrumbItem>
        </Breadcrumb>
      );
      expect(screen.getByRole('menuitem')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('renders ordered list', () => {
      const { container } = render(<Breadcrumb breadcrumbList={mockBreadcrumbList} />);
      expect(container.querySelector('ol')).toBeInTheDocument();
    });

    it('each item is a list item', () => {
      const { container } = render(<Breadcrumb breadcrumbList={mockBreadcrumbList} />);
      const listItems = container.querySelectorAll('li');
      expect(listItems.length).toBeGreaterThan(0);
    });

    it('forwards ref correctly', () => {
      const ref = jest.fn();
      render(<Breadcrumb ref={ref} breadcrumbList={mockBreadcrumbList} />);
      expect(ref).toHaveBeenCalled();
    });

    it('applies custom className', () => {
      const { container } = render(<Breadcrumb className="custom-breadcrumb" breadcrumbList={mockBreadcrumbList} />);
      expect(container.querySelector('.breadcrumb')).toHaveClass('custom-breadcrumb');
    });
  });
});
