import DataTable from "@/components/DataTable";
import type { Order } from "@/components/adminTypes";
import { columns } from "./columns";

export default function PaymentsDataTable({ data }: { data: Order[] }) {
  return <DataTable columns={columns} data={data} getRowId={(order) => order.id} emptyMessage="No orders found." />;
}