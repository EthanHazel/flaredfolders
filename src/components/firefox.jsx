import { useTranslations } from "next-intl";
import { useState } from "react";
import { siFirefoxbrowser } from "simple-icons";
import Modal from "./modal";

export default function Firefox() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const t = useTranslations("firefox");

  return (
    <>
      <Modal
        title={t("title")}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <span>{t("content1")}</span>
        <span>{t("content2")}</span>
        <span>{t("content3")}</span>
      </Modal>
      <div
        className="firefox-warning"
        onClick={() => setIsModalOpen(true)}
        style={{ cursor: "pointer" }}
      >
        <span>
          <svg viewBox="0 0 24 24" className="firefox-warning-icon">
            <path d={siFirefoxbrowser.path} />
          </svg>
        </span>
        <span>{t("title")}</span>
      </div>
    </>
  );
}
