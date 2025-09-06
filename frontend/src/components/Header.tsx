import { AppBar, Toolbar, Box } from "@mui/material";
import Logo from "./shared/Logo.tsx";
import { useAuth } from "../context/AuthContext.tsx";
import NavigationLink from "./shared/NavigationLink.tsx";
import { useState } from "react";
import { useResponsiveStyles } from "../hooks/useResponsive.js";

const Header = () => {
  const auth = useAuth();
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const responsiveStyles = useResponsiveStyles();

  return (
    <AppBar
      sx={{
        bgcolor: "transparent",
        position: "static",
        boxShadow: "none",
        height: "auto",
        minHeight: "auto",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: { xs: 0.5, sm: 1, md: 1.5 },
          py: { xs: 0.125, sm: 0.25, md: 0.5 },
          minHeight: { xs: "36px", sm: "38px", md: "42px" },
          height: { xs: "36px", sm: "38px", md: "42px" },
          margin: 2,
        }}
      >
        <Logo />
        <Box
          sx={{
            display: "flex",
            gap: responsiveStyles.elementMargin,
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "nowrap",
          }}
        >
          {auth?.isLoggedIn ? (
            <>
              <NavigationLink
                bg="#4B737B"
                to="/chat"
                text="Go to Chat"
                textColor="white"
                isActive={activeLink === "chat"}
                onToggle={() => setActiveLink("chat")}
              />
              <NavigationLink
                bg="#51538f"
                textColor="white"
                to="/"
                text="Logout"
                onClick={auth.logout}
                isActive={activeLink === "logout"}
                onToggle={() => setActiveLink("logout")}
              />
            </>
          ) : (
            <>
              <NavigationLink
                bg="#4c627bff"
                to="/login"
                text="Login"
                textColor="white"
                isActive={activeLink === "login"}
                onToggle={() => setActiveLink("login")}
              />
              <NavigationLink
                bg="#4C7B5E"
                textColor="white"
                to="/signup"
                text="Signup"
                isActive={activeLink === "signup"}
                onToggle={() => setActiveLink("signup")}
              />
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
