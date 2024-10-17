'use client';

import React from 'react';
import { Input, InputProps } from '../BaseInput';
import { createPolymorphicComponent, PolymorphicComponentProps } from '../Base/factory';
import classNames from 'classnames';
import Base, { BaseProps } from '../Base';
import './index.css';
import useDidMountEffect from '../hooks/useDidMountEffect';

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
  ({ type = 'radio', name, label, sublabel, radioWrapperProps, ...props }, ref) => {
    return (
      <RadioWrapper aria-disabled={props.disabled} {...radioWrapperProps}>
        <Input className='radio' name={name} type={type} ref={ref} {...props} />
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

export interface RadioGroupProps extends BaseProps {
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

export const RadioGroup = createPolymorphicComponent<'div', RadioGroupProps>(
  <C extends React.ElementType = 'div'>(
    {
      component,
      className,
      children,
      name,
      label,
      defaultValue,
      value,
      disabled,
      items,
      onChange,
      ...props
    }: PolymorphicComponentProps<C, RadioGroupProps>,
    ref: React.Ref<any>
  ) => {
    const Component = component || ('div' as C);

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
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
            handleChange(e);
            rest.onChange && rest.onChange(e);
          },
          checked: currentValue === rest.value,
          disabled: disabled || rest.disabled,
          ...rest
        });
      }
    });

    useDidMountEffect(() => {
      setCurrentValue(value || '');
      if (onChange) onChange(value as string | number);
    }, [value]);

    return (
      <Base component={Component} className={classNames('radio-group', className)} ref={ref} {...props}>
        <label className='radio-group-label'>{label}</label>
        {items && items.length
          ? items.map((item) => (
              <Radio
                {...item}
                key={item.value as string}
                name={name}
                onChange={handleChange}
                disabled={disabled}
                checked={currentValue === item.value}
              />
            ))
          : cloneChildren}
      </Base>
    );
  }
);

export interface RadioWrapperProps extends BaseProps {}

/**
 * Create Radio wrapper for Radio component
 *
 * Props of wrapper extends from BaseProps
 */
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
