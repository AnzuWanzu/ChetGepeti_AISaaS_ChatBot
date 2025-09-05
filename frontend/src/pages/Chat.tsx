import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { red } from "@mui/material/colors";
import ChatItem from "../components/chat/ChatItem";
import ThinkingAnimation from "../components/chat/ThinkingAnimation";
import { IoMdSend, IoMdTrash, IoMdSquare } from "react-icons/io";
import { useRef, useEffect } from "react";
import { useChat } from "../hooks/useChat";
import "../components/shared/ModernScrollbar.css";

const Chat = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const auth = useAuth();

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
      <Box
        sx={{
          display: { md: "flex", xs: "none", sm: "none" },
          flex: 0.2,
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "50%",
            bgcolor: "#2c2924ff",
            borderRadius: 5,
            flexDirection: "column",
            py: 4,
            mx: 4,
            mt: 10,
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              mb: 2,
              bgcolor: "white",
              color: "black",
              fontWeight: 900,
              fontSize: "20px",
            }}
          >
            {auth?.user?.name[0]?.toUpperCase()}
            {auth?.user?.name.split(" ")[1]?.[0]?.toUpperCase()}
          </Avatar>
          <Typography
            sx={{
              mx: "auto",
              fontFamily: "work sans",
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            You are talking to a ChatBot
          </Typography>
          <Typography
            sx={{
              mx: "auto",
              fontFamily: "work sans",
              my: 2,
              p: 2,
              fontSize: "13px",
              textAlign: "center",
              lineHeight: 1.4,
            }}
          >
            You can ask Chet Gepeti a bunch of things, especially Fantasy. Chet
            Gepeti is my custom character in Divinity Original Sin 2.
          </Typography>
          <Button
            onClick={handleDeleteChats}
            startIcon={<IoMdTrash />}
            sx={{
              width: "180px",
              mt: "auto",
              mb: 2,
              color: "white",
              fontWeight: "700",
              borderRadius: 3,
              mx: "auto",
              fontSize: "12px",
              py: 1,
              bgcolor: red[300],
              ":hover": {
                bgcolor: red.A400,
              },
            }}
          >
            Clear Conversation
          </Button>
        </Box>
      </Box>
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
        <Typography
          sx={{
            fontSize: { xs: "24px", sm: "28px", md: "32px" },
            color: "white",
            mb: 1,
            mx: "auto",
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          Model: llama-3.1-8b-instant
        </Typography>
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
          {chatMessages.map((chat, index) => {
            const messageKey = `${chat.role}-${chat.content.substring(0, 50)}`;
            const stoppedContent = stoppedMessages.get(messageKey);

            return (
              <ChatItem
                content={stoppedContent || chat.content}
                role={chat.role}
                key={index}
                isTyping={typingMessageIndex === index && !stoppedContent}
                onTypingComplete={handleTypingComplete}
                isStopped={isTypingStopped && typingMessageIndex === index}
                onStoreTruncated={(truncatedContent) =>
                  handleStoreTruncatedContent(index, truncatedContent)
                }
              />
            );
          })}
          {isThinking && <ThinkingAnimation />}
          {typingMessageIndex !== null && !isTypingStopped && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 2,
                mb: 1,
              }}
            >
              <Button
                onClick={handleStopGeneration}
                startIcon={<IoMdSquare />}
                sx={{
                  color: "white",
                  backgroundColor: "rgba(244, 67, 54, 0.8)",
                  borderRadius: "20px",
                  px: 3,
                  py: 1,
                  fontWeight: "600",
                  fontSize: "14px",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "rgba(244, 67, 54, 1)",
                  },
                }}
              >
                Stop Generation
              </Button>
            </Box>
          )}
        </Box>
        <Box
          sx={{
            width: "calc(100% - 93px)",
            p: 2.5,
            borderRadius: 3,
            bgcolor: "#20221cff",
            display: "flex",
            boxSizing: "border-box",
            alignItems: "center",
            flexShrink: 0,
            mx: 5,
          }}
        >
          <input
            ref={inputRef}
            type="text"
            style={{
              flex: 1,
              backgroundColor: "transparent",
              padding: "5px",
              border: "none",
              outline: "none",
              color: "white",
              fontSize: "18px",
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                onSubmit();
              }
            }}
          />
          <IconButton sx={{ color: "white", flexShrink: 0 }}>
            <IoMdSend onClick={onSubmit} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
