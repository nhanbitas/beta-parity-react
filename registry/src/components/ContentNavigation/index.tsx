'use client';

import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import './index.css';
import './variables.css';

export interface ContentNavigationProps extends React.HTMLAttributes<HTMLElement> {
  target?: string; // CSS selector for the main container
  spaceToTop?: number; // Space to maintain from the top when scrolling
  skeleton?: React.ReactNode; // Custom skeleton loader
}

export const ContentNavigation: React.FC<ContentNavigationProps> = ({
  target = 'main',
  spaceToTop = 0,
  className,
  skeleton = <div className='skeleton-loader'>Loading...</div>, // Default skeleton loader
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
    const mainElement = document.querySelector(target) as HTMLElement | null;
    if (!mainElement) {
      setLoading(false); // Stop loading if the target is not found
      return;
    }

    mainRef.current = mainElement;
    const anchorElements = Array.from(mainElement.querySelectorAll('h2, h3')) as HTMLElement[];
    setAnchors(anchorElements);
    console.log(mainElement.clientHeight, mainElement.scrollHeight);
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
        rootMargin: `${-90 + (spaceToTop / window.innerHeight) * 100}% 0px 0px 0px`,
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

  if (loading) {
    return <>{skeleton}</>; // Render skeleton while loading
  }

  return (
    <nav className={classNames('content-navigation', className)} aria-label='Content Navigation' {...props}>
      <ul className='content-navigation-list'>
        {anchors.map((anchor, index) => {
          const specifiedAnchor = anchor.getAttribute('data-specified-anchor')!;
          const isActive = activeAnchor === specifiedAnchor;

          return (
            <li
              key={specifiedAnchor}
              className={classNames('content-navigation-item', {
                'content-navigation-item-active': isActive,
                'content-navigation-item-heading': anchor.tagName === 'H2'
              })}
            >
              <button
                className='content-navigation-link'
                onClick={() => handleNavItemClick(anchor)}
                aria-label={specifiedAnchor}
              >
                {anchor.textContent}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
