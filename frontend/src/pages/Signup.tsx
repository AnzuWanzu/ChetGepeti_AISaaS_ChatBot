import { Box, Button, Typography } from "@mui/material";
import CustomizedInput from "../components/shared/CustomizedInput";
import { IoIosLogIn } from "react-icons/io";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext.tsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../components/shared/FormAnimations.css";
import "./Signup.css";

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
    <Box className="signup-page">
      <Box
        className="signup-image-container"
        display={{ md: "flex", sm: "none", xs: "none" }}
      >
        <img src="Chet_Signin.png" alt="ChetWelcome" className="signup-image" />
      </Box>
      <Box className="signup-form-container" flex={{ xs: 1, md: 0.6 }}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          className="signup-form-content"
        >
          <Box className="signup-form-inner">
            <Typography className="signup-title">Sign Up</Typography>
            <CustomizedInput type="text" name="name" label="Name" />
            <CustomizedInput type="email" name="email" label="Email" />
            <CustomizedInput type="password" name="password" label="Password" />
            <Button
              variant="contained"
              type="submit"
              className="signup-button"
              endIcon={<IoIosLogIn />}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Signup;
