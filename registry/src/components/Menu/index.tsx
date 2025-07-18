import React from 'react';
import classNames from 'classnames';
import { Check, Search, ChevronUp, ChevronDown } from 'lucide-react';
import { autoUpdate, flip, offset, Placement, shift, useFloating } from '@floating-ui/react';

import './index.css';
import './variables.css';

import { Input } from '../BaseInput';
import useKeyboard from '../hooks/useKeyboard';
import useDidMountEffect from '../hooks/useDidMountEffect';
import { Portal } from '../Portal';
import useCombinedRefs from '../hooks/useCombinedRefs';
import { useArrowKeyNavigation } from '../hooks/useArrowKeyNavigation';
import { Checkbox } from '../Checkbox';
import { Radio } from '../Radio';

// TODO: Add custom menu content/ flexible action in menuItem **CONSIDER
// TODO: Write jsdoc for types of MenuItem

// =========================
// Menu
// =========================
// Declare and export menu type and menu component

const sizeMap: Record<'sm' | 'md', string> = {
  sm: 'small',
  md: 'medium'
  // lg: 'large' // **REMOVED
} as const;

const colorMap: Record<'neutral' | 'accent', string> = {
  neutral: 'neutral',
  accent: 'accent'
} as const;

const prominenceMap: Record<'subtle' | 'pronounced', string> = {
  subtle: 'subtle',
  pronounced: 'pronounced'
} as const;

const themeMap: Record<'default' | 'alternative', string> = {
  default: 'default',
  alternative: 'alternative'
} as const;

const sizeHeightMap: Record<'sm' | 'md', number> = {
  sm: 40,
  md: 48
  // lg: 48 // **REMOVED
} as const;

/**
 * Props for the Menu component.
 *
 * Extends properties from the `div` element.
 */
export interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The position of the menu relative to the anchor.
   * Placements of floating ui react library
   *
   * @default 'bottom-start'
   * @see {@link https://floating-ui.com/docs/tutorial#placements Placement Floating UI}
   */
  position?: Placement;

  /**
   * The size of the menu
   *
   * @default 'sm'
   * @memberof MenuProps
   */
  size?: keyof typeof sizeMap;

  /**
   * The color of the menu
   *
   * @default 'neutral'
   * @memberof MenuProps
   */
  menuColor?: keyof typeof colorMap;

  /**
   * The prominence of the menu, defining its visual hierarchy.
   *
   * @default 'subtle'
   * @memberof MenuProps
   */
  prominence?: keyof typeof prominenceMap;

  /**
   * The theme of the menu
   *
   * @default 'default'
   * @memberof MenuProps
   */
  theme?: keyof typeof themeMap;

  /**
   * The anchor element or selector to which the menu is attached.
   * Can be an HTMLElement Ref or a CSS selector string.
   *
   * @memberof MenuProps
   */
  anchor?: HTMLElement | string;

  /**
   * The maximum number of items before the menu applies overflow behavior.
   *
   * @memberof MenuProps
   */
  menuItemsLimit?: number;

  /**
   * Whether to show scroll indicators when the menu is scrollable.
   *
   * @default false
   * @memberof MenuProps
   */
  scrollIndicator?: boolean;

  /**
   * Whether the menu includes a search input for filtering items.
   *
   * @default false
   * @memberof MenuProps
   */
  searchable?: boolean;

  /**
   * The default value for the search input when the menu is rendered.
   *
   * @memberof MenuProps
   */
  defaultSearch?: string;

  /**
   * The placeholder text for the search input.
   *
   * @memberof MenuProps
   */
  searchPlaceholder?: string;

  /**
   * The text displayed when no results are found in the menu search.
   *
   * @memberof MenuProps
   */
  noResultsText?: string;

  /**
   * Whether the menu is rendered using a portal (outside of the DOM hierarchy of its parent).
   *
   * @memberof MenuProps
   */
  usePortal?: boolean;

  /**
   * Whether the menu is open.
   *
   * @default false
   * @memberof MenuProps
   */
  isOpen?: boolean;

  /**
   * Whether the menu is in a loading state, typically showing a loading indicator.
   *
   * @default false
   * @memberof MenuProps
   */
  isLoading?: boolean;

  /**
   * Whether the menu is disabled and cannot be interacted with.
   *
   * @default false
   * @memberof MenuProps
   */
  disabled?: boolean;

  /**
   * Callback function invoked when the menu is opened.
   *
   * @memberof MenuProps
   */
  onOpen?: () => void;

  /**
   * Callback function invoked when the menu is closed.
   *
   * @memberof MenuProps
   */
  onClose?: () => void;
}

