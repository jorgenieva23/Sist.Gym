import { Request } from "express";
import { IUser } from "../utils/types";
import Users from "../models/user";
import Movement from "../models/movement";
import Partner from "../models/partner";
import dotenv from "dotenv";
dotenv.config();

export const getAllUser = async () => {
  try {
    const users = await Users.find();
    for (const user of users) {
      const partners = await Partner.find({ userId: user.name });
      const partnerName = partners.map((partner) => partner.firstName);
      user.partners = partnerName;
    }
    return users;
  } catch (error: any) {
    throw new Error("Error when searching for users in the database");
  }
};

export async function getUserById(id: any) {
  try {
    let user = await Users.findOne({ id });
    if (!user) user = await Users.findOne({ id });
    if (!user) return { error: true };
    return user;
  } catch (error: any) {
    console.error("ERROR getUserById controller: ", error.message);
    return { error: true };
  }
}

export const searchUserByName = async (name: string) => {
  try {
    const users = await Users.find({ name: name as string }).exec();
    for (const user of users) {
      const partners = await Partner.find({ userId: user.name });
      const partnerName = partners.map((partner) => partner.firstName);
      user.partners = partnerName;
    }
    return users;
  } catch (error: any) {
    console.log(error);
    throw new Error(`Failed to find users with name: ${name}`);
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
      stateId: stateName,
      creatorId: creatorName,
      lastConnection,
      partners: partnerName,
      rol: roleNames,
      active,
    } = user;
    return await Users.create({
      name,
      email,
      emailVerifiedAt,
      password,
      deleted,
      stateId: stateName,
      creatorId: creatorName,
      lastConnection,
      partners: partnerName,
      rol: roleNames,
      active,
    });
  } catch (error) {
    console.error("ERROR createdUser controllers controller: ", error);
    throw error;
  }
};

export const upDateUserControllers = async (
  _id: any,
  updatedData: Partial<IUser>
) => {
  try {
    const user = await Users.findById(_id);
    if (!user) {
      console.log(`No se encontró ningún usuario con ID ${_id}`);
      return null;
    }
    const { name, email } = updatedData;

    if (name) {
      const existingUserByName = await Users.findOne({ name });
      if (existingUserByName && existingUserByName._id != _id) {
        throw new Error("Ya existe un usuario con el mismo nickname");
      }
    }
    if (email) {
      const existingUserByEmail = await Users.findOne({ email });
      if (existingUserByEmail && existingUserByEmail._id != _id) {
        throw new Error("Ya existe un usuario con el mismo email");
      }
    }
    const updatedUser = await Users.findByIdAndUpdate(
      _id,
      { $set: updatedData },
      { new: true }
    );
    return updatedUser;
  } catch (error: any) {
    throw new Error(
      `Ocurrió un error al actualizar el usuario: ${error.message}`
    );
  }
};

export const deleteUser = async (id: any, req: Request) => {
  try {
    const user = await Users.findByIdAndDelete(id);
    if (!user) {
      console.log(`No user found with ID: ${id}`);
    }
    console.log(`user successfully removed: ${id} ${user} `);

    await Movement.create({
      movementType: "DELETE_USER",
      creatorId: user?.creatorId,
      ip: req.ip,
    });

    return user;
  } catch (error) {
    console.error(`Error deleting user ${id}: ${error}`);
  }
};
