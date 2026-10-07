import type { DataTableColumn } from "@/components/DataTable";
import type { Customer } from "@/components/adminTypes";
import { formatCurrency } from "@/lib/utils";

export const columns: DataTableColumn<Customer>[] = [
  { key: "name", header: "Customer" },
  { key: "email", header: "Email" },
  { key: "joined", header: "Date joined" },
  { key: "orders", header: "Orders" },
  { key: "spent", header: "Total spent", cell: (customer) => formatCurrency(customer.spent) },
];