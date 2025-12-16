export default function ConfirmModal({ open, title, message, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true" className="modal-backdrop">
      <div className="modal-content">
        <h3>{title}</h3>
        <p>{message}</p>
        <button onClick={onConfirm}>Eliminar</button>
        <button onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  );
}