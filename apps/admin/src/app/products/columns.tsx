import type { DataTableColumn } from "@/components/DataTable";
import type { Product } from "@/components/adminTypes";
import { formatCurrency } from "@/lib/utils";

export const columns: DataTableColumn<Product>[] = [
  { key: "name", header: "Product" },
  { key: "category", header: "Category" },
  { key: "price", header: "Price", cell: (product) => formatCurrency(product.price) },
  { key: "stock", header: "Stock" },
  { key: "status", header: "Status" },
];