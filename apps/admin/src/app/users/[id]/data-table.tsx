import DataTable from "@/components/DataTable";
import type { Customer } from "@/components/adminTypes";
import { columns } from "./coumns";

export default function UsersDataTable({ data }: { data: Customer[] }) {
  return <DataTable columns={columns} data={data} getRowId={(customer) => customer.email} emptyMessage="No customers found." />;
}