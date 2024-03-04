import { Request } from "express";
import { IIncome } from "../utils/types";
import Income from "../models/income";
import Partner from "../models/partner";
import States from "../models/state";
import Users from "../models/user";
import Movement from "../models/movement";

// FUNCION QUE REGISTRA EL INGRESO DEL SOCIO
export const registerPartnerIncome = async (income: IIncome, req: Request) => {
  try {
    const { partnerId, stateId, creatorId } = income;
    const [partner, state, creator] = await Promise.all([
      Partner.findOne({ _id: partnerId }).exec(),
      States.findOne({ name: stateId }).exec(),
      Users.findOne({ name: creatorId }).exec(),
    ]);

    if (!partner || !state || !creator) {
      throw new Error("Invalid partner, state, or creator");
    } else {
      if (partner?.stateId === "inactive") {
        throw new Error("partner status is inactive");
      }
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    await Movement.create({
      movementType: "CREAR_INGRESO",
      creatorId: creator.name,
      ip: req.ip,
    });

    return await Income.create({ ...income, dateOfAdmission: today });
  } catch (error: any) {
    console.error(error, "error");
    throw new Error(`Error: ${error}`);
  }
};

// FUNCION QUE TRAE TODOS LOS INGRESOS
export const getAllIncome = async () => {
  try {
    const income = await Income.find();
    return income;
  } catch (err) {
    throw new Error("Error when searching for income in the database");
  }
};

// FUNCION QUE TRAE LOS INGRESOS DEL DIA
export const getIncomeOfTheDay = async () => {
  try {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const endOfToday = new Date(currentDate);
    endOfToday.setDate(endOfToday.getDate() + 1);

    const incomeToday = await Income.find({
      dateOfAdmission: { $gte: currentDate, $lt: endOfToday },
    });
    return incomeToday;
  } catch (error) {
    console.log(error);

    throw new Error("Error when searching for user attendance in the database");
  }
};

// FUNCION QUE TRAE EL INGRESO DE EN UN RANGO DE FECHAS
export const getPartnerIncome = async (
  fromDate: Date,
  toDate: Date,
  partnerId: string
): Promise<IIncome[]> => {
  try {
    const userIncome = await Income.find({
      partnerId,
      dateOfAdmission: { $gte: fromDate, $lte: toDate },
    }).exec();
    return userIncome;
  } catch (err) {
    throw new Error("Error when searching for user attendance in the database");
  }
};

// BUSCA EL INGRESO DE UN USUARIO DETERMINADO
export const getAllIncomeByPartnerID = async (
  partnerId: string
): Promise<IIncome[]> => {
  try {
    const found = await Income.find({ partnerId }).exec();
    if (found.length === 0) {
      console.log(
        `No se encontraron ingresos para el socio con ID: ${partnerId}`
      );
    }
    return found;
  } catch (error: any) {
    throw new Error(
      `Error al buscar ingresos para el socio con ID: ${partnerId}, ${error.message}`
    );
  }
};

// FUNCION QUE BORRA UN INGRESO DETERMINADO
export const deleteIncomeControllers = async (id: any, req: Request) => {
  try {
    const income = await Income.findByIdAndDelete(id);
    if (!income) {
      console.log(`No income found with ID: ${id}`);
    }
    console.log(`income successfully removed: ${id} by ${income?.creatorId}`);

    await Movement.create({
      movementType: "BORRAR_INGRESO",
      creatorId: income?.creatorId,
      ip: req.ip,
    });

    return income;
  } catch (error) {
    console.error(`Error deleting income ${id}: ${error}`);
  }
};
