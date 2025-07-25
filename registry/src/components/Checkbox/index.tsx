import React from 'react';
import classNames from 'classnames';

import './variables.css';
import './index.css';

import { BaseProps } from '../Base';
import { InputProps } from '../BaseInput';
import useCombinedRefs from '../hooks/useCombinedRefs';

// =========================
// Checkbox
// =========================
// Declare and export Checkbox type and Checkbox component

const colorMap = {
  neutral: 'neutral',
  accent: 'accent'
} as const;

/**
 * Props for the Checkbox component.
 *
 * Extends properties from the `Input` component.
 */
export interface CheckboxProps extends InputProps {
  /**
   * The color of the checkbox, can be one of the keys from the colorMap.
   *
   * "neutral" is default
   *
   * @default 'neutral'
   * @memberof CheckboxProps
   */
  color?: keyof typeof colorMap;
  /**
   * The label for the checkbox.
   * Can be a string or a React node.
   *
   * @memberof CheckboxProps
   */
  label?: string | React.ReactNode;

  /**
   * The sub-label for the checkbox.
   * Can be a string or a React node.
   *
   * @memberof CheckboxProps
   */
  sublabel?: string | React.ReactNode;

  /**
   * Indicates whether the checkbox is in an indeterminate state.
   *
   * @default false
   * @memberof CheckboxProps
   */
  indeterminate?: boolean;

  /**
   * Additional props for the checkbox wrapper.
   *
   * @memberof CheckboxProps
   */
  checkboxWrapperProps?: any;
}

/**
 * **Parity Checkbox**.
 *
 *  @see {@link https://beta-parity-react.vercel.app/checkbox Parity Checkbox}
 */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      type = 'checkbox',
      color = 'neutral',
      label,
      sublabel,
      checked,
      indeterminate = false,
      checkboxWrapperProps,
      onChange,
      ...props
    },
    ref
  ) => {
    const checkboxRef = React.useRef(null);
    const combinedRef = useCombinedRefs(checkboxRef, ref);
    const [currentChecked, setCurrentChecked] = React.useState(checked || false);

    const handleChange = (e: any) => {
      if (props.disabled || props.readOnly) return;
      checked !== undefined ? setCurrentChecked(checked || false) : setCurrentChecked(e.target.checked);
      onChange?.(e);
    };

    React.useEffect(() => {
      if (combinedRef.current) {
        combinedRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate, combinedRef]);

    React.useEffect(() => {
      setCurrentChecked(checked || false);
    }, [checked]);

    return (
      <CheckBoxWrapper aria-disabled={props.disabled} {...checkboxWrapperProps}>
        <div className='checkbox-input'>
          <CheckboxIcon
            indeterminate={indeterminate}
            color={color}
            checked={currentChecked}
            disabled={props.disabled}
          />
          <input
            className={classNames('par-checkbox', colorMap[color])}
            type='checkbox'
            ref={combinedRef}
            checked={currentChecked}
            onChange={handleChange}
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
      </CheckBoxWrapper>
    );
  }
);

Checkbox.displayName = 'Checkbox';

// =========================
// CheckboxGroup
// =========================
// Declare and export CheckboxGroup type and CheckboxGroup component

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

/**
 * Props for the CheckboxGroup component.
 */
export interface CheckboxGroup extends Pick<CheckboxProps, 'color'>, BaseProps {
  /**
   * The children nodes of the CheckboxGroup.
   *
   * @memberof CheckboxGroup
   */
  children?: React.ReactNode;

  /**
   * The tree structure representing the data items for the CheckboxGroup.
   *
   * @memberof CheckboxGroup
   */
  tree?: DataItems;

  /**
   * The function to handle changes in the CheckboxGroup.
   * @param {any} value - The value of the CheckboxGroup.
   * @param {DataItems} tree - The tree structure of the CheckboxGroup.
   * @param {function} getGroup - The function to get the group value.
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
   * @param {DataItems} value - The parsed tree structure of the CheckboxGroup.
   * @memberof CheckboxGroup
   */
  onParse?: (value: DataItems) => void;

  /**
   * The label for the CheckboxGroup.
   *
   *  When CheckboxGroup have label and value, CheckboxGroup will have a parent node to control CheckboxGroup's children
   *
   * @memberof CheckboxGroup
   */
  label?: string | React.ReactNode;

