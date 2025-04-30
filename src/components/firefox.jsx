import { useState } from "react";
import { siFirefoxbrowser } from "simple-icons";
import Modal from "./modal";

export default function Firefox() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Modal
        title="Firefox Warning"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <span>
          Icon scaling in Firefox is currently bugged, and scaled down icons
          will be rendered with a more pixelated look to them. This is an issue
          with Firefox not currently supporting the imageSmoothing property on
          Canvas.
        </span>
        <span>
          Until Firefox implements this, or there's a workaround found, I
          recommend using a Chromium based browser.
        </span>
        <span>
          I'm sorry for the inconvenience, I like Firefox more too, but it is
          out of my hands for right now.
        </span>
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
        <span>Attention Firefox user!</span>
      </div>
    </>
  );
}
