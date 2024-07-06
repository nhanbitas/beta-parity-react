import React from 'react';

export type UseCloneChildrenProps = {
  children: React.ReactNode;
} & React.Attributes;

export type UseCloneChildrenOptions = {
  recursive?: boolean;
};

export function useCloneChildren<T extends object>(
  children: React.ReactNode,
  props: T,
  options?: UseCloneChildrenOptions
): React.ReactNode {
  const { recursive } = options || {};
  const cloneElement = (child: React.ReactNode): React.ReactNode => {
    if (React.isValidElement(child)) {
      // Clone the child with props
      const clonedChild = React.cloneElement(child, {
        ...props,
        ...child.props // Ensure child's original props are not overwritten
      } as UseCloneChildrenProps);

      // If recursive is true, recursively clone its children
      if (recursive && child.props && child.props.children) {
        const clonedChildren = React.Children.map(child.props.children, cloneElement);
        return React.cloneElement(clonedChild, { children: clonedChildren } as UseCloneChildrenProps);
      }

      return clonedChild;
    }

    return child;
  };

  return React.Children.map(children, cloneElement);
}

export default useCloneChildren;
