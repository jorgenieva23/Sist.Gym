import { IIncome } from "../utils/types";
import Income from "../models/income";
import Partner from "../models/partner";
import States from "../models/states";
import Users from "../models/users";

export const registerUserIncome = async (income: IIncome) => {
  try {
    const { partnerId, stateId, creatorId } = income;

    const partner = await Partner.findById(partnerId).exec();
    const partnerIdFound = partner ? partner._id : null;

    const state = await States.findById(stateId).exec();
    const stateIdFound = state ? state._id : null;

    const creator = await Users.findById(creatorId).exec();
    const creatorIdFound = creator ? creator._id : null;

    income.partnerId = partnerIdFound;
    income.stateId = stateIdFound;
    income.creatorId = creatorIdFound;

    const existingIncome = await Income.findOne({
      partnerId: partnerIdFound,
      dateOfAdmission: {
        gte: new Date().setHours(0, 0, 0, 0),
        lte: new Date().setHours(23, 59, 59, 999),
      },
    }).exec();

    if (existingIncome) {
      throw new Error("The user already has a login registered for today");
    }

    return await Income.create({
      ...income,
      dateOfAdmission: new Date(),
    });
  } catch (error) {
    throw new Error("Error when searching for income in the database");
  }
};

export const getAllIncome = async () => {
  try {
    const income = await Income.find();
    return income;
  } catch (err) {
    throw new Error("Error when searching for income in the database");
  }
};

export const getUserIncome = async (
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

export const searchIncomeByUser = async (partnerId: string) => {
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
