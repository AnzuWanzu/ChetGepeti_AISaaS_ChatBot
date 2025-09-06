import { Box, useMediaQuery, useTheme } from "@mui/material";
import TypingAnimation from "../components/typer/TypingAnimation";
import Footer from "../components/footer/Footer";

const Home = () => {
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box
      width={"100%"}
      height={"100%"}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          mx: "auto",
          flex: 1,
          justifyContent: "center",
          maxWidth: "90%",
        }}
      >
        <Box>
          <TypingAnimation />
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: { md: "row", xs: "column", sm: "column" },
            gap: 5,
            my: 2,
          }}
        >
          <img
            className="image-inverted rotate"
            src="openai.png"
            alt="openai"
            style={{ width: "60px", margin: "auto" }}
          />
        </Box>
        <Box sx={{ display: "flex", mx: "auto" }}>
          <img
            src="previewChat.png"
            alt="chatbot"
            style={{
              display: "flex",
              margin: "auto",
              width: isBelowMd ? "50%" : "50%",
              borderRadius: 20,
              boxShadow: "-5px -5px 105px #4d86a7ff",
            }}
          />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Home;
