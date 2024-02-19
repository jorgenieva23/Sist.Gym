import { IPromotion } from "../utils/types";
import Promotion from "../models/promotion";
import States from "../models/state";
import Users from "../models/user";

export const registerPromotionControllers = async (promotion: IPromotion) => {
  try {
    const { stateId, creatorId } = promotion;
    const [state, creator] = await Promise.all([
      States.findOne({ name: stateId }).exec(),
      Users.findOne({ name: creatorId }).exec(),
    ]);
    if (!state || !creator) {
      throw new Error("Invalid partner, state, or creator");
    }
    const newPromotion = new Promotion(promotion);
    const createdPromotion = await newPromotion.save();

    return createdPromotion;
  } catch (error) {
    console.error("ERROR create Promotion controller: ", error);
    throw error;
  }
};

export const getAllPromotion = async () => {
  try {
    const promotion = await Promotion.find();
    return promotion;
  } catch (err) {
    throw new Error("Error when searching for payment in the database");
  }
};
