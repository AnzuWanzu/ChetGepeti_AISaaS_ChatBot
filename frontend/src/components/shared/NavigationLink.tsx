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
  isMobile?: boolean;
  isTablet?: boolean;
};

const NavigationLink = (props: Props) => {
  const handleClick = () => {
    props.onToggle?.();
    props.onClick?.();
  };

  const getResponsiveStyles = () => {
    if (props.isMobile) {
      return {
        fontSize: "11px",
        padding: "6px 12px",
        minWidth: "60px",
        margin: "0 2px",
      };
    }
    if (props.isTablet) {
      return {
        fontSize: "12px",
        padding: "8px 16px",
        minWidth: "80px",
        margin: "0 4px",
      };
    }
    return {
      fontSize: "14px",
      padding: "12px 24px",
      minWidth: "100px",
      margin: "0 8px",
    };
  };

  const responsiveStyles = getResponsiveStyles();

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
        fontSize: responsiveStyles.fontSize,
        padding: responsiveStyles.padding,
        minWidth: responsiveStyles.minWidth,
        margin: responsiveStyles.margin,
        fontWeight: 600,
        borderRadius: "8px",
        textTransform: "uppercase",
        letterSpacing: props.isMobile ? "0.5px" : "1px",
        transition: "all 0.3s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        ":hover": {
          bgcolor: props.bg,
          boxShadow: `0 6px 16px ${props.bg}40`,
          filter: "brightness(1.2)",
          transform: "translateY(-2px)",
        },
        ...(props.isActive && {
          transform: "scale(1.05)",
          ":hover": {
            bgcolor: props.bg,
            boxShadow: `0 6px 16px ${props.bg}40`,
            filter: "brightness(1.2)",
            transform: "scale(1.05) translateY(-2px)",
          },
        }),
      }}
    >
      {props.text}
    </Button>
  );
};

export default NavigationLink;
