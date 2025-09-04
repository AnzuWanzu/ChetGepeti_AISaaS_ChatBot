import { Link } from "react-router-dom";
import "./NavigationLink.css";

type Props = {
  to: string;
  bg: string;
  text: string;
  textColor: string;
  onClick?: () => Promise<void>;
  isActive?: boolean;
  onToggle?: () => void;
};

const NavigationLink = (props: Props) => {
  return (
    <Link
      onClick={() => {
        props.onToggle?.();
        props.onClick?.();
      }}
      to={props.to}
      className={`navigation-link ${props.isActive ? "active" : ""}`}
      style={{
        background: props.bg,
        color: props.textColor,
      }}
    >
      {props.text}
    </Link>
  );
};

export default NavigationLink;
