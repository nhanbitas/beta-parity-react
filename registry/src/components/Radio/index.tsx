'use client';

import React from 'react';
import './index.css';
import './variables.css';
import { InputProps } from '../BaseInput';
import classNames from 'classnames';
import { BaseProps } from '../Base';
import useDidMountEffect from '../hooks/useDidMountEffect';

const colorMap = {
  neutral: 'neutral',
  accent: 'accent'
} as const;

// =========================
// Radio
// =========================
// Declare and export Radio type and Radio component

export interface RadioProps extends InputProps {
  /**
   * The label for the Radio.
   * Can be a string or a React node.
   *
   * @type {string | React.ReactNode}
   * @memberof RadioProps
   */
  label?: string | React.ReactNode;

  /**
   * The sub-label for the Radio.
   * Can be a string or a React node.
   *
   * @type {string | React.ReactNode}
   * @memberof RadioProps
   */
  sublabel?: string | React.ReactNode;

  /**
   * Additional props for the Radio wrapper.
   *
   * @type {any}
   * @memberof RadioProps
   */
  radioWrapperProps?: any;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ label, sublabel, radioWrapperProps, color = 'neutral', ...props }, ref) => {
    return (
      <RadioWrapper aria-disabled={props.disabled} {...radioWrapperProps}>
        <div className='radio-input'>
          {/* Because of "name" dependency (can not catch checked value of radio),
           it can not approach like checkbox icon (checkbox works independently) */}
          <RadioIcon color={color} checked={true} disabled={props.disabled || false} />
          <RadioIcon color={color} checked={false} disabled={props.disabled || false} />
          <input
            className={classNames('par-radio', colorMap[color as keyof typeof colorMap])}
            type='radio'
            ref={ref}
            {...props}
          />
        </div>
        {label || sublabel ? (
          <div className='input-label-wrapper'>
            {label && <span className='input-label'>{label}</span>}
            {sublabel && <span className='input-sublabel'>{sublabel}</span>}
          </div>
        ) : (
          <></>
        )}
      </RadioWrapper>
    );
  }
);

Radio.displayName = 'Radio';

// =========================
// RadioGroup
// =========================
// Declare and export RadioGroup type and RadioGroup component

export interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * The name of the RadioGroup
   *
   * It defines name property for children
   *
   * @type {string}
   * @memberof RadioGroupProps
   */
  name: string;

  /**
   * The label of the RadioGroup
   *
   * @type {string}
   * @memberof RadioGroupProps
   */
  label?: string | React.ReactNode;

  /**
   * The default value of the RadioGroup if radio is not controlled
   *
   * @type {string | number}
   * @memberof RadioGroupProps
   */
  defaultValue?: string | number;

  /**
   * The default value of the RadioGroup
   *
   * @type {string | number}
   * @memberof RadioGroupProps
   */
  value?: string | number;

  /**
   * The checkboxs of group will be disabled
   *
   * @type {boolean}
   * @memberof RadioGroupProps
   */
  disabled?: boolean;

  /**
   * The checkboxs of group will be generate automatically by data
   *
   * @type {RadioProps[]}
   * @memberof RadioGroupProps
   */
  items?: RadioProps[];

  /**
   * The onChange event of the RadioGroup
   *
   * It returns the once of value in radio group
   *
   * @memberof RadioGroupProps
   */
  onChange?: (value: string | number) => void;
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    { className, children, name, label, color = 'neutral', defaultValue, value, disabled, items, onChange, ...props },
    ref
  ) => {
    const initialValue = value ? value : defaultValue ? defaultValue : '';
    const [currentValue, setCurrentValue] = React.useState(initialValue);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const changedValue = e.target.value;
      e.target.checked && setCurrentValue(changedValue);
      if (onChange) onChange(changedValue as string | number);
    };

    const cloneChildren = React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        const { ...rest } = child.props;
        return React.cloneElement(child, {
          name,
          onChange: handleChange,
          color: color ?? rest.color,
          checked: currentValue === rest.value,
          disabled: disabled ?? rest.disabled,
          ...rest
        });
      }
    });

    useDidMountEffect(() => {
      setCurrentValue(value ?? '');
      if (onChange) onChange(value as string | number);
    }, [value]);

    return (
      <div className={classNames('radio-group', className)} ref={ref} {...props}>
        <label className='radio-group-label'>{label}</label>
        {items && items.length
          ? items.map((item) => (
              <Radio
                {...item}
                key={item.value as string}
                name={name}
                color={color}
                onChange={handleChange}
                checked={currentValue === item.value}
                disabled={disabled}
              />
            ))
          : cloneChildren}
      </div>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';

// =========================
// RadioWrapper
// =========================
// Declare and export RadioWrapper type and RadioWrapper component

export interface RadioWrapperProps extends BaseProps {}

export const RadioWrapper = React.forwardRef<
  HTMLLabelElement,
  RadioWrapperProps & React.HTMLAttributes<HTMLLabelElement>
>(({ className, children, ...props }, ref) => {
  return (
    <label className={classNames('radio-wrapper', className)} ref={ref} {...props}>
      {children}
    </label>
  );
});

RadioWrapper.displayName = 'RadioWrapper';

// =========================
// RadioIcon
// =========================
// Declare and export RadioIcon type and RadioIcon component

export interface RadioIconProps extends BaseProps {
  checked: boolean;
  disabled: boolean;
  color: string;
}

export const RadioIcon = React.forwardRef<HTMLLabelElement, RadioIconProps & React.HTMLAttributes<HTMLLabelElement>>(
  ({ className, children, checked, color, disabled, ...props }, ref) => {
    const strokeColor = `var(--par-color-icon-radio${disabled ? '-disabled' : '-enabled'})`;
    const selectedStrokeColor = `var(--par-color-icon-radio-${color}${disabled ? '-disabled' : '-selected'})`;

    return (
      <svg
        className={`radio-icon ${checked ? 'radio-checked' : 'radio-unchecked'}`}
        xmlns='http://www.w3.org/2000/svg'
        width={16}
        height={16}
        viewBox='0 0 16 16'
        fill='none'
      >
        {checked ? (
          <rect x={2.5} y={2.5} width={11} height={11} rx={7} stroke={selectedStrokeColor} strokeWidth={5} />
        ) : (
          <rect x={1} y={1} width={14} height={14} rx={7} stroke={strokeColor} strokeWidth={2} />
        )}
      </svg>
    );
  }
);

RadioIcon.displayName = 'RadioIcon';
