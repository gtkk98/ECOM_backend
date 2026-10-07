import type { ReactNode } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

export type DataTableColumn<Row> = {
  key: keyof Row;
  header: string;
  cell?: (row: Row) => ReactNode;
};

export default function DataTable<Row extends object>({ columns, data, getRowId, emptyMessage = "No results found." }: {
  columns: DataTableColumn<Row>[];
  data: Row[];
  getRowId: (row: Row, index: number) => string;
  emptyMessage?: string;
}) {
  return <Table>
    <TableHeader><TableRow>{columns.map((column) => <TableHead key={String(column.key)}>{column.header}</TableHead>)}</TableRow></TableHeader>
    <TableBody>
      {data.length ? data.map((row, index) => <TableRow key={getRowId(row, index)}>
        {columns.map((column) => <TableCell key={String(column.key)}>{column.cell ? column.cell(row) : String(row[column.key] ?? "")}</TableCell>)}
      </TableRow>) : <TableRow><TableCell colSpan={columns.length} className="empty-state">{emptyMessage}</TableCell></TableRow>}
    </TableBody>
  </Table>;
}
