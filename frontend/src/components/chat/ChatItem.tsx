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

const ChatItem = ({ content, role }: ChatMessage) => {
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
              <Box key={index} sx={{ my: 1 }}>
                <SyntaxHighlighter
                  style={coldarkDark}
                  language={language}
                  customStyle={{
                    margin: 0,
                    borderRadius: "8px",
                    fontSize: "14px",
                  }}
                >
                  {codeContent}
                </SyntaxHighlighter>
              </Box>
            );
          } else {
            return (
              <Box key={index} sx={{ my: 0.5 }}>
                <FormattedText text={block} fontSize="20px" />
              </Box>
            );
          }
        })
        .filter(Boolean);
    } else {
      return <FormattedText text={text} fontSize="20px" />;
    }
  };

  return isAssistantMessage({ content, role }) ? (
    <Box
      sx={{
        display: "flex",
        p: 2,
        bgcolor: "#004d5612",
        gap: 2,
        borderRadius: 2,
        my: 1,
      }}
    >
      <Avatar sx={{ ml: "0" }}>
        <img src="openai.png" alt="openai" width={"30px"} />
      </Avatar>
      <Box sx={{ flex: 1 }}>{renderContent(content)}</Box>
    </Box>
  ) : (
    <Box sx={{ display: "flex", p: 2, bgcolor: "#004d56", gap: 2 }}>
      <Avatar sx={{ ml: "0", bgcolor: "black", color: "white" }}>
        {auth?.user?.name[0]}
        {auth?.user?.name.split(" ")[1][0]}
      </Avatar>
      <Box sx={{ flex: 1 }}>
        <FormattedText text={content} fontSize="20px" />
      </Box>
    </Box>
  );
};

export default ChatItem;
