'use client';

import './variables.css';
import './index.css';
import React from 'react';
import classNames from 'classnames';
import { BaseProps } from '../Base';
import { Input, InputProps } from '../BaseInput';
import useCombinedRefs from '../hooks/useCombinedRefs';

const colorMap = {
  neutral: 'neutral',
  accent: 'accent'
} as const;

export interface CheckboxProps extends InputProps {
  /**
   * The color of the checkbox, can be one of the keys from the colorMap.
   *
   * "neutral" is default
   *
   * @type {keyof typeof colorMap}
   * @memberof CheckboxProps
   */
  color?: keyof typeof colorMap;
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
  sublabel?: string | React.ReactNode;

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
  (
    { type = 'checkbox', color = 'neutral', label, sublabel, indeterminate = false, checkboxWrapperProps, ...props },
    ref
  ) => {
    const checkboxRef = React.useRef(null);
    const combinedRef = useCombinedRefs(checkboxRef, ref);

    React.useEffect(() => {
      if (combinedRef.current) {
        combinedRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate, combinedRef]);

    return (
      <CheckBoxWrapper aria-disabled={props.disabled} {...checkboxWrapperProps}>
        <div className='checkbox-input'>
          <CheckboxIcon indeterminate={indeterminate} color={color} checked={props.checked || false} />
          <input className={classNames('par-checkbox', colorMap[color])} type='checkbox' ref={combinedRef} {...props} />
        </div>
        {label || sublabel ? (
          <div className='input-label-wrapper'>
            {label && <span className='input-label'>{label}</span>}
            {sublabel && <span className='input-sublabel'>{sublabel}</span>}
          </div>
        ) : (
          <></>
        )}
      </CheckBoxWrapper>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export interface CheckboxTreeItem {
  value: string;
  label: string | React.ReactNode;
  sublabel?: string | React.ReactNode;
  checked?: boolean;
  indeterminate?: boolean;
  checkboxProps?: CheckboxProps;
  children?: CheckboxTreeItem[];
}

export type DataItems = CheckboxTreeItem[];

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
  onChange?: ({
    value,
    tree,
    getGroup
  }: {
    value: any;
    tree: DataItems;
    getGroup: (groupValue: string) => any;
  }) => void;

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
   * The sub-label for the CheckboxGroup.
   * Can be a string or a React node.
   *
   * @type {string | React.ReactNode}
   * @memberof CheckboxProps
   */
  sublabel?: string | React.ReactNode;

  /**
   * The value for the CheckboxGroup. This value is ui control - control children state, it not be return
   *
   * When CheckboxGroup have label and value, CheckboxGroup will have a parent node to control CheckboxGroup's children
   *
   * @type {string}
   * @memberof CheckboxGroup
   */
  value?: string;
  checked?: boolean;
}

export const CheckboxGroup = ({
  tree,
  children,
  onChange,
  label,
  sublabel,
  value,
  checked,
  onParse,
  ...props
}: CheckboxGroup) => {
  // Memorize data when children are mounted, change root data if tree, label, value are changed
  const rootData = React.useMemo(() => {
    let data = tree ? [...tree] : ([] as DataItems);

    const findNodeAndUpdate = (nodes: DataItems) => {
      nodes.forEach((n) => {
        if (n.checked) {
          updateChildren(n, n.checked);
        }

        if (n.children) {
          findNodeAndUpdate(n.children);
        }
      });
    };

    if (children && data.length === 0) {
      data = transformChildrenToTree(children);
    }

    if (label && value) {
      data = [{ value, label, sublabel: sublabel, checked, children: data }];
    }

    // checked in parent is priority
    // if checked = true , all of children is true
    // if checked = false | undefined , the value of checked is dependent on children, it means parent's checked depends on updateParents()
    findNodeAndUpdate(data);

    // checked in chilren is priority
    // if all of children is true , parent's checked is true
    // if once of children is true, parent's checked is false/undefined and parent's indeterminate is true
    // if all of children is false , parent's checked is false
    updateParents(data);

    return data;
  }, [tree, label, value, sublabel]);

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
  function updateChildren(node: DataItems[number], isChecked: boolean) {
    node.checked = isChecked;
    node.indeterminate = false;

    if (node.children) {
      node.children.forEach((child) => updateChildren(child, isChecked));
    }
  }

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
      onChange({
        value: findCheckedValues(newTreeData),
        tree: newTreeData,
        getGroup: (groupValue: string) => getGroupValue(newTreeData, groupValue)
      });
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
export const CheckBoxWrapper = React.forwardRef<
  HTMLLabelElement,
  CheckBoxWrapperProps & React.HTMLAttributes<HTMLLabelElement>
>(({ className, children, ...props }, ref) => {
  return (
    <label className={classNames('checkbox-wrapper', className)} ref={ref} {...props}>
      {children}
    </label>
  );
});

CheckBoxWrapper.displayName = 'CheckBoxWrapper';

const CheckboxIcon = ({
  indeterminate,
  checked,
  color
}: {
  indeterminate: boolean;
  checked: boolean;
  color: string;
}) => {
  if (indeterminate) {
    return (
      <svg
        className='checkbox-icon'
        xmlns='http://www.w3.org/2000/svg'
        width={16}
        height={16}
        viewBox='0 0 16 16'
        fill='none'
      >
        <rect
          x={1}
          y={1}
          width={14}
          height={14}
          rx={1}
          stroke='var(--par-color-icon-checkbox-indeterminate)'
          strokeWidth={2}
        />
        <path
          d='M4 8H12'
          stroke='var(--par-color-icon-checkbox-indeterminate)'
          strokeWidth={2}
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    );
  }
  if (checked) {
    return (
      <svg className='checkbox-icon' xmlns='http://www.w3.org/2000/svg' width={16} height={16} viewBox='0 0 16 16'>
        <rect width={16} height={16} rx={2} fill={`var(--par-color-bg-checkbox-${color}-selected)`} />
        <path
          d='M4 8L6.66353 11L12 5'
          className='checkbox-icon-text'
          stroke={`var(--par-color-icon-checkbox-${color}-selected)`}
          strokeWidth='1.33'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    );
  }
  return (
    <svg
      className='checkbox-icon'
      xmlns='http://www.w3.org/2000/svg'
      width={16}
      height={16}
      viewBox='0 0 16 16'
      fill='none'
    >
      <g clipPath='url(#clip0_831_96869)'>
        <rect
          x={1}
          y={1}
          width={14}
          height={14}
          rx={1}
          stroke='var(--par-color-icon-checkbox-enabled)'
          strokeWidth={2}
        />
      </g>
      <defs>
        <clipPath id='clip0_831_96869'>
          <rect width={16} height={16} fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
};

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
              sublabel={node.sublabel}
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
    const { label, value, children, checked, indeterminate, sublabel, ...rest } = child.props;
    const node = {
      label: label,
      value: value,
      checked: checked,
      indeterminate: indeterminate,
      sublabel: sublabel,
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
