import { Avatar, Box, Button, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { IoMdTrash } from "react-icons/io";
import { useAuth } from "../../context/AuthContext";

interface ChatSidebarProps {
  onDeleteChats: () => void;
}

const ChatSidebar = ({ onDeleteChats }: ChatSidebarProps) => {
  const auth = useAuth();

  return (
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
          onClick={onDeleteChats}
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
  );
};

export default ChatSidebar;
