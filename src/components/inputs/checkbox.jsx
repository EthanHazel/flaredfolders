import { Check } from "lucide-react";

import "@/styles/inputs/checkbox.css";

export default function Checkbox({
  onChange,
  defaultChecked,
  id,
  name,
  label,
}) {
  const handleClick = () => {
    onChange();
    document.getElementById(id).checked = !document.getElementById(id).checked;
  };
  return (
    <span className="checkbox" onClick={handleClick}>
      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        onChange={onChange}
        className="checkbox-input"
        id={id}
        name={name}
      />
      <span className="checkbox-fake-input">
        <Check size={16} className="checkbox-fake-input-inner" />
      </span>
      <span htmlFor={id} className="checkbox-label">
        {label}
      </span>
    </span>
  );
}
