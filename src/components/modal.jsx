"use client";

import { useTranslations } from "next-intl";

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

  const t = useTranslations("modal");

  return (
    <div className="modal-container">
      <div className="modal">
        <div className="modal-header">
          <div className="modal-title">{title}</div>
        </div>
        <div className="modal-content">{children}</div>
        <div className="modal-footer">
          <button className="modal-button" onClick={onClose}>
            {t("close")}
          </button>
        </div>
      </div>
    </div>
  );
}
