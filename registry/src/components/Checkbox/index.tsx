'use client';

import React from 'react';
import { Input, InputProps } from '../Input';
import { PolymorphicComponentProps, createPolymorphicComponent } from '../Base/factory';
import classNames from 'classnames';
import Base from '../Base';

import './index.css';
import useCombinedRefs from '../hooks/useCombinedRefs';

export interface CheckboxProps extends InputProps {
  label?: string | React.ReactNode;
  subLabel?: string | React.ReactNode;
  indeterminate?: boolean;
}

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
      <CheckBoxWrapper>
        <Input className='checkbox' type={type} ref={combinedRef} {...props} />
        <Base component='div' className='input-label-wrapper'>
          <Base component='span' className='input-label'>
            {label}
          </Base>
          <Base component='span' className='input-sublabel'>
            {subLabel}
          </Base>
        </Base>
      </CheckBoxWrapper>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export interface CheckBoxWrapperProps {}

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

export type dataItems = {
  value: string;
  label: string | React.ReactNode;
  subLabel?: string | React.ReactNode;
  checked?: boolean;
  indeterminate?: boolean;
  checkedCount?: number;
  total?: number;
  children?: dataItems;
}[];

export interface CheckboxNestProps {
  data: dataItems;
  onChange: any;
}

export const CheckboxNest = (props: CheckboxNestProps) => {
  const { data, onChange } = props;
  const [treeData, setTreeData] = React.useState(data);

  const updateChildren = (node: dataItems[number], isChecked: boolean) => {
    node.checked = isChecked;
    node.indeterminate = false;
    if (node.children) {
      node.children.forEach((child) => updateChildren(child, isChecked));
    }
  };

  const updateParents = (nodes: dataItems, currentNode: dataItems[number] | null = null) => {
    nodes.forEach((node: dataItems[number]) => {
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

  const handleChange = (clickedNode: dataItems[number], e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    const newTreeData = [...treeData];

    const findNodeAndUpdate = (nodes: dataItems) => {
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
    setTreeData(data);
  }, [data]);

  return <RecursiveCheckbox data={treeData} handleChange={handleChange} />;
};

// Recursive function to generate the checkboxes
export const RecursiveCheckbox = ({ data, handleChange }: { data: dataItems; handleChange: any }) => {
  return (
    <div className='checkbox-nest'>
      {data.map((node: dataItems[number]) => (
        <div key={node.value} style={{ marginLeft: 16 }}>
          <Checkbox
            label={node.label}
            subLabel={node.subLabel}
            value={node.value || ''}
            checked={node.checked || false}
            indeterminate={node.indeterminate || false}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(node, e)}
          />
          {node.children && node.children.length && (
            <RecursiveCheckbox data={node.children as dataItems} handleChange={handleChange} />
          )}
        </div>
      ))}
    </div>
  );
};
