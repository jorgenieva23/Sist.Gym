import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AppThunk } from "./store";
import { getItem, setItem } from "../components/localStorage/localStorage";
import { IIncome } from "../utils/types";
import axios from "axios";

interface incomeState {
  income: IIncome[];
  registeredBy: string;
  registrationDate: Date;
}

const localStorageState = getItem("incomeState");

const initialState: incomeState = localStorageState
  ? localStorageState
  : {
      income: "",
      registeredBy: "",
      registrationDate: "",
    };

export const incomeSlice = createSlice({
  name: "income",
  initialState,
  reducers: {
    fetchIncome: (state, action: PayloadAction<IIncome[]>) => {
      const newState = {
        ...state,
        incomes: action.payload,
        filteredIncomes: action.payload,
      };
      setItem("incomeState", newState);
      return newState;
    },
  },
});

export const getIncome = (): AppThunk => {
  return async (dispatch) => {
    try {
      const rawData = await axios.get(`/income`);
      const response = rawData.data;
      dispatch(fetchIncome(response));
    } catch (error) {
      console.error("Error fetching income data:", error);
    }
  };
};

export const { fetchIncome } = incomeSlice.actions;
export default incomeSlice.reducer;
