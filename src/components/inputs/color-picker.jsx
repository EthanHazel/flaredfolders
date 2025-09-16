import { useState } from "react";

import Palette from "@/stores/color-palette.json";

import "@/styles/inputs/color-picker.css";

export default function ColorPicker({ change, visible = false, defaultColor }) {
  const [current, setCurrent] = useState(defaultColor);
  return (
    <div
      className={"color-picker" + (visible ? " visible" : "")}
      style={{
        gridTemplateColumns: `repeat(${Palette.width}, 1fr)`,
        gridTemplateRows: `repeat(${Palette.height}, 1fr)`,
      }}
    >
      {Palette.colors.map((color, index) => (
        <div
          key={index}
          className={
            "color-picker-color" + (color === current ? " selected" : "")
          }
          style={{ backgroundColor: color }}
          onClick={() => {
            setCurrent(color);
            change(color);
          }}
        ></div>
      ))}
    </div>
  );
}
