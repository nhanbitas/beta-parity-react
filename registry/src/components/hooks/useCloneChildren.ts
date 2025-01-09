import React from 'react';

export type UseCloneChildrenProps = {
  children: React.ReactNode;
} & React.Attributes;

export type UseCloneChildrenOptions = {
  recursive?: boolean;
};

/**
 * A utility function to clone React children and inject additional props into them.
 * Optionally, it can recursively clone nested children.
 *
 * @template T - The type of the additional props to inject.
 * @param {React.ReactNode} children - The React children to clone.
 * @param {T} props - Additional props to inject into each cloned child.
 * @param {UseCloneChildrenOptions} [options] - Optional settings for cloning:
 * - `recursive` (boolean): Whether to recursively clone nested children.
 *
 * @returns {React.ReactNode} The cloned children with the additional props injected.
 *
 * @example
 * const newChildren = useCloneChildren(children, { onClick: () => alert('Clicked!') }, { recursive: true });
 */
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
