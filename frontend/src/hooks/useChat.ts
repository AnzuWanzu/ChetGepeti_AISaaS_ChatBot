import { useState, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import type { ChatMessage } from "../types/chat";
import { createUserMessage } from "../utils/chatHelpers";
import {
  deleteUserChats,
  getUserChats,
  sendChatRequest,
} from "../helpers/api-communicator";
import { useAuth } from "../context/AuthContext";

export const useChat = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [typingMessageIndex, setTypingMessageIndex] = useState<number | null>(
    null
  );
  const [isTypingStopped, setIsTypingStopped] = useState(false);
  const [stoppedMessages, setStoppedMessages] = useState<Map<number, string>>(
    new Map()
  );

  const handleSubmit = async (content: string) => {
    if (!content.trim()) return;

    const newMessage = createUserMessage(content);
    setChatMessages((prev) => [...prev, newMessage]);

    setIsTypingStopped(false);
    setStoppedMessages(new Map());
    setIsThinking(true);

    try {
      const chatData = await sendChatRequest(content);
      setIsThinking(false);
      setChatMessages([...chatData.chats]);

      const lastMessageIndex = chatData.chats.length - 1;
      setTypingMessageIndex(lastMessageIndex);
    } catch (error) {
      console.error("Chat request failed:", error);
      toast.error("Failed to send message");
      setIsThinking(false);
    }
  };

  const handleDeleteChats = async () => {
    try {
      toast.loading("Deleting Chats", { id: "loadchats" });
      await deleteUserChats();
      setChatMessages([]);
      toast.success("Deleted Chats Successfully", { id: "loadchats" });
    } catch (error) {
      console.log(error);
      toast.error("Deleting Chats Failed", { id: "loadchats" });
    }
  };

  const handleStopGeneration = () => {
    setIsTypingStopped(true);
  };

  const handleTypingComplete = () => {
    setTypingMessageIndex(null);
    setIsTypingStopped(false);
  };

  const handleStoreTruncatedContent = (
    messageIndex: number,
    truncatedContent: string
  ) => {
    setStoppedMessages(
      (prev) =>
        new Map(
          prev.set(messageIndex, truncatedContent + " [Generation stopped]")
        )
    );
  };

  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading Chats", { id: "loadchats" });
    }
    getUserChats()
      .then((data) => {
        setChatMessages([...data.chats]);
        toast.success("Successfully Loaded Chats", { id: "loadchats" });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Loading Failed", { id: "loadchats" });
      });
  }, [auth]);

  useLayoutEffect(() => {
    if (!auth?.user) {
      navigate("/login");
    }
  }, [auth, navigate]);

  return {
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
  };
};
