import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div
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
        />
      </Link>
      <Typography
        sx={{
          display: { md: "block", sm: "none", xs: "none" },
          mr: "auto",
          fontWeight: "800",
          textShadow: "2px 2px 20px #000",
        }}
      >
        <span style={{ fontSize: "30px" }}>Chet </span>- GEPETI
      </Typography>
    </div>
  );
};
export default Logo;
