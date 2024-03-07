import Movement from "../models/movement";
import MovementType from "../models/movementType";
import { IMovement, IMovementType } from "../utils/types";

// CONTROLODORES DE LOS TIPOS DE MOVIMIENTOS

const movements = [
  { name: "CREAR_USUARIO" },
  // await Movement.create({
  //   movementType: "CREAR_USUARIO",
  //   creatorId: creator.name,
  // });
  { name: "EDITAR_USUARIO" },
  // await Movement.create({
  //   movementType:  "EDITAR_USUARIO",
  //   creatorId: creator.name,
  // });
  { name: "SUSPENDER_USUARIO" },
  // await Movement.create({
  //   movementType: "SUSPENDER_USUARIO",
  //   creatorId: creator.name,
  // });
  { name: "ELIMINAR_USUARIO " },
  // await Movement.create({
  //   movementType: "ELIMINAR_USUARIO ",
  //   creatorId: creator.name,
  // });
  { name: "HABILITAR_USUARIO " },
  // await Movement.create({
  //   movementType: "HABILITAR_USUARIO " ,
  //   creatorId: creator.name,
  // });

  { name: "CREAR_SOCIO " },
  // await Movement.create({
  //   movementType:  "CREAR_SOCIO ",
  //   creatorId: creator.name,
  // });
  { name: "EDITAR_SOCIO " },
  // await Movement.create({
  //   movementType:"EDITAR_SOCIO ",
  //   creatorId: creator.name,
  // });
  { name: "ELIMINAR_SOCIO" },
  // await Movement.create({
  //   movementType:"ELIMINAR_SOCIO",
  //   creatorId: creator.name,
  // });
  { name: "HABILITAR_SOCIO " },
  // await Movement.create({
  //   movementType: "HABILITAR_SOCIO ",
  //   creatorId: creator.name,
  // });
  { name: "SUSPENDER_SOCIO " },
  // await Movement.create({
  //   movementType: "SUSPENDER_SOCIO ",
  //   creatorId: creator.name,
  // });

  { name: "CREAR_INGRESO" },
  // await Movement.create({
  //   movementType: "CREAR_INGRESO",
  //   creatorId: creator.name,
  // });
  { name: "EDITAR_INGRESO " },
  // await Movement.create({
  //   movementType:  "EDITAR_INGRESO ",
  //   creatorId: creator.name,
  // });
  { name: "ELIMINAR_INGRESO " },
  // await Movement.create({
  //   movementType:"ELIMINAR_INGRESO ",
  //   creatorId: creator.name,
  // });
  { name: "ANULAR_INGRESO" },
  // await Movement.create({
  //   movementType: "ANULAR_INGRESO",
  //   creatorId: creator.name,
  // });
  { name: "HABILITAR_INGRESO " },
  // await Movement.create({
  //   movementType: "HABILITAR_INGRESO " ,
  //   creatorId: creator.name,
  // });
  { name: "SUSPENDER_INGRESO " },
  // await Movement.create({
  //   movementType: "SUSPENDER_INGRESO "  ,
  //   creatorId: creator.name,
  // });

  { name: "CREAR_PROMOCION " },
  // await Movement.create({
  //   movementType: "CREAR_PROMOCION ",
  //   creatorId: creator.name,
  // });
  { name: "EDITAR_PROMOCION " },
  // await Movement.create({
  //   movementType: "EDITAR_PROMOCION ",
  //   creatorId: creator.name,
  // });
  { name: "ELIMINAR_PROMOCION " },
  // await Movement.create({
  //   movementType:  "ELIMINAR_PROMOCION ",
  //   creatorId: creator.name,
  // });
  { name: "ANULAR_PROMOCION " },
  // await Movement.create({
  //   movementType: "ANULAR_PROMOCION " ,
  //   creatorId: creator.name,
  // });
  { name: "HABILITAR_PROMOCION " },
  // await Movement.create({
  //   movementType: "HABILITAR_PROMOCION ",
  //   creatorId: creator.name,
  // });
  { name: "SUSPENDER_PROMOCION " },
  // await Movement.create({
  //   movementType: "SUSPENDER_PROMOCION ",
  //   creatorId: creator.name,
  // });

  { name: "CREAR_CUOTA" },
  // await Movement.create({
  //   movementType: "CREAR_CUOTA",
  //   creatorId: creator.name,
  // });
  { name: "EDITAR_CUOTA " },
  // await Movement.create({
  //   movementType: "EDITAR_CUOTA " ,
  //   creatorId: creator.name,
  // });
  { name: "ELIMINAR_CUOTA " },
  // await Movement.create({
  //   movementType: "ELIMINAR_CUOTA ",
  //   creatorId: creator.name,
  // });
  { name: "ANULAR_CUOTA " },
  // await Movement.create({
  //   movementType:"ANULAR_CUOTA ",
  //   creatorId: creator.name,
  // });
  { name: "HABILITAR_CUOTA " },
  // await Movement.create({
  //   movementType: "HABILITAR_CUOTA ",
  //   creatorId: creator.name,
  // });
  { name: "SUSPENDER_CUOTA " },
  // await Movement.create({
  //   movementType: "SUSPENDER_CUOTA ",
  //   creatorId: creator.name,
  // });
  { name: "ADELANTAR_CUOTA" },
  // await Movement.create({
  //   movementType:"ADELANTAR_CUOTA",
  //   creatorId: creator.name,
  // });

  { name: "CREAR_ROL" },
  // await Movement.create({
  //   movementType: "CREAR_ROL",
  //   creatorId: creator.name,
  // });
  { name: "EDITAR_ROL" },
  // await Movement.create({
  //   movementType: "EDITAR_ROL",
  //   creatorId: creator.name,
  // });
  { name: "ELIMINAR_ROL" },
  // await Movement.create({
  //   movementType: "ELIMINAR_ROL",
  //   creatorId: creator.name,
  // });
  { name: "INICIAR_SESION" },
  // await Movement.create({
  //   movementType:"INICIAR_SESION",
  //   creatorId: creator.name,
  // });
  { name: "CERRAR_SESION" },
  // await Movement.create({
  //   movementType:"INICIAR_SESION",
  //   creatorId: creator.name,
  // });
];

export const sabeAllMovementTypes = async () => {
  try {
    let contador = 0;
    for (const movement of movements) {
      const name = movement.name;
      const types = await MovementType.findOne({ name });
      if (!types) {
        const newTypes = new MovementType({ name });
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
