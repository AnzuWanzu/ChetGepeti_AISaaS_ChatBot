import { Typography, Box } from "@mui/material";
import "./ChatHeader.css";

const ChatHeader = () => {
  return (
    <Box className="chat-header-container">
      <Typography className="icy-model-label">
        Model: llama-3.1-8b-instant
      </Typography>
    </Box>
  );
};

export default ChatHeader;
