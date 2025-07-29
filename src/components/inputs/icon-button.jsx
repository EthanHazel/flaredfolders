import "@/styles/inputs/buttons.css";

export default function IconButton({
  onClick,
  icon,
  href,
  target,
  label,
  className,
}) {
  return (
    <a className="icon-button" href={href} target={target} onClick={onClick}>
      {icon}
      <span className="icon-button-label">{label}</span>
    </a>
  );
}
