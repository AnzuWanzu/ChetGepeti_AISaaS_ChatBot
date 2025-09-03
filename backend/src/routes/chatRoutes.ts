import { Router } from "express";
import { verifyToken } from "../utils/tokenManager.js";
import { chatCompletionValidator, validate } from "../utils/validators.js";
import {
  deleteChats,
  generateChatCompletion,
  sendChatRequest,
} from "../controllers/chatControllers.js";

//protected api
const chatRoutes = Router();

chatRoutes.post(
  "/new",
  validate(chatCompletionValidator),
  verifyToken,
  generateChatCompletion
);

chatRoutes.get("/all-chats", verifyToken, sendChatRequest);

chatRoutes.delete("/delete", verifyToken, deleteChats);

export default chatRoutes;
