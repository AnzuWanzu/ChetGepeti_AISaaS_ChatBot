import { Button } from "@mui/material";
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
  const handleClick = () => {
    props.onToggle?.();
    props.onClick?.();
  };

  return (
    <Button
      component={Link}
      to={props.to}
      onClick={handleClick}
      variant="contained"
      className={`navigation-link ${props.isActive ? "active" : ""}`}
      sx={{
        bgcolor: props.bg,
        color: props.textColor,
        boxShadow: `0 4px 12px ${props.bg}30`,
        ":hover": {
          bgcolor: props.bg,
          boxShadow: `0 6px 16px ${props.bg}40`,
        },
      }}
    >
      {props.text}
    </Button>
  );
};

export default NavigationLink;
