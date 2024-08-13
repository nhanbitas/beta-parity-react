import React from 'react';
import classNames from 'classnames';
import './index.css';
import { InputWrapper, ValueInputWrapper } from '../Input';
import { ChevronDown, X } from 'lucide-react';
import { Menu, MenuItem, MenuItemProps, MenuProps } from '../Menu';
import { ContainedLabel } from '../FloatingLabel';
import { Chip } from '../Chip';
import { useResizeObserver } from '../hooks/useObserver';
import { useOutsideClick } from '../hooks/useOutsideClick';
import useCombinedRefs from '../hooks/useCombinedRefs';

export type SelecItemType = { value: string; label: string };

export interface CustomSelectProps extends React.HTMLAttributes<HTMLDivElement>, MenuProps {
  options: SelecItemType[];
  multiSelect?: boolean;
  filterable?: boolean;
  placeHolder?: string;
  clearButton?: boolean;
  allowDeselection?: boolean;
  floatingLabel?: React.ReactNode;
  value?: string | string[];
  selectedIcon?: React.ReactNode;
  countDescription?: string;
  onChange?: (e: any) => void;
  onFocus?: (e: React.FocusEvent<HTMLDivElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void;
  onclick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const CustomSelect = React.forwardRef<HTMLDivElement, CustomSelectProps>(
  (
    {
      options,
      children,
      className,
      multiSelect = false,
      filterable = false,
      clearButton = false,
      allowDeselection = false,
      placeHolder = 'Please choose an option',
      countDescription = 'item(s) selected',
      selectedIcon,
      floatingLabel,
      onChange,
      onFocus,
      onBlur,
      onclick,
      value,
      ...props
    },
    ref
  ) => {
    const [currentValue, setCurrentValue] = React.useState<string | string[]>(value || multiSelect ? [] : '');
    const [isSelectOpen, setIsSelectOpen] = React.useState(false);
    const [menu, setMenu] = React.useState<HTMLDivElement | null>(null);
    const [wrapperRef, rect] = useResizeObserver();
    const refOutsideClick = useOutsideClick(() => setIsSelectOpen(false), ['click', 'touchstart'], [menu]);
    const mergedRef = useCombinedRefs(ref, refOutsideClick, wrapperRef);
    const selectContainerRef = React.useRef<HTMLDivElement>(null);
    const selectInputRef = React.useRef<HTMLInputElement>(null);

    const handleClick = (value: string, isResetValue?: boolean) => {
      let changedValue: string | string[];
      if (multiSelect) {
        isResetValue || (currentValue.includes(value) && allowDeselection)
          ? (changedValue = (currentValue as string[]).filter((val) => val !== value))
          : (changedValue = Array.from(new Set([...(currentValue as string[]), value])));
      } else {
        changedValue = value;
      }

      !!value ? setCurrentValue(() => changedValue) : setCurrentValue(() => (multiSelect ? [] : ''));
      onChange && onChange(changedValue as any);
      setIsSelectOpen(false);
    };

    const handleClear = () => {
      setCurrentValue(multiSelect ? [] : '');
      onChange && onChange(multiSelect ? [] : '');
    };

    const handleFocus = (e: any) => {
      setIsSelectOpen(!isSelectOpen);
      onFocus && onFocus(e);
    };

    React.useEffect(() => {
      setCurrentValue(value || multiSelect ? [] : '');
    }, [value]);

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

    const [isShowingChips, setIsShowingChips] = React.useState(
      multiSelect && Array.isArray(currentValue) && currentValue.length > 0
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

    const accessibilityWrapperProps = {
      role: 'combobox',
      tabIndex: 0,
      'data-focus-visible': isSelectOpen,
      'aria-haspopup': true,
      ...(!isShowingChips &&
        !isValueEmpty && {
          'data-number-of-chips': currentValue.length
        })
    };

    return (
      <InputWrapper className={addedClassname} rightElement={RightInputActions} ref={mergedRef}>
        {floatingLabel && <ContainedLabel isActive={isSelectOpen || !isValueEmpty}>{floatingLabel}</ContainedLabel>}

        <ValueInputWrapper
          ref={selectInputRef}
          className={classNames({ 'non-value': isValueEmpty })}
          onClick={handleFocus}
          {...accessibilityWrapperProps}
        >
          {!isShowingChips && !isValueEmpty && (
            <div className='select-number-chips-label'>{currentValue.length + ' ' + countDescription}</div>
          )}

          <div className='select-container' ref={selectContainerRef}>
            {multiSelect && Array.isArray(currentValue) && currentValue.length
              ? currentValue.map(
                  (item) =>
                    !!item && (
                      <Chip
                        key={item}
                        type='input'
                        kind='glass'
                        color='orange'
                        value={item}
                        label={options.filter((i) => i.value === item)[0].label}
                        onRemove={() => handleClick(item, true)}
                      />
                    )
                )
              : null}
          </div>

          <span className='select-label'>
            {isValueEmpty
              ? placeHolder
              : !multiSelect && options.filter((item) => item.value === currentValue)[0].label}
          </span>
        </ValueInputWrapper>

        <Menu
          ref={setMenu}
          className={classNames('custom-select', className, { 'non-value': isValueEmpty })}
          anchor={wrapperRef.current as unknown as HTMLElement}
          isOpen={isSelectOpen}
          data-select-value={currentValue}
          {...props}
          style={{ width: rect?.width, ...props.style }}
          searchable={filterable}
        >
          {options.map(({ value, label }) => {
            const isChecked = Array.isArray(currentValue)
              ? currentValue.includes(value) && !!value
              : value === currentValue && !!value;
            return (
              <MenuItem
                key={value}
                value={value}
                label={label}
                useInput
                checked={isChecked}
                onChange={(e: any) => handleClick(e.value)}
                icon={selectedIcon}
              />
            );
          })}
        </Menu>
      </InputWrapper>
    );
  }
);

CustomSelect.displayName = 'CustomSelect';

export interface SelectItem extends MenuItemProps {}

export const SelectItem = React.forwardRef<HTMLDivElement, SelectItem>((props, ref) => {
  return <MenuItem {...props} ref={ref} />;
});

SelectItem.displayName = 'SelectItem';
