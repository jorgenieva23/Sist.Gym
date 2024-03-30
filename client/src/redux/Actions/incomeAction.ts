import axios from "axios";
import { IIncome } from "../../utils/types";
import { useAppDispatch } from "../hooks";
import { getIncome, createIncome } from "../Slices/incomeSlice";

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
  const deleteIncome = async (id: any) => {
    try {
      const deleted = await axios.delete(`/deleteIncome/${id}`);
      return dispatch(getIncome(deleted.data));
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
    deleteIncome,
  };
};
