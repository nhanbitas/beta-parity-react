import { render, screen } from '@testing-library/react';
import { Portal } from './index';

describe('Portal Component', () => {
  describe('Rendering', () => {
    it('renders children in portal', () => {
      render(
        <Portal>
          <div data-testid="portal-content">Portal Content</div>
        </Portal>
      );
      expect(screen.getByTestId('portal-content')).toBeInTheDocument();
    });

    it('renders text content', () => {
      render(<Portal>Hello from portal</Portal>);
      expect(screen.getByText('Hello from portal')).toBeInTheDocument();
    });

    it('creates portal-container in document.body by default', () => {
      render(
        <Portal>
          <div>Content</div>
        </Portal>
      );
      const portalContainer = document.body.querySelector('.portal-container');
      expect(portalContainer).toBeInTheDocument();
    });
  });

  describe('Target prop', () => {
    it('renders portal in custom target', () => {
      const customTarget = document.createElement('div');
      customTarget.id = 'custom-portal-root';
      document.body.appendChild(customTarget);

      render(
        <Portal target={customTarget}>
          <div data-testid="custom-portal-content">Custom Portal</div>
        </Portal>
      );

      expect(screen.getByTestId('custom-portal-content')).toBeInTheDocument();
      const portalContainer = customTarget.querySelector('.portal-container');
      expect(portalContainer).toBeInTheDocument();

      document.body.removeChild(customTarget);
    });
  });

  describe('Cleanup', () => {
    it('removes portal container on unmount', () => {
      const { unmount } = render(
        <Portal>
          <div>Content</div>
        </Portal>
      );

      let portalContainer = document.body.querySelector('.portal-container');
      expect(portalContainer).toBeInTheDocument();

      unmount();

      portalContainer = document.body.querySelector('.portal-container');
      expect(portalContainer).not.toBeInTheDocument();
    });

    it('removes portal container from custom target on unmount', () => {
      const customTarget = document.createElement('div');
      document.body.appendChild(customTarget);

      const { unmount } = render(
        <Portal target={customTarget}>
          <div>Content</div>
        </Portal>
      );

      let portalContainer = customTarget.querySelector('.portal-container');
      expect(portalContainer).toBeInTheDocument();

      unmount();

      portalContainer = customTarget.querySelector('.portal-container');
      expect(portalContainer).not.toBeInTheDocument();

      document.body.removeChild(customTarget);
    });
  });

  describe('Multiple portals', () => {
    it('renders multiple portals independently', () => {
      render(
        <>
          <Portal>
            <div data-testid="portal-1">Portal 1</div>
          </Portal>
          <Portal>
            <div data-testid="portal-2">Portal 2</div>
          </Portal>
        </>
      );

      expect(screen.getByTestId('portal-1')).toBeInTheDocument();
      expect(screen.getByTestId('portal-2')).toBeInTheDocument();

      const portalContainers = document.body.querySelectorAll('.portal-container');
      expect(portalContainers.length).toBe(2);
    });
  });

  describe('Children rendering', () => {
    it('renders complex children', () => {
      render(
        <Portal>
          <div>
            <h1>Title</h1>
            <p>Paragraph</p>
            <button>Click me</button>
          </div>
        </Portal>
      );

      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Paragraph')).toBeInTheDocument();
      expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('renders multiple children', () => {
      render(
        <Portal>
          <div>First</div>
          <div>Second</div>
        </Portal>
      );

      expect(screen.getByText('First')).toBeInTheDocument();
      expect(screen.getByText('Second')).toBeInTheDocument();
    });
  });
});
