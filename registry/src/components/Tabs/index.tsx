'use client';

import React from 'react';
import classNames from 'classnames';
import './index.css';
import './variables.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../Button';

// TODO: doc for types

export type TabItemProps = {
  value: string | number;
  title: string | React.ReactNode;
  content: string | React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  buttonProps?: React.HTMLAttributes<HTMLButtonElement>;
  contentProps?: React.HTMLAttributes<HTMLDivElement>;
};

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  data?: TabItemProps[];
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

// =========================
// Tabs
// =========================
// Declare and export Tabs type and Tabs component

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      className,
      children,
      data = [],
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

    // ========================= Convert Children to Data ========================= //
    if (children && React.Children.count(children) > 0) {
      React.Children.forEach(children, (child: React.ReactNode) => {
        if (React.isValidElement(child)) {
          if (child.type === TabButton) {
            const { value, children, disabled, active, ...rest } = child.props;
            const index = data.findIndex((item) => item.value === value);
            if (index > -1) {
              data[index].title = children;
              data[index].disabled = disabled;
              data[index].active = active;
              data[index].buttonProps = rest;
            } else {
              data.push({
                value,
                title: children,
                disabled,
                active,
                buttonProps: rest,
                content: '',
                contentProps: {}
              });
            }
          }

          if (child.type === TabContent) {
            const { value, children, ...rest } = child.props;
            const index = data.findIndex((item) => item.value === value);
            if (index > -1) {
              data[index].content = children;
              data[index].contentProps = rest;
            } else {
              data.push({
                value,
                title: '',
                disabled: false,
                active: false,
                buttonProps: {},
                content: children || '',
                contentProps: rest || {}
              });
            }
          }
        }
      });
    }

    // ========================= Hide or Unhide Scroll Buttons ========================= //
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const [isScroll, setIsScroll] = React.useState(false);
    const [disableBtn, setDisableBtn] = React.useState({
      left: false,
      right: false
    });

    const checkOverflow = () => {
      if (containerRef.current) {
        const { scrollWidth, clientWidth } = containerRef.current;
        setIsScroll(scrollWidth > clientWidth);
      }
    };

    const handleScrollLeft = () => {
      if (containerRef.current) {
        const { scrollWidth, clientWidth } = containerRef.current;
        containerRef.current.scrollLeft -= 200;
        setDisableBtn({
          left: containerRef.current.scrollLeft === 0,
          right: containerRef.current.scrollLeft + clientWidth + 1 >= scrollWidth
        });
      }
    };

    const handleScrollRight = () => {
      if (containerRef.current) {
        const { scrollWidth, clientWidth } = containerRef.current;
        containerRef.current.scrollLeft += 200;
        setDisableBtn({
          left: containerRef.current.scrollLeft === 0,
          right: containerRef.current.scrollLeft + clientWidth + 1 >= scrollWidth
        });
      }
    };

    React.useEffect(() => {
      checkOverflow();

      const handleResize = () => {
        checkOverflow();
      };

      const resizeObserver = new ResizeObserver(() => handleResize());

      if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
      }

      return () => {
        resizeObserver.disconnect();
      };
    }, []);

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
        <div className='tabs-nav-wrapper'>
          <div className={classNames('tabs-nav', { flipped: flip })} {...navProps} ref={containerRef}>
            {data.map((item, index) => {
              const isActive = activeTabIndex === index;
              const otherAnimation = generateOtherAnimation({ direction, activeTabIndex, index });
              const activeAnimation = generateActiveAnimation({ direction, activeTabIndex, preIndex });

              return (
                <TabButton
                  {...item.buttonProps}
                  key={item.value}
                  value={item.value}
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
          {isScroll && direction === 'horizontal' && (
            <div className='tabs-nav-scroll-actions'>
              <Button
                iconOnly
                className='scroll-left'
                onClick={handleScrollLeft}
                color={color}
                kind='ghost'
                size='sm'
                disabled={disableBtn.left}
              >
                <ChevronLeft className='arrow-right' />
              </Button>
              <Button
                iconOnly
                className='scroll-right'
                onClick={handleScrollRight}
                color={color}
                kind='ghost'
                size='sm'
                disabled={disableBtn.right}
              >
                <ChevronRight className='arrow-right' />
              </Button>
            </div>
          )}
        </div>

        <div className='tabs-body' {...bodyProps}>
          {data.map((item, index) => {
            const isActive = activeTabIndex === index;
            return (
              isActive && (
                <TabContent {...item.contentProps} key={item.value} value={item.value}>
                  {item.content}
                </TabContent>
              )
            );
          })}
        </div>
      </div>
    );
  }
);

Tabs.displayName = 'Tabs';

// =========================
// TabButton
// =========================
// Declare and export TabButton type and TabButton component

export interface TabButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string | number;
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

// =========================
// TabContent
// =========================
// Declare and export TabContent type and TabContent component

export interface TabContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string | number;
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
