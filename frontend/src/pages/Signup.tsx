import { Box, Button, Typography } from "@mui/material";
import CustomizedInput from "../components/shared/CustomizedInput";
import { IoIosLogIn } from "react-icons/io";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext.tsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      toast.loading("Signing Up", { id: "signup" });
      await auth?.signup(name, email, password);
      toast.success("Signed In Successfully", { id: "signup" });
    } catch (error) {
      console.log(error);
      toast.error("Signing In Failed", { id: "signup" });
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
          src="Chet_Signin.png"
          alt="ChetWelcome"
          style={{ width: "350px", maxWidth: "100%" }}
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
            padding: "50px",
            background: "#1f3025ff",
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
              Sign Up
            </Typography>
            <CustomizedInput type="text" name="name" label="Name" />
            <CustomizedInput type="email" name="email" label="Email" />
            <CustomizedInput type="password" name="password" label="Password" />
            <Button
              variant="contained"
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
                bgcolor: "#3c644dff",
                ":hover": {
                  bgcolor: "#4e8069ff",
                  color: "white",
                },
              }}
              endIcon={<IoIosLogIn />}
            >
              Sign In
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Signup;
