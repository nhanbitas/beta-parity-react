import React, { ReactFragment } from 'react';
import classNames from 'classnames';
import './index.css';
import { Check, Search, ChevronUp, ChevronDown } from 'lucide-react';
import { Input } from '../Input';
import { Radio } from '../Radio';
import { Checkbox } from '../Checkbox';
import useKeyboard from '../hooks/useKeyboard';
import useDidMountEffect from '../hooks/useDidMountEffect';

const sizeMap = {
  sm: 'small',
  md: 'medium',
  lg: 'large'
};

const sizeHeightMap = {
  sm: 32,
  md: 40,
  lg: 48
};

export interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  size?: keyof typeof sizeMap;
  isLoading?: boolean;
  disabled?: boolean;
  isOpen?: boolean;
  searchable?: boolean;
  defaultSearch?: string;
  searchPlaceholder?: string;
  overflowLimit?: number;
  scrollIndicator?: boolean;
  trigger?: React.ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
}

export const Menu = React.forwardRef<HTMLDivElement, MenuProps>(
  (
    {
      className,
      children,
      isOpen = false,
      position = 'bottom',
      size = 'md',
      isLoading,
      disabled,
      defaultSearch = '',
      searchPlaceholder,
      searchable = false,
      overflowLimit,
      trigger,
      scrollIndicator = false,
      ...props
    },
    ref
  ) => {
    const searchRef = React.useRef<any>(null);
    const drowdownItemsRef = React.useRef<HTMLDivElement>(null);
    const [indicator, setIndicator] = React.useState({
      top: false,
      bottom: false
    });
    const [keyword, setKeyword] = React.useState<string>(defaultSearch);

    const handleFocus = (e: any) => {
      searchRef.current?.focus();
    };

    const handleIndicatorClick = (name: 'top' | 'bottom') => {
      if (drowdownItemsRef.current && name === 'top') {
        drowdownItemsRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }

      if (drowdownItemsRef.current && name === 'bottom') {
        drowdownItemsRef.current.scrollTo({ top: drowdownItemsRef.current.scrollHeight, behavior: 'smooth' });
      }
    };

    const filterChildren = (children: React.ReactNode, keyword = '') => {
      return React.Children.map(children, (child: React.ReactNode): React.ReactNode => {
        if (!React.isValidElement(child) || child.type === MenuHeader || child.type === MenuFooter) {
          return null;
        }

        const isValidItem = searchable
          ? child.props.value && child.props.value.toLowerCase().includes(keyword.toLowerCase())
          : true;

        if (isValidItem) {
          return child;
        } else if (child.props.children) {
          const filteredChildren = filterChildren(child.props.children, keyword);
          if (filteredChildren && React.Children.count(filteredChildren) > 0) {
            return React.cloneElement(child, { ...child.props }, filteredChildren);
          }
        }

        return null;
      });
    };

    const cloneChildren = filterChildren(children, keyword);
    const Header = getComponent(children, MenuHeader);
    const Footer = getComponent(children, MenuFooter);
    const isScrollable = !!overflowLimit;
    const isContainChildren = React.Children.count(searchable ? cloneChildren : children) > 0;

    React.useEffect(() => {
      let currentRef = drowdownItemsRef.current;
      const handleIndicator = () => {
        if (currentRef) {
          setIndicator({
            top: currentRef.scrollTop !== 0,
            bottom: currentRef.scrollHeight - currentRef.clientHeight - currentRef.scrollTop > 0
          });
        }
      };
      handleIndicator();
      currentRef && currentRef.addEventListener('scroll', handleIndicator);

      return () => {
        currentRef && currentRef.removeEventListener('scroll', handleIndicator);
      };
    }, [keyword]);

    return (
      <div
        className={classNames('menu', className, position, sizeMap[size as keyof typeof sizeMap])}
        ref={ref}
        data-open={isOpen}
        {...props}
      >
        {searchable ? (
          <MenuHeader>
            <Input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              ref={searchRef}
              type='text'
              wrapperProps={{
                leftElement: (
                  <span className='search-menu-btn' onClick={handleFocus}>
                    <Search />
                  </span>
                )
              }}
              isClearable
              placeholder={searchPlaceholder || ''}
              className='menu-item-search'
            />
          </MenuHeader>
        ) : (
          Header
        )}

        <div
          className='menu-items'
          ref={drowdownItemsRef}
          style={{
            overflow: isScrollable ? 'auto' : 'hidden',
            maxHeight: (isScrollable && (sizeHeightMap[size as keyof typeof sizeMap] + 4) * overflowLimit) || 'auto',
            ...props.style
          }}
        >
          {isScrollable && isContainChildren && scrollIndicator ? (
            <MenuIndicator position='top' isActive={indicator.top} onClick={() => handleIndicatorClick('top')} />
          ) : null}

          {cloneChildren}

          {isScrollable && isContainChildren && scrollIndicator ? (
            <MenuIndicator
              position='bottom'
              isActive={indicator.bottom}
              onClick={() => handleIndicatorClick('bottom')}
            />
          ) : null}
        </div>

        {Footer}
      </div>
    );
  }
);

Menu.displayName = 'Menu';

