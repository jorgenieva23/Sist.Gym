import { Request, Response } from "express";
import {
  getPartner,
  getPartnerById,
  createPartner,
  // deletePartner,
  updatePartner,
} from "../controllers/partnerControllers";
import Partner from "../models/partner";
import { IPartner } from "../utils/types";
import dotenv from "dotenv";
dotenv.config();

export const getPartnerHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const response = await getPartner();
    res.status(200).json(response);
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
    const { firstName, lastName, email } = req.body as IPartner;
    if (!email || !firstName || !lastName) {
      throw new Error("Missing data required to create a partner");
    }
    const existingUserByEmail = await Partner.findOne({ email });
    if (existingUserByEmail) {
      throw new Error("There is already a partner with the same email");
    }
    const user = {...req.body,};
    const createdUser = await Partner.create(user);
    res.status(201).json({
      ...createdUser.toJSON(),
    });
  } catch (error: any) {
    res.status(400).json({
      error: `An error occurred while creating partner: ${error.message}`,
    });
  }
};

export const upDatePartnerById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id }  = req.params
    const dataToUpdate = req.body
    const updata = await updatePartner(id, dataToUpdate)
    res.status(200).json(updatePartner);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const deletePartner = async (req: Request, res: Response) => {
  const { id } = req.params; // Obtiene el ID del parámetro de la solicitud

  try {
    const user = await Partner.findByIdAndDelete(id);
    if (!user) {
      console.log(`No user found with ID: ${id}`);
      res.status(404).json({ error: `No user found with ID: ${id}` });
    } else {
      console.log(`partner successfully removed: ${id}`);
      res.sendStatus(204); // Envía una respuesta exitosa sin contenido
    }
  } catch (error) {
    console.error(`partner successfully removed ${id}: ${error}`);
    res.status(500).json({ error: `partner successfully removed ${id}` });
  }
};