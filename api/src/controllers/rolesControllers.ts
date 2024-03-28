import Roles from "../models/rol";
import Permission from "../models/permission";
import { IRoles } from "../utils/types";

// FUNCION QUE CREA LOS ROLES

export const createRoles = async (
  name: string,
  permissions?: string[]
): Promise<IRoles> => {
  try {
    if (await Roles.findOne({ name })) {
      throw new Error("ya existe un usuario con el mismo mail");
    }

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
    console.log(newRol.permissions, "create");

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

//FUNCION QUE EDITA LOS PERMISOS DE CADA ROL

export const updateRolePermissions = async (
  _id: any,
  perm?: string[]
): Promise<IRoles> => {
  try {
    const role = await Roles.findById(_id);

    if (!role) {
      throw new Error("El rol no existe");
    }

    let permissions = role.permissions;

    if (perm) {
      const allPermissionsToToggle = await Permission.find({
        name: { $in: perm },
      });
      if (allPermissionsToToggle.length !== perm.length) {
        const missingPermissions = perm.filter(
          (permission) =>
            !allPermissionsToToggle.some((p) => p.name === permission)
        );
        throw new Error(
          `Los siguientes permisos no existen en la base de datos: ${missingPermissions.join(
            ", "
          )}`
        );
      }
      perm.forEach((permission) => {
        if (permissions.includes(permission)) {
          // Si el permiso ya existe, lo eliminamos
          permissions = permissions.filter((p) => p !== permission);
        } else {
          // Si el permiso no existe, lo agregamos
          permissions.push(permission);
        }
      });
    }

    role.permissions = permissions;
    console.log(role.permissions, "edit");

    const updatedRole = await role.save()
    return updatedRole.toJSON() as IRoles;
  } catch (error) {
    throw new Error(`Ocurrió un error al editar el rol: ${error}`);
  }
};
