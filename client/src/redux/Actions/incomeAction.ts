import axios from "axios";
import { IIncome } from "../../utils/types";
import { useAppDispatch } from "../hooks";
import { getIncome, createIncome, deleteIncome } from "../Slices/incomeSlice";

export const useIncomeAction = () => {
  const dispatch = useAppDispatch();

  const getAllIncome = async () => {
    try {
      const rawData = await axios.get(`/income/allIncome`);
      const response = rawData.data;
      dispatch(getIncome(response));
    } catch (error: any) {
      console.error("Error fetching income data:", error.message);
    }
  };
  const getAllIncomeOfTheDay = async () => {
    try {
      const rawData = await axios.get(`/income/incomeToday`);
      const response = rawData.data;
      dispatch(getIncome(response));
    } catch (error: any) {
      console.error("Error fetching income data:", error.message);
    }
  };
  const createNewIncome = async (income: IIncome) => {
    try {
      const rawData = await axios.post(`/income/create`, {
        partnerId: income.partnerId,
        creatorId: income.creatorId,
        stateId: income.stateId,
      });
      return dispatch(createIncome(rawData.data));
    } catch (error: any) {
      console.error(error.message);
    }
  };
  const IncomeOfTheDay = async () => {
    try {
      const today = await axios.get("/partnerIncome");
      return dispatch(getIncome(today.data));
    } catch (error) {}
  };
  const IncomeOfPartner = async (id: any) => {
    try {
      const income = await axios.get(`/allByPartnerId/${id}`);
      return dispatch(getIncome(income.data));
    } catch (error) {}
  };
  const deleteIncomeAction = async (_id: string) => {
    try {
      await axios.delete(`/income/deleteIncome/${_id}`);
      return dispatch(deleteIncome(_id));
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return {
    getAllIncome,
    getAllIncomeOfTheDay,
    createNewIncome,
    IncomeOfTheDay,
    IncomeOfPartner,
    deleteIncomeAction,
  };
};
