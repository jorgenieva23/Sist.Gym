import { Request, Response } from "express";
import {
  getAllPartner,
  searchPartnerByName,
  getPartnerById,
  createPartner,
  updatePartner,
} from "../controllers/partnerControllers";
import Movement from "../models/movement";
import States from "../models/state";
import Users from "../models/user";
import Partner from "../models/partner";
import { Roles } from "../models/rol";
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
      ? await searchPartnerByName(name)
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
      rol: roleNames,
      stateId: stateName,
      userId: userName,
    } = req.body as IPartner;
    const [role, state, admin] = await Promise.all([
      Roles.findOne({ name: roleNames }).exec(),
      States.findOne({ name: stateName }).exec(),
      Users.findOne({ email: userName }).exec(),
    ]);
    console.log(role);
    console.log(state);
    console.log(admin);

    if (!email || !firstName || !lastName) {
      throw new Error("Missing data required to create a partner");
    }
    if (await Partner.findOne({ email })) {
      throw new Error("There is already a partner with the same email");
    }
    if (!role || !state || !admin) {
      throw new Error("Role, state, or admin not found");
    }
    const partner: IPartner = {
      ...req.body,
      rol: role?.name || null,
      stateId: state?.name || null,
      creatorId: admin?.name || null,
    };

    const createdPartert = await createPartner(partner);
    console.log(createdPartert.email);

    await Users.updateOne(
      { email: admin?.email },
      { $push: { partners: createdPartert.email } }
    );

    await Movement.create({
      movementType: "CREAR_PAYMENT",
      creatorId: admin.name,
      ip: req.ip,
    });

    res.status(201).json(createdPartert);
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
    const updata = await updatePartner(id, dataToUpdate);
    res.status(200).json(updatePartner);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const deletePartner = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const partner = await Partner.findByIdAndDelete(id);
    if (!partner) {
      console.log(`No partner found with ID: ${id}`);
      return res.status(404).json({ error: `No partner found with ID: ${id}` });
    }
    console.log(`partner successfully removed: ${id} ${partner} `);
    return res
      .status(200)
      .json({ message: "Partner successfully removed", partner });
  } catch (error) {
    console.error(`Error deleting partner ${id}: ${error}`);
    return res.status(500).json({ error: `Error deleting partner ${id}` });
  }
};

export const deleteAllPartner = async (req: Request, res: Response) => {
  try {
    const users = await Partner.deleteMany();
    // if (!users) return res.status(400).json({ message: "invalid ID" });
    return res.status(200).json(users);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error");
  }
};
