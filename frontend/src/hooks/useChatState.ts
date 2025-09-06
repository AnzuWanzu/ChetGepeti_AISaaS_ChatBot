import { useChat } from "./useChat";

export const useChatState = () => {
  const chat = useChat();

  return {
    data: {
      chatMessages: chat.chatMessages,
      stoppedMessages: chat.stoppedMessages,
    },
    state: {
      isThinking: chat.isThinking,
      typingMessageIndex: chat.typingMessageIndex,
      isTypingStopped: chat.isTypingStopped,
      isAIGenerating: chat.isAIGenerating,
    },
    handlers: {
      handleSubmit: chat.handleSubmit,
      handleDeleteChats: chat.handleDeleteChats,
      handleStopGeneration: chat.handleStopGeneration,
      handleTypingComplete: chat.handleTypingComplete,
      handleStoreTruncatedContent: chat.handleStoreTruncatedContent,
    },
  };
};
