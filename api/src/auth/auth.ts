import { Request, Response } from "express";
import { IAuthRequest } from "../utils/types";
import Movement from "../models/movement";
import Users from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createAccessToken, createRefreshToken } from "../utils/jwt";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User incorrect" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ error: "password incorrect" });
    }
    const accessToken = createAccessToken(user);
    user.token = accessToken;
    user.active = true;

    // res.cookie("token", accessToken, {
    //   httpOnly: process.env.NODE_ENV !== "development",
    //   secure: true,
    //   sameSite: "none",
    // });
    await Movement.create({
      movementType: "LOGIN_USER",
      creatorId: user?.name,
      ip: req.ip,
      rolUser: user?.rol,
    });

    await user.save();
    res.status(200).json({ accessToken, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await Users.findById(id);
    if (!user) {
      return res.status(400).json({ error: "Invalid user ID" });
    }
    user.token = "";
    // res.cookie("token", "", { expires: new Date(0) });
    await user.save();
    res.cookie("token", "", {
      httpOnly: true,
      secure: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const refreshAccessToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  try {
    const decoded = jwt.verify(refreshToken, JWT_SECRET_KEY) as {
      user_id: string;
    };
    const user = await Users.findById(decoded.user_id);
    if (!user) {
      return res.status(400).json({ error: "Invalid refresh token" });
    }
    const accessToken = createAccessToken(user);
    res.status(200).json({ accessToken });
  } catch (error) {
    console.log(error, "error handler");
    res.status(500).json({ error: "Server error" });
  }
};

export const profile = async (req: IAuthRequest, res: Response) => {
  console.log(req.user, "req.user");
  res.send("profile");
};

// export const refreshAccessToken = async (req: Request, res: Response) => {
//   try {
//     const { refreshToken } = req.body;

//     const token = validateToken(req.headers);

//     const decoded = jwt.verify(refreshToken, JWT_SECRET_KEY) as {
//       userId: string;
//     };
//     const user = await Users.findById(decoded.userId);
//     if (!user) {
//       return res.status(401).json({ error: "Invalid refresh token" });
//     }
//     if (user.token !== token) {
//       return res.status(401).json({ error: "Invalid access token" });
//     }

//     const accessToken = createAccessToken(user);

//     res.status(200).json({ accessToken });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server error" });
//   }
// };

// function validateToken(headers: any) {
//   if (headers.authorization) {
//     const parted = headers.authorization.split(" ");
//     if (parted.length === 2) {
//       return parted[1];
//     } else {
//       return null;
//     }
//   } else {
//     return null;
//   }
// }
