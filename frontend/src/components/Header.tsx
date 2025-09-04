import { AppBar, Toolbar } from "@mui/material";
import Logo from "./shared/Logo.tsx";
import { useAuth } from "../context/AuthContext.tsx";
import NavigationLink from "./shared/NavigationLink.tsx";

const Header = () => {
  const auth = useAuth();
  return (
    <AppBar
      sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}
    >
      <Toolbar sx={{ display: "flex" }}>
        <Logo />
        <div>
          {auth?.isLoggedIn ? (
            <>
              <NavigationLink
                bg="#4B737B"
                to="/chat"
                text="Go to Chat"
                textColor="white"
              />
              <NavigationLink
                bg="#51538f"
                textColor="white"
                to="/"
                text="Logout"
                onClick={auth.logout}
              />
            </>
          ) : (
            <>
              <NavigationLink
                bg="#4c627bff"
                to="/login"
                text="Login"
                textColor="white"
              />
              <NavigationLink
                bg="#4C7B5E"
                textColor="white"
                to="/signup"
                text="Signup"
              />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
