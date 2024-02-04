import axios from "axios";
import { useAppDispatch } from "../store";
import { getIncome } from "../Slices/incomeSlice";

export const useIncomeAction = () => {
  const dispatch = useAppDispatch();

  const getAllIncome = async () => {
    try {
      const rawData = await axios.get(`/income`);
      const response = rawData.data;
      dispatch(getIncome(response));
    } catch (error: any) {
      console.error("Error fetching income data:", error.message);
    }
  };
  return {
    getAllIncome,
  };
};
