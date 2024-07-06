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
  ({ type = 'checkbox', label, subLabel, indeterminate = false, ...props }, ref) => {
    const checkboxRef = React.useRef(null);
    const combinedRef = useCombinedRefs(checkboxRef, ref);

    React.useEffect(() => {
      if (combinedRef.current) {
        combinedRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);
    return (
      <CheckBoxWrapper aria-disabled={props.disabled}>
        <Input className='checkbox' type={type} ref={combinedRef} {...props} />
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
  value?: any;
  label?: any;
  style?: any;
}

export const CheckboxGroup = ({
  data,
  layout = 'vertical',
  value,
  label,
  children,
  depth = 0,
  style,
  ...props
}: CheckboxGroup & { depth?: number }) => {
  console.log(depth);
  const [values, setValues] = React.useState<any[]>([]);

  const handleChange = (node: DataItems[number], e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const checked = e.target.checked;

    if (checked && !values.includes(value)) {
      setValues([...values, value]);
    } else {
      setValues(values.filter((v) => v !== value));
    }
  };

  React.useEffect(() => {
    if (props.onChange) {
      props.onChange(values);
    }
  }, [values]);

  const marginStyle = (depth: number) => (depth ? { marginLeft: depth * 28 } : {});

  const cloneChildren = useCloneChildren(children, {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleChange({} as DataItems[number], e),
    depth: depth + 1,
    wrapperProps: { style: marginStyle(depth) }
  });

  if (children) {
    return (
      <div className={classNames('checkbox-group', layout)}>
        {label && value && <Checkbox label={label} value={value} wrapperProps={{ style: marginStyle(depth - 1) }} />}
        {cloneChildren}
      </div>
    );
  }

  if (data && data.length) {
    const checkboxes = value && label ? [...data, { value, label }] : data;
    return (
      <div className={classNames('checkbox-group', layout)} {...props}>
        {checkboxes &&
          checkboxes.map((node: DataItems[number]) => (
            <Checkbox
              key={node.value}
              label={node.label}
              subLabel={node.subLabel}
              value={node.value || ''}
              checked={node.value ? values.includes(node.value) : false}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(node, e)}
              {...node.inputProps}
            />
          ))}
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
