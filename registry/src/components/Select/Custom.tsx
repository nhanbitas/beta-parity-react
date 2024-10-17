import React from 'react';
import classNames from 'classnames';
import './index.css';
import { InputWrapper, ValueInputWrapper } from '../BaseInput';
import { ChevronDown, X } from 'lucide-react';
import { Menu, MenuDivider, MenuDividerProps, MenuGroup, MenuGroupProps, MenuItem, MenuProps } from '../Menu';
import { ContainedLabel } from '../FloatingLabel';
import { useResizeObserver } from '../hooks/useObserver';
import { useOutsideClick } from '../hooks/useOutsideClick';
import useCombinedRefs from '../hooks/useCombinedRefs';
import useKeyboard from '../hooks/useKeyboard';
import { NativeOption } from './Native';
import { Tag } from '../Tag';

// TODO: Write docs for types

// =========================
// Custom select
// =========================
// Declare and export custom select type and custom select component

export type SelectItemType = { value: string; label: string; disabled?: boolean };

export interface CustomSelectProps extends React.HTMLAttributes<HTMLDivElement>, MenuProps {
  options?: SelectItemType[];
  multiselect?: boolean;
  filterable?: boolean;
  placeHolder?: string;
  clearButton?: boolean;
  deselectable?: boolean;
  keepOpen?: boolean;
  floatingLabel?: React.ReactNode;
  leftIcon?: React.ReactNode;
  value?: string | string[];
  selectedIcon?: React.ReactNode;
  countDescription?: string;
  onChange?: (e: any) => void;
  onFocus?: (e: React.FocusEvent<HTMLDivElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void;
}

export const CustomSelect = React.forwardRef<HTMLDivElement, CustomSelectProps>(
  (
    {
      options,
      children,
      className,
      style,
      disabled = false,
      multiselect = false,
      filterable = false,
      clearButton = false,
      deselectable = true,
      keepOpen = false,
      leftIcon,
      placeHolder = 'Please choose an option',
      countDescription = 'item(s) selected',
      selectedIcon,
      floatingLabel,
      onChange,
      onFocus,
      onBlur,
      onKeyUp,
      value,
      ...props
    },
    ref
  ) => {
    const [currentValue, setCurrentValue] = React.useState<string | string[]>(value || multiselect ? [] : '');
    const [isSelectOpen, setIsSelectOpen] = React.useState(false);
    const [menu, setMenu] = React.useState<HTMLDivElement | null>(null);
    const [wrapperRef, rect] = useResizeObserver();
    const refOutsideClick = useOutsideClick(() => setIsSelectOpen(false), ['click', 'touchstart'], [menu]);
    const mergedRef = useCombinedRefs(ref, refOutsideClick, wrapperRef);
    const selectContainerRef = React.useRef<HTMLDivElement>(null);
    const selectInputRef = React.useRef<HTMLInputElement>(null);
    const renderedOptions = options && options.length > 0 ? options : getSelectItems(children);

    const handleClick = (value: string, isRemove?: boolean) => {
      if (disabled) return;
      let changedValue: string | string[];
      if (multiselect) {
        isRemove || (currentValue.includes(value) && deselectable)
          ? (changedValue = (currentValue as string[]).filter((val) => val !== value))
          : (changedValue = Array.from(new Set([...(currentValue as string[]), value])));
      } else {
        changedValue = value;
      }

      setCurrentValue(multiselect && !value ? [] : changedValue);
      onChange?.(multiselect && !value ? [] : changedValue);

      if (!keepOpen) {
        setIsSelectOpen(false);
        selectInputRef.current?.focus();
      }
    };

    const handleClear = () => {
      setCurrentValue(multiselect ? [] : '');
      onChange?.(multiselect ? [] : '');
    };

    const handleFocus = (e: any) => {
      if (disabled) return;
      setIsSelectOpen(!isSelectOpen);
      onFocus?.(e);
    };

    const cloneWithProps = (child: React.ReactNode): React.ReactNode => {
      if (!React.isValidElement(child)) {
        return child;
      }

      if (child.type === SelectItem) {
        const isChecked = Array.isArray(currentValue)
          ? currentValue.includes(child.props.value) && !!child.props.value
          : child.props.value === currentValue && !!child.props.value;
        return (
          <MenuItem
            {...child.props}
            key={child.props.value}
            value={child.props.value}
            label={child.props.label}
            checked={isChecked}
            useInput={false}
            multiselect={multiselect}
            onChange={(e: any) => handleClick(e.target.value)}
            icon={selectedIcon}
          />
        );
      }

      return React.cloneElement(child as React.ReactElement<any>, {
        children: React.Children.map(child.props.children, cloneWithProps)
      });
    };

    const ArrowBtn = (
      <button
        className={classNames('arrow-select-btn', { open: isSelectOpen })}
        onClick={() => setIsSelectOpen(!isSelectOpen)}
      >
        <ChevronDown />
      </button>
    );

    const isValueEmpty = Array.isArray(currentValue) ? currentValue.length === 0 : !currentValue;
    const addedClassname = clearButton ? 'input-actions' : 'input-action';
    const RightInputActions = (
      <>
        {clearButton && !isValueEmpty && (
          <button type='button' className={classNames('clear-button')} onClick={handleClear}>
            <X />
          </button>
        )}
        {ArrowBtn}
      </>
    );
    const LeftInputActions = (
      <span className='select-left-icon input-icon' onClick={() => setIsSelectOpen(!isSelectOpen)}>
        {leftIcon}
      </span>
    );

    const [isShowingChips, setIsShowingChips] = React.useState(
      multiselect && Array.isArray(currentValue) && currentValue.length > 0
    );

    React.useLayoutEffect(() => {
      const selectInputWidth = selectInputRef.current ? selectInputRef.current.clientWidth : 0;
      const selectInputPaddingX = selectInputRef.current
        ? parseInt(window.getComputedStyle(selectInputRef.current).paddingLeft.slice(0, -2)) +
          parseInt(window.getComputedStyle(selectInputRef.current).paddingRight.slice(0, -2))
        : 0;
      const containerWidth = selectContainerRef.current?.clientWidth || 0;
      setIsShowingChips(selectInputWidth - selectInputPaddingX >= containerWidth);
    }, [
      currentValue,
      selectInputRef.current,
      selectContainerRef.current,
      selectInputRef.current?.clientWidth,
      isSelectOpen
    ]);

    React.useEffect(() => {
      setCurrentValue(value || multiselect ? [] : '');
    }, [value, multiselect]);

    const accessibilityWrapperProps = {
      role: 'combobox',
      tabIndex: disabled ? -1 : 0,
      'aria-disabled': disabled,
      'data-focus-visible': isSelectOpen,
      'aria-haspopup': true,
      ...(!isShowingChips &&
        !isValueEmpty && {
          'data-number-of-chips': currentValue.length
        })
    };

    const keyUpHandler = useKeyboard('Enter', (e: any) => {
      if (disabled) return;
      setIsSelectOpen(!isSelectOpen);
      onKeyUp?.(e as React.KeyboardEvent<HTMLDivElement>);
    });

    const keyEventHandlers = {
      onKeyUp: keyUpHandler
    };

    return (
      <InputWrapper
        className={addedClassname}
        leftElement={!!leftIcon ? LeftInputActions : null}
        rightElement={RightInputActions}
        ref={mergedRef}
      >
        {floatingLabel && <ContainedLabel isActive={isSelectOpen || !isValueEmpty}>{floatingLabel}</ContainedLabel>}

        <ValueInputWrapper
          ref={selectInputRef}
          className={classNames({ 'non-value': isValueEmpty })}
          onClick={handleFocus}
          {...accessibilityWrapperProps}
          {...keyEventHandlers}
        >
          {!isShowingChips && !isValueEmpty && (
            <div className='select-number-chips-label'>{currentValue.length + ' ' + countDescription}</div>
          )}

          <div className='select-container' ref={selectContainerRef}>
            {multiselect && Array.isArray(currentValue) && currentValue.length
              ? currentValue.map(
                  (item) =>
                    !!item && (
                      <Tag
                        key={item}
                        kind='glass'
                        color='accent'
                        value={item}
                        label={renderedOptions.filter((i) => i.value === item)[0].label}
                        onRemove={() => handleClick(item, true)}
                      />
                    )
                )
              : null}
          </div>

          <span className='select-label'>
            {isValueEmpty
              ? placeHolder
              : !multiselect && renderedOptions.filter((item) => item.value === currentValue)[0].label}
          </span>
        </ValueInputWrapper>

        <SelectMenu
          ref={setMenu}
          className={classNames('custom-select', className, { 'non-value': isValueEmpty })}
          anchor={wrapperRef.current as unknown as HTMLElement}
          isOpen={isSelectOpen}
          data-select-value={currentValue}
          {...props}
          style={{ width: rect?.width, ...style }}
          searchable={filterable}
        >
          {options && options.length > 0
            ? renderedOptions.map(({ value, label }) => {
                const isChecked = Array.isArray(currentValue)
                  ? currentValue.includes(value) && !!value
                  : value === currentValue && !!value;
                return (
                  <MenuItem
                    key={value}
                    value={value}
                    label={label}
                    checked={isChecked}
                    useInput={false}
                    multiselect={multiselect}
                    onChange={(e: any) => handleClick(e.target.value)}
                    icon={selectedIcon}
                  />
                );
              })
            : React.Children.map(children, cloneWithProps)}
        </SelectMenu>
      </InputWrapper>
    );
  }
);

CustomSelect.displayName = 'CustomSelect';

// =========================
// Select menu
// =========================
// Declare and export select menu type and select menu component

export interface SelectMenuProps extends MenuProps {}

export const SelectMenu = React.forwardRef<HTMLDivElement, SelectMenuProps>((props, ref) => {
  return <Menu {...props} ref={ref} />;
});

SelectMenu.displayName = 'SelectMenu';

// =========================
// Select item
// =========================
// Declare and export select item type and select item component

type SelectItemProps = React.ComponentProps<typeof MenuItem> &
  React.ComponentProps<typeof NativeOption> & { type?: 'input' | 'native' };

export const SelectItem = React.forwardRef<HTMLDivElement | HTMLOptionElement, SelectItemProps>((props, ref: any) => {
  const { type, ...rest } = props;
  let Component = type === 'input' ? MenuItem : NativeOption;
  return <Component {...rest} ref={ref} />;
});

SelectItem.displayName = 'SelectItem';

// =========================
// Select group
// =========================
// Declare and export select group type and select group component

export interface SelectGroupProps extends MenuGroupProps {}

export const SelectGroup = React.forwardRef<HTMLDivElement, SelectGroupProps>((props, ref) => {
  return <MenuGroup {...props} ref={ref} />;
});

SelectGroup.displayName = 'SelectGroup';

// =========================
// Select divider
// =========================
// Declare and export select divider type and select divider component

export interface SelectDividerProps extends MenuDividerProps {}

export const SelectDivider = React.forwardRef<HTMLDivElement, SelectDividerProps>((props, ref) => {
  return <MenuDivider {...props} ref={ref} />;
});

SelectDivider.displayName = 'SelectDivider';

// =========================
// Select utils
// =========================
// Declare utils for select and children of select component

const getSelectItems = (children: React.ReactNode): SelectItemType[] => {
  let returnValue: SelectItemType[] = [];

  React.Children.forEach(children, (child, index) => {
    if (!React.isValidElement(child)) return;

    if (child.type === SelectGroup) {
      returnValue = returnValue.concat(getSelectItems(child.props.children));
    }

    if (child.type === SelectItem) {
      returnValue = returnValue.concat({ value: child.props.value, label: child.props.label });
    }
  });

  return returnValue;
};
