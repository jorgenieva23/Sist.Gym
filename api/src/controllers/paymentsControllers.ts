import { IPayment } from "../utils/types";
import { Request } from "express";
import Promotion from "../models/promotion";
import Partner from "../models/partner";
import States from "../models/state";
import Users from "../models/user";
import Movement from "../models/movement";
import Payment from "../models/payment";
import { faker } from "@faker-js/faker";

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

    const newPayment = new Payment({
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
    const payment = await Payment.find();
    return payment;
  } catch (err) {
    throw new Error("Error when searching for payment in the database");
  }
};

// export const calculateTotalSum = async (startDate?: Date, endDate?: Date) => {
//   try {
//     const currentDate = new Date();

//     const startOfMonth = new Date(
//       currentDate.getFullYear(),
//       currentDate.getMonth(),
//       1
//     );

//     const endOfMonth = new Date(
//       currentDate.getFullYear(),
//       currentDate.getMonth() + 1,
//       0
//     );

//     let payments;
//     if (startDate && endDate) {
//       payments = await Payments.find({
//         dateFrom: { $gte: startDate, $lte: endDate },
//       });
//     } else {
//       payments = await Payments.find({
//         dateFrom: { $gte: startOfMonth, $lte: endOfMonth },
//       });
//     }
//     const totalSum = payments.reduce(
//       (accumulator, payment) => accumulator + payment.total,
//       0
//     );
//     return totalSum;
//   } catch (err) {
//     throw new Error("Error when calculating total sum for the current month");
//   }
// };

// FUNCION QUE TRAE PAGOS POR ID
export const getPaymentById = async (id: any) => {
  try {
    let payment = await Payment.findOne(id);
    if (!payment) payment = await Users.findOne({ id });
    if (!payment) return { error: true };
    return payment;
  } catch (err) {
    throw new Error("Error when searching for payment in the database");
  }
};

// FUNCION QUE ACTUALIZA PAGOS MEDIANTE ID
export const updatePayment = async ({
  req,
  id,
  updatedData,
}: {
  id: any;
  updatedData: Partial<IPayment>;
  req: Request;
}) => {
  try {
    const payment = await Payment.findById(id);
    const promotion = await Promotion.findById(id);
    console.log(payment);

    if (!payment) {
      throw new Error("Payment not found");
    }

    // Si dateFrom se actualiza, también actualizamos dateTo
    if (updatedData.dateFrom) {
      const dateTo = new Date(updatedData.dateFrom);
      if (promotion && promotion?.referredDate) {
        if (promotion.referredDate > 0 && promotion.referredDate <= 12) {
          dateTo.setMonth(dateTo.getMonth() + promotion.referredDate);
        } else {
          dateTo.setDate(dateTo.getDate() + promotion.referredDate);
        }
      } else {
        dateTo.setMonth(dateTo.getMonth() + 1);
      }
      updatedData.dateTo = dateTo;
    }

    if (updatedData.amount && promotion?.percentage) {
      const discount = (promotion.percentage / 100) * updatedData.amount;
      updatedData.total = updatedData.amount - discount;
    }

    const updatedPayment = await Payment.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    await Movement.create({
      movementType: "UPDATE_PARTNER",
      creatorId: payment.creatorId,
      ip: req.ip,
    });

    return updatedPayment;
  } catch (err) {
    console.error(err);
    throw new Error("Error when updating payment in the database");
  }
};

