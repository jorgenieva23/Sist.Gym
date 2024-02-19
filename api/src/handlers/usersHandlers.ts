import { Request, Response } from "express";
import {
  getAllUser,
  searchUserByName,
  createdUser,
  getUserById,
  upDateUserControllers,
  deleteByIdControllers,
} from "../controllers/usersControllers";
import Users from "../models/user";
import { IUser } from "../utils/types";
import { Roles } from "../models/rol";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import States from "../models/state";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;

export const getUserHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name } = req.query;
    const result: any = name
      ? await searchUserByName(name as string)
      : await getAllUser();
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ error });
  }
};

export const getUserId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const response = await getUserById(id);
    res.status(200).send(response);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const upDateUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const dataToUpdate = req.body;
    const updatedUser = await upDateUserControllers(id, dataToUpdate);
    res.status(200).json(updatedUser);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const postUserHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      email,
      password,
      rol: roleNames,
      stateId: stateName,
      creatorId: creatorName,
    } = req.body as IUser;
    const [role, state, admin] = await Promise.all([
      Roles.findOne({ name: { $in: roleNames } }),
      States.findOne({ name: { $in: stateName } }),
      Users.findOne({ email: { $in: creatorName } }),
    ]);
    if (await Users.findOne({ email })) {
      throw new Error("ya existe un usuario con el mismo mail");
    }
    const countUser = await Users.count({ creatorId: admin?.email });
    if (admin?.rol === "admin" && countUser >= 5) {
      res.status(400).json("has 5 users to his name");
    }
    const hashedPassword = await bcrypt.hash(password, 5);
    const user: IUser = {
      ...req.body,
      password: hashedPassword,
      rol: role?.name || null,
      stateId: state?.name || null,
      creatorId: admin?.email || null,
    };
    const createUsers = await createdUser(user);
    res.status(200).json(createUsers);
  } catch (error: any) {
    res.status(400).json(error.message);
  }
};

export const deleteUsers = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const users = await Users.findById(id);
    const deleteUser = await deleteByIdControllers(id);
    if (!users) {
      return res.status(400).json({ message: "ID invalidate" });
    }
    return res.status(200).json(deleteUser);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error");
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }
    const accessToken = jwt.sign({ userId: user._id }, JWT_SECRET_KEY, {
      expiresIn: "3h",
    });
    const refreshToken = jwt.sign({ userId: user._id }, JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    user.token = accessToken;
    user.active = true;
    await user.save();
    res.status(200).json({ accessToken, refreshToken, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  const { userId } = req.body;
  try {
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(400).json({ error: "Invalid user ID" });
    }
    user.token = "";
    await user.save();
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
      userId: string;
    };
    const user = await Users.findById(decoded.userId);
    // If user doesn't exist, return error
    if (!user) {
      return res.status(400).json({ error: "Invalid refresh token" });
    }
    const accessToken = jwt.sign({ userId: user._id }, JWT_SECRET_KEY, {
      expiresIn: "3h",
    });
    res.status(200).json({ accessToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};
