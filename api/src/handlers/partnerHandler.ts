import { Request, Response } from "express";
import {
  getAllPartner,
  searchPartnerByName,
  getPartnerById,
  createPartner,
  updatePartner,
} from "../controllers/partnerControllers";
import Partner from "../models/partner";
import { IPartner } from "../utils/types";
import { Roles } from "../models/roles";
import States from "../models/states";
import dotenv from "dotenv";
import Users from "../models/users";
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
    const id = req.params.id;
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
    const partner = req.body as IPartner;
    const { role: roleNames, stateId: stateName, userId: userName } = partner;
    const { firstName, lastName, email } = req.body as IPartner;
    if (!email || !firstName || !lastName) {
      throw new Error("Missing data required to create a partner");
    }
    const existingUserByEmail = await Partner.findOne({ email });
    if (existingUserByEmail) {
      throw new Error("There is already a partner with the same email");
    }
    // buscar y relaciona la tabla rol
    const role = await Roles.findOne({ name: { $in: roleNames } });
    partner.role = role ? role.name : null;
    // busca y relaciona la tabla estados
    const state = await States.findOne({ name: { $in: stateName } });
    partner.stateId = state ? state.name : null;
    // busca y relaciona la tabla usuarios
    const user = await Users.findOne({ name: { $in: userName } });
    partner.userId = user ? user.name : null
    
    const createdPartert = await Partner.create(partner);
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
    const user = await Partner.findByIdAndDelete(id);
    if (!user) {
      console.log(`No user found with ID: ${id}`);
      res.status(404).json({ error: `No user found with ID: ${id}` });
    } else {
      console.log(`partner successfully removed: ${id} ${user} `);
      res.sendStatus(204); // Envía una respuesta exitosa sin contenido
    }
  } catch (error) {
    console.error(`partner successfully removed ${id}: ${error}`);
    res.status(500).json({ error: `partner successfully removed ${id}` });
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
