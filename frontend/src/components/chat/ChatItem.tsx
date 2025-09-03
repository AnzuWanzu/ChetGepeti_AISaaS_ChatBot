import { Avatar, Box } from "@mui/material";
import type { ChatMessage } from "../../types/chat.js";
import { isAssistantMessage } from "../../utils/chatHelpers.js";
import {
  extractCodeFromString,
  detectProgrammingLanguage,
  isCodeBlock,
} from "../../utils/codeProcessing.js";
import { useAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import FormattedText from "../shared/FormattedText.js";

const ChatItem = ({ content, role }: ChatMessage) => {
  const auth = useAuth();
  const messageBlocks = extractCodeFromString(content);
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
      <Box>
        {!messageBlocks && <FormattedText text={content} fontSize="20px" />}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block, index) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter
                key={index}
                style={coldarkDark}
                language={detectProgrammingLanguage(block)}
              >
                {block}
              </SyntaxHighlighter>
            ) : (
              <FormattedText key={index} text={block} fontSize="20px" />
            )
          )}
      </Box>
    </Box>
  ) : (
    <Box sx={{ display: "flex", p: 2, bgcolor: "#004d56", gap: 2 }}>
      <Avatar sx={{ ml: "0", bgcolor: "black", color: "white" }}>
        {auth?.user?.name[0]}
        {auth?.user?.name.split(" ")[1][0]}
      </Avatar>
      <Box>
        <FormattedText text={content} fontSize="20px" />
      </Box>
    </Box>
  );
};

export default ChatItem;