  /**
   * The sub-label for the CheckboxGroup.
   * Can be a string or a React node.
   *
   * @memberof CheckboxProps
   */
  sublabel?: string | React.ReactNode;

  /**
   * The value for the CheckboxGroup. This value is ui control - control children state, it not be return
   *
   * When CheckboxGroup have label and value, CheckboxGroup will have a parent node to control CheckboxGroup's children
   *
   * @memberof CheckboxGroup
   */
  value?: string;
  checked?: boolean;
}

/**
 * The CheckboxGroup component.
 *
 * @see {@link https://beta-parity-react.vercel.app/checkbox Parity CheckboxGroup}
 */
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
  }, [tree, label, value, sublabel, children]);

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

// =========================
// CheckBoxWrapper
// =========================
// Declare and export CheckBoxWrapper type and CheckBoxWrapper component

export interface CheckBoxWrapperProps extends BaseProps {}

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

// =========================
// CheckboxIcon
// =========================
// Declare and export CheckboxIcon type and CheckboxIcon component

const CheckboxIcon = ({
  indeterminate,
  checked,
  color,
  disabled
}: {
  indeterminate: boolean;
  checked: boolean;
  color: string;
  disabled?: boolean;
  [key: string]: any;
}) => {
  const baseColor = `var(--par-color-icon-checkbox-enabled)`;
  const selectedColor = `var(--par-color-icon-checkbox-${color}-selected)`;
  const bgColor = `var(--par-color-bg-checkbox-${color}-selected)`;
  const indeterminateColor = `var(--par-color-icon-checkbox-indeterminate)`;

  const rectIndicator = {
    x: 1,
    y: 1,
    width: 14,
    height: 14,
    rx: 2,
    strokeWidth: 2
  };

  const pathIndicator = {
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeWidth: 2,
    strokeDasharray: 25,
    strokeDashoffset: 25,
    opacity: 0
  };

  let rectProps: any = {
    ...rectIndicator,
    className: 'checkbox-icon-rect',
    fill: 'rgba(0, 0, 0, 0)',
    stroke: baseColor
  };

  let pathProps: any = {
    ...pathIndicator,
    className: 'checkbox-icon-path',
    d: 'M4 8H12',
    stroke: baseColor
  };

  if (indeterminate) {
    rectProps = {
      ...rectIndicator,
      className: 'checkbox-icon-rect indeterminate',
      fill: 'rgba(0, 0, 0, 0)',
      stroke: indeterminateColor
    };
    pathProps = {
      ...pathIndicator,
      className: 'checkbox-icon-path indeterminate',
      d: 'M4 8H12',
      stroke: indeterminateColor,
      strokeDashoffset: 0,
      opacity: 1
    };
  }

  if (checked) {
    rectProps = {
      ...rectIndicator,
      className: 'checkbox-icon-rect checked',
      fill: bgColor,
      stroke: bgColor
    };
    pathProps = {
      ...pathIndicator,
      className: 'checkbox-icon-path checked',
      d: 'M4 8L6.66353 11L12 5',
      stroke: selectedColor,
      strokeWidth: 1.33,
      strokeDashoffset: 0,
      opacity: 1
    };
  }

  return (
    <svg
      className='checkbox-icon'
      xmlns='http://www.w3.org/2000/svg'
      width={16}
      height={16}
      viewBox='0 0 16 16'
      fill='none'
      style={{
        opacity: disabled ? 0.5 : 1
      }}
    >
      <rect {...(rectProps as any)} />
      <path {...(pathProps as any)} />
    </svg>
  );
};

// =========================
// Checkbox utils
// =========================

export const RecursiveCheckbox = ({
  tree,
  handleChange,
  indent = false,
  color = 'neutral'
}: {
  tree: DataItems;
  handleChange: any;
  indent?: boolean;
  [key: string]: any;
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
              color={color}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(node, e)}
              {...node.checkboxProps}
            />
          ) : null}
          {/* if  node has children, it will render continously*/}
          {node.children && node.children.length > 0 ? (
            <RecursiveCheckbox
              tree={node.children as DataItems}
              handleChange={handleChange}
              indent={true}
              color={color}
            />
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
