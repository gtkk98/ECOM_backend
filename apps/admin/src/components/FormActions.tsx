export default function FormActions({ onCancel, submitLabel }: { onCancel: () => void; submitLabel: string }) {
  return <div className="form-actions">
    <button type="button" className="button-secondary" onClick={onCancel}>Cancel</button>
    <button type="submit" className="button-primary">{submitLabel}</button>
  </div>;
}
