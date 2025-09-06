import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IoHomeSharp, IoWarning } from "react-icons/io5";
import { keyframes } from "@emotion/react";

const floating = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
`;

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
        padding: 2,
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          animation: `${floating} 3s ease-in-out infinite`,
          mb: 1.5,
        }}
      >
        <img
          src="chet_gepeti.png"
          alt="Chet Gepeti Lost"
          style={{
            width: "70px",
            height: "70px",
            filter: "grayscale(50%) opacity(0.8)",
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 1.5,
          animation: `${pulse} 2s ease-in-out infinite`,
        }}
      >
        <IoWarning
          size={35}
          style={{
            color: "#4c627bff",
            filter: "drop-shadow(0 0 10px rgba(76, 98, 123, 0.5))",
          }}
        />
      </Box>

      <Typography
        sx={{
          fontSize: { xs: "42px", sm: "54px", md: "64px" },
          fontWeight: 900,
          color: "#4c627bff",
          fontFamily: "Roboto Slab",
          mb: 1,
          textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
        }}
      >
        404
      </Typography>

      <Typography
        sx={{
          fontSize: { xs: "18px", sm: "20px", md: "24px" },
          fontWeight: 600,
          color: "white",
          mb: 0.5,
          fontFamily: "Work Sans",
        }}
      >
        Page Not Found
      </Typography>

      {/* Description */}
      <Typography
        sx={{
          fontSize: { xs: "13px", sm: "14px", md: "16px" },
          color: "rgba(255, 255, 255, 0.7)",
          mb: 2.5,
          maxWidth: "450px",
          fontFamily: "Work Sans",
          lineHeight: 1.4,
        }}
      >
        Oops! Looks like Chet Gepeti couldn't find this page. It might have
        wandered off into the realm of Rivellon, or perhaps it never existed in
        the first place.
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 1.5,
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          onClick={handleGoHome}
          startIcon={<IoHomeSharp />}
          sx={{
            px: 2.5,
            py: 0.8,
            fontSize: "13px",
            fontWeight: 600,
            borderRadius: 2,
            bgcolor: "#4c627bff",
            color: "white",
            boxShadow: "0 4px 12px rgba(76, 98, 123, 0.3)",
            ":hover": {
              bgcolor: "#5f7ea1ff",
              transform: "translateY(-2px)",
              boxShadow: "0 6px 16px rgba(76, 98, 123, 0.4)",
            },
            transition: "all 0.3s ease",
          }}
        >
          Go Home
        </Button>

        <Button
          variant="outlined"
          onClick={handleGoBack}
          sx={{
            px: 2.5,
            py: 0.8,
            fontSize: "13px",
            fontWeight: 600,
            borderRadius: 2,
            color: "white",
            borderColor: "rgba(255, 255, 255, 0.3)",
            ":hover": {
              borderColor: "#4c627bff",
              bgcolor: "rgba(76, 98, 123, 0.1)",
              transform: "translateY(-2px)",
            },
            transition: "all 0.3s ease",
          }}
        >
          Go Back
        </Button>
      </Box>

      {/* Background Decoration */}
      <Box
        sx={{
          position: "absolute",
          top: "20%",
          left: "10%",
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          bgcolor: "rgba(76, 98, 123, 0.1)",
          animation: `${floating} 4s ease-in-out infinite`,
          zIndex: -1,
        }}
      />

      <Box
        sx={{
          position: "absolute",
          bottom: "20%",
          right: "15%",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          bgcolor: "rgba(76, 98, 123, 0.05)",
          animation: `${floating} 5s ease-in-out infinite reverse`,
          zIndex: -1,
        }}
      />
    </Box>
  );
};

export default NotFound;
