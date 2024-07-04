import * as React from 'react';

function useCloneChildren<T extends object>(children: React.ReactNode, props: T): React.ReactNode {
  const clonedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { ...props } as any);
    }
    return child;
  });

  return clonedChildren;
}

export default useCloneChildren;
