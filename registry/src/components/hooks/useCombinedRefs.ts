import * as React from 'react';

function useCombinedRefs<T>(...refs: (React.Ref<T> | null)[]): React.RefObject<T> {
  const targetRef = React.useRef<T>(null);

  React.useEffect(() => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === 'function') {
        ref(targetRef.current);
      } else {
        (ref as React.MutableRefObject<T | null>).current = targetRef.current;
      }
    });
  }, [refs]);

  return targetRef;
}

export default useCombinedRefs;
