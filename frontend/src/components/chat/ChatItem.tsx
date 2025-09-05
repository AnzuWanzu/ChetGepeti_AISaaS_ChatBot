import { Avatar, Box } from "@mui/material";
import type { ChatMessage } from "../../types/chat.js";
import { isAssistantMessage } from "../../utils/chatHelpers.js";
import {
  extractCodeFromString,
  detectProgrammingLanguage,
  isCodeBlock,
  formatCodeBlock,
} from "../../utils/codeProcessing.js";
import { useAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import FormattedText from "../shared/FormattedText.js";
import TypingResponse from "./TypingResponse.js";

interface ChatItemProps extends ChatMessage {
  isTyping?: boolean;
  onTypingComplete?: () => void;
  isStopped?: boolean;
}

const ChatItem = ({
  content,
  role,
  isTyping = false,
  onTypingComplete,
  isStopped = false,
}: ChatItemProps) => {
  const auth = useAuth();

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
              <Box key={index} sx={{ my: 1 }}>
                <FormattedText text={block} fontSize="18px" />
              </Box>
            );
          }
        })
        .filter(Boolean);
    } else {
      return <FormattedText text={text} fontSize="18px" />;
    }
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
      }}
    >
      <Avatar sx={{ ml: "0", width: 40, height: 40 }}>
        <img src="chet_gepeti.png" alt="openai" width={"30px"} />
      </Avatar>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        {isTyping ? (
          <TypingResponse
            text={content}
            onComplete={onTypingComplete}
            isStopped={isStopped}
          />
        ) : (
          renderContent(content)
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
        my: 1,
        mx: 1,
        borderRadius: 2,
      }}
    >
      <Avatar
        sx={{
          ml: "0",
          bgcolor: "black",
          color: "white",
          width: 40,
          height: 40,
          fontSize: "16px",
        }}
      >
        {auth?.user?.name[0]}
        {auth?.user?.name.split(" ")[1][0]}
      </Avatar>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <FormattedText text={content} fontSize="18px" />
      </Box>
    </Box>
  );
};

export default ChatItem;
