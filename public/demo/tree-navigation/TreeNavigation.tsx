'use client';

import { TreeNavigation, TreeNavigationItem } from 'beta-parity-react/ui/TreeNavigation';
import React from 'react';

type Props = {};

const mockItems: TreeNavigationItem[] = [
  {
    id: 'introduction',
    title: 'Introduction',
    defaultExpanded: true,
    children: [
      { id: 'about-opera', title: 'About Opera', defaultActive: true, href: 'http://localhost:3005/tree-navigation' },
      { id: 'key-features', title: 'Key features', href: '#' },
      { id: 'release-notes', title: 'Release notes' }
    ]
  },
  {
    id: 'getting-started',
    title: 'Getting started',
    defaultExpanded: true,
    children: [
      {
        id: 'installation-guide',
        title: 'Installation guide',
        defaultExpanded: true,
        children: [
          {
            id: 'prerequisites',
            title: 'Prerequisites (consult your IT department for assistance)',
            children: [
              { id: 'hardware', title: 'Hardware' },
              { id: 'operating-system', title: 'Operating system' }
            ]
          },
          { id: 'installation-steps', title: 'Installation steps' },
          {
            id: 'additional-configurations',
            title: 'Additional configurations',
            children: [
              { id: 'usage-modes', title: 'Usage modes' },
              { id: 'preferences', title: 'Preferences' }
            ]
          }
        ]
      }
    ]
  }
];

export const TreeNavigationDemo = (props: Props) => {
  return (
    <div className='not-prose'>
      <TreeNavigation items={mockItems} />
    </div>
  );
};

export default TreeNavigationDemo;
