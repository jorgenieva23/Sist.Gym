import { Request, Response } from "express";
import { IMonthlyPayment } from "../utils/types";
import MonthlyPayment from "../models/monthlyPayment";
import Movement from "../models/movement";
import States from "../models/state";
import Users from "../models/user";

export const getAllMonthlyPayment = async () => {
  try {
    const payment = await MonthlyPayment.find();
    return payment;
  } catch (error: any) {
    throw new Error("Error when searching for income in the database");
  }
};

export const registerPaymentController = async (
  payment: IMonthlyPayment,
  req: Request
) => {
  try {
    const { stateId, creatorId, dateFrom, amount } = payment;

    if (!stateId || !creatorId || !dateFrom || !amount) {
      throw new Error("Faltan campos requeridos");
    }

    const [creator, state] = await Promise.all([
      States.findOne({ name: stateId }).exec(),
      Users.findOne({ name: creatorId }).exec(),
    ]);

    if (!state || !creator) {
      throw new Error("Estado o creador no válido");
    }

    const dateTo = new Date(dateFrom);
    dateTo.setMonth(dateTo.getMonth() + 1);

    const newPayment = new MonthlyPayment({
      ...payment,
      dateTo: dateTo.toISOString().split("T")[0],
      amount,
      stateId: state._id,
      creatorId: creator._id,
    });

    await Movement.create({
      movementType: "CREAR_PAYMENT",
      creatorId: creator._id,
      ip: req.ip,
    });

    return await newPayment.save();
  } catch (error: any) {
    console.error(error, "error controllers");
    throw new Error(`ErrorControler: ${error}`);
  }
};

export const deleteIncomeControllers = async (id: any, req: Request) => {
  try {
    const payment = await MonthlyPayment.findByIdAndDelete(id);
    if (!payment) {
      console.log(`No payment found with ID: ${id}`);
    }
    console.log(`payment successfully removed: ${id} by ${payment?.creatorId}`);

    await MonthlyPayment.create({
      movementType: "BORRAR_INGRESO",
      creatorId: payment?.creatorId,
      ip: req.ip,
    });

    return payment;
  } catch (error) {
    console.error(`Error deleting payment ${id}: ${error}`);
  }
};
