import { IPayment } from "../utils/types";
import Payments from "../models/payment";
import Partner from "../models/partner";
import States from "../models/state";
import Users from "../models/user";

export const registerPaymentController = async (payment: IPayment) => {
  try {
    const { partnerId, stateId, creatorId, dateFrom } = payment;
    if (!(dateFrom instanceof Date && !isNaN(dateFrom.getTime()))) {
      throw new Error("Invalid dateFrom");
    }
    const [partner, state, creator] = await Promise.all([
      Partner.findOne({ firstName: partnerId }).exec(),
      States.findOne({ name: stateId }).exec(),
      Users.findOne({ name: creatorId }).exec(),
    ]);
    if (!partner || !state || !creator) {
      throw new Error("Invalid partner, state, or creator");
    }
    const dateTo = new Date(dateFrom);
    dateTo.setMonth(dateTo.getMonth() + 1);
    const newPayment = new Payments({
      ...payment,
      dateTo: dateTo.toISOString().split("T")[0],
    });
    await Partner.findOneAndUpdate(
      { firstName: partnerId },
      { stateId: "active" },
      { new: true }
    );
    return await newPayment.save();
  } catch (error: any) {
    console.error(error, "error");
    throw new Error(`Error: ${error}`);
  }
};

export const getAllPayment = async () => {
  try {
    const payment = await Payments.find();
    return payment;
  } catch (err) {
    throw new Error("Error when searching for payment in the database");
  }
};
