import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/appRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

config();
const app = express();
const __dirname = path.resolve();
// CORS configuration - environment dependent
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}

//middleware
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

// Devlogging
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use("/api/v1", appRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/{*splat}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}
export default app;
