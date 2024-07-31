import React from 'react';
import classNames from 'classnames';
import './index.css';
import { Check, Search, ChevronUp, ChevronDown } from 'lucide-react';
import { Input } from '../Input';
import { Radio } from '../Radio';
import { Checkbox } from '../Checkbox';

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
  type?: 'single-select' | 'multi-select';
  useInput?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  isOpen?: boolean;
  searchable?: boolean;
  defaultSearch?: string;
  searchPlaceholder?: string;
  overflowLimit?: number;
  scrollIndicator?: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
}

export const Menu = React.forwardRef<HTMLDivElement, MenuProps>(
  (
    {
      className,
      children,
      type = 'single-select',
      useInput = false,
      isOpen = false,
      position = 'bottom',
      size = 'md',
      isLoading,
      disabled,
      defaultSearch = '',
      searchPlaceholder,
      searchable = false,
      overflowLimit,
      header,
      footer,
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

    const handleIndicatorClick = (name: any) => {
      if (drowdownItemsRef.current && name === 'top-indicator') {
        drowdownItemsRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }

      if (drowdownItemsRef.current && name === 'bottom-indicator') {
        drowdownItemsRef.current.scrollTo({ top: drowdownItemsRef.current.scrollHeight, behavior: 'smooth' });
      }
    };

    const filterChildren = (children: React.ReactNode, keyword = '') => {
      return React.Children.map(children, (child: React.ReactNode): React.ReactNode => {
        if (!React.isValidElement(child)) {
          return null;
        }

        const isValidItem = searchable
          ? child.props.value && child.props.value.toLowerCase().includes(keyword.toLowerCase())
          : true;

        if (isValidItem) {
          // If the item is valid, return it with passed props
          const addedprops = {
            type: type,
            useInput: useInput
          };
          return child.type === MenuItem ? React.cloneElement(child, { ...addedprops }) : child;
        } else if (child.props.children) {
          // If the child has children, filter them recursively
          const filteredChildren = filterChildren(child.props.children, keyword);

          // If the filtered children are not empty, clone the element with filtered children
          if (filteredChildren && React.Children.count(filteredChildren) > 0) {
            return React.cloneElement(child, { ...child.props }, filteredChildren);
          }
        }

        // If none of the conditions match, return null
        return null;
      });
    };

    const cloneChildren = filterChildren(children, keyword);
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
        {header && !searchable && <div className='menu-header'>{header}</div>}

        {searchable && (
          <div className='menu-header'>
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
          </div>
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
            <span
              className={classNames('indicator', indicator.top ? 'top-indicator' : '')}
              onClick={() => handleIndicatorClick('top-indicator')}
            >
              <ChevronUp />
            </span>
          ) : null}

          {cloneChildren}

          {isScrollable && isContainChildren && scrollIndicator ? (
            <span
              className={classNames('indicator', indicator.bottom ? 'bottom-indicator' : '')}
              onClick={() => handleIndicatorClick('bottom-indicator')}
            >
              <ChevronDown />
            </span>
          ) : null}
        </div>

        {footer && <div className='menu-footer'>{footer}</div>}
      </div>
    );
  }
);

Menu.displayName = 'Menu';

export interface MenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  value?: string | number;
  checkmarkSide?: 'left' | 'right';
  selected?: boolean;
  label?: string;
  icon?: React.ReactNode;
  name?: string;
}

export const MenuItem = React.forwardRef<HTMLDivElement, MenuItemProps & Pick<MenuProps, 'type' | 'useInput'>>(
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
      selected = false,
      type = 'single-select',
      useInput = false,
      ...props
    },
    ref
  ) => {
    const accessibilityProps = {
      'aria-disabled': disabled,
      tabIndex: disabled ? -1 : 0,
      'aria-selected': selected
    };

    if (useInput) {
      return type === 'single-select' ? (
        <Radio label={label} value={value} {...props} />
      ) : (
        <Checkbox label={label} value={value} {...props} />
      );
    }

    const sideOfCheckIcon = checkmarkSide === 'right' || icon ? 'right' : 'left'; // reseting side check icon to right if it has icon

    return (
      <div {...accessibilityProps} className={classNames('menu-item', className)} ref={ref} {...props}>
        {sideOfCheckIcon === 'left' || icon ? (
          <span className='menu-item-icon'>{icon ? icon : selected && <Check />}</span>
        ) : null}

        <span className='menu-item-label'>{label || children}</span>

        {sideOfCheckIcon === 'right' && <span className='menu-item-icon'>{selected && <Check />}</span>}
      </div>
    );
  }
);

MenuItem.displayName = 'MenuItem';

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
