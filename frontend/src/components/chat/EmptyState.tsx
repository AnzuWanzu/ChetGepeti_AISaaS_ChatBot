import { Box, Typography } from "@mui/material";
import { IoMdChatbubbles } from "react-icons/io";

const EmptyState = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        opacity: 0.6,
        gap: 3,
      }}
    >
      <IoMdChatbubbles
        size={72}
        style={{
          color: "#6b7280",
          opacity: 0.7,
        }}
      />
      <Typography
        sx={{
          color: "#6b7280",
          fontSize: "24px",
          fontWeight: 400,
          textAlign: "center",
          fontFamily: "work sans",
          letterSpacing: "0.5px",
        }}
      >
        Start your conversation
      </Typography>
      <Typography
        sx={{
          color: "#6b7280",
          fontSize: "18px",
          fontWeight: 300,
          textAlign: "center",
          fontFamily: "work sans",
          opacity: 0.8,
        }}
      >
        Ask Chet Gepeti anything...
      </Typography>
    </Box>
  );
};

export default EmptyState;
