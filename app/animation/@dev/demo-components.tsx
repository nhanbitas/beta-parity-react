'use client';

// Define  demo components
import { Animation } from 'beta-parity-react/ui/Animation';
import React from 'react';

type Props = {};

const templates = ['fade', 'slide', 'scale', 'flip', 'bounce', 'pulse', 'shake', 'tada', 'jello'] as any;

export const DemoFadeAnimation = (props: Props) => {
  return (
    <div className='not-prose flex flex-col flex-wrap gap-12'>
      {templates.map((template: any) => (
        <Animation key={template} template={template} in={true} appear={true} timeout={500}>
          <span>This is a {template} animation</span>
        </Animation>
      ))}
    </div>
  );
};
