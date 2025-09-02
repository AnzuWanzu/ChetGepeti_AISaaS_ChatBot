import { ChatMessage } from "../types/chat.js";

export const formatChatsForAPI = (chats: any[]): ChatMessage[] => {
  return chats.map(({ role, content }) => ({
    role: role as ChatMessage["role"],
    content,
  }));
};

export const createUserMessage = (content: string): ChatMessage => ({
  role: "user",
  content,
});

export const createAssistantMessage = (content: string): ChatMessage => ({
  role: "assistant",
  content,
});

export const createSystemMessage = (content: string): ChatMessage => ({
  role: "system",
  content,
});
