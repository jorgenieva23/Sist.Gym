import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IPayments } from "../../utils/types";

interface paymentState {
  payments: IPayments[];
  specificPartner: IPayments | null;
}

const initialState: paymentState = {
  payments: [],
  specificPartner: null,
};

export const paymentSlice = createSlice({
  name: "income",
  initialState,
  reducers: {
    getPayment: (state, action: PayloadAction<IPayments[]>) => {
      return {
        ...state,
        payments: action.payload,
      };
    },
    getSpecificPayment: (state, action: PayloadAction<IPayments>) => {
      return {
        ...state,
        specificIPayments: action.payload,
      };
    },
    createPayment: (state, action: PayloadAction<IPayments>) => {
      return {
        ...state,
        payment: [...state.payments, action.payload],
      };
    },
    editPayment: (state, action: PayloadAction<IPayments[]>) => {
      return {
        ...state,
        payment: action.payload,
      };
    },
    deletePayment: (state, action: PayloadAction<string>) => {
      state.payments = state.payments.filter(
        (payment) => payment._id !== action.payload
      );
    },
  },
});

export const {
  getPayment,
  getSpecificPayment,
  createPayment,
  editPayment,
  deletePayment,
} = paymentSlice.actions;
export default paymentSlice.reducer;
