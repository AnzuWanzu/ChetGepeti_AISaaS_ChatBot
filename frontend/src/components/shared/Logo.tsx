import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./Logo.css";

const Logo = () => {
  return (
    <div
      className="logo-container"
      style={{
        display: "flex",
        marginRight: "auto",
        alignItems: "center",
        gap: "15px",
        marginTop: "10px",
      }}
    >
      <Link to={"/"}>
        <img
          src="chet_gepeti.png"
          alt="chetgepeti"
          width={"70px"}
          height={"70px"}
          className="logo-image"
        />
      </Link>
      <Typography
        sx={{
          display: { md: "block", sm: "none", xs: "none" },
          mr: "auto",
          fontSize: "24px",
          letterSpacing: "1px",
        }}
      >
        <span className="logo-main-text">Chet Gepeti</span>
      </Typography>
    </div>
  );
};
export default Logo;
