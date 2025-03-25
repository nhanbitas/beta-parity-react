'use client';

import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import './index.css';
import './variables.css';

// =========================
// ContentNavigation
// =========================
// Declare and export select type and ContentNavigation component

/**
 * Props for the ContentNavigation component.
 *
 * Extends properties from HTMLElement.
 */
export interface ContentNavigationProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * The target element or CSS selector for the main container that contains the headings.
   * Can be either a CSS selector string or an HTMLElement reference.
   *
   * @default 'main' - The main element of the document
   * @memberof ContentNavigationProps
   */
  target?: string | HTMLElement | null;

  /**
   * The space (in pixels) to maintain from the top of the viewport
   * when scrolling to a heading.
   *
   * @default 0
   * @memberof ContentNavigationProps
   */
  spaceToTop?: number;

  /**
   * Custom skeleton loader component to display while content is loading.
   *
   * @memberof ContentNavigationProps
   */
  skeleton?: React.ReactNode;

  /**
   * The color theme for the navigation.
   * Can be either 'neutral' or 'accent'.
   *
   * @default 'neutral'
   * @memberof ContentNavigationProps
   */
  color?: 'neutral' | 'accent';
}

/**
 * **Content Navigation Component**
 *
 * A navigation component that automatically generates a table of contents
 * from H2 and H3 headings within a specified container. It provides smooth
 * scrolling navigation and highlights the current section in view.
 *
 * @example
 * ```tsx
 * <ContentNavigation
 *   target="#main-content"
 *   spaceToTop={60}
 *   color="accent"
 * />
 * ```
 *
 * @see {@link http://localhost:3005/content-navigation Content Navigation}
 */
export const ContentNavigation: React.FC<ContentNavigationProps> = ({
  target = 'main',
  spaceToTop = 0,
  className,
  color = 'neutral',
  skeleton, // Default skeleton loader
  ...props
}) => {
  const [anchors, setAnchors] = useState<HTMLElement[]>([]);
  const [activeAnchor, setActiveAnchor] = useState<string | null>(null);
  const [scrollable, setScrollable] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  const observerRef = useRef<IntersectionObserver | null>(null);
  const mainRef = useRef<HTMLElement | null>(null);

  // Initialize the component
  useEffect(() => {
    const mainElement = typeof target === 'string' ? (document.querySelector(target) as HTMLElement | null) : target;
    if (!mainElement) {
      setLoading(false); // Stop loading if the target is not found
      return;
    }

    mainRef.current = mainElement;
    const anchorElements = Array.from(mainElement.querySelectorAll('h2, h3')) as HTMLElement[];
    setAnchors(anchorElements);

    // Check if the main element is scrollable
    setScrollable(mainElement.clientHeight < mainElement.scrollHeight);

    // Create IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveAnchor(entry.target.getAttribute('data-specified-anchor') || null);
          }
        });
      },
      {
        root: mainElement.clientHeight < mainElement.scrollHeight ? mainElement : null,
        rootMargin: `0px 0px ${-90 + (spaceToTop / window.innerHeight) * 100}% 0px`,
        threshold: 0
      }
    );

    observerRef.current = observer;

    // Observe anchors
    anchorElements.forEach((anchor) => {
      const specifiedAnchor =
        anchor.getAttribute('data-specified-anchor') ||
        `anchor-${anchor.textContent?.toLowerCase().replace(/\s+/g, '-')}`;
      anchor.setAttribute('data-specified-anchor', specifiedAnchor);
      observer.observe(anchor);
    });

    setLoading(false); // Stop loading once anchors are set

    return () => {
      observer.disconnect();
    };
  }, [target, spaceToTop]);

  // Handle navigation item click
  const handleNavItemClick = (anchor: HTMLElement) => {
    const rect = anchor.getBoundingClientRect();
    const mainElement = mainRef.current;

    if (mainElement && scrollable) {
      const mainRect = mainElement.getBoundingClientRect();
      const topSpace = rect.top - mainRect.top + mainElement.scrollTop - spaceToTop;
      mainElement.scrollTo({ top: topSpace, behavior: 'smooth' });
    } else {
      const topSpace = rect.top + window.scrollY - spaceToTop;
      window.scrollTo({ top: topSpace, behavior: 'smooth' });
    }
  };

  if (loading) return <>{skeleton}</>;

  return (
    <nav className={classNames('content-navigation', className, color)} aria-label='Content Navigation' {...props}>
      <ul className='content-navigation-list'>
        {anchors.map((anchor) => {
          const specifiedAnchor = anchor.getAttribute('data-specified-anchor')!;
          const isActive = activeAnchor === specifiedAnchor;
          return (
            <li key={specifiedAnchor}>
              <button
                className={classNames('content-navigation-item', {
                  'content-navigation-item-active': isActive,
                  'content-navigation-item-heading': anchor.tagName === 'H2'
                })}
                onClick={() => handleNavItemClick(anchor)}
                aria-label={specifiedAnchor}
              >
                <span className='content-navigation-item-text'>{anchor.textContent}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
