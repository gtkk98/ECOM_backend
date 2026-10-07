import DataTable from "@/components/DataTable";
import type { Product } from "@/components/adminTypes";
import { columns } from "./columns";

export default function ProductsDataTable({ data }: { data: Product[] }) {
  return <DataTable columns={columns} data={data} getRowId={(product) => product.name} emptyMessage="No products found." />;
}