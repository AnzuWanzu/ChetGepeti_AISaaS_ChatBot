import { Box, IconButton, TextField } from "@mui/material";
import { IoMdSend, IoMdSquare } from "react-icons/io";
import type { RefObject } from "react";
import {
  useResponsiveSize,
  useResponsiveStyles,
} from "../../hooks/useResponsive.js";
import { responsivePatterns } from "../../utils/responsive.js";

interface ChatInputProps {
  inputRef: RefObject<HTMLTextAreaElement | null>;
  onSubmit: () => void;
  onStopGeneration: () => void;
  showStopButton: boolean;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

const ChatInput = ({
  inputRef,
  onSubmit,
  onStopGeneration,
  showStopButton,
  value = "",
  onChange,
  disabled = false,
}: ChatInputProps) => {
  const responsiveSizes = useResponsiveSize();
  const responsiveStyles = useResponsiveStyles();

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!disabled) {
        onSubmit();
      }
    }
  };

  const handleSubmit = () => {
    if (!disabled) {
      onSubmit();
    }
  };

  return (
    <Box
      sx={{
        width: responsivePatterns.layout.width.withPadding,
        p: responsiveStyles.sectionPadding,
        borderRadius: 3,
        bgcolor: "#20221cff",
        display: "flex",
        boxSizing: "border-box",
        alignItems: "flex-end",
        flexShrink: 0,
        mx: responsiveStyles.containerMargin,
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
        placeholder={
          disabled ? "AI is generating response..." : "Type your message..."
        }
        variant="standard"
        onKeyPress={handleKeyPress}
        disabled={disabled}
        sx={{
          flex: 1,
          "& .MuiInput-root": {
            color: disabled ? "#666" : "white",
            fontSize: responsiveStyles.bodyFontSize,
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
              color: disabled ? "#555" : "#999",
              opacity: 1,
            },
          },
        }}
      />

      {/* Stop Generation Button - Only show when AI is generating */}
      {showStopButton && (
        <IconButton
          onClick={onStopGeneration}
          size={responsiveSizes.iconSize}
          sx={{
            color: "#f44336",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: responsiveSizes.buttonPadding,
            minWidth: responsiveSizes.buttonMinWidth,
            minHeight: responsiveSizes.buttonMinHeight,
            "&:hover": {
              backgroundColor: "rgba(244, 67, 54, 0.1)",
            },
          }}
        >
          <IoMdSquare
            style={{
              fontSize: responsiveSizes.iconPixels,
              display: "block",
            }}
          />
        </IconButton>
      )}

      {/* Send Button - Disabled when AI is generating, unless stop button is shown */}
      {!showStopButton && (
        <IconButton
          onClick={handleSubmit}
          size={responsiveSizes.iconSize}
          disabled={disabled}
          sx={{
            color: disabled ? "#555" : "white",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: responsiveSizes.buttonPadding,
            minWidth: responsiveSizes.buttonMinWidth,
            minHeight: responsiveSizes.buttonMinHeight,
            "&:hover": {
              backgroundColor: disabled
                ? "transparent"
                : "rgba(76, 175, 80, 0.1)",
            },
            "&.Mui-disabled": {
              color: "#555",
            },
          }}
        >
          <IoMdSend
            style={{
              fontSize: responsiveSizes.iconPixels,
              transform: "translate(1px, 0px)",
              display: "block",
            }}
          />
        </IconButton>
      )}
    </Box>
  );
};

export default ChatInput;
