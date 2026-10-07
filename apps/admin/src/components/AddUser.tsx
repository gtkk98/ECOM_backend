import type { FormValues } from "./adminTypes";
import CustomerForm from "./CustomerForm";

export default function AddUser(props: { onSave: (values: FormValues) => void; onCancel: () => void }) {
  return <CustomerForm {...props} submitLabel="Add customer" />;
}
