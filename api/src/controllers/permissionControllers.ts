import Permission from "../models/permission";
import { IPermission } from "../utils/types";

const permissions = [
  // Panel
  { name: "index_panel" },
  //Usuarios
  { name: "indexUsuario" },
  { name: "crearUsuario" },
  { name: "editarUsuario" },
  { name: "suspenderUsuario" },
  { name: "habilitarUsuario" },
  // Promocion
  { name: "indexPromocion" },
  { name: "crearPromocion" },
  { name: "editarPromocion" },
  { name: "suspenderPromocion" },
  { name: "habilitarPromocion" },
  { name: "eliminarPromocion" },
  // Cuotas
  { name: "indexCuota" },
  { name: "crearCuota" },
  { name: "suspenderCuota" },
  { name: "habilitarCuota" },
  { name: "eliminarCuotas" },
  { name: "adelantarCuotas" },
  //   Socios
  { name: "indeSocio" },
  { name: "crearSocio" },
  { name: "EditarSocio" },
  { name: "suspenderSocio" },
  { name: "hanilitarSocio" },
  { name: "eliminarSocio" },
  { name: "ShowSocio" },
  // Ingresos
  { name: "indexIngresos" },
  { name: "crearIngresos" },
  { name: "EliminarIngresos" },
  // Rol
  { name: "indexRol" },
  { name: "crearRol" },
  { name: "editar" },
  // Balance
  { name: "indexBalande" },
  // Mensualidad
  { name: "indexMensualidad" },
  { name: "crearMensualidad" },
  { name: "editarMensualidad" },
  { name: "ingresarPagoMensualidad" },
  // Movimientos
  { name: "indexMovimiento" },
  // Logs
  { name: "indexjob" },
];

export const saveAllPermisos = async () => {
  try {
    let contador = 0;
    for (const permission of permissions) {
      const name = permission.name;
      const types = await Permission.findOne({ name });
      if (!types) {
        const newTypes = new Permission({ name });
        await newTypes.save();
        contador++;
        console.log(`permiso creada N: ${contador} `);
      }
    }
    console.log("Procesamiento del JSON completado.");
  } catch (error) {
    console.error("Error controller durante el procesamiento:", error);
  }
};
// saveAllPermisos();

export const getAllPermissionType = async () => {
  try {
    const types = await Permission.find();
    return types;
  } catch (error: any) {
    throw new Error("Error when searching for income in the database");
  }
};
