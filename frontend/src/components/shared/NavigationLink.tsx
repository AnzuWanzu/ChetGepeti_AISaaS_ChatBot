import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./NavigationLink.css";
import { useResponsive } from "../../hooks/useResponsive.js";
import { getNavigationStyles } from "../../utils/responsive.js";

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
  const { isMobile, isTablet } = useResponsive();
  const navigationStyles = getNavigationStyles();

  const handleClick = () => {
    props.onToggle?.();
    props.onClick?.();
  };

  const responsiveStyles = isMobile
    ? navigationStyles.mobile
    : isTablet
    ? navigationStyles.tablet
    : navigationStyles.desktop;

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
        letterSpacing: responsiveStyles.letterSpacing,
        fontWeight: 600,
        borderRadius: "8px",
        textTransform: "uppercase",
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
