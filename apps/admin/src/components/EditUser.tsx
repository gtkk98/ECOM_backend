import type { Customer, FormValues } from "./adminTypes";
import CustomerForm from "./CustomerForm";

export default function EditUser(props: { onSave: (values: FormValues) => void; onCancel: () => void; customer: Customer }) {
  return <CustomerForm {...props} submitLabel="Save changes" />;
}
