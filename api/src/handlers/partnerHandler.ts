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
import { Roles } from "../models/rol";
import States from "../models/state";
import dotenv from "dotenv";
import Users from "../models/user";
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
    const {
      firstName,
      lastName,
      email,
      rol: roleNames,
      stateId: stateName,
      userId: userName,
    } = req.body as IPartner;
    const [role, state, admin] = await Promise.all([
      Roles.findOne({ name: { $in: roleNames } }),
      States.findOne({ name: { $in: stateName } }),
      Users.findOne({ name: { $in: userName } }),
    ]);
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
      { name: admin?.name },
      { $push: { partners: createdPartert.email } }
    );

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
