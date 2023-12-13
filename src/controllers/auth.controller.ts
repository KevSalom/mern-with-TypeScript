import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt";


export const login = (req: Request, res: Response) => {
  res.send("logged in!");
};

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
