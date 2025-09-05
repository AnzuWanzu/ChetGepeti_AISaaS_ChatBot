import { Typography } from "@mui/material";

const ChatHeader = () => {
  return (
    <Typography
      sx={{
        fontSize: { xs: "24px", sm: "28px", md: "32px" },
        color: "white",
        mb: 1,
        mx: "auto",
        fontWeight: "600",
        textAlign: "center",
      }}
    >
      Model: llama-3.1-8b-instant
    </Typography>
  );
};

export default ChatHeader;
