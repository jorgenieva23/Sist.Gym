import { Request, Response } from "express";
import {
  getAllPartner,
  searchPartnerByName,
  getPartnerById,
  createPartner,
  updatePartner,
  deletePartner,
} from "../controllers/partnerControllers";
import Movement from "../models/movement";
import States from "../models/state";
import Users from "../models/user";
import Partner from "../models/partner";
import Roles from "../models/rol";
import { IPartner } from "../utils/types";

import dotenv from "dotenv";
dotenv.config();

export const getPartnerHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name } = req.query;
    const result: any = name
      ? await searchPartnerByName(name as string)
      : await getAllPartner();
    res.status(200).json(result);
  } catch (error: any) {
    console.log("possible mistake");
    res.status(400).json({ error });
  }
};

export const getPartnerId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const response = await getPartnerById(id);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const postPartner = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      firstName,
      lastName,
      email,
      datePhysicalAttitude,
      rol: roleNames,
      stateId: stateName,
      userId: userName,
    } = req.body as IPartner;
    const [role, state, admin] = await Promise.all([
      Roles.findOne({ name: roleNames }).exec(),
      States.findOne({ name: stateName }).exec(),
      Users.findOne({ email: userName }).exec(),
    ]);

    if (!email || !firstName || !lastName) {
      throw new Error("Missing data required to create a partner");
    }
    if (!role || !state || !admin) {
      throw new Error("Role, state, or admin not found");
    }

    if (await Partner.findOne({ email })) {
      throw new Error("There is already a partner with the same email");
    }

    const currentDate = new Date();
    const isPhysicalAttitudeFit = new Date(datePhysicalAttitude) > currentDate;
    const condition = isPhysicalAttitudeFit ? "fit" : "unfit";

    const partner: IPartner = {
      ...req.body,
      condition,
      rol: role?.name || null,
      stateId: state?.name || null,
      creatorId: admin?.name || null,
    };

    const createPartners = await createPartner(partner);
    res.status(201).json(createPartners);
  } catch (error: any) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

export const upDatePartnerById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const dataToUpdate = req.body;
    const updata = await updatePartner({ id, updatedData: dataToUpdate, req });
    res.status(200).json(updata);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const deleteParterHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    let result = await deletePartner(id, req);
    if (!result) {
      console.log(`No income found`);
      res.status(404).json({ error: `No partner found` });
    }
    res.status(200).json({ message: "partner successfully removed" });
  } catch (error) {
    res.status(500).json({ error: `Error deleting partner ${id}` });
  }
};
