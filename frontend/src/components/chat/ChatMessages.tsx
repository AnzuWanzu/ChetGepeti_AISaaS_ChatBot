import { Box } from "@mui/material";
import type { RefObject } from "react";
import ChatItem from "./ChatItem";
import ThinkingAnimation from "./ThinkingAnimation";
import EmptyState from "../../components/chat/EmptyState";
import type { ChatMessage } from "../../types/chat";

interface ChatMessagesProps {
  chatContainerRef: RefObject<HTMLDivElement | null>;
  chatMessages: ChatMessage[];
  isThinking: boolean;
  typingMessageIndex: number | null;
  isTypingStopped: boolean;
  stoppedMessages: Map<string, string>;
  onTypingComplete: () => void;
  onStoreTruncated: (index: number, content: string) => void;
}

const ChatMessages = ({
  chatContainerRef,
  chatMessages,
  isThinking,
  typingMessageIndex,
  isTypingStopped,
  stoppedMessages,
  onTypingComplete,
  onStoreTruncated,
}: ChatMessagesProps) => {
  return (
    <Box
      ref={chatContainerRef}
      className="chat-scrollbar"
      sx={{
        width: "100%",
        flex: 1,
        borderRadius: 3,
        display: "flex",
        flexDirection: "column",
        overflow: "scroll",
        overflowX: "hidden",
        overflowY: "auto",
        scrollBehavior: "smooth",
        boxSizing: "border-box",
        mb: 1,
        px: 5,
        py: 1,
      }}
    >
      {/* Empty State */}
      {chatMessages.length === 0 && !isThinking && <EmptyState />}

      {/* Chat Messages */}
      {chatMessages.map((chat, index) => {
        const messageKey = `${chat.role}-${chat.content.substring(0, 50)}`;
        const stoppedContent = stoppedMessages.get(messageKey);

        return (
          <ChatItem
            content={stoppedContent || chat.content}
            role={chat.role}
            key={index}
            isTyping={typingMessageIndex === index && !stoppedContent}
            onTypingComplete={onTypingComplete}
            isStopped={isTypingStopped && typingMessageIndex === index}
            onStoreTruncated={(truncatedContent) =>
              onStoreTruncated(index, truncatedContent)
            }
          />
        );
      })}
      {isThinking && <ThinkingAnimation />}
    </Box>
  );
};

export default ChatMessages;
