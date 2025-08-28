import { Request, Response, NextFunction } from "express";
import User from "../models/User.js";
import { hash, compare } from "bcrypt";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();
    return res
      .status(200)
      .json({ message: "Sucessfully retrieved users: ", users });
  } catch (error) {
    console.log("Error in getAllUsers function: ", error);
    return res.status(500).json({ message: "Error", cause: error.message });
  }
};

export const userSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(401).send("Email already registered.");

    const hashedPassword = await hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    return res.status(201).json({
      message: "Sucessfully signed up a user: ",
      id: user._id.toString(),
    });
  } catch (error) {
    console.log("Error in userSignup function: ", error);
    return res.status(500).json({ message: "Error", cause: error.message });
  }
};

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("User not registered");
    }
    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(403).send("Incorrect Password");
    }
    return res.status(201).json({
      message: "Sucessfully logged in a user: ",
      id: user._id.toString(),
    });
  } catch (error) {
    console.log("Error in userLogin function: ", error);
    return res.status(500).json({ message: "Error", cause: error.message });
  }
};
