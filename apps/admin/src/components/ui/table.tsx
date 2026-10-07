import type { HTMLAttributes, ThHTMLAttributes, TdHTMLAttributes } from "react";

export function Table({ className = "", ...props }: HTMLAttributes<HTMLTableElement>) {
  return <div className="ui-table-wrapper"><table className={`ui-table ${className}`.trim()} {...props} /></div>;
}

export function TableHeader({ className = "", ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={`ui-table-header ${className}`.trim()} {...props} />;
}

export function TableBody({ className = "", ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={`ui-table-body ${className}`.trim()} {...props} />;
}

export function TableFooter({ className = "", ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return <tfoot className={`ui-table-footer ${className}`.trim()} {...props} />;
}

export function TableRow({ className = "", ...props }: HTMLAttributes<HTMLTableRowElement>) {
  return <tr className={`ui-table-row ${className}`.trim()} {...props} />;
}

export function TableHead({ className = "", ...props }: ThHTMLAttributes<HTMLTableCellElement>) {
  return <th className={`ui-table-head ${className}`.trim()} {...props} />;
}

export function TableCell({ className = "", ...props }: TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className={`ui-table-cell ${className}`.trim()} {...props} />;
}

export function TableCaption({ className = "", ...props }: HTMLAttributes<HTMLTableCaptionElement>) {
  return <caption className={`ui-table-caption ${className}`.trim()} {...props} />;
}