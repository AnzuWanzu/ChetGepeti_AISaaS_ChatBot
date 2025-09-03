import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { configureAI } from "../config/ai-config.js";
import {
  createAssistantMessage,
  createUserMessage,
  formatChatsForAPI,
} from "../utils/chatHelpers.js";
import { MODEL_VER } from "../utils/constants.js";

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { message } = req.body;
    const user = await User.findById(res.locals.jwtData.id);
    if (!user)
      return res
        .status(401)
        .json({ message: "User not registered OR Token malfunctioned" });

    // grab chats of user
    const chats = formatChatsForAPI(user.chats);
    const userMessage = createUserMessage(message);
    chats.push(userMessage);
    user.chats.push(userMessage);

    // send all chats with new one to Groq API (OpenAI compatible)
    const openai = configureAI();
    const chatResponse = await openai.chat.completions.create({
      model: MODEL_VER,
      messages: chats,
    });

    // get latest response
    const assistantMessage = chatResponse.choices[0]?.message?.content;
    user.chats.push(createAssistantMessage(assistantMessage));
    await user.save();
    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const sendChatRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not registered OR Token malfunctioned" });
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match.");
    }
    return res
      .status(200)
      .json({ message: "Chat history shown:", chats: user.chats });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not registered OR Token malfunctioned" });
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match.");
    }
    user.chats.splice(0, user.chats.length);
    await user.save();
    return res
      .status(200)
      .json({ message: "Chats deleted", chats: user.chats });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
