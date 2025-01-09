import * as React from 'react';

/**
 * Combines multiple React refs into a single ref. This is useful when you need to pass multiple refs
 * to a single element, ensuring that all refs are updated when the element changes.
 *
 * @template T - The type of the element the refs are pointing to.
 * @param {...(React.Ref<T> | null)[]} refs - The refs to combine. Can include callback refs, object refs, or null.
 * @returns {React.RefObject<T>} A single ref object that can be passed to a React element.
 *
 * @example
 * const ref1 = React.useRef(null);
 * const ref2 = React.useRef(null);
 * const combinedRef = useCombinedRefs(ref1, ref2);
 *
 * return <div ref={combinedRef}>Combined Refs Example</div>;
 */
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
