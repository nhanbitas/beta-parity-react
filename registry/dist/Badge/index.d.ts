import React from 'react';
import './index.css';
export interface BadgeProps extends React.HTMLAttributes<HTMLElement> {
    asChild?: boolean;
    children?: React.ReactNode;
    className?: string;
    color?: 'gray' | 'orange' | 'sky' | 'violet' | 'green' | 'red' | 'yellow' | 'blue';
    size?: 'small' | 'medium' | 'large';
    variant?: 'strong' | '';
}
declare const Badge: React.ForwardRefExoticComponent<BadgeProps & React.RefAttributes<HTMLElement>>;
export { Badge };
//# sourceMappingURL=index.d.ts.map