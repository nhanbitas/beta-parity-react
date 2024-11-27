'use client';

import React from 'react';
import classNames from 'classnames';
import './index.css';
import './variables.css';

export type TabItemProps = {
  active?: boolean;
  disabled?: boolean;
  id: string | number;
  title: string | React.ReactNode;
  content: string | React.ReactNode;
};

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  data: TabItemProps[];
  size?: keyof typeof sizeMap;
  color?: keyof typeof colorMap;
  theme?: 'default' | 'alternative';
  side?: 'left' | 'right' | 'top' | 'bottom';
  flip?: boolean;
  navProps?: React.HTMLAttributes<HTMLDivElement>;
  bodyProps?: React.HTMLAttributes<HTMLDivElement>;
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
  (
    {
      className,
      children,
      data,
      color = 'neutral',
      theme = 'default',
      size = 'md',
      side = 'left',
      flip = false,
      navProps,
      bodyProps,
      ...props
    },
    ref
  ) => {
    const [activeTabIndex, setActiveTabIndex] = React.useState(
      data.findIndex((item) => item.active) > 0 ? data.findIndex((item) => item.active) : 0
    );
    const preIndex = React.useRef(0);
    const direction = ['left', 'right'].includes(side) ? 'vertical' : 'horizontal'; // return direction of nav items
    const handleClick = (id: number) => {
      setActiveTabIndex((pre) => {
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
          direction,
          side,
          colorMap[color as keyof typeof colorMap],
          sizeMap[size as keyof typeof sizeMap]
        )}
        ref={ref}
        {...props}
      >
        <div className={classNames('tabs-nav', { flipped: flip })} {...navProps}>
          {data.map((item, index) => {
            const isActive = activeTabIndex === index;
            const otherAnimation = generateOtherAnimation({ direction, activeTabIndex, index });
            const activeAnimation = generateActiveAnimation({ direction, activeTabIndex, preIndex });
            return (
              <TabButton
                key={item.id}
                amimatedDirection={isActive ? activeAnimation : otherAnimation}
                onClick={() => handleClick(index)}
                className={classNames('tab-button', isActive ? 'active' : '')}
                disabled={item.disabled}
              >
                {item.title}
              </TabButton>
            );
          })}
        </div>
        <div className='tabs-body' {...bodyProps}>
          {data.map((item, index) => {
            const isActive = activeTabIndex === index;
            return isActive && <TabContent key={item.id}>{item.content}</TabContent>;
          })}
        </div>
      </div>
    );
  }
);

Tabs.displayName = 'Tabs';

export interface TabButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  amimatedDirection?: 'from-right' | 'from-left' | 'from-top' | 'from-bottom';
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

const animationMap = {
  horizontal: {
    larger: 'from-left',
    smaller: 'from-right'
  },
  vertical: {
    larger: 'from-top',
    smaller: 'from-bottom'
  }
};

const generateOtherAnimation = ({
  direction,
  activeTabIndex,
  index
}: {
  direction: 'horizontal' | 'vertical';
  activeTabIndex: number;
  index: number;
}) => {
  let amimatedDirection = activeTabIndex < index ? animationMap[direction].larger : animationMap[direction].smaller;
  amimatedDirection = activeTabIndex > index ? animationMap[direction].smaller : animationMap[direction].larger;

  return amimatedDirection as 'from-right' | 'from-left' | 'from-top' | 'from-bottom';
};

const generateActiveAnimation = ({
  direction,
  activeTabIndex,
  preIndex
}: {
  direction: 'horizontal' | 'vertical';
  activeTabIndex: number;
  preIndex: React.MutableRefObject<number>;
}) => {
  let currentActiveAnimation =
    preIndex.current < activeTabIndex ? animationMap[direction].larger : animationMap[direction].smaller;
  currentActiveAnimation =
    preIndex.current > activeTabIndex ? animationMap[direction].smaller : animationMap[direction].larger;
  return currentActiveAnimation as 'from-right' | 'from-left' | 'from-top' | 'from-bottom';
};
