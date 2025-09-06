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
        gap: "10px",
        marginTop: "5px",
      }}
    >
      <Link to={"/"}>
        <img
          src="chet_gepeti.png"
          alt="chetgepeti"
          width={"50px"}
          height={"50px"}
          className="logo-image"
        />
      </Link>
      <Typography
        sx={{
          display: { md: "block", sm: "none", xs: "none" },
          mr: "auto",
          fontSize: "20px",
          letterSpacing: "0.8px",
        }}
      >
        <span className="logo-main-text">Chet Gepeti</span>
      </Typography>
    </div>
  );
};
export default Logo;
