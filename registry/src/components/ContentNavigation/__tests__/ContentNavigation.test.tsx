import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ContentNavigation } from '../index';

// Mock IntersectionObserver
class MockIntersectionObserver {
  readonly root: Element | null;
  readonly rootMargin: string;
  readonly thresholds: ReadonlyArray<number>;

  callback: IntersectionObserverCallback;
  elements: Set<Element>;

  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    this.callback = callback;
    this.root = options?.root || null;
    this.rootMargin = options?.rootMargin || '0px';
    this.thresholds = Array.isArray(options?.threshold) ? options.threshold : [options?.threshold || 0];
    this.elements = new Set();
  }

  observe(element: Element): void {
    this.elements.add(element);
  }

  unobserve(element: Element): void {
    this.elements.delete(element);
  }

  disconnect(): void {
    this.elements.clear();
  }

  // Helper method for tests to simulate intersection
  triggerIntersection(entries: IntersectionObserverEntry[]): void {
    this.callback(entries, this);
  }
}

// Set up mock
global.IntersectionObserver = MockIntersectionObserver as any;

// Helper function to create mock heading elements
const createMockHeading = (tag: string, text: string, anchor?: string): HTMLElement => {
  const heading = document.createElement(tag);
  heading.textContent = text;
  if (anchor) {
    heading.setAttribute('data-specified-anchor', anchor);
  }
  return heading;
};

// Mock scrollTo functions
const mockScrollTo = jest.fn();
window.scrollTo = mockScrollTo;

