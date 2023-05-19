import { Request, Response } from "express";
import { getUser, getUserById, createdUser } from "../controllers/usersControllers";
import { IUser } from "../utils/types";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;

export const getUserHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const response = await getUser();
    res.status(200).json(response);
  } catch (error: any) {
    console.log("possible mistake");
    res.status(400).json({ error });
  }
};
