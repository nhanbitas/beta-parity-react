import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination } from './index';

describe('Pagination Component', () => {
  describe('Rendering', () => {
    it('renders correctly', () => {
      const { container } = render(<Pagination totalPage={5} page={1} />);
      expect(container.querySelector('.pagination')).toBeInTheDocument();
    });

    it('renders page numbers', () => {
      render(<Pagination totalPage={5} page={1} />);
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('renders navigation controls by default', () => {
      const { container } = render(<Pagination totalPage={5} page={1} />);
      expect(container.querySelector('.pagination-start')).toBeInTheDocument();
      expect(container.querySelector('.pagination-prev')).toBeInTheDocument();
      expect(container.querySelector('.pagination-next')).toBeInTheDocument();
      expect(container.querySelector('.pagination-end')).toBeInTheDocument();
    });

    it('has role="navigation"', () => {
      const { container } = render(<Pagination totalPage={5} page={1} />);
      expect(container.querySelector('.pagination')).toHaveAttribute('role', 'navigation');
    });
  });

  describe('Color variants', () => {
    it('renders neutral color by default', () => {
      const { container } = render(<Pagination totalPage={5} page={1} />);
      expect(container.querySelector('.pagination')).toHaveClass('neutral');
    });

    it('renders accent color', () => {
      const { container } = render(<Pagination totalPage={5} page={1} color="accent" />);
      expect(container.querySelector('.pagination')).toHaveClass('accent');
    });
  });

  describe('Bordered variant', () => {
    it('does not have border by default', () => {
      const { container } = render(<Pagination totalPage={5} page={1} />);
      expect(container.querySelector('.pagination')).not.toHaveClass('bordered');
    });

    it('renders with border', () => {
      const { container } = render(<Pagination totalPage={5} page={1} bordered />);
      expect(container.querySelector('.pagination')).toHaveClass('bordered');
    });
  });

  describe('OnlyControl variant', () => {
    it('renders page numbers by default', () => {
      render(<Pagination totalPage={5} page={1} />);
      expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('hides page numbers when onlyControl is true', () => {
      const { container } = render(<Pagination totalPage={5} page={1} onlyControl />);
      expect(container.querySelector('.pagination')).toHaveClass('only-control');
    });
  });

  describe('Active page', () => {
    it('marks current page as active', () => {
      const { container } = render(<Pagination totalPage={5} page={3} />);
      const pageItems = container.querySelectorAll('.pagination-item');
      const activePage = Array.from(pageItems).find((item) => item.textContent === '3');
      expect(activePage).toHaveClass('active');
    });

    it('has aria-current on active page', () => {
      const { container } = render(<Pagination totalPage={5} page={3} />);
      const pageItems = container.querySelectorAll('.pagination-item');
      const activePage = Array.from(pageItems).find((item) => item.textContent === '3');
      expect(activePage).toHaveAttribute('aria-current', 'page');
    });
  });

  describe('Page interactions', () => {
    it('changes page on click', async () => {
      const handlePageChange = jest.fn();
      render(<Pagination totalPage={5} page={1} onPageChange={handlePageChange} />);

      await userEvent.click(screen.getByText('3'));

      expect(handlePageChange).toHaveBeenCalledWith(3);
    });

    it('goes to next page', async () => {
      const handlePageChange = jest.fn();
      const { container } = render(<Pagination totalPage={5} page={2} onPageChange={handlePageChange} />);

      await userEvent.click(container.querySelector('.pagination-next') as HTMLElement);

      expect(handlePageChange).toHaveBeenCalledWith(3);
    });

    it('goes to previous page', async () => {
      const handlePageChange = jest.fn();
      const { container } = render(<Pagination totalPage={5} page={3} onPageChange={handlePageChange} />);

      await userEvent.click(container.querySelector('.pagination-prev') as HTMLElement);

      expect(handlePageChange).toHaveBeenCalledWith(2);
    });

    it('goes to first page', async () => {
      const handlePageChange = jest.fn();
      const { container } = render(<Pagination totalPage={5} page={3} onPageChange={handlePageChange} />);

      await userEvent.click(container.querySelector('.pagination-start') as HTMLElement);

      expect(handlePageChange).toHaveBeenCalledWith(1);
    });

    it('goes to last page', async () => {
      const handlePageChange = jest.fn();
      const { container } = render(<Pagination totalPage={5} page={3} onPageChange={handlePageChange} />);

      await userEvent.click(container.querySelector('.pagination-end') as HTMLElement);

      expect(handlePageChange).toHaveBeenCalledWith(5);
    });
  });

  describe('Control buttons state', () => {
    it('disables prev and first buttons on first page', () => {
      const { container } = render(<Pagination totalPage={5} page={1} />);

      expect(container.querySelector('.pagination-start')).toBeDisabled();
      expect(container.querySelector('.pagination-prev')).toBeDisabled();
    });

    it('disables next and last buttons on last page', () => {
      const { container } = render(<Pagination totalPage={5} page={5} />);

      expect(container.querySelector('.pagination-next')).toBeDisabled();
      expect(container.querySelector('.pagination-end')).toBeDisabled();
    });

    it('enables all buttons on middle page', () => {
      const { container } = render(<Pagination totalPage={5} page={3} />);

      expect(container.querySelector('.pagination-start')).not.toBeDisabled();
      expect(container.querySelector('.pagination-prev')).not.toBeDisabled();
      expect(container.querySelector('.pagination-next')).not.toBeDisabled();
      expect(container.querySelector('.pagination-end')).not.toBeDisabled();
    });
  });

  describe('Control config', () => {
    it('hides controls based on config', () => {
      const { container } = render(
        <Pagination
          totalPage={5}
          page={1}
          controlConfig={{
            first: { isActive: false },
            last: { isActive: false }
          }}
        />
      );

      expect(container.querySelector('.pagination-start')).not.toBeInTheDocument();
      expect(container.querySelector('.pagination-end')).not.toBeInTheDocument();
      expect(container.querySelector('.pagination-prev')).toBeInTheDocument();
      expect(container.querySelector('.pagination-next')).toBeInTheDocument();
    });
  });

  describe('Siblings', () => {
    it('shows all pages when totalPage is small', () => {
      render(<Pagination totalPage={5} page={3} siblings={0} />);
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
      expect(screen.getByText('4')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('shows menu for large page count', () => {
      const { container } = render(<Pagination totalPage={20} page={10} siblings={1} />);
      const menuButton = Array.from(container.querySelectorAll('.pagination-item')).find(
        (item) => item.textContent === '...'
      );
      expect(menuButton).toBeInTheDocument();
    });
  });

  describe('Component prop', () => {
    it('renders buttons by default', () => {
      render(<Pagination totalPage={5} page={1} />);
      const pageItems = screen.getAllByRole('button');
      expect(pageItems.length).toBeGreaterThan(0);
    });

    it('renders links when component is "a"', () => {
      const { container } = render(<Pagination totalPage={5} page={1} component="a" />);
      const links = container.querySelectorAll('a.pagination-item');
      expect(links.length).toBeGreaterThan(0);
    });
  });

  describe('URL generation', () => {
    it('generates href for links', () => {
      const generateHref = (page: number) => `/page/${page}`;
      const { container } = render(<Pagination totalPage={5} page={1} component="a" to={generateHref} />);

      const link = Array.from(container.querySelectorAll('a.pagination-item')).find(
        (item) => item.textContent === '2'
      ) as HTMLAnchorElement;

      expect(link?.getAttribute('href')).toBe('/page/2');
    });
  });

  describe('Accessibility', () => {
    it('has aria-label on control buttons', () => {
      const { container } = render(<Pagination totalPage={5} page={1} />);

      expect(container.querySelector('.pagination-start')).toHaveAttribute('aria-label', 'Go to First Page');
      expect(container.querySelector('.pagination-prev')).toHaveAttribute('aria-label', 'Go to Previous Page');
      expect(container.querySelector('.pagination-next')).toHaveAttribute('aria-label', 'Go to Next Page');
      expect(container.querySelector('.pagination-end')).toHaveAttribute('aria-label', 'Go to Last Page');
    });

    it('has aria-label on page items', () => {
      const { container } = render(<Pagination totalPage={5} page={1} />);
      const pageItem = Array.from(container.querySelectorAll('.pagination-item')).find(
        (item) => item.textContent === '3'
      );
      expect(pageItem).toHaveAttribute('aria-label', '3');
    });

    it('forwards ref correctly', () => {
      const ref = jest.fn();
      render(<Pagination ref={ref} totalPage={5} page={1} />);
      expect(ref).toHaveBeenCalled();
    });

    it('applies custom className', () => {
      const { container } = render(<Pagination className="custom-pagination" totalPage={5} page={1} />);
      expect(container.querySelector('.pagination')).toHaveClass('custom-pagination');
    });
  });
});
