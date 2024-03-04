import { Request, Response, NextFunction } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";
import { IUser } from "../utils/types";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;

interface AuthRequest extends Request {
  user?: IUser;
}

export const authRequired = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  console.log(token);

  if (!token) {
    return res
      .status(401)
      .json({ message: "No se proporcionó ningún token, acceso denegado" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    req.user = decoded as IUser;
    console.log("pasaste por authResponse");

    next();
  } catch (err) {
    return res.status(403).json({ message: "Token inválido o expirado" });
  }
};
