'use client';

import './index.css';
import React, { useCallback } from 'react';
import classNames from 'classnames';
import Base, { BaseProps } from '../Base';
import { Input, InputProps } from '../Input';
import useCombinedRefs from '../hooks/useCombinedRefs';
import { PolymorphicComponentProps, createPolymorphicComponent } from '../Base/factory';

export interface CheckboxProps extends InputProps {
  label?: string | React.ReactNode;
  subLabel?: string | React.ReactNode;
  indeterminate?: boolean;
  allChecked?: boolean;
  parentValues?: any[];
  setParentValues?: any;
  checkedParentValues?: any[];
  setCheckedParentValues?: any;
  depth?: number;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      type = 'checkbox',
      label,
      subLabel,
      indeterminate = false,
      depth,
      allChecked,
      parentValues,
      setParentValues,
      checkedParentValues,
      setCheckedParentValues,
      onChange,
      ...props
    },
    ref
  ) => {
    const checkboxRef = React.useRef(null);
    const combinedRef = useCombinedRefs(checkboxRef, ref);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setCheckedParentValues && setCheckedParentValues(event);
      onChange && onChange(event);
    };

    React.useEffect(() => {
      if (combinedRef.current) {
        combinedRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    React.useEffect(() => {
      if (setParentValues) {
        setParentValues((pre: any) => {
          const exists = pre.some((item: any) => item.value === props.value);
          if (!exists) {
            return [...pre, { value: props.value, checked: props.checked }];
          }
          return pre;
        });
      }
    }, []);

    return (
      <CheckBoxWrapper aria-disabled={props.disabled}>
        <Input className='checkbox' type={type} ref={combinedRef} onChange={handleChange} {...props} />
        {label || subLabel ? (
          <div className='input-label-wrapper'>
            {label && <span className='input-label'>{label}</span>}
            {subLabel && <span className='input-sublabel'>{subLabel}</span>}
          </div>
        ) : (
          <></>
        )}
      </CheckBoxWrapper>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export interface CheckboxGroup {
  layout?: 'vertical' | 'horizontal';
  children?: React.ReactNode;
  label?: string | React.ReactNode;
  value?: string;
  allChecked?: boolean;
  parentValues?: any[];
  setParentValues?: any;
  checkedParentValues?: any[];
  setCheckedParentValues?: any;
  style?: any;
  onChange?: any;
}

export const CheckboxGroup = ({
  layout = 'vertical',
  value,
  label,
  allChecked = false,
  children,
  parentValues,
  setParentValues,
  checkedParentValues,
  setCheckedParentValues,
  style,
  onChange,
  depth = 0,
  ...props
}: CheckboxGroup & { depth?: number }) => {
  const [flag, setFlag] = React.useState(0);
  const [childrenValues, setChildrenValues] = React.useState<{ value: any; checked: any }[]>([]); // danh sach list
  const [checkedValues, setCheckedValues] = React.useState<string[]>([]); // danh sach checked
  const [isIndeterminate, setIsIndeterminate] = React.useState(false);
  const [isAllChecked, setIsAllChecked] = React.useState(false);

  const marginStyle = (depth: number) => (depth ? { marginLeft: depth * 28 } : {});

  const handleCheckboxChange = (event?: any, values?: any) => {
    if (values && values.length > 0) {
      setCheckedValues(values);

      const filteredParentValues = checkedParentValues
        ? Array.from(new Set([...checkedParentValues, ...values]))
        : values;
      setCheckedParentValues && setCheckedParentValues(null, filteredParentValues);
    } else if (values && values.length === 0) {
      setCheckedValues([]);

      const filteredParentValues = checkedParentValues
        ? checkedParentValues.filter((item: any) => !childrenValues.some((child: any) => child.value === item))
        : [];

      setCheckedParentValues && setCheckedParentValues(null, filteredParentValues);
    }

    if (!event) return;
    const isChecked = event?.target.checked;
    const value = event?.target.value;

    if (isChecked) {
      const uniqueValues = new Set([...checkedValues, value]);

      setCheckedValues(Array.from(uniqueValues));

      setCheckedParentValues && setCheckedParentValues(event);
    } else {
      const uniqueValues = checkedValues.filter((item: any) => item !== value);

      setCheckedValues(uniqueValues);

      setCheckedParentValues && setCheckedParentValues(event);
    }
  };

  const updateRelativeValue = () => {
    if (checkedValues.length > 0) {
      handleCheckboxChange(null, []);
    } else {
      handleCheckboxChange(
        null,
        childrenValues.map((item) => item.value)
      );
    }
  };

  React.useEffect(() => {
    if (setParentValues) {
      setParentValues((pre: any[]) => {
        const uniqueValues = new Set([...pre, ...childrenValues]);
        return Array.from(uniqueValues);
      });
    }
  }, [childrenValues, setParentValues]);

  React.useEffect(() => {
    setCheckedValues(allChecked ? childrenValues.map((item) => item.value) : []);
  }, [allChecked]);

  React.useEffect(() => {
    setIsIndeterminate(checkedValues.length > 0 && checkedValues.length < childrenValues.length);

    const parentContained =
      checkedParentValues && childrenValues
        ? childrenValues.every((child) => checkedParentValues.includes(child.value))
        : false;
    if (parentContained) {
      setIsAllChecked(true);
    } else {
      setIsAllChecked(!childrenValues.length ? false : checkedValues.length === childrenValues.length);
    }
  }, [checkedValues]);

  React.useEffect(() => {
    if (flag <= 1) {
      return setFlag((pre) => pre + 1);
    }
    onChange && onChange(checkedValues);
  }, [checkedValues]);

  const cloneChildren = React.Children.map(children, (child: any, index) => {
    return React.cloneElement(child, {
      ...child.props,

      setParentValues: setChildrenValues,

      setCheckedParentValues: handleCheckboxChange,

      parentValues: childrenValues,

      checked:
        checkedValues.includes(childrenValues[index]?.value) ||
        checkedParentValues?.includes(childrenValues[index]?.value) ||
        false,

      allChecked: isAllChecked,

      checkedParentValues: checkedValues,

      depth: depth + 1,

      wrapperProps: { style: marginStyle(depth) }
    });
  });

  if (children) {
    console.log(transformChildrenToTree(children));
    return (
      <div className={classNames('checkbox-group', layout)}>
        {label && value && (
          <Checkbox
            label={label}
            value={value}
            indeterminate={isIndeterminate}
            checked={isAllChecked}
            wrapperProps={{ style: marginStyle(depth - 1) }}
            onChange={(e) => {
              updateRelativeValue();
            }}
          />
        )}
        {cloneChildren}
      </div>
    );
  }
};

export interface CheckBoxWrapperProps extends BaseProps {}

export const CheckBoxWrapper = createPolymorphicComponent<'label', CheckBoxWrapperProps>(
  <C extends React.ElementType = 'label'>(
    { component, className, children, ...props }: PolymorphicComponentProps<C, CheckBoxWrapperProps>,
    ref: React.Ref<any>
  ) => {
    const Component = component || ('label' as C);
    return (
      <Base component={Component} className={classNames('checkbox-wrapper', className)} ref={ref} {...props}>
        {children}
      </Base>
    );
  }
);
CheckBoxWrapper.displayName = 'CheckBoxWrapper';

const transformChildrenToTree = (children: any) => {
  if (!children || !children.length) {
    return [];
  }

  const tree: any = [];

  React.Children.forEach(children, (child, index) => {
    const node = {
      id: index + 1, // Assign an id based on index (you can modify this logic)
      ...child.props
    };

    if (React.Children.count(child.props.children) > 0) {
      node.children = transformChildrenToTree(child.props.children) as any;
    }

    tree.push(node);
  });

  return tree;
};