export interface MenuItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  className?: string;
  children?: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  value?: string | number;
  checkmarkSide?: 'left' | 'right';
  checked?: boolean;
  label?: string;
  icon?: React.ReactNode;
  name?: string;
  useInput?: 'radio' | 'checkbox';
  onChange?: ({ value, checked }: { value: string | number; checked: boolean }) => void;
}

export const MenuItem = React.forwardRef<HTMLDivElement, MenuItemProps>(
  (
    {
      className,
      children,
      isLoading,
      disabled,
      checkmarkSide = 'right',
      label,
      value,
      icon,
      checked,
      useInput,
      onChange,
      ...props
    },
    ref
  ) => {
    const [currentSelected, setCurrentSelected] = React.useState(checked || false);

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.KeyboardEvent) => {
      if (disabled || isLoading || useInput) return;
      checked == undefined && setCurrentSelected(!currentSelected);
      onChange && onChange({ value: value || '', checked: !currentSelected });
      props.onClick && props.onClick(e as React.MouseEvent<HTMLDivElement>);
    };

    const keyUpHandler = useKeyboard('Enter', (e: React.KeyboardEvent) => {
      handleClick(e);
      props.onKeyUp && props.onKeyUp(e as React.KeyboardEvent<HTMLDivElement>);
    });

    const keyEventHandlers = {
      onKeyUp: keyUpHandler
    };

    const accessibilityProps = {
      'aria-disabled': disabled,
      tabIndex: disabled ? -1 : 0,
      'aria-checked': currentSelected
    };

    const sideOfCheckIcon = checkmarkSide === 'right' || icon ? 'right' : 'left'; // reseting side check icon to right if it has icon

    useDidMountEffect(() => {
      if (checked !== undefined) {
        setCurrentSelected(checked);
      }
    }, [checked]);

    if (useInput) {
      return useInput === 'radio' ? (
        <Radio label={label} value={value} checked={checked} {...props} />
      ) : (
        <Checkbox label={label} value={value} checked={checked} {...props} />
      );
    }

    return (
      <div
        className={classNames('menu-item', className)}
        ref={ref}
        onClick={handleClick}
        {...props}
        {...accessibilityProps}
        {...keyEventHandlers}
      >
        {sideOfCheckIcon === 'left' || icon ? (
          <span className='menu-item-icon'>{icon ? icon : currentSelected && <Check />}</span>
        ) : null}

        <span className='menu-item-label'>{label || children}</span>

        {sideOfCheckIcon === 'right' && <span className='menu-item-icon'>{currentSelected && <Check />}</span>}
      </div>
    );
  }
);

MenuItem.displayName = 'MenuItem';

export interface MenuTriggerProps extends React.HTMLAttributes<HTMLElement> {
  [key: string]: any;
}

export const MenuTrigger = React.forwardRef<HTMLElement, MenuTriggerProps>(({ className, children, ...props }, ref) => {
  const cloneChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { ...props, ref: ref } as MenuTriggerProps);
    }
  });
  return <>{cloneChildren}</>;
});

MenuTrigger.displayName = 'MenuTrigger';

export interface MenuHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
}

export const MenuHeader = React.forwardRef<HTMLDivElement, MenuHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className={classNames('menu-header', className)} ref={ref} {...props}>
        {children}
      </div>
    );
  }
);

MenuHeader.displayName = 'MenuHeader';

export interface MenuFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
}

export const MenuFooter = React.forwardRef<HTMLDivElement, MenuFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className={classNames('menu-footer', className)} ref={ref} {...props}>
        {children}
      </div>
    );
  }
);

MenuFooter.displayName = 'MenuFooter';

export interface MenuInicator extends React.HTMLAttributes<HTMLSpanElement> {
  position: 'top' | 'bottom';
  isActive: boolean;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

export const MenuIndicator = React.forwardRef<HTMLSpanElement, MenuInicator>(
  ({ className, position, isActive, ...props }, ref) => {
    if (!isActive) return null;
    return (
      <span
        className={classNames('menu-indicator', className, {
          'menu-indicator-top': position === 'top',
          'menu-indicator-bottom': position === 'bottom'
        })}
        ref={ref}
        {...props}
      >
        {position === 'top' ? <ChevronUp /> : <ChevronDown />}
      </span>
    );
  }
);

MenuIndicator.displayName = 'MenuIndicator';

export interface MenuDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  isLoading?: boolean;
  disabled?: boolean;
}

export const MenuDivider = React.forwardRef<HTMLDivElement, MenuDividerProps>(
  ({ className, isLoading, disabled, ...props }, ref) => {
    return <div className={classNames('menu-divider', className)} ref={ref} {...props}></div>;
  }
);

MenuDivider.displayName = 'MenuDivider';

export interface MenuGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  groupValue: string;
}

export const MenuGroup = React.forwardRef<HTMLDivElement, MenuGroupProps>(
  ({ className, children, groupValue, ...props }, ref) => {
    return (
      <>
        <div className={classNames('menu-group-label', className)} data-value={groupValue} ref={ref} {...props}>
          {groupValue}
        </div>
        {children}
      </>
    );
  }
);

MenuGroup.displayName = 'MenuGroup';

const getComponent = (children: React.ReactNode, component: string | React.ComponentType) => {
  return React.Children.toArray(children).find((child) => React.isValidElement(child) && child.type === component);
};
