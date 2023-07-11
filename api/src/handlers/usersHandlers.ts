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
import States from "../models/states";
import Partner from "../models/partner";
dotenv.config();

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
    const {
      rol: roleNames,
      stateId: stateName,
      creatorId: creatorName,
    } = req.body as IUser;
    const [role, state, admin] = await Promise.all([
      Roles.findOne({ name: { $in: roleNames } }),
      States.findOne({ name: { $in: stateName } }),
      Users.findOne({ name: { $in: creatorName } }),
    ]);
    const countUser = await Users.count({ creatorId: admin?.name });
    if (countUser >= 5) {
      res.status(400).json("has 5 users to his name");
    }
    const user: IUser = {
      ...req.body,
      rol: role ? role.name : null,
      stateId: state ? state.name : null,
      creatorId: admin ? admin.name : null,
    };
    const createUsers = await createdUser(user);
    res.status(200).json(createUsers);
  } catch (error: any) {
    res.status(400).json(error.message);
  }
};

// export const postUser = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const user = req.body as IUser;
//     const { rol: roleNames, stateId: stateName, creatorId: creatorName } = user;
//     // buscar y relaciona la tabla rol
//     const role = await Roles.findOne({ name: { $in: roleNames } });
//     user.rol = role ? role.name : null;
//     // busca y relaciona la tabla estados
//     const state = await States.findOne({ name: { $in: stateName } });
//     user.stateId = state ? state.name : null;
//     // busca y relaciona la tabla usuarios
//     const admin = await Users.findOne({ name: { $in: creatorName } });
//     const countUser = await Users.countDocuments({ creatorId: admin?.name });
//     // condiciona la cantidad de usuarios registrados
//     if (countUser >= 5) {
//       throw new Error("has 5 users to his name");
//     } else {
//       user.creatorId = admin ? admin.name : null;
//     }
//     const createUsers = await createdUser(user);
//     res.status(200).json(createUsers);
//   } catch (error: any) {
//     res.status(400).json(error.message);
//   }
// };

export const deleteUsers = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const users = await Users.findById(id);
    const deleteCourse = await deleteById(id);
    if (!users) {
      return res.status(400).json({ message: "ID invalidate" });
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
