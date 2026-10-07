"use client";

import { FormEvent } from "react";
import type { FormValues } from "./adminTypes";
import FormActions from "./FormActions";

export default function AddCategory({ onSave, onCancel }: { onSave: (values: FormValues) => void; onCancel: () => void }) {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSave(Object.fromEntries(new FormData(event.currentTarget).entries()) as FormValues);
  }
  return <form onSubmit={submit} className="entity-form"><div className="form-grid">
    <label className="field-full">Category name<input name="name" placeholder="e.g. Seasonal specials" required /></label>
    <label>Category color<select name="color"><option>Violet</option><option>Peach</option><option>Mint</option><option>Blue</option></select></label>
    <label>Display order<input name="order" type="number" min="0" placeholder="1" /></label>
    <label className="field-full">Description<textarea name="description" placeholder="A short description of this category..." rows={3} /></label>
  </div><FormActions onCancel={onCancel} submitLabel="Add category" /></form>;
}
