import { AppBar, Toolbar, Box, useTheme, useMediaQuery } from "@mui/material";
import Logo from "./shared/Logo.tsx";
import { useAuth } from "../context/AuthContext.tsx";
import NavigationLink from "./shared/NavigationLink.tsx";
import { useState } from "react";

const Header = () => {
  const auth = useAuth();
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar
      sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: { xs: 1, sm: 2, md: 3 },
          py: { xs: 0.5, sm: 1 },
        }}
      >
        <Logo />
        <Box
          sx={{
            display: "flex",
            gap: isMobile ? 0.5 : isTablet ? 1 : 1.5,
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
                isMobile={isMobile}
                isTablet={isTablet}
              />
              <NavigationLink
                bg="#51538f"
                textColor="white"
                to="/"
                text="Logout"
                onClick={auth.logout}
                isActive={activeLink === "logout"}
                onToggle={() => setActiveLink("logout")}
                isMobile={isMobile}
                isTablet={isTablet}
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
                isMobile={isMobile}
                isTablet={isTablet}
              />
              <NavigationLink
                bg="#4C7B5E"
                textColor="white"
                to="/signup"
                text="Signup"
                isActive={activeLink === "signup"}
                onToggle={() => setActiveLink("signup")}
                isMobile={isMobile}
                isTablet={isTablet}
              />
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