// FUNCION QUE TRAE LOS PAGOS POR MES
export const getAllPaymentsForMonth = async () => {
  try {
    let payment = await Payment.find();
    if (!payment || payment.length === 0) {
      throw Error("payment not found by userId or type");
    }

    payment = payment.sort(
      (a, b) => new Date(a.dateFrom).getTime() - new Date(b.dateFrom).getTime()
    );
    const historyByYear: { [key: number]: number[] } = {};

    payment.forEach((pay) => {
      const payYear = new Date(pay.dateFrom).getFullYear();
      const payMonth = new Date(pay.dateFrom).getUTCMonth() + 1;

      if (!historyByYear[payYear]) {
        historyByYear[payYear] = Array(12).fill(0);
      }
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

// FUNCION QUE TRAE LOS PAGOS POR DIA
export const getPaymentsForToday = async () => {
  try {
    const currentDate = new Date();
    const currentYear = currentDate.getUTCFullYear();
    const currentMonth = currentDate.getUTCMonth() + 1;

    let payments = await Payment.find();
    if (!payments || payments.length === 0) {
      throw Error("Payments not found by userId or type");
    }

    payments = payments.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
    const historyByDay = Array(daysInMonth).fill(0);

    payments.forEach((payment) => {
      const payDate = new Date(payment.createdAt);
      const payYear = payDate.getUTCFullYear();
      const payMonth = payDate.getUTCMonth() + 1;
      const payDay = payDate.getUTCDate();

      if (payYear === currentYear && payMonth === currentMonth) {
        historyByDay[payDay - 1] += payment.total;
      }
    });

    const monthNames = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ];
    const monthName = monthNames[currentMonth - 1];

    return [
      {
        month: monthName,
        year: currentYear,
        gainsPerDay: historyByDay,
      },
    ];
  } catch (error: any) {
    console.error("ERROR chartController: ", error.message);
    return [];
  }
};

export const expiredPartner = async () => {
  try {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const tomorrowDate = new Date(currentDate);
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);

    const allPayment = await Payment.find();

    const dueTodayArray = allPayment.filter(
      (payment) =>
        payment.stateId === "active" &&
        Math.ceil(
          (new Date(payment.dateTo).getTime() - currentDate.getTime()) /
            (1000 * 60 * 60 * 24)
        ) === 0
    );

    const dueTomorrowArray = allPayment.filter(
      (payment) =>
        payment.stateId === "active" &&
        Math.ceil(
          (new Date(payment.dateTo).getTime() - tomorrowDate.getTime()) /
            (1000 * 60 * 60 * 24)
        ) === 0
    );

    return {
      dueToday: dueTodayArray,
      dueTomorrow: dueTomorrowArray,
    };
  } catch (error: any) {
    throw new Error(`error updating partner ${error.message}`);
  }
};

export const deletePayments = async (id: any, req: Request) => {
  try {
    const payment = await Payment.findByIdAndDelete(id);
    if (!payment) {
      console.log(`No payment found with ID: ${id}`);
    }
    console.log(`payment successfully removed: ${id} ${payment} `);

    await Movement.create({
      movementType: "BORRAR_INGRESO",
      creatorId: payment?.creatorId,
      ip: req.ip,
    });

    return payment;
  } catch (error) {
    console.error(`Error deleting payment ${id}: ${error}`);
  }
};

const createRandomPayment = async () => {
  try {
    const partners = await Partner.find();
    const promotions = await Promotion.find();

    if (partners.length > 0) {
      const randomPromotion =
        promotions.length > 0
          ? promotions[Math.floor(Math.random() * promotions.length)]
          : null;

      for (const partner of partners) {
        const amount = faker.number.int({ min: 10000, max: 15000 });

        let discount = 0;
        if (randomPromotion?.percentage) {
          discount = (randomPromotion.percentage / 100) * amount;
        }

        const payment = new Payment({
          partnerId: partner.firstName,
          stateId: "active",
          creatorId: "jorge@gmail.com",
          promotionId: randomPromotion ? randomPromotion._id : null,
          dateFrom: faker.date.between({
            from: "2021-01-01T00:00:00.000Z",
            to: "2024-04-29T00:00:00.000Z",
          }),
          dateTo: faker.date.between({
            from: "2021-01-01T00:00:00.000Z",
            to: "2024-06-29T00:00:00.000Z",
          }),
          amount: amount,
          total: amount - discount,
        });

        await payment.save();
      }
    } else {
      console.log("No hay suficientes datos para crear un pago aleatorio");
    }
  } catch (error) {
    console.error(`Error creating payment: ${error}`);
  }
};

// createRandomPayment();
