import { Request, Response } from "express";
import { getPartner, getPartnerById, createPartner } from "../controllers/partnerControllers";

import { IPartner } from "../utils/types";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;

export const getPartnerHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const response = await getPartner();
    res.status(200).json(response);
  } catch (error: any) {
    console.log("possible mistake");
    res.status(400).json({ error });
  }
};
