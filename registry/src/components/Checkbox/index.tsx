'use client';

import './index.css';
import React from 'react';
import classNames from 'classnames';
import Base, { BaseProps } from '../Base';
import { Input, InputProps } from '../Input';
import useCombinedRefs from '../hooks/useCombinedRefs';
import { PolymorphicComponentProps, createPolymorphicComponent } from '../Base/factory';
import useCloneChildren from '../hooks/useCloneChildren';

export interface CheckboxProps extends InputProps {
  /**
   * The label of checkbox
   */
  label?: string | React.ReactNode;

  /**
   * The sub-label of checkbox
   */
  subLabel?: string | React.ReactNode;

  /**
   * Setting indeterminate state for checkbox
   */
  indeterminate?: boolean;

  parentValues?: any;
  setParentValues?: any;
  checkedParentValues?: any;
  setCheckedParentValues?: any;
  onGroupChange?: any;
  depth?: number;
}

/**
 * Checkbox component with HTMLInputElement ref and CheckboxProps.
 *
 * This extends props from an input with type = checkbox.
 *
 * Specific props: label, subLabel, indeterminate, nested, data.
 *
 * @see http://localhost:3005/checkbox
 */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      type = 'checkbox',
      label,
      subLabel,
      indeterminate = false,
      depth,
      parentValues,
      setParentValues,
      checkedParentValues,
      setCheckedParentValues,
      onGroupChange,
      onChange,
      ...props
    },
    ref
  ) => {
    const checkboxRef = React.useRef(null);
    const combinedRef = useCombinedRefs(checkboxRef, ref);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const isChecked = event.target.checked;
      const value = event.target.value;

      if (checkedParentValues && setCheckedParentValues && setParentValues && onGroupChange) {
        let updatedValues = [...checkedParentValues];

        if (isChecked) {
          updatedValues.push(value);
        } else {
          updatedValues = updatedValues.filter((item) => item !== value);
        }

        const uniqueValues = Array.from(new Set(updatedValues));

        setCheckedParentValues(uniqueValues);

        onGroupChange(uniqueValues);
      }

      onChange && onChange(event);
    };

    React.useEffect(() => {
      if (combinedRef.current) {
        combinedRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    React.useEffect(() => {
      if (setParentValues) {
        setParentValues((pre: any[]) => {
          const uniqueValues = new Set([...pre, { value: props.value, checked: props.checked }]);
          return Array.from(uniqueValues);
        });
      }
    }, [setParentValues, props.value, props.checked]);

    return (
      <CheckBoxWrapper aria-disabled={props.disabled}>
        <Input className='checkbox' type={type} ref={combinedRef} onChange={handleCheckboxChange} {...props} />
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

export interface CheckboxGroup extends CheckboxNestProps {
  /**
   * The layout of group checboxes
   */
  layout?: 'vertical' | 'horizontal';

  /**
   * Children of Group
   */
  children?: React.ReactNode;
  label?: any;
  value?: any;
  allChecked?: boolean;
  parentValues?: any;
  setParentValues?: any;
  checkedParentValues?: any;
  setCheckedParentValues?: any;
  onGroupChange?: any;
  style?: any;
}

export const CheckboxGroup = ({
  data,
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
  onGroupChange,
  depth = 0,
  ...props
}: CheckboxGroup & { depth?: number }) => {
  const [childrenValues, setChildrenValues] = React.useState<{ label: any; value: any }[]>([]); // danh sach list
  const [checkedValues, setCheckedValues] = React.useState<string[]>([]); // danh sach checked
  const [isAllChecked, setIsAllChecked] = React.useState(allChecked);

  const [isIndeterminate, setIsIndeterminate] = React.useState(false);

  React.useEffect(() => {
    if (setParentValues) {
      setParentValues((pre: any[]) => {
        const uniqueValues = new Set([...pre, ...childrenValues]);
        return Array.from(uniqueValues);
      });
    }
  }, [childrenValues, setParentValues]);

  React.useEffect(() => {
    setIsIndeterminate(checkedValues.length > 0 && checkedValues.length < childrenValues.length);
    setIsAllChecked(checkedValues.length === childrenValues.length);

    if (setCheckedParentValues) {
      const uniqueValues = new Set([...checkedParentValues, ...checkedValues]);
      setCheckedParentValues(Array.from(uniqueValues));
      onGroupChange && onGroupChange(Array.from(uniqueValues));
    }
  }, [checkedValues, childrenValues]);

  const marginStyle = (depth: number) => (depth ? { marginLeft: depth * 28 } : {});

  const cloneChildren = useCloneChildren(children, {
    setParentValues: setChildrenValues,
    parentValues: childrenValues,
    checkedParentValues: checkedValues,
    setCheckedParentValues: (values: any) => {
      setCheckedValues(values);
    },
    onGroupChange: onChange,
    depth: depth + 1,
    wrapperProps: { style: marginStyle(depth) }
  });

  if (children) {
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
              if (checkedValues.length > 0) {
                setCheckedValues([]);
              } else {
                setCheckedValues(childrenValues.map((item) => item.value));
              }
            }}
          />
        )}
        {cloneChildren}
      </div>
    );
  }
};

