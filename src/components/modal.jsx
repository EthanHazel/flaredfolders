"use client";
import "@/styles/modal.css";

export default function Modal({
  title = "Unnamed",
  children,
  isOpen,
  onClose,
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-container">
      <div className="modal">
        <div className="modal-header">
          <div className="modal-title">{title}</div>
        </div>
        <div className="modal-content">{children}</div>
        <div className="modal-footer">
          <button className="modal-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