describe('ContentNavigation Component', () => {
  // Set up a mock target element with headings
  let mockTarget: HTMLElement;

  beforeEach(() => {
    // Create a mock main element with headings
    mockTarget = document.createElement('main');
    mockTarget.id = 'mock-main';

    // Add mock headings
    const heading1 = createMockHeading('h2', 'Introduction');
    const heading2 = createMockHeading('h3', 'Getting Started');
    const heading3 = createMockHeading('h2', 'Features', 'features-section');
    const heading4 = createMockHeading('h3', 'Advanced Usage');

    mockTarget.append(heading1, heading2, heading3, heading4);
    document.body.appendChild(mockTarget);

    // Mock scrollTo function for the element
    mockTarget.scrollTo = mockScrollTo;

    // Mock getBoundingClientRect
    const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;
    Element.prototype.getBoundingClientRect = jest.fn().mockImplementation(function () {
      if (this === mockTarget) {
        return { top: 0, right: 800, bottom: 600, left: 0, width: 800, height: 600, x: 0, y: 0 };
      }
      return { top: 100, right: 700, bottom: 140, left: 100, width: 600, height: 40, x: 100, y: 100 };
    });

    // Clean up mocks after test
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    document.body.removeChild(mockTarget);
    jest.clearAllMocks();
  });

  test('renders skeleton while loading', () => {
    const mockSkeleton = <div data-testid='mock-skeleton'>Loading...</div>;
    render(<ContentNavigation skeleton={mockSkeleton} />);

    expect(screen.getByTestId('mock-skeleton')).toBeInTheDocument();
  });

  test('renders navigation list with correct headings', async () => {
    render(<ContentNavigation target={mockTarget} />);

    // Wait for component to parse headings
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // Check that all headings are rendered
    expect(screen.getByText('Introduction')).toBeInTheDocument();
    expect(screen.getByText('Getting Started')).toBeInTheDocument();
    expect(screen.getByText('Features')).toBeInTheDocument();
    expect(screen.getByText('Advanced Usage')).toBeInTheDocument();
  });

  test('applies active class when heading is in view', async () => {
    render(<ContentNavigation target={mockTarget} />);

    // Wait for component to parse headings
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // Get all observers
    const observers = Array.from(document.querySelectorAll('h2, h3')).map((el) => {
      const observerEntry = {
        target: el,
        isIntersecting: false,
        boundingClientRect: {} as DOMRectReadOnly,
        intersectionRatio: 0,
        intersectionRect: {} as DOMRectReadOnly,
        rootBounds: null,
        time: 0
      };
      return observerEntry;
    });

    // Simulate first heading becoming visible
    const observer = (window.IntersectionObserver as any).mock.instances[0];
    const firstHeadingEntry = { ...observers[0], isIntersecting: true };

    act(() => {
      observer.triggerIntersection([firstHeadingEntry]);
    });

    // Check that the first nav item is active
    const firstNavItem = screen.getByText('Introduction').closest('button');
    expect(firstNavItem).toHaveClass('content-navigation-item-active');

    // Simulate third heading becoming visible
    const thirdHeadingEntry = { ...observers[2], isIntersecting: true };

    act(() => {
      observer.triggerIntersection([thirdHeadingEntry]);
    });

    // Check that the third nav item is active
    const thirdNavItem = screen.getByText('Features').closest('button');
    expect(thirdNavItem).toHaveClass('content-navigation-item-active');
  });

  test('scrolls to heading when nav item is clicked', async () => {
    render(<ContentNavigation target={mockTarget} spaceToTop={50} />);

    // Wait for component to parse headings
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // Click on a nav item
    fireEvent.click(screen.getByText('Features'));

    // Check that scrollTo was called with the correct arguments
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: expect.any(Number),
      behavior: 'smooth'
    });
  });

  test('scrolls target element when it is scrollable', async () => {
    // Make the target element scrollable
    Object.defineProperty(mockTarget, 'clientHeight', { value: 300 });
    Object.defineProperty(mockTarget, 'scrollHeight', { value: 1000 });

    render(<ContentNavigation target={mockTarget} />);

    // Wait for component to parse headings
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // Click on a nav item
    fireEvent.click(screen.getByText('Features'));

    // Check that element.scrollTo was called instead of window.scrollTo
    expect(mockTarget.scrollTo).toHaveBeenCalled();
    expect(window.scrollTo).not.toHaveBeenCalled();
  });

  test('applies different color themes', async () => {
    const { rerender } = render(<ContentNavigation target={mockTarget} color='neutral' />);

    // Wait for component to parse headings
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    let navElement = screen.getByRole('navigation');
    expect(navElement).toHaveClass('neutral');

    rerender(<ContentNavigation target={mockTarget} color='accent' />);

    navElement = screen.getByRole('navigation');
    expect(navElement).toHaveClass('accent');
  });

  test('applies custom class name', async () => {
    render(<ContentNavigation target={mockTarget} className='custom-nav' />);

    // Wait for component to parse headings
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    const navElement = screen.getByRole('navigation');
    expect(navElement).toHaveClass('custom-nav');
  });

  test('handles target as CSS selector', async () => {
    render(<ContentNavigation target='#mock-main' />);

    // Wait for component to parse headings
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // Check that all headings are rendered
    expect(screen.getByText('Introduction')).toBeInTheDocument();
    expect(screen.getByText('Getting Started')).toBeInTheDocument();
  });

  test('renders nothing when target is not found', async () => {
    render(<ContentNavigation target='#non-existent' />);

    // Wait for component to try to parse headings
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // Check that no navigation items are rendered
    const navElement = screen.getByRole('navigation');
    expect(navElement.querySelector('.content-navigation-list')).toBeEmptyDOMElement();
  });

  test('marks h2 elements as headings with special class', async () => {
    render(<ContentNavigation target={mockTarget} />);

    // Wait for component to parse headings
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // Check that h2 elements have the heading class
    const introButton = screen.getByText('Introduction').closest('button');
    expect(introButton).toHaveClass('content-navigation-item-heading');

    const featuresButton = screen.getByText('Features').closest('button');
    expect(featuresButton).toHaveClass('content-navigation-item-heading');

    // h3 elements should not have the heading class
    const gettingStartedButton = screen.getByText('Getting Started').closest('button');
    expect(gettingStartedButton).not.toHaveClass('content-navigation-item-heading');
  });

  test('respects specified anchors in heading elements', async () => {
    render(<ContentNavigation target={mockTarget} />);

    // Wait for component to parse headings
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // Get all observers
    const observers = Array.from(document.querySelectorAll('h2, h3')).map((el) => {
      const observerEntry = {
        target: el,
        isIntersecting: false,
        boundingClientRect: {} as DOMRectReadOnly,
        intersectionRatio: 0,
        intersectionRect: {} as DOMRectReadOnly,
        rootBounds: null,
        time: 0
      };
      return observerEntry;
    });

    // Simulate third heading (with custom anchor) becoming visible
    const observer = (window.IntersectionObserver as any).mock.instances[0];
    const headingEntry = { ...observers[2], isIntersecting: true };

    act(() => {
      observer.triggerIntersection([headingEntry]);
    });

    // Check that the nav item with that anchor is active
    const navItem = screen.getByText('Features').closest('button');
    expect(navItem).toHaveClass('content-navigation-item-active');
  });
});
