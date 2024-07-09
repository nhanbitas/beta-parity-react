'use client';

import './index.css';
import React from 'react';
import classNames from 'classnames';
import Base, { BaseProps } from '../Base';
import { Input, InputProps } from '../Input';
import useCombinedRefs from '../hooks/useCombinedRefs';
import { PolymorphicComponentProps, createPolymorphicComponent } from '../Base/factory';

export interface CheckboxProps extends InputProps {
  /**
   * The label for the checkbox.
   * Can be a string or a React node.
   *
   * @type {string | React.ReactNode}
   * @memberof CheckboxProps
   */
  label?: string | React.ReactNode;

  /**
   * The sub-label for the checkbox.
   * Can be a string or a React node.
   *
   * @type {string | React.ReactNode}
   * @memberof CheckboxProps
   */
  subLabel?: string | React.ReactNode;

  /**
   * Indicates whether the checkbox is in an indeterminate state.
   *
   * @type {boolean}
   * @memberof CheckboxProps
   */
  indeterminate?: boolean;

  /**
   * Additional props for the checkbox wrapper.
   *
   * @type {any}
   * @memberof CheckboxProps
   */
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
    }, [indeterminate, combinedRef]);

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

export type DataItems = {
  value: string;
  label: string | React.ReactNode;
  subLabel?: string | React.ReactNode;
  checked?: boolean;
  indeterminate?: boolean;
  checkboxProps?: CheckboxProps;
  children?: DataItems;
}[];

export interface CheckboxGroup extends BaseProps {
  /**
   * The children nodes of the CheckboxGroup.
   *
   * @type {React.ReactNode}
   * @memberof CheckboxGroup
   */
  children?: React.ReactNode;

  /**
   * The tree structure representing the data items for the CheckboxGroup.
   *
   * @type {DataItems}
   * @memberof CheckboxGroup
   */
  tree?: DataItems;

  /**
   * The function to handle changes in the CheckboxGroup.
   *
   * @type {Function}
   * @memberof CheckboxGroup
   */
  onChange?: (value: any, tree: DataItems, getGroup: (groupValue: string) => any) => void;

  /**
   * The function to handle the parsed value of the CheckboxGroup.
   *
   * @type {Function}
   * @memberof CheckboxGroup
   */
  onParse?: (value: DataItems) => void;

  /**
   * The label for the CheckboxGroup.
   *
   *  When CheckboxGroup have label and value, CheckboxGroup will have a parent node to control CheckboxGroup's children
   *
   * @type {string | React.ReactNode}
   * @memberof CheckboxGroup
   */
  label?: string | React.ReactNode;

  /**
   * The value for the CheckboxGroup. This value is ui control - control children state, it not be return
   *
   * When CheckboxGroup have label and value, CheckboxGroup will have a parent node to control CheckboxGroup's children
   *
   * @type {string}
   * @memberof CheckboxGroup
   */
  value?: string;
}

export const CheckboxGroup = ({ tree, children, onChange, label, value, onParse, ...props }: CheckboxGroup) => {
  // Memorize data when children are mounted, change root data if tree, label, value are changed
  const rootData = React.useMemo(() => {
    let data = tree ? [...tree] : ([] as DataItems);

    if (children && data.length === 0) {
      data = transformChildrenToTree(children);
      updateParents(data);
    }

    if (label && value) {
      data = [{ value, label, children: data }];
      updateParents(data);
    }

    return data;
  }, [tree, label, value]);

  const [treeData, setTreeData] = React.useState<any>(rootData);

  // Update parents state - tree data only
  function updateParents(nodes: DataItems, currentNode: DataItems[number] | null = null) {
    nodes.forEach((node: DataItems[number]) => {
      if (node.children) {
        updateParents(node.children, node);
      }

      if (currentNode !== null && currentNode.children) {
        const checkedChildren = currentNode.children.filter((child) => child.checked);
        const indeterminateChildren = currentNode.children.filter((child) => child.indeterminate);

        currentNode.checked = checkedChildren.length === currentNode.children.length;
        currentNode.indeterminate =
          (checkedChildren.length > 0 && checkedChildren.length < currentNode.children.length) ||
          indeterminateChildren.length > 0;
      }
    });
  }

  // Update children state - tree data only
  const updateChildren = (node: DataItems[number], isChecked: boolean) => {
    node.checked = isChecked;
    node.indeterminate = false;

    if (node.children) {
      node.children.forEach((child) => updateChildren(child, isChecked));
    }
  };

  // Handle change when clicking a checkbox inside checkbox group - tree data only
  const handleChange = (clickedNode: DataItems[number], e: any) => {
    const isChecked = e.target.checked;
    let newTreeData = treeData ? [...treeData] : [];

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

    onChange &&
      onChange(findCheckedValues(newTreeData), newTreeData, (groupValue: string) =>
        getGroupValue(newTreeData, groupValue)
      );
  };

  // Init tree data when root data is changed - controled by outside data
  React.useEffect(() => {
    setTreeData([...rootData]);
  }, [rootData]);

  // Call onParse - return parsed data when mount component
  React.useEffect(() => {
    if (onParse) {
      onParse([...rootData]);
    }
  }, []);

  return <RecursiveCheckbox tree={treeData || rootData || []} handleChange={handleChange} {...props} />;
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

/**
 * Recursive function to generate the checkboxes
 */
export const RecursiveCheckbox = ({
  tree,
  handleChange,
  indent = false
}: {
  tree: DataItems;
  handleChange: any;
  indent?: boolean;
}) => {
  return (
    <div className={classNames({ 'checkbox-group': tree.length > 1 })}>
      {tree.map((node: DataItems[number]) => (
        // 16 for parent checkbox, 12 for gap from checkbox to label
        <div
          className={classNames('checkbox-group-item')}
          key={node.value}
          style={indent ? { marginLeft: 16 + 12 } : { marginLeft: 0 }}
        >
          {node.label && node.value ? (
            <Checkbox
              label={node.label}
              subLabel={node.subLabel}
              value={node.value || ''}
              checked={node.checked || false}
              indeterminate={node.indeterminate || false}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(node, e)}
              {...node.checkboxProps}
            />
          ) : null}
          {/* if  node has children, it will render continously*/}
          {node.children && node.children.length > 0 ? (
            <RecursiveCheckbox tree={node.children as DataItems} handleChange={handleChange} indent={true} />
          ) : null}
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
      checkboxProps: { ...rest }, // The remained props will be asign to checkboxProps key, checkboxProps will pass to checkbox particularly
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
