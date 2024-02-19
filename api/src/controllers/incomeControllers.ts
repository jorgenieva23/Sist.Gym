import { IIncome } from "../utils/types";
import Income from "../models/income";
import Partner from "../models/partner";
import States from "../models/state";
import Users from "../models/user";

export const registerUserIncome = async (income: IIncome) => {
  try {
    const { partnerId, stateId, creatorId } = income;
    const [partner, state, creator] = await Promise.all([
      Partner.findOne({ firstName: partnerId }).exec(),
      States.findOne({ name: stateId }).exec(),
      Users.findOne({ name: creatorId }).exec(),
    ]);

    if (!partner || !state || !creator) {
      throw new Error("Invalid partner, state, or creator");
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return await Income.findOneAndUpdate(
      {
        partnerId: partner._id,
        dateOfAdmission: {
          $gte: today,
          $lte: new Date(today.getTime() + 86400000 - 1),
        },
      },
      { ...income, dateOfAdmission: today },
      { upsert: true, new: true }
    );
  } catch (error: any) {
    console.error(error, "error");
    throw new Error(`Error: ${error}`);
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
