import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { configureAI } from "../config/ai-config.js";

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
    const chats = user.chats.map(({ role, content }) => ({
      role: role as "user" | "assistant" | "system",
      content,
    }));
    chats.push({ content: message, role: "user" });
    user.chats.push({ content: message, role: "user" });

    // send all chats with new one to Groq API (OpenAI compatible)
    const openai = configureAI();
    const chatResponse = await openai.chat.completions.create({
      model: "llama3-8b-8192",
      messages: chats,
    });

    // get latest response
    const assistantMessage = chatResponse.choices[0]?.message?.content;
    user.chats.push({ content: assistantMessage, role: "assistant" });
    await user.save();
    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
