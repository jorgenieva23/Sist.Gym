import { IPayment } from "../utils/types";
import { Request } from "express";
import Promotion from "../models/promotion";
import Payments from "../models/payment";
import Partner from "../models/partner";
import States from "../models/state";
import Users from "../models/user";
import Movement from "../models/movement";

// FUNCION REGISTRO DEL PAGO, MOVIMIENTO Y CALCULO DEL TOTAL MEDIANTE PROMOCIONES
export const registerPaymentController = async (
  payment: IPayment,
  req: Request
) => {
  try {
    const { partnerId, stateId, creatorId, promotionId, dateFrom, amount } =
      payment;
    const [partner, state, creator, promotion] = await Promise.all([
      Partner.findOne({ firstName: partnerId }).exec(),
      States.findOne({ name: stateId }).exec(),
      Users.findOne({ name: creatorId }).exec(),
      Promotion.findOne({ name: promotionId }).exec(),
    ]);
    if (!partner || !state || !creator) {
      throw new Error("Invalid partner, state, creator or promotion");
    }

    let discount = 0;
    if (promotion?.percentage) {
      discount = (promotion.percentage / 100) * amount;
    }
    const total = amount - discount;

    const dateTo = new Date(dateFrom);
    if (!(dateTo instanceof Date && !isNaN(dateTo.getTime()))) {
      throw new Error("Invalid dateFrom");
    }
    if (promotion?.referredDate) {
      if (promotion.referredDate > 0 && promotion.referredDate <= 12) {
        dateTo.setMonth(dateTo.getMonth() + promotion.referredDate);
      } else {
        dateTo.setDate(dateTo.getDate() + promotion.referredDate);
      }
    } else {
      dateTo.setMonth(dateTo.getMonth() + 1);
    }

    const newPayment = new Payments({
      ...payment,
      dateTo: dateTo.toISOString().split("T")[0],
      total,
    });
    await Partner.findOneAndUpdate(
      { firstName: partnerId },
      { stateId: "active" },
      { new: true }
    );
    await Movement.create({
      movementType: "CREAR_PAYMENT",
      creatorId: creator.name,
      ip: req.ip,
    });
    return await newPayment.save();
  } catch (error: any) {
    console.error(error, "error controllers");
    throw new Error(`ErrorControler: ${error}`);
  }
};

// FUNCION QUE TRAE TODOS LOS PAGOS
export const getAllPayment = async () => {
  try {
    const payment = await Payments.find();
    return payment;
  } catch (err) {
    throw new Error("Error when searching for payment in the database");
  }
};

// FUNCION QUE TRAE PAGOS POR ID
export const getPaymentById = async (id: any) => {
  try {
    let payment = await Payments.findOne(id);
    if (!payment) payment = await Users.findOne({ id });
    if (!payment) return { error: true };
    return payment;
  } catch (err) {
    throw new Error("Error when searching for payment in the database");
  }
};

// FUNCION QUE ACTUALIZA PAGOS MEDIANTE ID
export const updateUserPayment = async ({
  req,
  id,
  updatedData,
}: {
  id: any;
  updatedData: Partial<IPayment>;
  req: Request;
}) => {
  try {
    const updatePayment = await Users.findByIdAndUpdate(
      id,
      { $set: updatedData },
      { new: true }
    );
    await Movement.create({
      movementType: "UPDATE_PARTNER",
      creatorId: updatePayment?.creatorId,
      ip: req.ip,
    });
    return updatePayment;
  } catch (err) {
    throw new Error("Error when searching for payment in the database");
  }
};

// FUNCION QUE TRAE LOS PAGOS DE UN SOCIO POR ID
export const getPartnerPayments = async (id: any) => {
  try {
    let payment = await Payments.find({ id, delete: false });
    if (!payment || payment.length === 0) {
      throw Error("payment not found by userId or type");
    }
    payment = payment.sort(
      (a, b) => new Date(a.dateTo).getTime() - new Date(b.dateTo).getTime()
    );
    const historyByYear: { [key: number]: number[] } = {};

    payment.forEach((pay) => {
      const payYear = new Date(pay.dateTo).getFullYear();
      const payMonth = new Date(pay.dateTo).getUTCMonth() + 1;

      if (!historyByYear[payYear]) {
        historyByYear[payYear] = Array(12).fill(0);
      }

      historyByYear[payYear][payMonth - 1] += pay.total;

      historyByYear[payYear][payMonth - 1] += pay.total;
    });
    const historyArray = Object.entries(historyByYear).map(
      ([year, gainsPerMonth]) => {
        return {
          year: parseInt(year),
          gainsPerMonth: gainsPerMonth,
        };
      }
    );
    return historyArray;
  } catch (error: any) {
    console.error("ERROR chartController: ", error.message);
    return [];
  }
};

export const deletePayment = async (id: any, req: Request) => {
  try {
    const payment = await Partner.findByIdAndDelete(id);
    if (!payment) {
      console.log(`No payment found with ID: ${id}`);
    }
    console.log(`payment successfully removed: ${id} ${payment} `);

    await Movement.create({
      movementType: "DELETE_PARTNER",
      creatorId: payment?.userId,
      ip: req.ip,
    });

    return payment;
  } catch (error) {
    console.error(`Error deleting payment ${id}: ${error}`);
  }
};
