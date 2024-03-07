import { Request, Response } from "express";
import {
  getAllUser,
  searchUserByName,
  createdUser,
  getUserById,
  upDateUserControllers,
  deleteUser,
} from "../controllers/usersControllers";
import Movement from "../models/movement";
import Users from "../models/user";
import { IUser } from "../utils/types";
import Roles from "../models/rol";
import bcrypt from "bcrypt";
import States from "../models/state";

export const getUserHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name } = req.query;
    const result = name
      ? await searchUserByName(name as string)
      : await getAllUser();
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ error });
  }
};

export const getUserId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { _id } = req.params;
    const response = await getUserById(_id);
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
    const { _id } = req.params;
    const dataToUpdate = req.body;
    const updatedUser = await upDateUserControllers(_id, dataToUpdate);
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
    await Movement.create({
      movementType: "CREAR_USER",
      creatorId: admin?.email,
      ip: req.ip,
    });
    const createUsers = await createdUser(user);
    res.status(200).json(createUsers);
  } catch (error: any) {
    res.status(400).json(error.message);
  }
};

export const deleteUserHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    let result: any = id ? await deleteUser(id, req) : await Users.deleteMany();
    if (!result) {
      console.log(`No income found`);
      res.status(404).json({ error: `No partner found` });
    }
    res.status(200).json({ message: "partner successfully removed" });
  } catch (error) {
    res.status(500).json({ error: `Error deleting partner ${id}` });
  }
};
