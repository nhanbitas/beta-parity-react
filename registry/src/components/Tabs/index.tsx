import React from 'react';
import classNames from 'classnames';
import './index.css';
import './variables.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../Button';
import useDebounce from '../hooks/useDebounce';

// =========================
// Tabs
// =========================
// Declare and export Tabs type and Tabs component

const sizeMap = {
  sm: 'small',
  md: 'medium'
  // lg: 'large' // **REMOVED
};

const colorMap = {
  neutral: 'neutral',
  accent: 'accent'
};

/**
 * Props for the TabItem component.
 */
export type TabItemProps = {
  /**
   * The unique value of the tab item, used for identification.
   *
   * @required
   * @memberof TabItemProps
   */
  value: string | number;

  /**
   * The title displayed for the tab.
   *
   * @required
   * @memberof TabItemProps
   */
  title: string | React.ReactNode;

  /**
   * The content displayed when the tab is active.
   *
   * @required
   * @memberof TabItemProps
   */
  content: string | React.ReactNode;

  /**
   * Whether the tab is currently active.
   *
   * @memberof TabItemProps
   */
  active?: boolean;

  /**
   * Whether the tab is disabled.
   *
   * @memberof TabItemProps
   */
  disabled?: boolean;

  /**
   * Props for the button element controlling the tab.
   *
   * @memberof TabItemProps
   */
  buttonProps?: React.HTMLAttributes<HTMLButtonElement>;

  /**
   * Props for the content container of the tab.
   *
   * @memberof TabItemProps
   */
  contentProps?: React.HTMLAttributes<HTMLDivElement>;
};

/**
 * Props for the Tabs component.
 *
 * Extends properties from the `div` element.
 */
export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Array of tab items to render within the tabs.
   *
   * @memberof TabsProps
   */
  data?: TabItemProps[];

  /**
   * The size of the tabs, can be one of the keys from the sizeMap.
   *
   * @default  'md'
   * @memberof TabsProps
   */
  size?: keyof typeof sizeMap;

  /**
   * The color of the tabs, can be one of the keys from the colorMap.
   *
   * @default 'neutral'
   * @memberof TabsProps
   */
  color?: keyof typeof colorMap;

  /**
   * The theme of the tabs, such as default or alternative.
   *
   * @default 'default'
   * @memberof TabsProps
   */
  theme?: 'default' | 'alternative';

  /**
   * The side where the tabs are positioned.
   *
   * @default 'left'
   * @memberof TabsProps
   */
  side?: 'left' | 'right' | 'top' | 'bottom';

  /**
   * Whether the tabs are flipped abs-nav border.
   *
   * @default false
   * @memberof TabsProps
   */
  flipped?: boolean;

  /**
   * Determines the side of button indicator in the comparison with the tabs-nav border.
   *
   * @default 'same'
   * @memberof TabsProps
   */
  indicatorSide?: 'same' | 'opposite';

  /**
   * Props for the navigation container of the tabs.
   *
   * @memberof TabsProps
   */
  navProps?: React.HTMLAttributes<HTMLDivElement>;

  /**
   * Props for the body container of the tabs.
   *
   * @memberof TabsProps
   */
  bodyProps?: React.HTMLAttributes<HTMLDivElement>;

  /**
   * Scroll configuration for the tab navigation.
   * Value is number of px to scroll and duration in ms, default 4px for 1ms
   *
   * @default scrollValue = { value: 4, duration: 1 }
   * @memberof TabsProps
   */
  scrollValue?: {
    value: number;
    duration: number;
  };
}

