import { TypeAnimation } from "react-type-animation";
import { Box } from "@mui/material";
import { useState, useEffect } from "react";
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
}

const TypingResponse = ({
  text,
  onComplete,
  onStop,
  isStopped,
}: TypingResponseProps) => {
  const [typedText, setTypedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const messageBlocks = extractCodeFromString(text);
  const hasCodeBlocks = messageBlocks && messageBlocks.length > 1;

  useEffect(() => {
    setTypedText("");
    setCurrentIndex(0);
  }, [text]);

  useEffect(() => {
    if (isStopped) {
      onStop?.();
      return;
    }

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setTypedText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 30);

      return () => clearTimeout(timeout);
    } else if (currentIndex >= text.length) {
      onComplete?.();
    }
  }, [currentIndex, text, isStopped, onComplete, onStop]);

  if (isStopped && typedText) {
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
        <FormattedText
          text={typedText + " [Generation stopped]"}
          fontSize="18px"
        />
      </Box>
    );
  }

  if (hasCodeBlocks) {
    return (
      <Box>
        {messageBlocks
          ?.map((block, index) => {
            const trimmedBlock = block.trim();
            if (!trimmedBlock) return null;

            if (isCodeBlock(block)) {
              const language = detectProgrammingLanguage(block);
              const codeContent = formatCodeBlock(block);

              return (
                <Box key={index} sx={{ my: 1.5 }}>
                  <SyntaxHighlighter
                    style={coldarkDark}
                    language={language}
                    customStyle={{
                      margin: 0,
                      borderRadius: "8px",
                      fontSize: "14px",
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
                <Box key={index} sx={{ my: 1 }}>
                  <FormattedText text={block} fontSize="18px" />
                </Box>
              );
            }
          })
          .filter(Boolean)}
      </Box>
    );
  }

  if (!hasCodeBlocks) {
    if (isStopped) {
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
          <FormattedText
            text={typedText + " [Generation stopped]"}
            fontSize="18px"
          />
        </Box>
      );
    }

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
        <FormattedText text={typedText} fontSize="18px" />
      </Box>
    );
  }

  return (
    <TypeAnimation
      sequence={[
        text,
        () => {
          onComplete?.();
        },
      ]}
      wrapper="div"
      speed={95}
      style={{
        fontSize: "18px",
        color: "white",
        display: "inline-block",
        fontFamily: "inherit",
        lineHeight: "1.5",
        whiteSpace: "pre-wrap",
      }}
      cursor={false}
    />
  );
};

export default TypingResponse;
