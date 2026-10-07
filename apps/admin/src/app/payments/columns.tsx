import type { DataTableColumn } from "@/components/DataTable";
import type { Order } from "@/components/adminTypes";
import { formatCurrency } from "@/lib/utils";

export const columns: DataTableColumn<Order>[] = [
  { key: "id", header: "Order" },
  { key: "customer", header: "Customer" },
  { key: "date", header: "Date" },
  { key: "amount", header: "Amount", cell: (order) => formatCurrency(order.amount) },
  { key: "status", header: "Status" },
];