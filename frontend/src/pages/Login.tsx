import { Box, Button, Typography } from "@mui/material";
import CustomizedInput from "../components/shared/CustomizedInput";
import { IoIosLogIn } from "react-icons/io";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext.tsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      toast.loading("Signing In", { id: "login" });
      await auth?.login(email, password);
      toast.success("Signed In Successfully", { id: "login" });
    } catch (error) {
      console.log(error);
      toast.error("Signing In Failed", { id: "login" });
    }
  };
  useEffect(() => {
    if (auth?.user) {
      navigate("/chat");
    }
  }, [auth]);

  return (
    <Box
      width={"100%"}
      height={"100%"}
      display="flex"
      flex={1}
      justifyContent="center"
      alignItems="center"
    >
      <Box
        padding={4}
        display={{ md: "flex", sm: "none", xs: "none" }}
        justifyContent="center"
        alignItems="center"
        flex={0.4}
      >
        <img
          src="Chet_Login.png"
          alt="ChetWelcome"
          style={{ width: "320px", maxWidth: "100%" }}
        ></img>
      </Box>
      <Box
        display={"flex"}
        flex={{ xs: 1, md: 0.6 }}
        justifyContent={"center"}
        alignItems={"center"}
        padding={2}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            margin: "auto",
            padding: "60px",
            background: "#202934ff",
            boxShadow: "10px 10px 20px #000",
            borderRadius: "15px",
            border: "none",
            minWidth: "480px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <Typography
              variant="h3"
              textAlign="center"
              padding={3}
              fontWeight={600}
            >
              Login
            </Typography>
            <CustomizedInput type="email" name="email" label="Email" />
            <CustomizedInput type="password" name="password" label="Password" />
            <Button
              type="submit"
              sx={{
                px: 3,
                py: 2,
                mt: 3,
                width: "500px",
                height: "56px",
                borderRadius: 3,
                fontSize: "18px",
                fontWeight: 600,
                bgcolor: "#4c627bff",
                ":hover": {
                  bgcolor: "#5e7a9aff",
                  color: "black",
                },
              }}
              endIcon={<IoIosLogIn />}
            >
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
