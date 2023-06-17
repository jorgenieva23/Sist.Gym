// import { IRoles } from "../utils/types";
import { Request, Response } from "express";
import {
  createRoles,
  getAllRoles,
  searchRolesByName,
} from "../controllers/rolesControllers";
import { IRoles } from "../utils/types";
import  Roles  from "../models/roles";

// MANEJADOR QUE TRAE LOS ROLES Y LOS ROLES POR NOMBRE

export const getRolHandlers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name } = req.query;
    const results = name
      ? await searchRolesByName(name as string)
      : await getAllRoles();
    res.status(200).send(results);
  } catch (error: any) {
    res.status(400).json({ message: "hola" });
  }
};

// MANEJADOR QUE CREAR UN ROL POR ID

export const postRolesHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const rol = req.body as IRoles;
    const createdRol = await createRoles(rol);
    res.status(200).json(createdRol);
  } catch (error: any) {
    res.status(400).send("Error al crear el rol");
  }
};

export const deleteRol = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.body;
    const forDelete = await Roles.findById(name);
    if (name && forDelete) {
      await Roles.findOneAndDelete(name);
    }
    res.status(201).json("Borrado exitosamente");
  } catch (error) {
    res.status(400).json({
      error: "No se recibieron los parámetros necesarios para borrar",
    });
  }
};
