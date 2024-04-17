import { Request } from "express";
import { IPartner } from "../utils/types";
import Partner from "../models/partner";
import Movement from "../models/movement";
import Payment from "../models/payment";

export const getAllPartner = async () => {
  try {
    const partner = await Partner.find();
    return partner;
  } catch (error: any) {
    throw new Error("Error when searching for user in the database");
  }
};

export const searchPartnerByName = async (name: string) => {
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

export const createPartner = async (partner: IPartner) => {
  const {
    firstName,
    lastName,
    dni,
    address,
    phone,
    email,
    picture,
    date,
    datePhysicalAttitude,
    medicalCoverage,
    phoneEmergency,
    phoneEmergencyName,
    deleted,
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
    picture,
    date,
    datePhysicalAttitude,
    medicalCoverage,
    phoneEmergency,
    phoneEmergencyName,
    deleted,
    stateId: stateName,
    userId: userName,
    rol: roleNames,
  });
};

export const updatePartner = async ({
  req,
  id,
  updatedData,
}: {
  req: Request;
  id: any;
  updatedData: Partial<IPartner>;
}) => {
  try {
    const partner = await Partner.findById(id);
    if (!partner) {
      console.log(`no partner found id ${id}`);
      return null;
    }
    const { email } = updatedData;
    if (email) {
      const existingPartnerByEmail = await Partner.findOne({ email });
      if (existingPartnerByEmail && existingPartnerByEmail._id != id) {
        throw new Error("There is already a partner with the same email");
      }
    }
    if (updatedData.datePhysicalAttitude) {
      updatedData.condition = "fit";
    }
    await Movement.create({
      movementType: "UPDATE_PARTNER",
      creatorId: partner?.userId,
      ip: req.ip,
    });

    const updatedPartner = await Partner.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    return updatedPartner;
  } catch (error: any) {
    throw new Error(`error updating partner ${error.message}`);
  }
};

export const expiredPartner = async () => {
  try {
    const currentDate = new Date();
    const allPartner = await Partner.find();
    const expiredToday = allPartner.filter((partner) => {
      const diffDays = Math.ceil(
        Math.abs(
          (currentDate.getTime() - new Date(partner.createdAt).getTime()) /
            (1000 * 60 * 60 * 24)
        )
      );
      return partner.stateId === "activo" && diffDays <= 1;
    });
    return expiredToday;
  } catch (error: any) {
    throw new Error(`error updating partner ${error.message}`);
  }
};

export const deletePartner = async (id: any, req: Request) => {
  try {
    const partner = await Partner.findByIdAndDelete(id);
    if (!partner) {
      console.log(`No partner found with ID: ${id}`);
    }
    console.log(`partner successfully removed: ${id} ${partner} `);

    await Movement.create({
      movementType: "BORRAR_INGRESO",
      creatorId: partner?.userId,
      ip: req.ip,
    });

    return partner;
  } catch (error) {
    console.error(`Error deleting partner ${id}: ${error}`);
  }
};
