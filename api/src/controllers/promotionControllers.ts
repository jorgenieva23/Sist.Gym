import { IPromotion } from "../utils/types";
import { Request } from "express";
import Movement from "../models/movement";
import Promotion from "../models/promotion";
import States from "../models/state";
import Users from "../models/user";

export const registerPromotionControllers = async (
  promotion: IPromotion,
  req: Request
) => {
  try {
    const { stateId, creatorId } = promotion;
    const [state, creator] = await Promise.all([
      States.findOne({ name: stateId }).exec(),
      Users.findOne({ name: creatorId }).exec(),
    ]);
    if (!state || !creator) {
      throw new Error("Invalid  state, or creator");
    }
    const newPromotion = new Promotion(promotion);
    const createdPromotion = await newPromotion.save();
    console.log(createdPromotion);

    await Movement.create({
      movementType: "CREAR_PROMOTION",
      creatorId: creator.name,
      ip: req.ip,
    });

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

export const updatePromotion = async ({
  req,
  id,
  updatedData,
}: {
  req: Request;
  id: any;
  updatedData: Partial<IPromotion>;
}) => {
  try {
    const promotion = await Promotion.findById(id);
    if (!promotion) {
      console.log(`no promotion found id ${id}`);
      return null;
    }
    await Movement.create({
      movementType: "UPDATE_PARTNER",
      creatorId: promotion?.creatorId,
      ip: req.ip,
    });

    const updatePromotion = await Promotion.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    return updatePromotion;
  } catch (error) {}
};

export const deletePayment = async (id: any, req: Request) => {
  try {
    const payment = await Promotion.findByIdAndDelete(id);
    if (!payment) {
      console.log(`No payment found with ID: ${id}`);
    }
    console.log(`payment successfully removed: ${id} ${payment} `);

    await Movement.create({
      movementType: "DELETE_PROMOTION",
      creatorId: payment?.creatorId,
      ip: req.ip,
    });

    return payment;
  } catch (error) {
    console.error(`Error deleting payment ${id}: ${error}`);
  }
};
