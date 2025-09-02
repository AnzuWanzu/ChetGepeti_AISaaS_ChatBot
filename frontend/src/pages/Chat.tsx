import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { red } from "@mui/material/colors";
import type { ChatMessage } from "../types/chat";
import ChatItem from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io";

const Chat = () => {
  const auth = useAuth();
  const staticChats: ChatMessage[] = [
    {
      role: "user",
      content: "Hello! Can you tell me about yourself?",
    },
    {
      role: "assistant",
      content:
        "Hello! I'm Chet Gepeti, an AI assistant based on a character from Divinity Original Sin 2. I'm here to help you with questions, especially about fantasy topics, gaming, and general conversation. How can I assist you today?",
    },
    {
      role: "user",
      content: "What's your favorite spell in Divinity Original Sin 2?",
    },
    {
      role: "assistant",
      content:
        "As a character from Divinity Original Sin 2, I'm quite fond of Teleportation spells! They're incredibly versatile - you can use them tactically in combat to reposition enemies or allies, solve puzzles by moving objects, or simply get out of tough situations. The Source spells are also fascinating, though they require more power to cast.",
    },
    {
      role: "user",
      content: "Can you help me with coding questions too?",
    },
    {
      role: "assistant",
      content:
        "Absolutely! While my character comes from a fantasy world, I can definitely help with coding questions, web development, JavaScript, React, Node.js, and many other programming topics. Feel free to ask me anything - whether it's about fantasy lore or writing code!",
    },
    {
      role: "user",
      content: "What's the best way to learn React?",
    },
    {
      role: "assistant",
      content:
        "Great question! I'd recommend starting with the official React documentation and building small projects. Begin with components, props, and state, then gradually move to hooks like useState and useEffect. Practice by building a todo app, weather app, or even a chat application like this one! The key is hands-on coding and understanding the component lifecycle.",
    },
    {
      role: "user",
      content: "Tell me about your adventures in Rivellon",
    },
    {
      role: "assistant",
      content:
        "Ah, Rivellon! What a magical and dangerous place. I've traveled across Fort Joy, explored the mysterious Reaper's Coast, and delved into the ancient secrets of the Nameless Isle. The Source magic flowing through that world is both a blessing and a curse. I've faced Magisters, demons, and even challenged the very gods themselves! Each journey taught me something new about magic, friendship, and the price of power.",
    },
  ];
  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 3,
        gap: 3,
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
            height: "60vh",
            bgcolor: "rgb(17,29,39)",
            borderRadius: 5,
            flexDirection: "column",
            mx: 3,
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "white",
              color: "black",
              fontWeight: 700,
            }}
          >
            {auth?.user?.name[0]}
            {auth?.user?.name.split(" ")[1][0]}
          </Avatar>
          <Typography sx={{ mx: "auto", fontFamily: "work sans" }}>
            You are talking to a ChatBot
          </Typography>
          <Typography sx={{ mx: "auto", fontFamily: "work sans", my: 4, p: 3 }}>
            You can ask Chet Gepeti a bunch of things, especially Fantasy. Chet
            Gepeti is my custom character in Divinity Original Sin 2.
          </Typography>
          <Button
            sx={{
              width: "200px",
              my: "auto",
              color: "white",
              fontWeight: "700",
              borderRadius: 3,
              mx: "auto",
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
          px: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: "40px",
            color: "white",
            mb: 2,
            mx: "auto",
            fontWeight: "600",
          }}
        >
          Model: llama3-8b-8192
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "60vh",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
          }}
        >
          {staticChats.map((chat, index) => (
            <ChatItem content={chat.content} role={chat.role} key={index} />
          ))}
        </Box>
        <div
          style={{
            width: "100%",
            padding: "20px",
            borderRadius: 8,
            backgroundColor: "rgb(17, 27,39)",
            display: "flex",
            margin: "auto",
          }}
        >
          {" "}
          <input
            type="text"
            style={{
              width: "100%",
              backgroundColor: "transparent",
              padding: "10px",
              border: "none",
              outline: "none",
              color: "white",
              fontSize: "20px",
            }}
          />
          <IconButton sx={{ ml: "auto", color: "white" }}>
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};

export default Chat;
