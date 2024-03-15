import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IIncome } from "../../utils/types";

interface incomeState {
  income: IIncome[];
  registeredBy: string;
  // registrationDate: Date;
}

const initialState: incomeState = {
  income: [],
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
        income: action.payload,
      };
    },
    fetchIncome: (state, action: PayloadAction<IIncome[]>) => {
      return {
        ...state,
        income: action.payload,
      };
    },
    createIncome: (state, action: PayloadAction<IIncome>) => {
      return {
        ...state,
        income: [...state.income, action.payload],
      };
    },
    editIncome: (state, action: PayloadAction<IIncome[]>) => {
      return {
        ...state,
        income: action.payload,
      };
    },
  },
});

export const { getIncome, fetchIncome, createIncome, editIncome } =
  incomeSlice.actions;
export default incomeSlice.reducer;
