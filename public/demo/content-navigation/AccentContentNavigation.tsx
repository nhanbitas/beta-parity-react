'use client';

import { ContentNavigation } from 'beta-parity-react/ui/ContentNavigation';
import React from 'react';

const loremText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const sections = [
  {
    title: 'Section 1',
    content: 'Content for section 1...',
    subsections: [
      { title: 'Subsection 1.1', content: loremText },
      { title: 'Subsection 1.2', content: loremText }
    ]
  },
  { title: 'Section 2', content: loremText, subsections: [] },
  {
    title: 'Section 3',
    content: 'Content for section 3...',
    subsections: [
      { title: 'Subsection 3.1', content: loremText },
      { title: 'Subsection 3.2', content: loremText },
      { title: 'Subsection 3.3', content: loremText }
    ]
  },
  { title: 'Section 4', content: loremText, subsections: [] }
];

export const AccentContentNavigation = () => {
  const [target, setTarget] = React.useState<HTMLElement | null>(null);

  return (
    <div className='not-prose grid grid-cols-4'>
      <div ref={setTarget} className='col-span-3 h-screen overflow-auto rounded border p-4'>
        {sections.map((section, i) => (
          <React.Fragment key={i}>
            <h2 className='font-bold'>{section.title}</h2>
            <div className='ml-4 h-3/4 opacity-75'>{section.content}</div>
            {section.subsections.map((subsection, j) => (
              <React.Fragment key={j}>
                <h3 className='font-bold'>{subsection.title}</h3>
                <div className='ml-4 h-3/4 opacity-75'>{subsection.content}</div>
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
      </div>
      <div className='relative col-span-1'>
        {target && <ContentNavigation className='sticky top-0 col-span-1' target={target} color='accent' />}
      </div>
    </div>
  );
};
