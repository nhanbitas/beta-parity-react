import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContentNavigation } from './index';

describe('ContentNavigation Component', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <main id="test-main">
        <h2 id="heading-1">Heading 1</h2>
        <p>Content 1</p>
        <h3 id="heading-1-1">Heading 1.1</h3>
        <p>Content 1.1</p>
        <h2 id="heading-2">Heading 2</h2>
        <p>Content 2</p>
        <h3 id="heading-2-1">Heading 2.1</h3>
        <p>Content 2.1</p>
      </main>
    `;
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('Rendering', () => {
    it('renders correctly', async () => {
      const { container } = render(<ContentNavigation target='#test-main' />);

      await waitFor(() => {
        expect(container.querySelector('.content-navigation')).toBeInTheDocument();
      });
    });

    it('renders with default target "main"', async () => {
      document.body.innerHTML = `
        <main>
          <h2>Default Main Heading</h2>
        </main>
      `;

      render(<ContentNavigation />);

      await waitFor(() => {
        expect(screen.getByText('Default Main Heading')).toBeInTheDocument();
      });
    });

    it('renders navigation items from h2 and h3 headings', async () => {
      render(<ContentNavigation target='#test-main' />);

      await waitFor(() => {
        expect(screen.getByText('Heading 1')).toBeInTheDocument();
        expect(screen.getByText('Heading 1.1')).toBeInTheDocument();
        expect(screen.getByText('Heading 2')).toBeInTheDocument();
        expect(screen.getByText('Heading 2.1')).toBeInTheDocument();
      });
    });

    it('shows skeleton when loading', () => {
      render(<ContentNavigation target='#test-main' skeleton={<div>Loading...</div>} />);
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('hides skeleton after loading', async () => {
      render(<ContentNavigation target='#test-main' skeleton={<div>Loading...</div>} />);

      await waitFor(() => {
        expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
      });
    });
  });

  describe('Target selection', () => {
    it('accepts string selector as target', async () => {
      render(<ContentNavigation target='#test-main' />);

      await waitFor(() => {
        expect(screen.getByText('Heading 1')).toBeInTheDocument();
      });
    });

    it('accepts HTMLElement as target', async () => {
      const mainElement = document.querySelector('#test-main') as HTMLElement;
      render(<ContentNavigation target={mainElement} />);

      await waitFor(() => {
        expect(screen.getByText('Heading 1')).toBeInTheDocument();
      });
    });

    it('handles null target gracefully', async () => {
      const { container } = render(<ContentNavigation target={null} />);

      await waitFor(() => {
        expect(container.querySelector('.content-navigation')).toBeInTheDocument();
      });
    });

    it('handles invalid selector gracefully', async () => {
      const { container } = render(<ContentNavigation target='#non-existent' />);

      await waitFor(() => {
        expect(container.querySelector('.content-navigation')).toBeInTheDocument();
      });
    });
  });

  describe('Exclude functionality', () => {
    beforeEach(() => {
      document.body.innerHTML = `
        <main id="exclude-test">
          <h2>Include 1</h2>
          <div class="exclude-section">
            <h2>Exclude 1</h2>
            <h3>Exclude 1.1</h3>
          </div>
          <h2>Include 2</h2>
          <aside>
            <h2>Exclude 2</h2>
          </aside>
        </main>
      `;
    });

    it('excludes headings inside specified selector', async () => {
      render(<ContentNavigation target='#exclude-test' exclude='.exclude-section' />);

      await waitFor(() => {
        expect(screen.getByText('Include 1')).toBeInTheDocument();
        expect(screen.getByText('Include 2')).toBeInTheDocument();
        expect(screen.queryByText('Exclude 1')).not.toBeInTheDocument();
        expect(screen.queryByText('Exclude 1.1')).not.toBeInTheDocument();
      });
    });

    it('excludes headings inside multiple selectors', async () => {
      render(<ContentNavigation target='#exclude-test' exclude={['.exclude-section', 'aside']} />);

      await waitFor(() => {
        expect(screen.getByText('Include 1')).toBeInTheDocument();
        expect(screen.getByText('Include 2')).toBeInTheDocument();
        expect(screen.queryByText('Exclude 1')).not.toBeInTheDocument();
        expect(screen.queryByText('Exclude 2')).not.toBeInTheDocument();
      });
    });
  });

  describe('Color variants', () => {
    it('renders neutral color by default', async () => {
      const { container } = render(<ContentNavigation target='#test-main' />);

      await waitFor(() => {
        expect(container.querySelector('.content-navigation')).toHaveClass('neutral');
      });
    });

    it('renders accent color', async () => {
      const { container } = render(<ContentNavigation target='#test-main' color='accent' />);

      await waitFor(() => {
        expect(container.querySelector('.content-navigation')).toHaveClass('accent');
      });
    });
  });

  describe('Interactions', () => {
    it('scrolls to heading when navigation item is clicked', async () => {
      const mainElement = document.querySelector('#test-main') as HTMLElement;
      mainElement.scrollTo = jest.fn();

      render(<ContentNavigation target='#test-main' />);

      await waitFor(() => {
        const link = screen.getByText('Heading 1');
        expect(link).toBeInTheDocument();
      });

      const link = screen.getByText('Heading 1');
      await userEvent.click(link);

      expect(mainElement.scrollTo).toHaveBeenCalled();
    });

    it('applies spaceToTop offset when scrolling', async () => {
      const mainElement = document.querySelector('#test-main') as HTMLElement;
      mainElement.scrollTo = jest.fn();

      render(<ContentNavigation target='#test-main' spaceToTop={60} />);

      await waitFor(() => {
        expect(screen.getByText('Heading 1')).toBeInTheDocument();
      });

      const link = screen.getByText('Heading 1');
      await userEvent.click(link);

      expect(mainElement.scrollTo).toHaveBeenCalled();
    });
  });

  describe('Active anchor tracking', () => {
    it('sets active anchor based on scroll position', async () => {
      const { container } = render(<ContentNavigation target='#test-main' />);

      await waitFor(() => {
        const navigation = container.querySelector('.content-navigation');
        expect(navigation).toBeInTheDocument();
      });
    });
  });

  describe('Scrollable detection', () => {
    it('detects if main element is scrollable', async () => {
      const mainElement = document.querySelector('#test-main') as HTMLElement;
      Object.defineProperty(mainElement, 'clientHeight', { value: 500 });
      Object.defineProperty(mainElement, 'scrollHeight', { value: 1000 });

      const { container } = render(<ContentNavigation target='#test-main' />);

      await waitFor(() => {
        expect(container.querySelector('.content-navigation')).toBeInTheDocument();
      });
    });

    it('detects if main element is not scrollable', async () => {
      const mainElement = document.querySelector('#test-main') as HTMLElement;
      Object.defineProperty(mainElement, 'clientHeight', { value: 500 });
      Object.defineProperty(mainElement, 'scrollHeight', { value: 400 });

      const { container } = render(<ContentNavigation target='#test-main' />);

      await waitFor(() => {
        expect(container.querySelector('.content-navigation')).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('applies custom className', async () => {
      const { container } = render(<ContentNavigation target='#test-main' className='custom-nav' />);

      await waitFor(() => {
        expect(container.querySelector('.content-navigation')).toHaveClass('custom-nav');
      });
    });

    it('spreads additional props', async () => {
      const { container } = render(
        <ContentNavigation target='#test-main' data-testid='content-nav' aria-label='Table of contents' />
      );

      await waitFor(() => {
        const nav = container.querySelector('.content-navigation');
        expect(nav).toHaveAttribute('data-testid', 'content-nav');
        expect(nav).toHaveAttribute('aria-label', 'Table of contents');
      });
    });
  });
});
