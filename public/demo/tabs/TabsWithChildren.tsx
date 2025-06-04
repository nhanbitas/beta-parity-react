'use client';
import { TabButton, TabContent, Tabs as ParityTabs } from 'beta-parity-react/ui/Tabs';
import React from 'react';

type Props = {};

export const TabsWithChildren = (props: Props) => {
  return (
    <ParityTabs>
      <TabButton value='tab-1'>Tab 1</TabButton>
      <TabButton value='tab-2'>Tab 2</TabButton>
      <TabButton value='tab-3' disabled>
        Tab 3
      </TabButton>
      <TabButton value='tab-4'>Tab 4</TabButton>
      <TabContent value='tab-1'>
        <p>Content 1</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et dolore
          magna aliqua.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et dolore
          magna aliqua.
        </p>
      </TabContent>
      <TabContent value='tab-2'>
        <p>Content 2</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et dolore
          magna aliqua.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et dolore
          magna aliqua.
        </p>
      </TabContent>
      <TabContent value='tab-3'>
        <p>Content 2</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et dolore
          magna aliqua.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et dolore
          magna aliqua.
        </p>
      </TabContent>
      <TabContent value='tab-4'>
        <p>Content 2</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et dolore
          magna aliqua.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et dolore
          magna aliqua.
        </p>
      </TabContent>
    </ParityTabs>
  );
};
