import { Response, Request } from "express";
import jwt from "jsonwebtoken";
import { IUser } from "../utils/types";
import Users from "../models/users";
import { Roles } from "../models/roles";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;

export const getAllUser = async () => {
  try {
    const user = await Users.find();
    return user;
  } catch (error: any) {
    throw new Error("Error when searching for user in the database");
  }
};

export const searchUserByName = async (name: any) => {
  try {
    const infoDB = await Users.find(name).exec();
    if (infoDB === null) {
      console.log(`No user ID found ${name}`);
    }
    return infoDB;
  } catch (error: any) {
    console.log(error);
    throw new Error(`Failed to find user with ID ${name}`);
  }
};
// corregir***
// export const createdUser = async (user: IUser) => {
//   const {
//     name,
//     email,
//     emailVerifiedAt,
//     password,
//     deleted,
//     stateId,
//     creatorId,
//     lastConnectoin,
//     partners,
//     rol,
//     active,
//   } = user;
//   return await Users.create({
//     name,
//     email,
//     emailVerifiedAt,
//     password,
//     deleted,
//     stateId,
//     creatorId,
//     lastConnectoin,
//     partners,
//     rol,
//     active,
//   });
// };

export const createdUser = async (user: IUser): Promise<IUser> => {
  try {
    const {
      name,
      email,
      emailVerifiedAt,
      password,
      deleted,
      stateId,
      creatorId,
      lastConnectoin,
      partners,
      active,
      rol: roleNames,
    } = user;
    const roles = await Roles.find({name: {$in:roleNames}})
    if(roles.length !== roleNames.length){
      throw new Error(`Failed to find`)
    }
    // user.rol = roles.map((role)=> role._id) agrega el id del rol pero se tiene que modificar el modelo (type: Schema.Types.ObjectId por type: Schema.Types.String) y el type (Types.ObjectId[] por String[])
    const rolNameFound = roles.map(role => role.name)
    user.rol = rolNameFound
    const createUser = await Users.create(user)
    return createUser.toJSON() as IUser
  } catch (error) {
    console.log(error);
    throw new Error(`Ocurrió un error al crear el usuario: ${error}`);
  }
};

export const upDateUserControllers = async (
  id: any,
  updatedData: Partial<IUser>
) => {
  try {
    const user = await Users.findById(id);
    if (!user) {
      console.log(`No se encontró ningún usuario con ID ${id}`);
      return null;
    }
    const { name, email } = updatedData;

    if (email) {
      const existingUserByEmail = await Users.findOne({ email });
      if (existingUserByEmail && existingUserByEmail._id != id) {
        throw new Error("Ya existe un usuario con el mismo email");
      }
    }
    if (name) {
      const existingUserByName = await Users.findOne({ name });
      if (existingUserByName && existingUserByName._id != id) {
        throw new Error("Ya existe un usuario con el mismo nickname");
      }
    }
    const updatedUser = await Users.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    return updatedUser;
  } catch (error: any) {
    throw new Error(
      `Ocurrió un error al actualizar el usuario: ${error.message}`
    );
  }
};

export const deleteById = async (id: any) => {
  try {
    const infoDB = await Users.findByIdAndDelete(id);
    if (!infoDB) {
      console.log(`No se encontró ningún users con ID ${id}`);
    }
    return infoDB;
  } catch (error) {
    throw new Error(`Ocurrió un error al eliminar usuario: ${error}`);
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
