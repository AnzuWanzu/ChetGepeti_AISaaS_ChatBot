import { Box } from "@mui/material";
import { useRef, useEffect } from "react";
import { useChat } from "../hooks/useChat";
import ChatSidebar from "../components/chat/ChatSidebar";
import ChatHeader from "../components/chat/ChatHeader";
import ChatMessages from "../components/chat/ChatMessages";
import ChatInput from "../components/chat/ChatInput";
import "../components/shared/ModernScrollbar.css";

const Chat = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

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
    const content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    handleSubmit(content);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "calc(100vh - 90px)",
        gap: 2,
        p: 2,
        boxSizing: "border-box",
      }}
    >
      {/* Sidebar */}
      <ChatSidebar onDeleteChats={handleDeleteChats} />

      {/* Main Chat Area */}
      <Box
        sx={{
          display: "flex",
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: "column",
          height: "100%",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
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
        />
      </Box>
    </Box>
  );
};

export default Chat;
