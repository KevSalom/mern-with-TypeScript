import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt";

export const register = async (req: Request, res: Response) => {
  try {
    const passwordHash = await bcrypt.hash(req.body.password, 10);

    const { username, email } = req.body;
    const newUser = new User({ username, email, password: passwordHash });
    const savedUser = await newUser.save();

    const accessToken = await createAccessToken({ id: savedUser._id });
    res.cookie("access-token", accessToken);

    res.json({
      id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      createdAt: savedUser.createdAt,
      updatedAt: savedUser.updatedAt,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const passwordHash = await bcrypt.hash(req.body.password, 10);

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "Wrong Credentials" });

    const passwordMatch = await bcrypt.compare(req.body.password, passwordHash);

    if (!passwordMatch)
      return res.status(400).json({ message: "Wrong Credentials" });

    const accessToken = await createAccessToken({ id: user._id });
    res.cookie("access-token", accessToken);

    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("access-token");
    res.status(200).json({ message: "Logged out" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const profile = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user);
    if (!user) return res.status(400).json({ message: "User not found" });
    res.json({ id: user._id, username: user.username, email: user.email, createdAt: user.createdAt, updatedAt: user.updatedAt });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
