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
}

const ChatInput = ({
  inputRef,
  onSubmit,
  onStopGeneration,
  showStopButton,
  value = "",
  onChange,
}: ChatInputProps) => {
  const responsiveSizes = useResponsiveSize();
  const responsiveStyles = useResponsiveStyles();

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
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
        placeholder="Type your message..."
        variant="standard"
        onKeyPress={handleKeyPress}
        sx={{
          flex: 1,
          "& .MuiInput-root": {
            color: "white",
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
          size={responsiveSizes.iconSize}
          sx={{
            color: "white",
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

      {/* Send Button */}
      <IconButton
        onClick={onSubmit}
        size={responsiveSizes.iconSize}
        sx={{
          color: "white",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: responsiveSizes.buttonPadding,
          minWidth: responsiveSizes.buttonMinWidth,
          minHeight: responsiveSizes.buttonMinHeight,
          "&:hover": {
            backgroundColor: "rgba(76, 175, 80, 0.1)",
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
    </Box>
  );
};

export default ChatInput;
