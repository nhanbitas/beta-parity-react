import React from 'react';
import ReactDOM from 'react-dom';

export interface PortalProps {
  className?: string;
  children: React.ReactNode;
  target?: HTMLElement;
}
export const Portal = React.forwardRef<HTMLDivElement, PortalProps>(
  ({ className, children, target, ...props }, ref) => {
    const [container, setContainer] = React.useState<HTMLElement | null>(null);

    React.useEffect(() => {
      const div = document.createElement('div');

      if (target) {
        target.appendChild(div);
      } else {
        document.body.appendChild(div);
      }

      setContainer(div);

      return () => {
        if (target) {
          target.removeChild(div);
        } else {
          document.body.removeChild(div);
        }
      };
    }, []);

    if (!container) return null;

    return ReactDOM.createPortal(children, container);
  }
);

Portal.displayName = 'Portal';
