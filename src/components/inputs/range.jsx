import { useState } from "react";
import { RotateCcw } from "lucide-react";

import "@/styles/inputs/range.css";

export default function Range({
  onChange,
  min,
  max,
  defaultValue,
  id,
  label,
  step,
}) {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (event) => {
    setValue(event.target.value);
    onChange(event);
  };

  const handleReset = () => {
    setValue(defaultValue);
    onChange({ target: { value: defaultValue } });
  };

  return (
    <div className="range">
      <label htmlFor={id} className="range-label">
        {label}
      </label>
      <div className="range-input-container">
        <span
          className="range-background"
          style={{
            width: `calc(${((value - min) / (max - min)) * 100}% - ${
              (value - min) / (max - min)
            }rem)`,
          }}
        ></span>
        <input
          type="range"
          onChange={handleChange}
          min={min}
          max={max}
          id={id}
          step={step}
          value={value}
          className="range-input"
        />
      </div>
      <span className="range-value">{value}</span>
      <button type="button" className="range-reset" onClick={handleReset}>
        <RotateCcw />
      </button>
    </div>
  );
}
