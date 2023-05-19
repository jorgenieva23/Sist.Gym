import { Response, Request } from "express";
import jwt from "jsonwebtoken";
import { IUser } from "../utils/types";
import Users from "../models/users";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;

export const getUser = async () => {
  try {
    const user = await Users.find();
    return user;
  } catch (error: any) {
    throw new Error("Error when searching for user in the database");
  }
};

export const getUserById = async (id: any) => {
  try {
    const infoDB = await Users.findById(id).exec();
    if (infoDB === null) {
      console.log(`No user ID found ${id}`);
    }
    return infoDB;
  } catch (error: any) {
    console.log(error);
    throw new Error(`Failed to find user with ID ${id}`);
  }
};

export const createdUser = async (user: IUser) => {
  try {
    const {
      name,
      email,
      emailVerifiedAt,
      password,
      deleted,
      estateId,
      creatorId,
    } = user;

      const existingUserByEmail = await Users.findOne({ email });
      if (existingUserByEmail) {
        throw new Error("Ya existe un usuario con el mismo email");
      }
      const userWithTokens = {
        ...user, 
        token: '',
        refreshToken: '',
      };
      const createdUser = await Users.create(userWithTokens);
  
      const accessToken = jwt.sign({ userId: createdUser.id }, JWT_SECRET_KEY, {
        expiresIn: "3h",
      });
      const refreshToken = jwt.sign({ userId: createdUser.id }, JWT_SECRET_KEY, {
        expiresIn: "7d",
      });
  
      await Users.findByIdAndUpdate(createdUser._id, { refreshToken });
  
      return {
        ...createdUser.toJSON(),
        token: accessToken,
        refreshToken: refreshToken,
      } as IUser;
    } catch (error: any) {
      throw new Error(`Ocurrió un error al crear el usuario: ${error.message}`);
    }
  };