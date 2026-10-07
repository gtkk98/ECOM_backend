import type { FormHTMLAttributes, HTMLAttributes, LabelHTMLAttributes, ReactNode } from "react";

export function Form({ className = "", ...props }: FormHTMLAttributes<HTMLFormElement>) {
  return <form className={`ui-form ${className}`.trim()} {...props} />;
}

export function FormField({ children, className = "", ...props }: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return <div className={`ui-form-field ${className}`.trim()} {...props}>{children}</div>;
}

export function FormLabel({ className = "", ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={`ui-form-label ${className}`.trim()} {...props} />;
}

export function FormDescription({ className = "", ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={`ui-form-description ${className}`.trim()} {...props} />;
}

export function FormMessage({ children, className = "", ...props }: HTMLAttributes<HTMLParagraphElement> & { children?: ReactNode }) {
  if (!children) return null;
  return <p role="alert" className={`ui-form-message ${className}`.trim()} {...props}>{children}</p>;
}