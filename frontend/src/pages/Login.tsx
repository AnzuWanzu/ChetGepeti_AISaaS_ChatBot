import { Box, Button, Typography } from "@mui/material";
import CustomizedInput from "../components/shared/CustomizedInput";
import { IoIosLogIn } from "react-icons/io";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext.tsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../components/shared/FormAnimations.css";
import "../components/shared/FormAnimations.css";

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
      display="flex"
      flex={1}
      justifyContent="center"
      alignItems="center"
      className="login-page"
      sx={{
        padding: 0,
        margin: 0,
        overflow: "hidden",
        position: "relative",
        height: "100%",
        minHeight: "80vh",
      }}
    >
      <Box
        marginTop={-5}
        padding={0}
        display={{ md: "flex", sm: "none", xs: "none" }}
        justifyContent="center"
        alignItems="center"
        flex={0.4}
        className="image-container"
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
        sx={{
          width: "100%",
          maxWidth: { xs: "100%", sm: "450px", md: "550px", lg: "600px" },
          height: "100%",
        }}
        className="form-container"
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          className="form-content"
          sx={{
            background: "#202934ff",
            boxShadow: "6px 6px 12px rgba(0,0,0,0.4)",
            borderRadius: "10px",
            border: "none",
            width: "100%",
            maxWidth: { xs: "340px", sm: "400px", md: "480px", lg: "520px" },
            maxHeight: "100vh",
            overflow: "auto",
            margin: 0,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: { xs: "6px", sm: "8px", md: "10px", lg: "12px" },
              padding: {
                xs: "12px 14px",
                sm: "14px 16px",
                md: "16px 18px",
                lg: "18px 20px",
              },
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "18px", sm: "24px", md: "30px", lg: "35px" },
                textAlign: "center",
                marginBottom: { xs: "0px", sm: "2px", md: "4px", lg: "6px" },
                fontWeight: 700,
                color: "white",
              }}
            >
              Login
            </Typography>
            <CustomizedInput type="email" name="email" label="Email" />
            <CustomizedInput type="password" name="password" label="Password" />
            <Button
              variant="contained"
              type="submit"
              sx={{
                px: { xs: 1.5, sm: 2, md: 2.5, lg: 3 },
                py: { xs: "6px", sm: "8px", md: "10px", lg: "12px" },
                mt: { xs: "8px", sm: "10px", md: "12px", lg: "14px" },
                width: "100%",
                height: { xs: "38px", sm: "42px", md: "46px", lg: "50px" },
                borderRadius: { xs: 1, sm: 1.5, md: 2, lg: 2.5 },
                fontSize: { xs: "14px", sm: "15px", md: "16px", lg: "17px" },
                fontWeight: 600,
                bgcolor: "#4c627bff",
                ":hover": {
                  bgcolor: "#5f7ea1ff",
                  color: "white",
                },
              }}
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
