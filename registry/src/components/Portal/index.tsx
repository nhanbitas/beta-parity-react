import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

export interface PortalProps {
  className?: string;
  children: React.ReactNode;
  target?: HTMLElement;
}
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
