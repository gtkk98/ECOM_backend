"use client";

import { FormEvent } from "react";
import type { FormValues } from "./adminTypes";
import FormActions from "./FormActions";

export default function AddProduct({ onSave, onCancel }: { onSave: (values: FormValues) => void; onCancel: () => void }) {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSave(Object.fromEntries(new FormData(event.currentTarget).entries()) as FormValues);
  }
  return <form onSubmit={submit} className="entity-form"><div className="form-grid">
    <label className="field-full">Product name<input name="name" placeholder="e.g. Double smash burger" required /></label>
    <label>Category<select name="category" defaultValue="Burgers"><option>Burgers</option><option>Pizza</option><option>Pasta</option><option>Sides</option><option>Desserts</option><option>Drinks</option></select></label>
    <label>Price ($)<input name="price" type="number" min="0" step="0.01" placeholder="14.50" required /></label>
    <label>Stock quantity<input name="stock" type="number" min="0" placeholder="20" required /></label>
    <label>Product emoji<input name="image" placeholder="🍔" maxLength={8} /></label>
    <label className="field-full">Description<textarea name="description" placeholder="Add a short product description..." rows={3} /></label>
  </div><FormActions onCancel={onCancel} submitLabel="Add product" /></form>;
}
