import { Box, Button, Typography } from "@mui/material";
import CustomizedInput from "../components/shared/CustomizedInput";
import { IoIosLogIn } from "react-icons/io";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext.tsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../components/shared/FormAnimations.css";
import "../components/shared/FormAnimations.css";

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
      display="flex"
      justifyContent="center"
      alignItems="center"
      className="signup-page"
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
        padding={0}
        display={{ md: "flex", sm: "none", xs: "none" }}
        justifyContent="center"
        alignItems="center"
        flex={0.4}
        className="image-container"
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
        sx={{
          width: "100%",
          maxWidth: { xs: "100%", sm: "430px", md: "530px", lg: "580px" },
          height: "100%",
        }}
        className="form-container"
      >
        <Box
          marginTop={-10}
          component="form"
          onSubmit={handleSubmit}
          className="form-content"
          sx={{
            background: "#1f3025ff",
            boxShadow: "6px 6px 12px rgba(0,0,0,0.4)",
            borderRadius: "10px",
            border: "none",
            width: "100%",
            maxWidth: { xs: "330px", sm: "380px", md: "460px", lg: "500px" },
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
              gap: { xs: "4px", sm: "6px", md: "8px", lg: "10px" },
              padding: {
                xs: "10px 12px",
                sm: "12px 14px",
                md: "14px 16px",
                lg: "16px 18px",
              },
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "18px", sm: "24px", md: "30px", lg: "35px" },
                textAlign: "center",
                marginBottom: { xs: "0px", sm: "0px", md: "2px", lg: "2px" },
                fontWeight: 700,
                color: "white",
              }}
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
                px: { xs: 1.5, sm: 2, md: 2.5, lg: 3 },
                py: { xs: "4px", sm: "6px", md: "8px", lg: "10px" },
                mt: { xs: "4px", sm: "6px", md: "8px", lg: "8px" },
                width: "100%",
                height: { xs: "34px", sm: "38px", md: "42px", lg: "46px" },
                borderRadius: { xs: 1, sm: 1.5, md: 2, lg: 2.5 },
                fontSize: { xs: "13px", sm: "14px", md: "15px", lg: "16px" },
                fontWeight: 600,
                bgcolor: "#3c644dff",
                ":hover": {
                  bgcolor: "#4e8069ff",
                  color: "white",
                },
              }}
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
