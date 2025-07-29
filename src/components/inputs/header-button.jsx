import "@/styles/inputs/buttons.css";

export default function HeaderButton({ onClick, icon, href, target }) {
  return (
    <a className="header-button" href={href} target={target} onClick={onClick}>
      {icon}
    </a>
  );
}
