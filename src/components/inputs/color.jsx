import { useRef, useEffect, useState } from "react";

import "@/styles/inputs/color.css";

export default function Color({ defaultColor, onChange, id, name, label }) {
  const colorInput = useRef(null);
  const [fakeColor, setFakeColor] = useState(defaultColor);

  useEffect(() => {
    setFakeColor(defaultColor);
  }, [defaultColor]);

  const handleChange = (event) => {
    setFakeColor(event.target.value);
    onChange(event);
  };

  const handleClick = () => {
    colorInput.current.click();
  };

  return (
    <div className="color" onClick={handleClick}>
      <span className="color-left">
        <input
          type="color"
          value={fakeColor}
          onChange={handleChange}
          className="color-input"
          id={id}
          name={name}
          ref={colorInput}
        />
        <span
          className="color-fake-input"
          style={{ backgroundColor: fakeColor }}
        ></span>
        <span className="color-label">{label}</span>
      </span>
      <span className="color-value">{fakeColor}</span>
    </div>
  );
}
