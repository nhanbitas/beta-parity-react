import * as React from 'react';
import classNames from 'classnames';
import './index.css';

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {}
const Form = React.forwardRef<HTMLFormElement, FormProps>(({ className, children, ...props }, ref) => (
  <form ref={ref} className={classNames('form', className)} {...props}>
    {children}
  </form>
));
Form.displayName = 'Form';

export interface FormBlockProps extends React.HTMLAttributes<HTMLDivElement> {}
const FormBlock = React.forwardRef<HTMLDivElement, FormBlockProps>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={classNames('form-block', className)} {...props}>
    {children}
  </div>
));
FormBlock.displayName = 'FormBlock';

export interface FormColProps extends React.HTMLAttributes<HTMLDivElement> {}
const FormCol = React.forwardRef<HTMLDivElement, FormColProps>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={classNames('form-col', className)} {...props}>
    {children}
  </div>
));
FormCol.displayName = 'FormCol';

export interface FormControlLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}
const FormControlLabel = React.forwardRef<HTMLLabelElement, FormControlLabelProps>(
  ({ className, children, ...props }, ref) => (
    <label ref={ref} className={classNames('form-control-label', className)} {...props}>
      {children}
    </label>
  )
);
FormControlLabel.displayName = 'FormControlLabel';

export interface FormControlProps extends React.HTMLAttributes<HTMLElement> {
  ratio?: '1:1' | '2:1' | '1:2';
  control?: 1 | 2 | 3;
}
const FormControl = React.forwardRef<HTMLDivElement, FormControlProps>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={classNames('form-control', className)} {...props}>
    {children}
  </div>
));
FormControl.displayName = 'FormControl';

export { Form, FormBlock, FormCol, FormControlLabel, FormControl };
