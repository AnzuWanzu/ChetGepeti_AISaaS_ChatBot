import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div
        style={{
          width: "100%",
          minHeight: "10vh",
          maxHeight: "10vh",
          marginTop: 20,
        }}
      >
        <p style={{ fontSize: "20px", textAlign: "center", padding: "20px" }}>
          Made by :
          <span>
            <Link
              style={{ color: "white" }}
              className="nav-link"
              to={"https://github.com/AnzuWanzu"}
            >
              @AnzuWanzu
            </Link>
          </span>
          💘
        </p>
      </div>
    </footer>
  );
};

export default Footer;
