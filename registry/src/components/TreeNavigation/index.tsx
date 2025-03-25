'use client';

import React, { useState } from 'react';
import classNames from 'classnames';

import './index.css';
import './variables.css';
import { ChevronRight, Minus } from 'lucide-react';

/**
 * Props for the TreeNavigation component.
 */
export interface TreeNavigationProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * The list of navigation items to display.
   * Each item can have a title, id, and optional children for nested headings.
   */
  items: TreeNavigationItem[];
}

/**
 * Represents a single navigation item.
 */
export interface TreeNavigationItem {
  id: string;
  title: string;
  children?: TreeNavigationItem[];
}

/**
 * **Tree Navigation Component**
 *
 * A navigation component that generates a table of contents
 * from a provided list of items. It provides smooth scrolling
 * navigation and highlights the current section in view.
 *
 * @example
 * ```tsx
 * <TreeNavigation
 *   items={[
 *     { id: 'introduction', title: 'Introduction' },
 *     {
 *       id: 'getting-started',
 *       title: 'Getting Started',
 *       children: [
 *         { id: 'installation', title: 'Installation' },
 *         { id: 'usage', title: 'Usage' }
 *       ]
 *     }
 *   ]}
 *   color="accent"
 * />
 * ```
 */
export const TreeNavigation: React.FC<TreeNavigationProps> = ({ className, color = 'neutral', items, ...props }) => {
  const [activeAnchor, setActiveAnchor] = useState<string | null>(null);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  // Handle navigation item click
  const handleNavItemClick = (id: string) => {
    setActiveAnchor(id);
    const targetElement = document.getElementById(id);
    if (targetElement) {
      const topSpace = targetElement.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: topSpace, behavior: 'smooth' });
    }
  };

  // Toggle expand/collapse for items with children
  const toggleExpand = (id: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Render navigation items recursively
  const renderItems = (items: TreeNavigationItem[], isSub?: Boolean) => {
    return items.map((item) => {
      const isActive = activeAnchor === item.id;
      const isExpanded = expandedItems.has(item.id);
      const hasChildren = !!item.children;

      return (
        <li
          key={item.id}
          className={classNames('tree-navigation-item', {
            'tree-navigation-item-active': isActive,
            'tree-navigation-subitem': isSub,
            expanded: isExpanded
          })}
          role='treeitem'
          aria-expanded={isExpanded}
          aria-selected={isActive}
        >
          <div
            className={classNames('tree-navigation-item-content', { active: isActive })}
            role='presentation'
            aria-hidden={!isActive}
          >
            <button
              className={classNames('tree-navigation-item-text')}
              aria-label={item.title}
              onClick={() => handleNavItemClick(item.id)}
            >
              <span> {item.title}</span>
            </button>

            <button
              className='tree-navigation-icon-button'
              tabIndex={-1}
              {...(hasChildren && {
                tabIndex: 0,
                onClick: (e) => {
                  toggleExpand(item.id, e);
                }
              })}
            >
              <span
                className={classNames('tree-navigation-icon', {
                  'icon-expanded': hasChildren && isExpanded,
                  'icon-collapsed': hasChildren && !isExpanded,
                  'icon-minus': !hasChildren
                })}
              >
                {hasChildren ? <ChevronRight /> : <Minus />}
              </span>
            </button>
          </div>

          {hasChildren && isExpanded && (
            <ul className='tree-navigation-sublist'>{renderItems(item.children || [], true)}</ul>
          )}
        </li>
      );
    });
  };

  return (
    <nav className={classNames('tree-navigation', className, color)} aria-label='Tree Navigation' {...props}>
      <ul className='tree-navigation-list'>{renderItems(items || [])}</ul>
    </nav>
  );
};
