import { Box } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import FormattedText from "../shared/FormattedText";
import {
  extractCodeFromString,
  detectProgrammingLanguage,
  isCodeBlock,
  formatCodeBlock,
} from "../../utils/codeProcessing";

interface TypingResponseProps {
  text: string;
  onComplete?: () => void;
  onStop?: () => void;
  isStopped?: boolean;
  onStoreTruncated?: (truncatedContent: string) => void;
}

const TypingResponse = ({
  text,
  onComplete,
  onStop,
  isStopped,
  onStoreTruncated,
}: TypingResponseProps) => {
  const [typedText, setTypedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    setTypedText("");
    setCurrentIndex(0);
    setIsCompleted(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, [text]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isCompleted) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      return;
    }

    if (isStopped) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      onStoreTruncated?.(typedText);
      setTimeout(() => {
        onComplete?.();
      }, 1000);
      return;
    }

    if (currentIndex < text.length) {
      timeoutRef.current = window.setTimeout(() => {
        setTypedText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 30);

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    } else if (currentIndex >= text.length && !isCompleted) {
      setIsCompleted(true);
      onComplete?.();
    }
  }, [
    currentIndex,
    text,
    isStopped,
    isCompleted,
    onComplete,
    onStop,
    onStoreTruncated,
    typedText,
  ]);

  const renderFormattedContent = (
    content: string,
    showStopped: boolean = false
  ) => {
    const blocks = extractCodeFromString(content);
    const finalText = showStopped ? content + " [Generation stopped]" : content;

    if (blocks && blocks.length > 1) {
      const stoppedBlocks: string[] = [];
      let accumulatedLength = 0;

      for (const block of blocks) {
        if (accumulatedLength + block.length <= content.length) {
          stoppedBlocks.push(block);
          accumulatedLength += block.length;
        } else {
          const remainingLength = content.length - accumulatedLength;
          if (remainingLength > 0) {
            stoppedBlocks.push(block.slice(0, remainingLength));
          }
          break;
        }
      }

      return (
        <Box>
          {stoppedBlocks
            .map((block, index) => {
              const trimmedBlock = block.trim();
              if (!trimmedBlock) return null;

              if (isCodeBlock(block)) {
                const language = detectProgrammingLanguage(block);
                const codeContent = formatCodeBlock(block);

                return (
                  <Box key={index} sx={{ my: 1 }}>
                    <SyntaxHighlighter
                      style={coldarkDark}
                      language={language}
                      customStyle={{
                        margin: 0,
                        borderRadius: "8px",
                        fontSize: "13px",
                        padding: "16px",
                        overflow: "auto",
                        maxWidth: "100%",
                        wordWrap: "break-word",
                        whiteSpace: "pre-wrap",
                      }}
                      wrapLines={true}
                      wrapLongLines={true}
                    >
                      {codeContent}
                    </SyntaxHighlighter>
                  </Box>
                );
              } else {
                return (
                  <Box key={index} sx={{ my: 0.5 }}>
                    <FormattedText
                      text={
                        index === stoppedBlocks.length - 1 && showStopped
                          ? block + " [Generation stopped]"
                          : block
                      }
                      fontSize="13px"
                    />
                  </Box>
                );
              }
            })
            .filter(Boolean)}
        </Box>
      );
    } else {
      return (
        <Box
          style={{
            fontSize: "18px",
            color: "white",
            fontFamily: "inherit",
            lineHeight: "1.5",
            whiteSpace: "pre-wrap",
          }}
        >
          <FormattedText text={finalText} fontSize="14px" />
        </Box>
      );
    }
  };

  if (isStopped && typedText) {
    return renderFormattedContent(typedText, true);
  }

  if (isCompleted) {
    return renderFormattedContent(text);
  }

  return renderFormattedContent(typedText);
};

export default TypingResponse;
