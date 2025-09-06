import { Box, Button, Typography } from "@mui/material";
import CustomizedInput from "../components/shared/CustomizedInput";
import { IoIosLogIn } from "react-icons/io";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext.tsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../components/shared/FormAnimations.css";
import "./Login.css";

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
    <Box className="login-page">
      <Box
        className="login-image-container"
        display={{ md: "flex", sm: "none", xs: "none" }}
      >
        <img src="Chet_Login.png" alt="ChetWelcome" className="login-image" />
      </Box>
      <Box className="login-form-container" flex={{ xs: 1, md: 0.6 }}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          className="login-form-content"
        >
          <Box className="login-form-inner">
            <Typography className="login-title">Login</Typography>
            <CustomizedInput type="email" name="email" label="Email" />
            <CustomizedInput type="password" name="password" label="Password" />
            <Button
              variant="contained"
              type="submit"
              className="login-button"
              endIcon={<IoIosLogIn />}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
