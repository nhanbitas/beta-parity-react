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
  value?: string;
  selectedIcon?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLDivElement>) => void;
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
    const refOutsideClick = useOutsideClick(() => setIsSelectOpen(false), ['click', 'touchstart'], [menu]);
    const [wrapperRef, rect] = useResizeObserver();
    const mergedRef = useCombinedRefs(ref, refOutsideClick, wrapperRef);
    const [chipsRef, chipsRect] = useResizeObserver();

    const handleClick = (value: string, isRemove?: boolean) => {
      let changedValue: string | string[];

      if (multiSelect) {
        isRemove || (currentValue.includes(value) && allowDeselection)
          ? (changedValue = (currentValue as string[]).filter((val) => val !== value))
          : (changedValue = Array.from(new Set([...(currentValue as string[]), value])));
      } else {
        changedValue = value;
      }

      !!value ? setCurrentValue(changedValue) : setCurrentValue(multiSelect ? [] : '');
      onChange && onChange(changedValue as any);
      setIsSelectOpen(false);
    };

    const handleClear = () => {
      setCurrentValue('');
      onChange && onChange('' as any);
    };

    const handleFocus = (e: any) => {
      setIsSelectOpen(!isSelectOpen);
      onFocus && onFocus(e);
    };

    React.useEffect(() => {
      setCurrentValue(value || '');
    }, [value]);

    if ((options && options.length > 0) || children) {
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

      const accessibilityWrapperProps = {
        role: 'combobox',
        tabIndex: 0,
        'data-focus-visible': isSelectOpen,
        'aria-haspopup': true
      };
      console.log(rect);
      console.log(chipsRef.current?.getBoundingClientRect());
      return (
        <InputWrapper className={addedClassname} rightElement={RightInputActions} ref={mergedRef}>
          {floatingLabel && <ContainedLabel isActive={isSelectOpen || !isValueEmpty}>{floatingLabel}</ContainedLabel>}

          <ValueInputWrapper
            className={classNames({ 'non-value': isValueEmpty })}
            onClick={handleFocus}
            {...accessibilityWrapperProps}
          >
            {Array.isArray(currentValue) && !!currentValue.length ? (
              <div className='chips-container' ref={chipsRef}>
                {currentValue.map(
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
                )}
              </div>
            ) : (
              <span>{isValueEmpty ? placeHolder : options.filter((item) => item.value === currentValue)[0].label}</span>
            )}
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

    return null;
  }
);

CustomSelect.displayName = 'CustomSelect';

export interface SelectItem extends MenuItemProps {}

export const SelectItem = React.forwardRef<HTMLDivElement, SelectItem>((props, ref) => {
  return <MenuItem {...props} ref={ref} />;
});

SelectItem.displayName = 'SelectItem';
