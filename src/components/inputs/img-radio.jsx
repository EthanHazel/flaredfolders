import Image from "next/image";
import "@/styles/img-radio.css";

export default function ImgRadio({
  onChange,
  defaultChecked,
  id,
  name,
  img,
  size = 48,
}) {
  const handleClick = () => {
    onChange();
    document.getElementById(id).checked = true;
  };

  return (
    <label className="img-radio" onClick={handleClick}>
      <input
        type="radio"
        defaultChecked={defaultChecked}
        onChange={onChange}
        className="img-radio-input"
        id={id}
        name={name}
      />
      <span className="img-radio-img">
        <Image
          src={"/folder-assets/previews/" + img + ".png"}
          width={size}
          height={size}
          alt={img || "image"}
        />
      </span>
    </label>
  );
}
