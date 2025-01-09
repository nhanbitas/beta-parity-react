import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// =========================
// Portal
// =========================
// Declare and export Portal type and Portal component

/**
 * Props for the Portal component.
 *
 * Extends properties from the `div` element.
 */
export interface PortalProps {
  /**
   * The class name of the portal container.
   *
   * @memberof PortalProps
   */
  className?: string;

  /**
   * The children to be rendered inside the portal.
   *
   * @memberof PortalProps
   */
  children: React.ReactNode;

  /**
   * The DOM node to render the portal into.
   *
   * @default document.body
   * @memberof PortalProps
   */
  target?: HTMLElement;
}

/**
 * A React component that renders its children into a DOM node outside the current component hierarchy
 * using React's portal feature.
 *
 * @param {PortalProps} props - The props for the Portal component.
 * @param {string} [props.className] - Optional class name to be added to the portal container.
 * @param {React.ReactNode} props.children - The React nodes to render inside the portal.
 * @param {HTMLElement} [props.target] - An optional target DOM element where the portal container should be appended.
 *                                       If not provided, the container will be appended to `document.body`.
 * @param {React.Ref<HTMLDivElement>} [ref] - An optional ref to access the portal container.
 *
 * @returns {React.ReactPortal | null} A React portal rendering the children into the specified DOM node,
 *                                     or `null` if the portal container has not been initialized yet.
 *
 * @example
 * const App = () => {
 *   const modalTarget = document.getElementById('modal-root');
 *
 *   return (
 *     <Portal target={modalTarget}>
 *       <div className="modal">
 *         <h1>Hello from the Portal!</h1>
 *       </div>
 *     </Portal>
 *   );
 * };
 */
export const Portal = React.forwardRef<HTMLDivElement, PortalProps>(
  ({ className, children, target, ...props }, ref) => {
    const containerRef = React.useRef<HTMLElement | null>(null);

    React.useEffect(() => {
      const div = document.createElement('div');
      div.classList.add('portal-container');

      if (target) {
        target.appendChild(div);
      } else {
        document.body.appendChild(div);
      }

      containerRef.current = div;

      return () => {
        if (target) {
          target.removeChild(div);
        } else {
          document.body.removeChild(div);
        }
      };
    }, [target]);

    if (!containerRef.current) return null;

    return ReactDOM.createPortal(children, containerRef.current);
  }
);

Portal.displayName = 'Portal';
