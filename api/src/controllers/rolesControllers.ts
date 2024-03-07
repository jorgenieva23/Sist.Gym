import Roles from "../models/rol";
import Permission from "../models/permission";
import { IRoles } from "../utils/types";

// FUNCION QUE CREA LOS ROLES

export const createRoles = async (
  name: string,
  permissions?: string[]
): Promise<IRoles> => {
  try {
    let permissionQuery = {};
    if (permissions) {
      permissionQuery = { name: { $in: permissions } };
    }

    const allPermission = await Permission.find(permissionQuery);

    if (permissions && allPermission.length !== permissions.length) {
      const missingPermissions = permissions.filter(
        (permission) => !allPermission.some((p) => p.name === permission)
      );
      throw new Error(
        `Los siguientes permisos no existen en la base de datos: ${missingPermissions.join(
          ", "
        )}`
      );
    }

    const newRol = new Roles({
      name,
      permissions: permissions ? allPermission.map((p) => p.name) : [],
    });

    const createdRole = await newRol.save();
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
