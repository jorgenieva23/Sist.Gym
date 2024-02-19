import { Roles } from "../models/rol";
import { IRoles } from "../utils/types";

// FUNCION QUE CREA LOS ROLES

export const createRoles = async (roles: IRoles): Promise<IRoles> => {
  try {
    const { name } = roles;
    const createdRole = await Roles.create(roles);
    return createdRole.toJSON() as IRoles;
  } catch (error) {
    throw new Error(`Ocurrió un error al crear el rol: ${error}`);
  }
};

// FUNCION QUE TRAE TODOS LOS ROLES

export const getAllRoles = async () => {
  try {
    const roles = await Roles.find({
      $or: [{ delete: { $ne: 1 } }, { delete: { $exists: false } }],
    });
    return roles;
  } catch (error) {
    throw new Error("Error while searching for roles in the database");
  }
};

//FUNCION QUE TRAE ROLES POR NOMBRE

export const searchRolesByName = async (name: string) => {
  try {
    const roles = await Roles.find({
      name: { $regex: name, $options: "i" },
    });
    return roles;
  } catch (error) {
    throw new Error(`${Roles} no fount`);
  }
};
