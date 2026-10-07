"use client";

import { FormEvent } from "react";
import type { Customer, FormValues } from "./adminTypes";
import FormActions from "./FormActions";

export default function CustomerForm({ onSave, onCancel, customer, submitLabel }: {
  onSave: (values: FormValues) => void;
  onCancel: () => void;
  customer?: Customer;
  submitLabel: string;
}) {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSave(Object.fromEntries(new FormData(event.currentTarget).entries()) as FormValues);
  }
  return <form onSubmit={submit} className="entity-form"><div className="form-grid">
    <label>First name<input name="firstName" defaultValue={customer?.name.split(" ")[0]} placeholder="Jamie" required /></label>
    <label>Last name<input name="lastName" defaultValue={customer?.name.split(" ").slice(1).join(" ")} placeholder="Davis" required /></label>
    <label className="field-full">Email address<input name="email" type="email" defaultValue={customer?.email} placeholder="jamie@example.com" required /></label>
    <label>Phone number<input name="phone" type="tel" placeholder="+1 (555) 000-0000" /></label>
    <label>Customer status<select name="status" defaultValue="Active"><option>Active</option><option>VIP</option><option>Inactive</option></select></label>
  </div><FormActions onCancel={onCancel} submitLabel={submitLabel} /></form>;
}
