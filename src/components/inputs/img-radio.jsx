import Image from "next/image";
import "@/styles/inputs/img-radio.css";

export default function ImgRadio({
  onChange,
  id,
  name,
  img,
  size = 32,
  visible = true,
  label,
  checked = false,
}) {
  const handleClick = () => {
    onChange();
    document.getElementById(id).checked = true;
  };

  return (
    <label
      className="img-radio"
      onClick={handleClick}
      style={{ display: visible ? "flex" : "none" }}
    >
      <input
        type="radio"
        onChange={onChange}
        className="img-radio-input"
        id={id}
        name={name}
        checked={checked}
      />
      <span className="img-radio-img">
        <Image
          src={"/images/folder-assets/previews/" + img + ".png"}
          width={size}
          height={size}
          alt={label || img || "image"}
          quality={100}
        />
      </span>
      <span
        className="img-radio-label"
        style={{ fontFamily: label == "Windows 95" ? "Comic Sans MS" : "" }}
      >
        {label || img || name}
      </span>
    </label>
  );
}
