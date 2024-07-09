'use client';

import './index.css';
import React from 'react';
import classNames from 'classnames';
import Base, { BaseProps } from '../Base';
import { Input, InputProps } from '../Input';
import useCombinedRefs from '../hooks/useCombinedRefs';
import { PolymorphicComponentProps, createPolymorphicComponent } from '../Base/factory';

export interface CheckboxProps extends InputProps {
  label?: string | React.ReactNode;
  subLabel?: string | React.ReactNode;
  indeterminate?: boolean;
  checkboxWrapperProps?: any;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ type = 'checkbox', label, subLabel, indeterminate = false, checkboxWrapperProps, ...props }, ref) => {
    const checkboxRef = React.useRef(null);
    const combinedRef = useCombinedRefs(checkboxRef, ref);

    React.useEffect(() => {
      if (combinedRef.current) {
        combinedRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    return (
      <CheckBoxWrapper aria-disabled={props.disabled} {...checkboxWrapperProps}>
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
  nested?: boolean;
  children?: React.ReactNode;
}

export const CheckboxGroup = ({ data, nested, children, ...props }: CheckboxGroup) => {
  if (children) {
    const treeData = transformChildrenToTree(children);
    return <CheckboxNest data={treeData} {...props} />;
  }

  if (nested) {
    return <CheckboxNest data={data} {...props} />;
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
  checkboxProps?: CheckboxProps;
  children?: DataItems;
}[];

export interface CheckboxNestProps {
  data?: DataItems;
  layout?: 'vertical' | 'horizontal';
  onChange?: any;
  label?: string | React.ReactNode;
  value?: string;
}

export const CheckboxNest = (props: CheckboxNestProps) => {
  const { data, onChange, label, value } = props;
  const defaultData = !!label && !!value ? [{ value: value, label: label, children: data }] : data;
  const [treeData, setTreeData] = React.useState(defaultData);
  const [flag, setFlag] = React.useState(false);

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

    flag &&
      onChange(findCheckedValues(newTreeData), newTreeData, (groupValue: DataItems[number]['value']): any[] =>
        getGroupValue(newTreeData, groupValue)
      );
  };

  React.useEffect(() => {
    setTreeData(data || []);

    //Update state base on provided data tree
    handleChange((data && data[0]) || ({} as DataItems[number]), {
      target: { checked: (data && data[0]?.checked) || false }
    });

    setFlag(true);
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
            {...node.checkboxProps}
          />

          {node.children && node.children.length && (
            <RecursiveCheckbox data={node.children as DataItems} handleChange={handleChange} indenticate={true} />
          )}
        </div>
      ))}
    </div>
  );
};

const transformChildrenToTree = (children: any) => {
  if (!children || !children.length) {
    return [];
  }

  const tree: any = [];

  React.Children.forEach(children, (child) => {
    const { label, value, children, checked, indeterminate, subLabel, ...rest } = child.props;
    const node = {
      label: label,
      value: value,
      checked: checked,
      indeterminate: indeterminate,
      subLabel: subLabel,
      checkboxProps: { ...rest },
      children: children
    };

    if (React.Children.count(child.props.children) > 0) {
      node.children = transformChildrenToTree(child.props.children) as any;
    }

    tree.push(node);
  });

  return tree;
};

const findCheckedValues = (data: DataItems) => {
  console.log(data);
  if (!data) {
    return [];
  }

  const result = [] as string[];

  const traverse = (node: DataItems[number]) => {
    if (!node.children && node.checked) {
      result.push(node.value);
    }
    if (node.children) {
      node.children.forEach((child) => traverse(child));
    }
  };

  if (Array.isArray(data)) {
    data.forEach((item) => traverse(item));
  }

  if (!Array.isArray(data)) {
    traverse(data);
  }

  return result;
};

const getGroupValue = (data: DataItems, groupValue: string) => {
  const group = findGroup(data, groupValue);
  if (!group) return [];
  return findCheckedValues(group as any);
};

const findGroup = (data: DataItems, groupValue: DataItems[number]['value']) => {
  let foundGroup = null as DataItems[number] | null;

  function traverse(node: DataItems[number]) {
    if (node.value === groupValue) {
      foundGroup = node;
      return;
    }
    if (node.children) {
      for (const child of node.children) {
        traverse(child);
        if (foundGroup) return;
      }
    }
  }

  data.forEach((item) => traverse(item));

  return foundGroup;
};
