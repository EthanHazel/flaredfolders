import "@/styles/inputs/header-button.css";

export default function HeaderButton({ onClick, icon, href, target, label }) {
  return (
    <a className="header-button" href={href} target={target} onClick={onClick}>
      {icon}
      <span className="header-button-label">{label}</span>
    </a>
  );
}
