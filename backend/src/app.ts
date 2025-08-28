import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/appRoutes.js";
import cookieParser from "cookie-parser";

config();
const app = express();

//middleware
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

//note: Remove this in production || only use in development
app.use(morgan("dev"));

app.use("/api/v1", appRouter);

export default app;
