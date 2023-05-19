import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IPartner } from "../utils/types";
import dotenv from "dotenv";
import Partner from "../models/partner";
dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;

export const getPartner = async () => {
  try {
    const partner = await Partner.find();
    return partner;
  } catch (error) {
    throw new Error("Error when searching for partner in the database");
  }
};

export const getPartnerById = async (id: any) => {
  try {
    const infoDB = await Partner.findById(id).exec();
    if (infoDB === null) {
      console.log(`No partner ID found ${id}`);
    }
    return infoDB;
  } catch (error) {
    console.log(error);
    throw new Error(`Failed to find user with ID ${id}`);
  }
};

export const createPartner = async (partner: IPartner): Promise<IPartner> => {
  try {
    const {firstName,lastName,dni,address,phone,email,picture} = partner;

    if (!firstName ||!lastName ||!dni ||!address ||!phone ||!email ||!picture)
      throw new Error("Missing data required to create a partner");

    const existingPartnerByEmail = await Partner.findOne({ email });
    if (existingPartnerByEmail) {
      throw new Error("There is already a partner with the same email");
    }

    const createPartner = await Partner.create(partner);
    return createPartner.toJSON() as IPartner;
  } catch (error: any) {
    throw new Error(`Ocurrió un error al crear el usuario: ${error.message}`);
  }
};
