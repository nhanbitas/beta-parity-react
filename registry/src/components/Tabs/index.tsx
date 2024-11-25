'use client';

import React from 'react';
import classNames from 'classnames';
import './index.css';
import './variables.css';

export type TabItemProps = {
  active?: boolean;
  id: string | number;
  title: string | React.ReactNode;
  content: string | React.ReactNode;
};

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  data: TabItemProps[];
  size?: keyof typeof sizeMap;
  color?: keyof typeof colorMap;
  theme?: 'default' | 'alternative';
}

const sizeMap = {
  sm: 'small',
  md: 'medium'
  // lg: 'large' // **REMOVED
};

const colorMap = {
  neutral: 'neutral',
  accent: 'accent'
};

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ className, children, data, color = 'neutral', theme = 'default', size = 'md', ...props }, ref) => {
    const [activeTab, setActiveTab] = React.useState(
      data.findIndex((item) => item.active) > 0 ? data.findIndex((item) => item.active) : 0
    );
    const preIndex = React.useRef(0);
    const handleClick = (id: number) => {
      setActiveTab((pre) => {
        preIndex.current = pre;
        return id;
      });
    };

    return (
      <div
        className={classNames(
          'tabs',
          className,
          theme,
          colorMap[color as keyof typeof colorMap],
          sizeMap[size as keyof typeof sizeMap]
        )}
        ref={ref}
        {...props}
      >
        <div className='tabs-nav'>
          {data.map((item, index) => {
            const isActive = activeTab === index;

            let amimatedDirection = activeTab < index ? 'from-left' : 'from-right';
            amimatedDirection = activeTab > index ? 'from-right' : 'from-left';
            let currentActiveAnimation = preIndex.current < activeTab ? 'from-left' : 'from-right';
            currentActiveAnimation = preIndex.current > activeTab ? 'from-right' : 'from-left';

            return (
              <TabButton
                key={item.id}
                amimatedDirection={isActive ? currentActiveAnimation : (amimatedDirection as any)}
                onClick={() => handleClick(index)}
                className={classNames('tab-button', isActive ? 'active' : '')}
              >
                {item.title}
              </TabButton>
            );
          })}
        </div>
        <div className='tabs-body'>
          {data.map((item, index) => {
            const isActive = activeTab === index;
            return isActive && <TabContent key={item.id}>{item.content}</TabContent>;
          })}
        </div>
      </div>
    );
  }
);

Tabs.displayName = 'Tabs';

export interface TabButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  amimatedDirection?: 'from-right' | 'from-left';
}

export const TabButton = React.forwardRef<HTMLButtonElement, TabButtonProps>(
  ({ className, children, amimatedDirection, ...props }, ref) => {
    return (
      <button className={classNames('tab-button', className, amimatedDirection)} type='button' ref={ref} {...props}>
        {children}
      </button>
    );
  }
);

TabButton.displayName = 'TabButton';

export interface TabContentProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
}

export const TabContent = React.forwardRef<HTMLDivElement, TabContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className={classNames('tab-content', className)} ref={ref} {...props}>
        {children}
      </div>
    );
  }
);

TabContent.displayName = 'TabContent';
