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
    const result: any = name ? await searchUserByName(name) : getAllUser;
    res.status(200).json(result);
  } catch (error: any) {
    console.log("possible mistake");
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

// export const postUser = async (
//   req: Request,
//   res: Response,
//   user: IUser
// ): Promise<void> => {
//   let {
//     name,
//     email,
//     emailVerifiedAt,
//     password,
//     deleted,
//     estateId,
//     creatorId,
//     partners,
//     rol,
//     active,
//   } = user;
//   try {
//     if (!name || !email || !password || !rol) {
//       res.status(400).send("Mandatory data missing");
//       return;
//     }
//     let noRepeat = await Users.findOne({
//       where: {
//         email: email,
//       },
//     });
//     if (noRepeat) {
//       res.status(400).send(`There is already a ${email} user registered`);
//       return;
//     }
//     const newUser = await Users.create({
//       name,
//       email,
//       emailVerifiedAt,
//       password,
//       deleted,
//       estateId,
//       creatorId,
//       partners,
//       rol,
//       active,
//     });
//     const roles = await Roles.find({
//       name: { $in: name },
//     });

//     newUser.roles = roles;

//     res.status(200).send(newUser);
//     res.status(200).send(newUser);
//   } catch (error) {
//     console.log(error);
//     res.status(400).send("Internal server error");
//   }
// };

export const postUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = req.body as IUser;
    const createdUsers = await createdUser(user);
    res.status(200).json(createdUsers);
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
