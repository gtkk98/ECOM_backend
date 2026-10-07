"use client";

import { FormEvent } from "react";
import type { Customer, FormValues } from "./adminTypes";
import FormActions from "./FormActions";

export default function AddOrder({ onSave, onCancel, customers }: {
  onSave: (values: FormValues) => void;
  onCancel: () => void;
  customers: Customer[];
}) {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSave(Object.fromEntries(new FormData(event.currentTarget).entries()) as FormValues);
  }
  return <form onSubmit={submit} className="entity-form"><div className="form-grid">
    <label className="field-full">Customer<select name="customer" required defaultValue=""><option value="" disabled>Select a customer</option>{customers.map((customer) => <option key={customer.email}>{customer.name}</option>)}</select></label>
    <label>Order total ($)<input name="amount" type="number" min="0.01" step="0.01" placeholder="32.50" required /></label>
    <label>Order status<select name="status"><option>Processing</option><option>Delivered</option><option>Cancelled</option></select></label>
    <label className="field-full">Order note<textarea name="note" placeholder="Optional note for this order..." rows={3} /></label>
  </div><FormActions onCancel={onCancel} submitLabel="Create order" /></form>;
}
