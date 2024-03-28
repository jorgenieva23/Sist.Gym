import axios from "axios";
import { IPromotion } from "../../utils/types";
import { useAppDispatch } from "../hooks";
import {
  getPromotion,
  getSpecificPromotion,
  createPromotion,
  editPromotion,
  deletePromotion,
} from "../Slices/promotionSlice";

export const usePromotionAction = () => {
  const dispatch = useAppDispatch();

  const getAllPromotion = async () => {
    try {
      const rawData = await axios.get(`/promotion/getAllProm`);
      const response = rawData.data;
      dispatch(getPromotion(response));
    } catch (error: any) {
      console.error("Error fetching promotion data:", error.message);
    }
  };
  const getSpecificPromotionById = async (id: string) => {
    try {
      const rawData = await axios.get(`/promotion/getById/${id}`);
      const response = rawData.data;
      dispatch(getSpecificPromotion(response));
    } catch (error: any) {
      console.error("Error fetching specific promotion data:", error.message);
    }
  };
  const createNewPromotion = async (promotion: IPromotion) => {
    try {
      const rawData = await axios.post(`/promotion/createProm`, {
        name: promotion.name,
        percentage: promotion.percentage,
        referredDate: promotion.referredDate,
        description: promotion.description,
        stateId: promotion.stateId,
        creatorId: promotion.creatorId,
      });
      console.log(rawData, "hola");

      return dispatch(createPromotion(rawData.data));
    } catch (error: any) {
      console.error(error.message);
    }
  };
  const updatePromotion = async (_id: string, updatedData: IPromotion) => {
    try {
      const updatedPromotion = await axios.put(
        `/promotion/upDateProm/${_id}`,
        updatedData
      );
      return dispatch(editPromotion(updatedPromotion.data));
    } catch (error: any) {
      console.error(error.message);
    }
  };
  const removePromotion = async (_id: string) => {
    try {
      await axios.delete(`/promotion/deletePromo/${_id}`);
      dispatch(deletePromotion(_id));
    } catch (error: any) {
      console.error("Error deleting promotion:", error.message);
    }
  };
  return {
    getAllPromotion,
    getSpecificPromotionById,
    createNewPromotion,
    updatePromotion,
    removePromotion,
  };
};
