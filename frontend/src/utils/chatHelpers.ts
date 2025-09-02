import type { ChatMessage } from "../types/chat.js";

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

export const isUserMessage = (message: ChatMessage): boolean =>
  message.role === "user";

export const isAssistantMessage = (message: ChatMessage): boolean =>
  message.role === "assistant";

export const isSystemMessage = (message: ChatMessage): boolean =>
  message.role === "system";
