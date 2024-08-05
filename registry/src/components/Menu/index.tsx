import React from 'react';
import classNames from 'classnames';
import './index.css';
import { Check, Search, ChevronUp, ChevronDown } from 'lucide-react';
import { Input } from '../Input';
import { Radio } from '../Radio';
import { Checkbox } from '../Checkbox';
import useKeyboard from '../hooks/useKeyboard';
import useDidMountEffect from '../hooks/useDidMountEffect';
import { autoUpdate, flip, offset, Placement, shift, useFloating } from '@floating-ui/react';
import { Portal } from '../Portal';
import useCombinedRefs from '../hooks/useCombinedRefs';
import { useArrowKeyNavigation } from '../hooks/useArrowKeyNavigation ';

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

// TODO: Write docs for types

// =========================
// Menu
// =========================
// Declare and export menu type and menu component

export interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: Placement;
  size?: keyof typeof sizeMap;
  anchorId?: string;
  overflowLimit?: number;
  scrollIndicator?: boolean;
  searchable?: boolean;
  defaultSearch?: string;
  searchPlaceholder?: string;
  usePortal?: boolean;
  isOpen?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

export const Menu = React.forwardRef<HTMLDivElement, MenuProps>(
  (
    {
      usePortal = true,
      isOpen = false,
      searchable = false,
      scrollIndicator = false,
      size = 'md',
      position = 'bottom-start',
      defaultSearch = '',
      className,
      children,
      anchorId,
      isLoading,
      disabled,
      searchPlaceholder,
      overflowLimit,
      style,
      ...props
    },
    ref
  ) => {
    // ========================= Init Refs ========================= //
    const searchRef = React.useRef<any>(null);
    const itemsRef = React.useRef<HTMLDivElement>(null);

    const { refs, floatingStyles, ...rest } = useFloating({
      placement: position,
      middleware: [offset(8), flip(), shift({ padding: 8 })],
      whileElementsMounted: autoUpdate
    });

    const menuRef = useCombinedRefs(ref, refs.setFloating as any);

    // ========================= Handle Search ========================= //
    const [keyword, setKeyword] = React.useState<string>(defaultSearch);

    const handleFocus = (e: any) => searchRef.current?.focus();

    const filterChildren = (children: React.ReactNode, keyword = '') =>
      React.Children.map(children, (child: React.ReactNode): React.ReactNode => {
        if (!React.isValidElement(child) || child.type === MenuHeader || child.type === MenuFooter) return null;

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

    React.useEffect(() => {
      !isOpen && setKeyword('');
    }, [isOpen]);

    // ========================= Assign Variables For Component ========================= //
    const cloneChildren = filterChildren(children, keyword);
    const Header = getComponent(children, MenuHeader);
    const Footer = getComponent(children, MenuFooter);
    const PortalEl = usePortal ? Portal : React.Fragment;
    const isScrollable =
      !!overflowLimit || (itemsRef.current?.scrollHeight ?? 0) > (itemsRef.current?.clientHeight ?? 0);
    const isContainChildren = React.Children.count(searchable ? cloneChildren : children) > 0;
    const combinedStyle = {
      ...style,
      ...floatingStyles,
      opacity: rest.elements.floating && isOpen ? '1' : '0'
    };

    const accessibilityProps = {
      role: 'menu',
      'aria-hidden': !isOpen,
      'data-open': isOpen,
      'data-disabled': disabled
    };

    // ========================= Handle Indicator Visibility ========================= //
    const [indicator, setIndicator] = React.useState({
      top: false,
      bottom: false
    });

    const handleIndicatorClick = (name: 'top' | 'bottom') => {
      if (itemsRef.current && name === 'top') {
        itemsRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }

      if (itemsRef.current && name === 'bottom') {
        itemsRef.current.scrollTo({ top: itemsRef.current.scrollHeight, behavior: 'smooth' });
      }
    };

    React.useEffect(() => {
      let currentRef = itemsRef.current;

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
    }, [keyword, itemsRef, isOpen]);

    // ========================= Define Anchor - Trigger Of Menu ========================= //

    React.useEffect(() => {
      refs.setReference(document.getElementById(anchorId || ''));
    }, []);

    // ========================= Handle Navigation By Arrow Key ========================= //
    const { setItemsRef, resetItemsRef, initFocus } = useArrowKeyNavigation(menuRef);
    React.useEffect(() => {
      resetItemsRef();

      if (isOpen && itemsRef.current) {
        const items = itemsRef.current.querySelectorAll('[role="menuitem"]');

        if (items && items.length > 0) {
          items.forEach((item) => {
            setItemsRef(item as HTMLButtonElement);
          });
          searchable ? searchRef.current?.focus() : initFocus();
        }
      }
    }, [isOpen, setItemsRef, resetItemsRef, keyword, menuRef, itemsRef]);

    return (
      <PortalEl>
        <div
          className={classNames('menu', className, sizeMap[size as keyof typeof sizeMap])}
          ref={menuRef}
          style={combinedStyle}
          {...props}
          {...accessibilityProps}
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
            ref={itemsRef}
            style={{
              overflow: isScrollable ? 'auto' : 'hidden',
              ...(overflowLimit ? { maxHeight: (sizeHeightMap[size as keyof typeof sizeMap] + 4) * overflowLimit } : {})
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
      </PortalEl>
    );
  }
);

Menu.displayName = 'Menu';

// =========================
// Menu Item
// =========================
// Declare and export menu item type and menu item component

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
  useInput?: 'radio' | 'checkbox' | boolean;
  onChange?:
    | (({ value, checked }: { value: string | number; checked: boolean }) => void)
    | ((e: React.ChangeEvent<HTMLInputElement>) => void);
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
      useInput = false,
      onClick,
      onChange,
      ...props
    },
    ref
  ) => {
    const [currentSelected, setCurrentSelected] = React.useState(checked || false);

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.KeyboardEvent) => {
      if (disabled || isLoading) return;
      onClick && onClick(e as React.MouseEvent<HTMLDivElement>);

      if (useInput === 'checkbox' || useInput === 'radio') return;
      checked == undefined && setCurrentSelected(!currentSelected);
    };

    const keyUpHandler = useKeyboard('Enter', (e: any) => {
      console.log('click');
      e.target && e.target.click();
      props.onKeyUp && props.onKeyUp(e as React.KeyboardEvent<HTMLDivElement>);
    });

    const keyEventHandlers = {
      onKeyUp: keyUpHandler
    };

    const accessibilityProps = {
      role: 'menuitem',
      'aria-disabled': disabled,
      tabIndex: disabled ? -1 : 0,
      'aria-checked': currentSelected
    };

    // reseting side check icon to right if it has icon
    const sideOfCheckIcon = checkmarkSide === 'right' || icon ? 'right' : 'left';

    useDidMountEffect(() => {
      if (checked !== undefined) {
        setCurrentSelected(checked);
      }
    }, [checked]);

    useDidMountEffect(() => {
      onChange && onChange({ value: value || '', checked: currentSelected } as any);
    }, [currentSelected]);

    if (!!useInput) {
      const { 'aria-checked': _, ...rest } = accessibilityProps;
      switch (useInput) {
        case 'radio':
          return (
            <Radio
              label={label}
              value={value}
              checked={checked}
              onClick={handleClick}
              onChange={(e) => onChange && onChange(e as any)}
              {...props}
              radioWrapperProps={{ ...rest, ...keyEventHandlers }}
            />
          );

        case 'checkbox':
          return (
            <Checkbox
              label={label}
              value={value}
              checked={checked}
              onClick={handleClick}
              onChange={(e) => onChange && onChange(e as any)}
              {...props}
              checkboxWrapperProps={{ ...rest, ...keyEventHandlers }}
            />
          );

        default:
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
    }

    return (
      <div
        className={classNames('menu-item', className)}
        ref={ref}
        onClick={(e) => onClick && onClick(e as any)}
        {...props}
        {...accessibilityProps}
        {...keyEventHandlers}
      >
        {icon ? <span className='menu-item-icon'>{icon}</span> : null}
        <span className='menu-item-label'>{label || children}</span>
      </div>
    );
  }
);

MenuItem.displayName = 'MenuItem';

// =========================
// Menu Trigger
// =========================
// Declare and export menu trigger type and menu trigger component

export interface MenuTriggerProps extends React.HTMLAttributes<HTMLButtonElement> {}

export const MenuTrigger = React.forwardRef<HTMLButtonElement, MenuTriggerProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button className={classNames('menu-trigger', className)} ref={ref} {...props}>
        {children}
      </button>
    );
  }
);

MenuTrigger.displayName = 'MenuTrigger';

// =========================
// Menu Header
// =========================
// Declare and export menu header type and menu header component

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

// =========================
// Menu Footer
// =========================
// Declare and export menu footer type and menu footer component

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

// =========================
// Menu Indicator
// =========================
// Declare and export menu indicator type and menu indicator component

export interface MenuIndicatorProps extends React.HTMLAttributes<HTMLSpanElement> {
  position: 'top' | 'bottom';
  isActive: boolean;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

export const MenuIndicator = React.forwardRef<HTMLSpanElement, MenuIndicatorProps>(
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

// =========================
// Menu Devider
// =========================
// Declare and export menu devider type and menu devider component

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

// =========================
// Menu Group
// =========================
// Declare and export menu group type and menu group component

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

// =========================
// Menu Utils
// =========================
// Declare utils for Menu and children of Menu component (MenuItem, MenuHeader,...)

const getComponent = (children: React.ReactNode, component: string | React.ComponentType) => {
  return React.Children.toArray(children).find((child) => React.isValidElement(child) && child.type === component);
};
