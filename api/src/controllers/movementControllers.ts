import Movement from "../models/movement";
import MovementType from "../models/movementType";
import { IMovement } from "../utils/types";
import { IMovementType } from "../utils/types";

// CONTROLODORES DE LOS TIPOS DE MOVIMIENTOS

const movements = [
  { name: "CREAR_USUARIO" },
  { name: "EDITAR_USUARIO" },
  { name: "SUSPENDER_USUARIO" },
  { name: "ELIMINAR_USUARIO " },
  { name: "HABILITAR_USUARIO " },

  { name: "CREAR_SOCIO " },
  { name: "EDITAR_SOCIO " },
  { name: "ELIMINAR_SOCIO" },
  { name: "HABILITAR_SOCIO " },
  { name: "SUSPENDER_SOCIO " },

  { name: "CREAR_INGRESO" },
  { name: "EDITAR_INGRESO " },
  { name: "ELIMINAR_INGRESO " },
  { name: "ANULAR_INGRESO" },
  { name: "HABILITAR_INGRESO " },
  { name: "SUSPENDER_INGRESO " },

  { name: "CREAR_PROMOCION " },
  { name: "EDITAR_PROMOCION " },
  { name: "ELIMINAR_PROMOCION " },
  { name: "ANULAR_PROMOCION " },
  { name: "HABILITAR_PROMOCION " },
  { name: "SUSPENDER_PROMOCION " },

  { name: "CREAR_CUOTA" },
  { name: "EDITAR_CUOTA " },
  { name: "ELIMINAR_CUOTA " },
  { name: "ANULAR_CUOTA " },
  { name: "HABILITAR_CUOTA " },
  { name: "SUSPENDER_CUOTA " },
  { name: "ADELANTAR_CUOTA " },

  { name: "CREAR_ROL " },
  { name: "EDITAR_ROL " },
  { name: "ELIMINAR_ROL" },

  { name: "INICIAR_SESION" },
];

export const sabeAllMovementTypes = async () => {
  try {
    let contador = 0;
    for (const movement of movements) {
      const name = movement.name;
      const types = await MovementType.findOne({ name });
      if (!types) {
        const newTypes = new MovementType({ types });
        await newTypes.save();
        contador++;
        console.log(`vuelta creada N: ${contador} `);
      }
    }
    console.log("Procesamiento del JSON completado.");
  } catch (error) {
    console.error("Error durante el procesamiento:", error);
  }
};
// sabeAllMovementTypes();

export const getAllMovementType = async () => {
  try {
    const types = await MovementType.find();
    console.log(types);
    return types;
  } catch (error: any) {
    throw new Error("Error when searching for income in the database");
  }
};

// CONTROLODORES DE MOVIMIENTOS

export const registroMovimiento = async (
  movement: IMovement & { [key: string]: any }
) => {
  try {
    const movements = await Movement.create({ movement });
    return movements;
  } catch (error) {
    console.error("Error al registrar el movimiento:", error);
  }
};
