import { Request, Response } from "express";
import { IPartner } from "../utils/types";
import Partner from "../models/partner";

export const getAllPartner = async () => {
  try {
    const partner = await Partner.find();
    return partner;
  } catch (error: any) {
    throw new Error("Error when searching for user in the database");
  }
};

export const searchPartnerByName = async (name: any) => {
  try {
    const infoDB = await Partner.find({ name }).exec();
    if (infoDB === null) {
      console.log(`No Partner found with name: ${name}`);
    }
    return infoDB;
  } catch (err) {
    console.log(err);
    throw new Error(`Failed to find Partner with name: ${name}`);
  }
};

export const getPartnerById = async (_id: any) => {
  try {
    const infoDB = await Partner.findById(_id).exec();
    if (infoDB === null) {
      console.log(`No partner ID found ${_id}`);
    }
    return infoDB;
  } catch (error) {
    console.log(error);
    throw new Error(`Failed to find user with ID ${_id}`);
  }
};

export const createPartner = async (partner: IPartner) => {
  const {
    firstName,
    lastName,
    dni,
    address,
    phone,
    email,
    phoneEmergency,
    stateId: stateName,
    userId: userName,
    rol: roleNames,
  } = partner;
  return await Partner.create({
    firstName,
    lastName,
    dni,
    address,
    phone,
    email,
    phoneEmergency,
    stateId: stateName,
    userId: userName,
    rol: roleNames,
  });
};

export const updatePartner = async (
  id: any,
  updatedData: Partial<IPartner>
) => {
  try {
    const partner = await Partner.findById(id);
    if (!partner) {
      console.log(`no partner found id ${id}`);
      return null;
    }
    const { firstName, email } = updatedData;
    if (email) {
      const existingPartnerByEmail = await Partner.findOne({ email });
      if (existingPartnerByEmail && existingPartnerByEmail._id != id) {
        throw new Error("There is already a partner with the same email");
      }
    }
    if (firstName) {
      const existingPartnerByFirstName = await Partner.findOne({ firstName });
      if (existingPartnerByFirstName && existingPartnerByFirstName._id != id) {
        throw new Error("There is already a partner with the same first name");
      }
    }
    const updatedPartner = await Partner.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    return updatedPartner;
  } catch (error: any) {
    throw new Error(`error updating partner ${error.message}`);
  }
};
