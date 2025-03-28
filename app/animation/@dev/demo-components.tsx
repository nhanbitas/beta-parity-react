'use client';

// Define  demo components
import { Animation } from 'beta-parity-react/ui/Animation';
import React from 'react';

type Props = {};

const templates = ['fade', 'slide', 'zoom', 'flip', 'bounce', 'pulse', 'shake', 'tada', 'jello'] as any;

export const DemoFadeAnimation = (props: Props) => {
  return (
    <div className='not-prose flex flex-col flex-wrap gap-12'>
      {templates.map((template: any) => (
        <Animation key={template} template={template} in={true} firstAnimation={true} timeout={1000}>
          <div>This is a {template} animation</div>
        </Animation>
      ))}
    </div>
  );
};