export interface CheckBoxWrapperProps extends BaseProps {}

/**
 * Create checkbox wrapper for checkbox component
 *
 * Props of wrapper extends from BaseProps
 */
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

export type DataItems = {
  value: string;
  label: string | React.ReactNode;
  subLabel?: string | React.ReactNode;
  checked?: boolean;
  indeterminate?: boolean;
  inputProps?: CheckboxProps;
  children?: DataItems;
}[];

export interface CheckboxNestProps {
  /**
   * The data tree for nested checkbox
   */
  data?: DataItems;

  /**
   * Callback when checkbox is changed
   */
  onChange?: any;

  /**
   * Root check box, add a root to apply checked to all children
   */
  root?: string;
}

export const CheckboxNest = (props: CheckboxNestProps) => {
  const { data, onChange, root } = props;
  const defaultData = root ? [{ value: 'root', label: root, children: data }] : data;
  const [treeData, setTreeData] = React.useState(defaultData);

  /**
   * Update children when a node change
   */
  const updateChildren = (node: DataItems[number], isChecked: boolean) => {
    node.checked = isChecked;
    node.indeterminate = false;

    if (node.children) {
      node.children.forEach((child) => updateChildren(child, isChecked));
    }
  };

  /**
   * Update Parents when a node change
   */
  const updateParents = (nodes: DataItems, currentNode: DataItems[number] | null = null) => {
    nodes.forEach((node: DataItems[number]) => {
      if (node.children) {
        updateParents(node.children, node);
      }

      if (currentNode !== null && currentNode.children) {
        const checkedChildren = currentNode.children.filter((child) => child.checked);
        const indeterminatedChildren = currentNode.children.filter((child) => child.indeterminate);
        currentNode.checked = checkedChildren.length === currentNode.children.length;
        currentNode.indeterminate =
          (checkedChildren.length > 0 && checkedChildren.length < currentNode.children.length) ||
          indeterminatedChildren.length > 0;
      }
    });
  };

  /**
   * Handle change event
   */
  const handleChange = (clickedNode: DataItems[number], e: any) => {
    const isChecked = e.target.checked;
    const newTreeData = treeData ? [...treeData] : [];

    const findNodeAndUpdate = (nodes: DataItems) => {
      nodes.forEach((n) => {
        if (n.value === clickedNode.value) {
          updateChildren(n, isChecked);
        } else if (n.children) {
          findNodeAndUpdate(n.children);
        }
      });
    };

    findNodeAndUpdate(newTreeData);

    updateParents(newTreeData);

    setTreeData(newTreeData);

    onChange(newTreeData);
  };

  React.useEffect(() => {
    setTreeData(data || []);

    //Update state base on provided data tree
    handleChange((data && data[0]) || ({} as DataItems[number]), {
      target: { checked: (data && data[0]?.checked) || false }
    });
  }, [data]);

  return <RecursiveCheckbox data={treeData || []} handleChange={handleChange} />;
};

/**
 * Recursive function to generate the checkboxes
 */
export const RecursiveCheckbox = ({
  data,
  handleChange,
  indenticate = false
}: {
  data: DataItems;
  handleChange: any;
  indenticate?: boolean;
}) => {
  return (
    <div className='checkbox-group'>
      {data.map((node: DataItems[number]) => (
        // 16 for parent checkbox, 12 for gap from checkbox to label
        <div
          className='checkbox-group'
          key={node.value}
          style={indenticate ? { marginLeft: 16 + 12 } : { marginLeft: 0 }}
        >
          <Checkbox
            label={node.label}
            subLabel={node.subLabel}
            value={node.value || ''}
            checked={node.checked || false}
            indeterminate={node.indeterminate || false}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(node, e)}
            {...node.inputProps}
          />

          {node.children && node.children.length && (
            <RecursiveCheckbox data={node.children as DataItems} handleChange={handleChange} indenticate={true} />
          )}
        </div>
      ))}
    </div>
  );
};
