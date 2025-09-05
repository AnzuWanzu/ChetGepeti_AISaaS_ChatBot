import { Avatar, Box, Typography } from "@mui/material";
import { keyframes } from "@emotion/react";

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
  return (
    <Box
      sx={{
        display: "flex",
        p: 2,
        bgcolor: "#2e312dff",
        gap: 2,
        borderRadius: 2,
        my: 1,
      }}
    >
      <Avatar sx={{ ml: "0" }}>
        <img src="chet_gepeti.png" alt="chet gepeti" width={"30px"} />
      </Avatar>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: "20px",
            fontStyle: "italic",
            opacity: 0.8,
          }}
        >
          Chet Gepeti is thinking
        </Typography>
        <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
          {[0, 1, 2].map((index) => (
            <Box
              key={index}
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: "white",
                animation: `${dotAnimation} 1.4s infinite ease-in-out`,
                animationDelay: `${index * 0.16}s`,
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ThinkingAnimation;
