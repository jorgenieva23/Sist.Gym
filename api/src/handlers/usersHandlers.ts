import { Request, Response } from "express";
import {
  getAllUser,
  searchUserByName,
  createdUser,
  upDateUserControllers,
  deleteById,
  refreshAccessToken,
  loginUser,
  logoutUser,
} from "../controllers/usersControllers";
import { IUser } from "../utils/types";
import dotenv from "dotenv";
import Users from "../models/users";
import { Roles } from "../models/roles";
import bcrypt from "bcrypt";
dotenv.config();

export const getUserHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name } = req.query;
    const result: any = name
      ? await searchUserByName(name)
      : await getAllUser();
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ error });
  }
};

// export const getUserId = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const id = req.params.id;
//     const response = await getUserById(id);
//     res.status(200).send(response);
//   } catch (error: any) {
//     res.status(500).send(error.message);
//   }
// };

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

export const postUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = req.body as IUser;
    const { rol: roleNames } = user;
    const roles = await Roles.find({ name: { $in: roleNames } });
    const rolNameFound = roles.map((role) => role.name);
    rolNameFound.length > 0 ? user.rol = rolNameFound[0] : user.rol = null;
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
    const deleteCourse = await deleteById(id);
    if (!users) {
      return res.status(400).json({ message: "el ID es invalido" });
    }
    return res.status(200).json(deleteCourse);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error");
  }
};

export const handleLogin = async (req: Request, res: Response) => {
  try {
    await loginUser(req, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const handleLogout = async (req: Request, res: Response) => {
  try {
    await logoutUser(req, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const handleRefreshAccessToken = async (req: Request, res: Response) => {
  try {
    await refreshAccessToken(req, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};
