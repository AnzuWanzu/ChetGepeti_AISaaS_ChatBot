import { Box, IconButton } from "@mui/material";
import { IoMdSend, IoMdSquare } from "react-icons/io";
import type { RefObject } from "react";

interface ChatInputProps {
  inputRef: RefObject<HTMLInputElement | null>;
  onSubmit: () => void;
  onStopGeneration: () => void;
  showStopButton: boolean;
}

const ChatInput = ({ 
  inputRef, 
  onSubmit, 
  onStopGeneration, 
  showStopButton 
}: ChatInputProps) => {
  return (
    <Box
      sx={{
        width: "calc(100% - 93px)",
        p: 2.5,
        borderRadius: 3,
        bgcolor: "#20221cff",
        display: "flex",
        boxSizing: "border-box",
        alignItems: "center",
        flexShrink: 0,
        mx: 5,
      }}
    >
      <input
        ref={inputRef}
        type="text"
        style={{
          flex: 1,
          backgroundColor: "transparent",
          padding: "5px",
          border: "none",
          outline: "none",
          color: "white",
          fontSize: "18px",
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            onSubmit();
          }
        }}
      />
      {/* Stop Generation Button */}
      {showStopButton && (
        <IconButton 
          onClick={onStopGeneration}
          sx={{ 
            color: "white", 
            flexShrink: 0,
            mr: 1,
            "&:hover": {
              backgroundColor: "rgba(244, 67, 54, 0.1)",
            }
          }}
        >
          <IoMdSquare />
        </IconButton>
      )}
      {/* Send Button */}
      <IconButton sx={{ color: "white", flexShrink: 0 }}>
        <IoMdSend onClick={onSubmit} />
      </IconButton>
    </Box>
  );
};

export default ChatInput;
