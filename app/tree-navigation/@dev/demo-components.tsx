'use client';

import { TreeNavigation } from 'beta-parity-react/ui/TreeNavigation';
import React from 'react';

type Props = {};

const mockItems = [
  {
    id: 'introduction',
    title: 'Introduction',
    children: [
      { id: 'about-opera', title: 'About Opera' },
      { id: 'release-notes', title: 'Release notes' }
    ]
  },
  {
    id: 'getting-started',
    title: 'Getting started',
    children: [
      {
        id: 'installation-guide',
        title: 'Installation guide',
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

export const DemoTreeNavigation = (props: Props) => {
  return (
    <div className='not-prose'>
      <TreeNavigation items={mockItems} />
    </div>
  );
};

export const DemoAccentTreeNavigation = () => {
  return (
    <div className='not-prose'>
      <TreeNavigation color='accent' items={mockItems} />
    </div>
  );
};
