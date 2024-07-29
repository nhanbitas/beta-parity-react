import React from 'react';
import classNames from 'classnames';
import './index.css';
import { Check, Search, ChevronUp, ChevronDown } from 'lucide-react';
import { Input } from '../Input';

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

export interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  size?: keyof typeof sizeMap;
  isLoading?: boolean;
  disabled?: boolean;
  isOpen?: boolean;
  searchable?: boolean;
  defaultSearch?: string;
  searchPlaceholder?: string;
  limit?: number;
  scrollIndicator?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

export const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
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
      limit,
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

        const isValidItem = child.props.value && child.props.value.toLowerCase().includes(keyword.toLowerCase());

        if (isValidItem) {
          // If the item is valid, return it
          return child;
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

    const searchChildren = filterChildren(children, keyword);
    const isScrollable = !!limit;
    const isContainChildren = React.Children.count(searchable ? searchChildren : children) > 0;

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
    }, []);

    return (
      <div
        className={classNames('dropdown', className, position, sizeMap[size as keyof typeof sizeMap])}
        ref={ref}
        data-open={isOpen}
        {...props}
      >
        {searchable ? (
          <Input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            ref={searchRef}
            type='text'
            wrapperProps={{
              leftElement: (
                <span className='search-dropdown-btn' onClick={handleFocus}>
                  <Search />
                </span>
              )
            }}
            isClearable
            placeholder={searchPlaceholder || ''}
            className='dropdown-item-search'
          />
        ) : null}

        <div
          className='dropdown-items'
          ref={drowdownItemsRef}
          style={{
            overflowY: isScrollable ? 'auto' : 'hidden',
            maxHeight: (isScrollable && (sizeHeightMap[size as keyof typeof sizeMap] + 4) * limit) || 'auto'
          }}
        >
          {isScrollable && isContainChildren && scrollIndicator ? (
            <span
              className={classNames('indicator', indicator.top ? 'top-indicator' : '')}
              style={{ top: searchable ? 40 : 0 }}
              onClick={() => handleIndicatorClick('top-indicator')}
            >
              <ChevronUp />
            </span>
          ) : null}

          {searchable && keyword ? searchChildren : children}

          {isScrollable && isContainChildren && scrollIndicator ? (
            <span
              className={classNames('indicator', indicator.bottom ? 'bottom-indicator' : '')}
              onClick={() => handleIndicatorClick('bottom-indicator')}
            >
              <ChevronDown />
            </span>
          ) : null}
        </div>
      </div>
    );
  }
);

Dropdown.displayName = 'Dropdown';

export interface DropdownItemProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  value?: string | number;
  iconSide?: 'left' | 'right';
  selected?: boolean;
  label?: string;
  icon?: React.ReactNode;
}

export const DropdownItem = React.forwardRef<HTMLDivElement, DropdownItemProps>(
  (
    { className, children, isLoading, disabled, iconSide = 'right', label, icon, value, selected = false, ...props },
    ref
  ) => {
    const accessibilityProps = {
      'aria-disabled': disabled,
      tabIndex: disabled ? -1 : 0,
      'aria-selected': selected
    };

    const sideOfCheckIcon = iconSide === 'right' || icon ? 'right' : 'left'; // reseting side check icon to right if it has icon

    return (
      <div {...accessibilityProps} className={classNames('dropdown-item', className)} ref={ref} {...props}>
        {sideOfCheckIcon === 'left' || icon ? (
          <span className='dropdown-item-icon'>{icon ? icon : selected && <Check />}</span>
        ) : null}

        <span className='dropdown-item-label'>{label || children}</span>

        {sideOfCheckIcon === 'right' && <span className='dropdown-item-icon'>{selected && <Check />}</span>}
      </div>
    );
  }
);

DropdownItem.displayName = 'DropdownItem';

export interface DropdownDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  isLoading?: boolean;
  disabled?: boolean;
}

export const DropdownDivider = React.forwardRef<HTMLDivElement, DropdownDividerProps>(
  ({ className, isLoading, disabled, ...props }, ref) => {
    return <div className={classNames('dropdown-divider', className)} ref={ref} {...props}></div>;
  }
);

DropdownDivider.displayName = 'DropdownDivider';

export interface DropdownGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  groupValue: string;
}

export const DropdownGroup = React.forwardRef<HTMLDivElement, DropdownGroupProps>(
  ({ className, children, groupValue, ...props }, ref) => {
    return (
      <>
        <div className={classNames('dropdown-group-label', className)} data-value={groupValue} ref={ref} {...props}>
          {groupValue}
        </div>
        {children}
      </>
    );
  }
);

DropdownGroup.displayName = 'DropdownGroup';
