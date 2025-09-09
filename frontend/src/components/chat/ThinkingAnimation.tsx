import { Avatar, Box, Typography, useMediaQuery } from "@mui/material";
import { keyframes } from "@emotion/react";
import { responsivePatterns } from "../../utils/responsive";

const dotAnimation = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
`;

const ThinkingAnimation = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const fontSize = isMobile
    ? responsivePatterns.typography.body.xs
    : responsivePatterns.typography.body.md;
  const avatarSize = isMobile
    ? responsivePatterns.components.icon.large.xs || 32
    : responsivePatterns.components.icon.large.md || 40;
  const iconSize = isMobile
    ? responsivePatterns.components.icon.medium.xs
    : responsivePatterns.components.icon.medium.md;
  const dotSize = isMobile
    ? responsivePatterns.components.icon.small.xs
    : responsivePatterns.components.icon.small.md;

  return (
    <Box
      sx={{
        display: "flex",
        p: 2,
        bgcolor: "#2e312dff",
        gap: 2,
        borderRadius: 2,
        my: 1,
        mx: 1,
        alignItems: "center",
      }}
    >
      <Avatar sx={{ ml: 0, width: avatarSize, height: avatarSize }}>
        <img src="chet_gepeti.png" alt="chet gepeti" width={iconSize} />
      </Avatar>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          gap: responsivePatterns.spacing.gap.small.md,
          minWidth: 0,
          pt: 0,
          minHeight: "40px",
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: fontSize,
            fontStyle: "italic",
            opacity: 0.8,
          }}
        >
          Chet Gepeti is thinking
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: responsivePatterns.spacing.gap.small.md,
            alignItems: "center",
          }}
        >
          {[0, 1, 2].map((index) => (
            <Box
              key={index}
              sx={{
                width: dotSize,
                height: dotSize,
                borderRadius: "50%",
                bgcolor: "white",
                animation: `${dotAnimation} 6s infinite ease-in-out`,
                animationDelay: `${index * 0.5}s`,
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ThinkingAnimation;