/**
 * **Parity Menu**.
 *
 * @see {@link https://beta-parity-react.vercel.app/menu Parity Menu}
 */
export const Menu = React.forwardRef<HTMLDivElement, MenuProps>(
  (
    {
      usePortal = true,
      isOpen = false,
      searchable = false,
      scrollIndicator = false,
      menuColor = 'neutral',
      prominence = 'subtle',
      theme = 'default',
      size = 'sm',
      position = 'bottom-start',
      defaultSearch = '',
      noResultsText = 'No results found',
      className,
      children,
      anchor,
      isLoading,
      disabled,
      searchPlaceholder,
      menuItemsLimit,
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
        if (!React.isValidElement(child)) return child;

        if (child.type === MenuHeader || child.type === MenuFooter) return null;

        const isValidItem = searchable
          ? child.props.value && child.props.value.toLowerCase().includes(keyword.toLowerCase())
          : true;

        if (isValidItem || (!child.props.value && !child.props.groupLabel)) {
          return React.cloneElement(child, { ...child.props, color: menuColor, prominence: prominence });
        } else if (child.props.children) {
          const filteredChildren = filterChildren(child.props.children, keyword);
          if (filteredChildren && React.Children.count(filteredChildren) > 0) {
            return React.cloneElement(
              child,
              { ...child.props, color: menuColor, prominence: prominence },
              filteredChildren
            );
          }
        }

        return null;
      });

    React.useEffect(() => {
      !isOpen && setKeyword(defaultSearch ? defaultSearch : '');
    }, [isOpen, defaultSearch]);

    // ========================= Assign Variables For Component ========================= //
    const cloneChildren = filterChildren(children, keyword);
    const Header = getComponent(children, MenuHeader);
    const Footer = getComponent(children, MenuFooter);
    const PortalEl = usePortal ? Portal : React.Fragment;
    const isScrollable =
      !!menuItemsLimit || (itemsRef.current?.scrollHeight ?? 0) > (itemsRef.current?.clientHeight ?? 0);
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
      if (anchor === undefined) return;

      if (anchor && typeof anchor === 'string') {
        refs.setReference(document.getElementById(anchor));
        return;
      }

      refs.setReference(anchor as HTMLElement);
    }, [anchor]);

    // ========================= Handle Navigation By Arrow Key ========================= //
    const { setItemsRef, resetItemsRef, initFocus } = useArrowKeyNavigation(menuRef);
    React.useEffect(() => {
      resetItemsRef();

      if (isOpen && itemsRef.current) {
        const items = searchable
          ? [searchRef.current, ...itemsRef.current.querySelectorAll('[role="menuitem"]')]
          : itemsRef.current.querySelectorAll('[role="menuitem"]');

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
          className={classNames(
            'menu',
            className,
            themeMap[theme as keyof typeof themeMap],
            sizeMap[size as keyof typeof sizeMap],
            prominenceMap[prominence as keyof typeof prominenceMap],
            colorMap[menuColor as keyof typeof colorMap]
          )}
          ref={menuRef}
          style={combinedStyle}
          {...props}
          {...accessibilityProps}
        >
          {searchable ? (
            <MenuHeader>
              <Input
                theme={theme}
                // inputSize={size} ** CONSIDERED
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
            tabIndex={-1}
            ref={itemsRef}
            style={{
              overflow: isScrollable ? 'auto' : 'hidden',
              ...(menuItemsLimit
                ? { maxHeight: (sizeHeightMap[size as keyof typeof sizeMap] + 4) * menuItemsLimit }
                : {})
            }}
          >
            {isScrollable && isContainChildren && scrollIndicator ? (
              <MenuIndicator position='top' isActive={indicator.top} onClick={() => handleIndicatorClick('top')} />
            ) : null}

            {/* If searchable, render the menuitems with counter, else render valid children */}
            {searchable ? (
              countMenuItems(cloneChildren) > 0 ? (
                cloneChildren
              ) : (
                <span className='menu-no-items'>{noResultsText}</span>
              )
            ) : (
              cloneChildren
            )}

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

/**
 * Props for the MenuItem component.
 *
 * Extends properties from the `div` or `label` element.
 */
export interface MenuItemProps extends Omit<React.HTMLAttributes<HTMLDivElement | HTMLLabelElement>, 'onChange'> {
  /**
   * Whether the menu item is in a loading state.
   */
  isLoading?: boolean;

  /**
   * Whether the menu item is disabled.
   */
  disabled?: boolean;

  /**
   * The value of the menu item.
   */
  value?: string;

  /**
   * The label of the menu item.
   */
  label?: string;

  /**
   * The position of the checkmark, either left or right.
   */
  checkmarkSide?: 'left' | 'right';

  /**
   * The color of the menu item.
   */
  color?: keyof typeof colorMap;

  /**
   * The prominence level of the menu item.
   */
  prominence?: keyof typeof prominenceMap;

  /**
   * Whether the menu item is checked.
   */
  checked?: boolean;

  /**
   * An optional icon for the menu item.
   */
  icon?: React.ReactNode;

  /**
   * The name attribute of the menu item (for form usage).
   */
  name?: string;

  /**
   * Whether multiple selections are allowed.
   */
  multiselect?: boolean;

  /**
   * Whether the menu item can be deselected.
   */
  deselectable?: boolean;

  /**
   * Whether the menu item uses an input element.
   */
  useInput?: boolean;

  /**
   * Change event handler for the menu item.
   */
  onChange?:
    | (({ value, checked }: { value: string | number; checked: boolean }) => void)
    | ((e: React.ChangeEvent<HTMLInputElement>) => void);
}

/**
 * **Parity MenuItem**.
 *
 * @see {@link https://beta-parity-react.vercel.app/menu Parity MenuItem}
 */
export const MenuItem = React.forwardRef<HTMLDivElement | HTMLLabelElement, MenuItemProps>(
  (
    {
      className,
      children,
      isLoading,
      disabled,
      checkmarkSide = 'right',
      prominence = 'subtle',
      color = 'neutral',
      label,
      value,
      icon,
      checked,
      name,
      multiselect = false,
      deselectable = true,
      useInput = false,
      onClick,
      onChange,
      onKeyDown,
      ...props
    },
    ref
  ) => {
    const [currentSelected, setCurrentSelected] = React.useState(checked || false);

    const handleClick = (e: React.MouseEvent<HTMLDivElement | HTMLLabelElement, MouseEvent> | React.KeyboardEvent) => {
      if (disabled || isLoading) return;
      onClick && onClick(e as any);
      if (!!useInput) return;
      const newSelected = deselectable || multiselect ? !currentSelected : true;
      checked == undefined && setCurrentSelected(newSelected);
      onChange?.({ target: { value: value || '' }, checked: newSelected } as any);
    };

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentSelected(e.target.checked);
      onChange?.({ target: { value: value || '' }, checked: e.target.checked } as any);
    };

    const keyDownHandler = useKeyboard(['Enter', ' '], (e: any) => {
      e.preventDefault();
      e.stopPropagation();
      e.target.click();
      onKeyDown?.(e);
    });

    const keyEventHandlers = {
      onKeyDown: keyDownHandler
    };

    const accessibilityProps = {
      role: 'menuitem',
      'aria-label': label,
      'aria-disabled': disabled,
      tabIndex: disabled ? -1 : 0,
      ...(!useInput && { 'aria-checked': currentSelected })
    };

    // reset side check icon to right if it has icon
    const sideOfCheckIcon = checkmarkSide === 'right' || icon ? 'right' : 'left';
    const Component = useInput ? 'label' : 'div';
    const CheckMarkInput = multiselect ? (
      <Checkbox tabIndex={-1} onChange={handleChangeInput} color={color} disabled={disabled} />
    ) : (
      <Radio tabIndex={-1} onChange={handleChangeInput} color={color} name={name} disabled={disabled} />
    );
    const visibleIcon = useInput ? CheckMarkInput : currentSelected ? <Check /> : null;

    useDidMountEffect(() => {
      if (checked !== undefined) {
        setCurrentSelected(checked);
      }
    }, [checked]);

    return (
      <Component
        className={classNames(
          'menu-item',
          className,
          prominenceMap[prominence as keyof typeof prominenceMap],
          colorMap[color as keyof typeof colorMap]
        )}
        ref={ref as any}
        onClick={handleClick}
        {...props}
        {...accessibilityProps}
        {...keyEventHandlers}
      >
        {sideOfCheckIcon === 'left' || icon ? <span className='menu-item-icon'>{icon || visibleIcon}</span> : null}

        <span className='menu-item-label'>{label ?? children}</span>

        {sideOfCheckIcon === 'right' && <span className='menu-item-icon'>{visibleIcon}</span>}
      </Component>
    );
  }
);

MenuItem.displayName = 'MenuItem';

// =========================
// Menu Trigger
// =========================
// Declare and export menu trigger type and menu trigger component

export interface MenuTriggerProps extends React.HTMLAttributes<HTMLButtonElement> {}

/**
 * **Parity MenuTrigger**.
 *
 * @see {@link https://beta-parity-react.vercel.app/menu Parity MenuTrigger}
 */
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

export interface MenuHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * **Parity MenuHeader**.
 *
 * @see {@link https://beta-parity-react.vercel.app/menu Parity MenuHeader}
 */
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

export interface MenuFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * **Parity MenuFooter**.
 *
 * @see {@link https://beta-parity-react.vercel.app/menu Parity MenuFooter}
 */
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

export interface MenuIndicatorProps extends React.HTMLAttributes<HTMLButtonElement> {
  position: 'top' | 'bottom';
  isActive: boolean;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

export const MenuIndicator = React.forwardRef<HTMLButtonElement, MenuIndicatorProps>(
  ({ className, position, isActive, onClick, ...props }, ref) => {
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
        <button onClick={onClick}>{position === 'top' ? <ChevronUp /> : <ChevronDown />}</button>
      </span>
    );
  }
);

MenuIndicator.displayName = 'MenuIndicator';

// =========================
// Menu Divider
// =========================
// Declare and export menu divider type and menu divider component

export interface MenuDividerProps extends React.HTMLAttributes<HTMLDivElement> {
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
  groupLabel: string;
}

export const MenuGroup = React.forwardRef<HTMLDivElement, MenuGroupProps>(
  ({ className, children, groupLabel, ...props }, ref) => {
    return (
      <>
        <div className={classNames('menu-group-label', className)} data-value={groupLabel} ref={ref} {...props}>
          {groupLabel}
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

const countMenuItems = (children: React.ReactNode): number => {
  return React.Children.toArray(children).reduce((count: number, child: React.ReactNode) => {
    if (React.isValidElement(child)) {
      const isMenuItem = child.type === MenuItem && child.props.value !== '' ? 1 : 0;
      const nestedCount = countMenuItems(child.props.children);
      return count + isMenuItem + nestedCount;
    }
    return count;
  }, 0);
};