/**
 * **Parity Tabs**.
 *
 *  @see {@link http://localhost:3005/tabs Parity Tabs}
 */
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
      flipped = false,
      indicatorSide = 'same',
      scrollValue = { value: 4, duration: 1 },
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

    // ========================= Pressed scroll buttons ========================= //
    const intervalRef = React.useRef<NodeJS.Timeout | null>(null);
    const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

    const handleDisableBtn = (container?: HTMLDivElement | null) => {
      if (container) {
        const { scrollWidth, clientWidth, scrollLeft } = container;
        setDisableBtn({
          left: scrollLeft === 0,
          right: scrollLeft + clientWidth + 1 >= scrollWidth
        });
      }
    };

    const handleScroll = (type: '+' | '-', isInterval?: boolean) => {
      if (containerRef.current && !isInterval) {
        containerRef.current.scrollBy({ left: type === '+' ? 200 : -200, behavior: 'smooth' });
      }

      if (isInterval) {
        containerRef.current?.scrollBy({
          left: type === '+' ? scrollValue.value : -scrollValue.value,
          behavior: 'instant'
        });
      }
    };

    const handleBtnWhenScroll = useDebounce(() => handleDisableBtn(containerRef.current), 150);

    const startInterval = (type: '+' | '-') => {
      handleScroll(type);
      timeoutRef.current = setTimeout(
        () => (intervalRef.current = setInterval(() => handleScroll(type, true), scrollValue.duration)),
        250
      );
    };

    const stopInterval = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };

    React.useEffect(() => {
      checkOverflow();
      const handleResize = () => {
        checkOverflow();
        handleDisableBtn(containerRef.current);
      };

      const resizeObserver = new ResizeObserver(() => handleResize());

      if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
        containerRef.current.addEventListener('scroll', handleBtnWhenScroll);
      }

      return () => {
        resizeObserver.disconnect();
        containerRef.current?.removeEventListener('scroll', handleBtnWhenScroll);
      };
    }, []);

    const generateScrollBtnProps = (type: '+' | '-') => {
      return {
        iconOnly: true,
        className: type === '+' ? 'scroll-right' : 'scroll-left',
        onKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleScroll(type);
          }
        },
        onMouseDown: () => startInterval(type),
        onMouseUp: () => stopInterval(),
        onMouseLeave: () => stopInterval(),
        color: 'neutral',
        kind: 'ghost',
        size: 'sm',
        disabled: type === '+' ? disableBtn.right : disableBtn.left
      } as React.ComponentProps<typeof Button>;
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
        <div className={classNames('tabs-nav-wrapper', { flipped: flipped }, indicatorSide)}>
          <div className={classNames('tabs-nav')} {...navProps} ref={containerRef}>
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
                  className={classNames(isActive ? 'active' : '')}
                  disabled={item.disabled}
                >
                  {item.title}
                </TabButton>
              );
            })}
          </div>
          {isScroll && direction === 'horizontal' && (
            <div className='tabs-nav-scroll-actions'>
              <Button {...generateScrollBtnProps('-')}>
                <ChevronLeft className='arrow-right' />
              </Button>
              <Button {...generateScrollBtnProps('+')}>
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

/**
 * Props for the TabButton component.
 *
 * Extends properties from the `button` element.
 */
export interface TabButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The value of the tab button,
   * which is used to sync with the tab content to show the correct tab content.
   *
   * @required
   * @memberof TabButtonProps
   */
  value: string | number;

  /**
   * The active state of the tab button.
   *
   * @memberof TabButtonProps
   */
  active?: boolean;

  /**
   * The animation direction of the tab button.
   *
   * @memberof TabButtonProps
   */
  amimatedDirection?: 'from-right' | 'from-left' | 'from-top' | 'from-bottom';
}

/**
 * **Parity TabButton**.
 *
 *  @see {@link http://localhost:3005/tabs Parity TabButton}
 */
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
  /**
   * The value of the tab content,
   * which is used to sync with the tab button to show the correct tab content.
   *
   * @required
   * @memberof TabContentProps
   */
  value: string | number;
}

/**
 * **Parity TabContent**.
 *
 *  @see {@link http://localhost:3005/tabs Parity TabContent}
 */
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
    activeTabIndex > preIndex.current ? animationMap[direction].larger : animationMap[direction].smaller;
  currentActiveAnimation =
    activeTabIndex < preIndex.current ? animationMap[direction].smaller : animationMap[direction].larger;
  return currentActiveAnimation as 'from-right' | 'from-left' | 'from-top' | 'from-bottom';
};
