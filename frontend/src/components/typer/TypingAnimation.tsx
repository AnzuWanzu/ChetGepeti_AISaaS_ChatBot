import { TypeAnimation } from "react-type-animation";
import { useTheme, useMediaQuery } from "@mui/material";

const TypingAnimation = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const getFontSize = () => {
    if (isMobile) return "16px";
    if (isTablet) return "28px";
    return "37px";
  };

  return (
    <TypeAnimation
      sequence={["Chat with Chet Gepeti", 2000, "Built with love ❤️ ", 2000]}
      wrapper="span"
      speed={50}
      style={{
        fontSize: getFontSize(),
        color: "white",
        display: "inline-block",
        textShadow: "1px 1px 20px #000",
        textAlign: "center",
        lineHeight: "1.2",
        maxWidth: "100%",
        wordBreak: "break-word",
        padding: isMobile ? "0 10px" : "0 20px",
      }}
      repeat={Infinity}
    />
  );
};

export default TypingAnimation;
