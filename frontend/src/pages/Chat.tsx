import { Box } from "@mui/material";
import { useRef, useEffect, useState } from "react";
import { useChat } from "../hooks/useChat";
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

  const {
    chatMessages,
    isThinking,
    typingMessageIndex,
    isTypingStopped,
    stoppedMessages,
    handleSubmit,
    handleDeleteChats,
    handleStopGeneration,
    handleTypingComplete,
    handleStoreTruncatedContent,
  } = useChat();

  // auto-scroll of chat to bottom (recent messages)
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages, isThinking, typingMessageIndex]);

  const onSubmit = () => {
    const content = inputValue.trim();
    if (content) {
      setInputValue("");
      handleSubmit(content);
    }
  };

  return (
    <Box sx={chatStyles.mainContainer}>
      {/* Sidebar */}
      <ChatSidebar onDeleteChats={handleDeleteChats} />

      {/* Main Chat Area */}
      <Box sx={chatStyles.chatArea}>
        {/* Header */}
        <ChatHeader />

        {/* Messages */}
        <ChatMessages
          chatContainerRef={chatContainerRef}
          chatMessages={chatMessages}
          isThinking={isThinking}
          typingMessageIndex={typingMessageIndex}
          isTypingStopped={isTypingStopped}
          stoppedMessages={stoppedMessages}
          onTypingComplete={handleTypingComplete}
          onStoreTruncated={handleStoreTruncatedContent}
        />

        {/* Input */}
        <ChatInput
          inputRef={inputRef}
          onSubmit={onSubmit}
          onStopGeneration={handleStopGeneration}
          showStopButton={typingMessageIndex !== null && !isTypingStopped}
          value={inputValue}
          onChange={setInputValue}
        />
      </Box>
    </Box>
  );
};

export default Chat;
