import { ContentNavigation } from 'beta-parity-react/ui/ContentNavigation';
import React from 'react';

type Props = {};

export const DemoContentNavigation = (props: Props) => {
  return (
    <div className='not-prose grid grid-cols-4'>
      <div id='main-content' className='col-span-3 h-screen overflow-auto border p-4'>
        <h2>Section 1</h2>
        <div className='h-3/4'>Content for section 1...</div>
        <h3>Subsection 1.1</h3>
        <div className='h-3/4'>Content for section 1.1...</div>
        <h3>Subsection 1.2</h3>
        <div className='h-3/4'>Content for section 1.2...</div>
        <h2>Section 2</h2>
        <div className='h-3/4'>Content for section 2...</div>
        <h2>Section 3</h2>
        <div className='h-3/4'>Content for section 3...</div>
        <h3>Subsection 3.1</h3>
        <div className='h-3/4'>Content for section 3.1...</div>
        <h3>Subsection 3.2</h3>
        <div className='h-3/4'>Content for section 3.2...</div>
        <h3>Subsection 3.3</h3>
        <div className='h-3/4'>Content for section 3.3...</div>
        <h2>Section 4</h2>
        <div className='h-3/4'>Content for section 4...</div>
      </div>

      <div className='relative col-span-1'>
        <ContentNavigation
          className='sticky top-0 col-span-1'
          target='#main-content'
          spaceToTop={50}
          skeleton={<div className='h-20'>Loading...</div>}
        />
      </div>
    </div>
  );
};
