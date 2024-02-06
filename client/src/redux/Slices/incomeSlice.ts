import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IIncome } from "../../utils/types";

interface incomeState {
  incomes: IIncome[];
  registeredBy: string;
  // registrationDate: Date;
}

const initialState: incomeState = {
  incomes: [],
  registeredBy: "",
  // registrationDate: "",
};

export const incomeSlice = createSlice({
  name: "income",
  initialState,
  reducers: {
    getIncome: (state, action: PayloadAction<IIncome[]>) => {
      return {
        ...state,
        incomes: action.payload,
      };
    },
    fetchIncome: (state, action: PayloadAction<IIncome[]>) => {
      return {
        ...state,
        incomes: action.payload,
      };
    },
    createIncome: (state, action: PayloadAction<IIncome>) => {
      return {
        ...state,
        incomes: [...state.incomes, action.payload],
      };
    },
    editIncome: (state, action: PayloadAction<IIncome[]>) => {
      return {
        ...state,
        incomes: action.payload,
      };
    },
  },
});

export const { getIncome, fetchIncome, createIncome, editIncome } =
  incomeSlice.actions;
export default incomeSlice.reducer;
