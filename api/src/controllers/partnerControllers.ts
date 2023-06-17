import { Request, Response } from "express";
import { IPartner } from "../utils/types";
import Partner from "../models/partner";

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
    const { firstName, lastName, dni, address, phone, email, picture } =
      partner;

    if (
      !firstName ||
      !lastName ||
      !dni ||
      !address ||
      !phone ||
      !email ||
      !picture
    )
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

// export const deletePartner = async (req: Request, res: Response, id: any) => {
//   try {
//     const infoDB = await Partner.findByIdAndDelete(id);
//     if (!infoDB) {
//       console.log(`no such partner id: ${id}`);
//     }
//   } catch (error) {
//     throw new Error(`error deleting partner ${id}`);
//   }
// };

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

export const findUserController = async (email: string) => {
  try {
    const partner = await Partner.findOne({ email: email });
    console.log(partner);
    return partner;
  } catch (error: any) {
    throw new Error(`${error.message}`);
  }
};


