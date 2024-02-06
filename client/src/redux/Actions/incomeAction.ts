import axios from "axios";
import { IIncome } from "../../utils/types";
import { useAppDispatch } from "../store";
import { getIncome, createIncome } from "../Slices/incomeSlice";

export const useIncomeAction = () => {
  const dispatch = useAppDispatch();

  const getAllIncome = async () => {
    try {
      const rawData = await axios.get(`/income/all`);
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
        dateOfAdmission: income.dateOfAdmission,
        stateId: income.stateId,
        creatorId: income.creatorId,
      });
      return dispatch(createIncome(rawData.data));
    } catch (error: any) {
      console.error(error.message);
    }
  };
  const updateIncome = async ({
    id: _id,
    updatedData,
  }: {
    id: string | null;
    updatedData: IIncome;
  }) => {
    try {
      const updatedIncome = await axios.put(`/income/update/${_id}`, {
        updatedData,
      });
      return dispatch(getIncome(updatedIncome.data));
    } catch (error: any) {
      console.error(error.message);
    }
  };
  return {
    getAllIncome,
    createNewIncome,
    updateIncome,
  };
};
