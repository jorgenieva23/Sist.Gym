import { IPayment } from "../utils/types";
import Promotion from "../models/promotion";
import Payments from "../models/payment";
import Partner from "../models/partner";
import States from "../models/state";
import Users from "../models/user";

export const registerPaymentController = async (payment: IPayment) => {
  try {
    const { partnerId, stateId, creatorId, promotionId, dateFrom, amount } =
      payment;
    if (!(dateFrom instanceof Date && !isNaN(dateFrom.getTime()))) {
      throw new Error("Invalid dateFrom");
    }
    const [partner, state, creator, promotion] = await Promise.all([
      Partner.findOne({ firstName: partnerId }).exec(),
      States.findOne({ name: stateId }).exec(),
      Users.findOne({ name: creatorId }).exec(),
      Promotion.findOne({ name: promotionId }).exec(),
    ]);
    if (!partner || !state || !creator) {
      throw new Error("Invalid partner, state, or creator");
    }
    let discount = 0;
    if (promotion?.percentage) {
      discount = (promotion.percentage / 100) * amount;
    }
    const total = amount - discount;

    const dateTo = new Date(dateFrom);
    if (
      promotion?.referredDate &&
      promotion.referredDate > 0 &&
      promotion.referredDate <= 12
    ) {
      if (promotion.referredDate === 1) {
        dateTo.setDate(dateFrom.getDate() + 1);
      } else {
        dateTo.setMonth(dateFrom.getMonth() + promotion.referredDate);
      }
    } else {
      dateTo.setMonth(dateFrom.getMonth() + 1);
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
