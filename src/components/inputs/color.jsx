import { useRef, useEffect, useState } from "react";

import ColorPicker from "./color-picker";

import "@/styles/inputs/color.css";

export default function Color({ defaultColor, onChange, label }) {
  const [fakeColor, setFakeColor] = useState(defaultColor);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setFakeColor(defaultColor);
  }, [defaultColor]);

  function handleChange(color) {
    setFakeColor(color);
    onChange(color);
  }

  const handleClick = () => {
    setVisible(!visible);
  };

  return (
    <>
      <div className="color" onClick={handleClick}>
        <span className="color-left">
          <span
            className="color-fake-input"
            style={{ backgroundColor: fakeColor }}
          ></span>
          <span className="color-label">{label}</span>
        </span>
        <span className="color-value">{fakeColor}</span>
      </div>
      <ColorPicker
        change={handleChange}
        defaultColor={defaultColor}
        visible={visible}
      />
    </>
  );
}
