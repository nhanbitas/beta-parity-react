'use client';

import React, { useState } from 'react';
import classNames from 'classnames';

import './index.css';
import './variables.css';
import { ChevronRight, Minus } from 'lucide-react';

import { Animation } from '../Animation';

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
  href?: string;
  children?: TreeNavigationItem[];
  defaultExpanded?: boolean;
  defaultActive?: true;
}

/**
 * **Tree Navigation Component**
 *
 * A component that renders a hierarchical navigation tree
 * from a provided list of items. It supports expandable/collapsible
 * sections and smooth scrolling to the selected section.
 *
 * @example
 * ```tsx
 * <TreeNavigation
 *   items={[
 *     { id: 'overview', title: 'Overview' },
 *     {
 *       id: 'details',
 *       title: 'Details',
 *       children: [
 *         { id: 'specifications', title: 'Specifications' },
 *         { id: 'features', title: 'Features' }
 *       ]
 *     }
 *   ]}
 *   color="primary"
 * />
 * ```
 *
 * @see {@link http://localhost:3005/tree-navigation Tree Navigation Documentation}
 */
export const TreeNavigation: React.FC<TreeNavigationProps> = ({ className, color = 'neutral', items, ...props }) => {
  // Create initial active anchor
  const getInitialActiveAnchor = (items: TreeNavigationItem[]): string | null => {
    let activeId: string | null = null;

    const findActiveItem = (items: TreeNavigationItem[]) => {
      for (const item of items) {
        if (item.defaultActive) {
          activeId = item.id;
          return;
        }
        if (item.children) {
          findActiveItem(item.children);
        }
      }
    };

    findActiveItem(items);
    return activeId;
  };
  // Create initial expanded items set
  const getInitialExpandedItems = (items: TreeNavigationItem[]): Set<string> => {
    const expandedIds = new Set<string>();

    const processItems = (items: TreeNavigationItem[]) => {
      items.forEach((item) => {
        if (item.defaultExpanded && item.children) {
          expandedIds.add(item.id);
        }
        if (item.children) {
          processItems(item.children);
        }
      });
    };

    processItems(items);
    return expandedIds;
  };

  const [activeAnchor, setActiveAnchor] = useState<string | null>(() => getInitialActiveAnchor(items));
  const [expandedItems, setExpandedItems] = useState<Set<string>>(() => getInitialExpandedItems(items));

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
            {item.href ? (
              <a
                href={item.href}
                className={classNames('tree-navigation-item-text')}
                aria-label={item.title}
                onClick={(e) => {
                  // If it's a same-page anchor link, prevent default navigation
                  if (item.href?.startsWith('#')) {
                    e.preventDefault();
                    handleNavItemClick(item.id);
                  }
                  // For external links, just set active state before navigation
                  setActiveAnchor(item.id);
                }}
              >
                <span>{item.title}</span>
              </a>
            ) : (
              <button
                className={classNames('tree-navigation-item-text')}
                aria-label={item.title}
                onClick={() => handleNavItemClick(item.id)}
              >
                <span>{item.title}</span>
              </button>
            )}

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

          {hasChildren && (
            <Animation in={isExpanded} easing='ease-in-out' timeout={150} unmountOnExit>
              <ul className='tree-navigation-sublist'>{renderItems(item.children || [], true)}</ul>
            </Animation>
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
