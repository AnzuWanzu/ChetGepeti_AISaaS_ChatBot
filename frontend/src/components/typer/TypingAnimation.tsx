import { TypeAnimation } from "react-type-animation";

const TypingAnimation = () => {
  return (
    <TypeAnimation
      sequence={["Chat with Chet Gepeti", 2000, "Built with love ❤️ ", 2000]}
      wrapper="span"
      speed={50}
      style={{
        fontSize: "70px",
        color: "white",
        display: "inline-block",
        textShadow: "1px 1px 20px #000",
      }}
      repeat={Infinity}
    />
  );
};

export default TypingAnimation;
