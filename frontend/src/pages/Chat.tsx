import { Box } from "@mui/material";
import { useRef, useEffect, useState } from "react";
import { useChatState } from "../hooks/useChatState";
import { getChatStyles } from "../utils/responsive";
import ChatSidebar from "../components/chat/ChatSidebar";
import ChatHeader from "../components/chat/ChatHeader";
import ChatMessages from "../components/chat/ChatMessages";
import ChatInput from "../components/chat/ChatInput";
import "../components/shared/ModernScrollbar.css";

const Chat = () => {
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const [inputValue, setInputValue] = useState("");

  const chatStyles = getChatStyles();

  const { data, state, handlers } = useChatState();

  // auto-scroll of chat to bottom (recent messages)
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [data.chatMessages, state.isThinking, state.typingMessageIndex]);

  const onSubmit = () => {
    const content = inputValue.trim();
    if (content) {
      setInputValue("");
      handlers.handleSubmit(content);
    }
  };

  return (
    <Box sx={chatStyles.mainContainer}>
      {/* Sidebar */}
      <ChatSidebar onDeleteChats={handlers.handleDeleteChats} />

      {/* Main Chat Area */}
      <Box sx={chatStyles.chatArea}>
        {/* Header */}
        <ChatHeader />

        {/* Messages */}
        <ChatMessages
          chatContainerRef={chatContainerRef}
          chatMessages={data.chatMessages}
          isThinking={state.isThinking}
          typingMessageIndex={state.typingMessageIndex}
          isTypingStopped={state.isTypingStopped}
          stoppedMessages={data.stoppedMessages}
          onTypingComplete={handlers.handleTypingComplete}
          onStoreTruncated={handlers.handleStoreTruncatedContent}
        />

        {/* Input */}
        <ChatInput
          inputRef={inputRef}
          onSubmit={onSubmit}
          onStopGeneration={handlers.handleStopGeneration}
          showStopButton={
            state.typingMessageIndex !== null && !state.isTypingStopped
          }
          value={inputValue}
          onChange={setInputValue}
          disabled={state.isAIGenerating}
        />
      </Box>
    </Box>
  );
};

export default Chat;
