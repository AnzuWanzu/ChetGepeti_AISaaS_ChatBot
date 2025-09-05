import { TypeAnimation } from "react-type-animation";
import { Box } from "@mui/material";
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
}

const TypingResponse = ({ text, onComplete }: TypingResponseProps) => {
  const messageBlocks = extractCodeFromString(text);
  const hasCodeBlocks = messageBlocks && messageBlocks.length > 1;

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
