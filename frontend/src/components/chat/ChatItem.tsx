import { Avatar, Box, useMediaQuery } from "@mui/material";
import type { ChatMessage } from "../../types/chat.js";
import { isAssistantMessage } from "../../utils/chatHelpers.js";
import {
  extractCodeFromString,
  detectProgrammingLanguage,
  isCodeBlock,
  formatCodeBlock,
} from "../../utils/codeProcessing.js";
import { responsivePatterns } from "../../utils/responsive";
import { useAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import FormattedText from "../shared/FormattedText.js";
import TypingResponse from "./TypingResponse.js";

interface ChatItemProps extends ChatMessage {
  isTyping?: boolean;
  onTypingComplete?: () => void;
  isStopped?: boolean;
  onStoreTruncated?: (truncatedContent: string) => void;
}

const ChatItem = ({
  content,
  role,
  isTyping = false,
  onTypingComplete,
  isStopped = false,
  onStoreTruncated,
}: ChatItemProps) => {
  const auth = useAuth();
  const isMobile = useMediaQuery("(max-width:600px)");

  const fontSize = isMobile
    ? responsivePatterns.typography.body.xs
    : responsivePatterns.typography.body.md;
  const codeFontSize = isMobile
    ? responsivePatterns.typography.body.xs
    : responsivePatterns.typography.body.sm;
  // Responsive avatar size
  const avatarSize = isMobile
    ? responsivePatterns.components.icon.large.xs || 32
    : responsivePatterns.components.icon.large.md || 40;

  const renderContent = (text: string) => {
    const messageBlocks = extractCodeFromString(text);

    if (messageBlocks && messageBlocks.length > 1) {
      return messageBlocks
        .map((block, index) => {
          const trimmedBlock = block.trim();
          if (!trimmedBlock) return null;

          if (isCodeBlock(block)) {
            const language = detectProgrammingLanguage(block);
            const codeContent = formatCodeBlock(block);

            return (
              <Box key={index} sx={{ my: { xs: 2, sm: 1.5, md: 1.5 } }}>
                <SyntaxHighlighter
                  style={coldarkDark}
                  language={language}
                  customStyle={{
                    margin: 0,
                    borderRadius: responsivePatterns.layout.borderRadius.md,
                    fontSize: codeFontSize,
                    padding: responsivePatterns.spacing.elementPadding.md,
                    overflow: "auto",
                    maxWidth: "95%",
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
              <Box key={index} sx={{ my: { xs: 1.5, sm: 1, md: 1 } }}>
                <FormattedText text={block} fontSize={fontSize} />
              </Box>
            );
          }
        })
        .filter(Boolean);
    } else {
      return <FormattedText text={text} fontSize={fontSize} />;
    }
  };

  const isSimpleMessage = (text: string) => {
    const messageBlocks = extractCodeFromString(text);
    return (
      (!messageBlocks || messageBlocks.length <= 1) &&
      !text.includes("\n") &&
      text.trim().length < 100
    );
  };

  return isAssistantMessage({ content, role }) ? (
    <Box
      sx={{
        display: "flex",
        p: 2,
        bgcolor: "#2e312dff",
        gap: 2,
        borderRadius: 2,
        my: 1,
        mx: 1,
        alignItems: isSimpleMessage(content) ? "center" : "flex-start", // Center for simple messages
      }}
    >
      <Avatar
        sx={{
          ml: "0",
          width: avatarSize,
          height: avatarSize,
          flexShrink: 0,
          mt: 0,
        }}
      >
        <img
          src="chet_gepeti.png"
          alt="openai"
          width={responsivePatterns.components.icon.medium.md}
        />
      </Avatar>
      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          pt: 0,
          display: "flex",
          alignItems: isSimpleMessage(content) ? "center" : "flex-start",
          minHeight: "40px",
        }}
      >
        {isTyping ? (
          <Box sx={{ pt: "2px", width: "100%" }}>
            <TypingResponse
              text={content}
              onComplete={onTypingComplete}
              isStopped={isStopped}
              onStoreTruncated={onStoreTruncated}
            />
          </Box>
        ) : (
          <Box sx={{ width: "100%", pt: "2px" }}>{renderContent(content)}</Box>
        )}
      </Box>
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        p: 2,
        bgcolor: "#181915ff",
        gap: 2,
        mx: 1,
        borderRadius: 2,
        alignItems: isSimpleMessage(content) ? "center" : "flex-start",
      }}
    >
      <Avatar
        sx={{
          ml: "0",
          bgcolor: "black",
          color: "white",
          width: avatarSize,
          height: avatarSize,
          fontSize: fontSize,
          flexShrink: 0,
          mt: 0,
        }}
      >
        {auth?.user?.name[0]}
        {auth?.user?.name.split(" ")[1][0]}
      </Avatar>
      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          pt: 0,
          display: "flex",
          alignItems: isSimpleMessage(content) ? "center" : "flex-start",
          minHeight: "40px",
        }}
      >
        <Box sx={{ width: "100%", pt: "2px" }}>
          <FormattedText text={content} fontSize={fontSize} />
        </Box>
      </Box>
    </Box>
  );
};

export default ChatItem;
