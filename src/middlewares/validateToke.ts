import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Extiende la interfaz Request para incluir la propiedad user
declare global {
  namespace Express {
    interface Request {
      user?: string;
    }
  }
}

//Valida el token de acceso para autenticar al usuario.
export const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.cookies["access-token"];
    if (!accessToken)
      return res.status(401).json({ message: "User not Authenticated" });
    jwt.verify(
      accessToken,
      process.env.JWT_SECRET || "secret",
      undefined,
      (err: any, user: string | JwtPayload | undefined) => {
        if (err)
          return res.status(401).json({ message: "User not Authenticated" });
        if (typeof user === "object" && user !== null) {
          req.user = user.id;
        }
        next();
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
