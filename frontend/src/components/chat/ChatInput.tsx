import {
  Box,
  IconButton,
  TextField,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { IoMdSend, IoMdSquare } from "react-icons/io";
import type { RefObject } from "react";

interface ChatInputProps {
  inputRef: RefObject<HTMLTextAreaElement | null>;
  onSubmit: () => void;
  onStopGeneration: () => void;
  showStopButton: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

const ChatInput = ({
  inputRef,
  onSubmit,
  onStopGeneration,
  showStopButton,
  value = "",
  onChange,
}: ChatInputProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <Box
      sx={{
        width: {
          xs: "calc(100% - 20px)",
          sm: "calc(100% - 40px)",
          md: "calc(100% - 93px)",
        },
        p: { xs: 1.5, sm: 2, md: 2.5 },
        borderRadius: 3,
        bgcolor: "#20221cff",
        display: "flex",
        boxSizing: "border-box",
        alignItems: "flex-end",
        flexShrink: 0,
        mx: { xs: 1, sm: 2.5, md: 5 },
        gap: 1,
      }}
    >
      <TextField
        inputRef={inputRef}
        multiline
        maxRows={6}
        minRows={1}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder="Type your message..."
        variant="standard"
        onKeyPress={handleKeyPress}
        sx={{
          flex: 1,
          "& .MuiInput-root": {
            color: "white",
            fontSize: { xs: "16px", sm: "17px", md: "18px" },
            "&:before": {
              borderBottom: "none",
            },
            "&:after": {
              borderBottom: "none",
            },
            "&:hover:not(.Mui-disabled):before": {
              borderBottom: "none",
            },
          },
          "& .MuiInput-input": {
            padding: "8px 0",
            "&::placeholder": {
              color: "#999",
              opacity: 1,
            },
          },
        }}
      />

      {/* Stop Generation Button */}
      {showStopButton && (
        <IconButton
          onClick={onStopGeneration}
          size={isMobile ? "small" : "medium"}
          sx={{
            color: "white",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: isMobile ? 1 : 1.2,
            minWidth: isMobile ? "32px" : "40px",
            minHeight: isMobile ? "32px" : "40px",
            "&:hover": {
              backgroundColor: "rgba(244, 67, 54, 0.1)",
            },
          }}
        >
          <IoMdSquare
            style={{
              fontSize: isMobile ? "18px" : "20px",
              display: "block",
            }}
          />
        </IconButton>
      )}

      {/* Send Button */}
      <IconButton
        onClick={onSubmit}
        size={isMobile ? "small" : "medium"}
        sx={{
          color: "white",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: isMobile ? 1 : 1.2,
          minWidth: isMobile ? "32px" : "40px",
          minHeight: isMobile ? "32px" : "40px",
          "&:hover": {
            backgroundColor: "rgba(76, 175, 80, 0.1)",
          },
        }}
      >
        <IoMdSend
          style={{
            fontSize: isMobile ? "18px" : "20px",
            transform: "translate(1px, 0px)",
            display: "block",
          }}
        />
      </IconButton>
    </Box>
  );
};

export default ChatInput;
