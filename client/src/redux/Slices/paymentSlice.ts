import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IPayments } from "../../utils/types";

interface paymentState {
  payments: IPayments[];
  paymentExpired: {
    dueToday: IPayments[];
    dueTomorrow: IPayments[];
  };
  specificIPayments: IPayments | null;
  historyPaymentDay: Array<{ year: number; gainsPerDay: number[] }>;
  historyPaymentMonth: Array<{ year: number; gainsPerMonth: number[] }>;
}

const initialState: paymentState = {
  payments: [],
  paymentExpired: {
    dueToday: [],
    dueTomorrow: [],
  },
  specificIPayments: null,
  historyPaymentDay: [],
  historyPaymentMonth: [],
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
    PaymentGetStats(state, action) {
      return {
        ...state,
        paymentExpired: action.payload,
      };
    },
    getHistoryPaymentDay(state, action: PayloadAction<[]>) {
      return {
        ...state,
        historyPaymentDay: action.payload,
      };
    },
    getHistoryPaymentMonth(state, action: PayloadAction<[]>) {
      return {
        ...state,
        historyPaymentMonth: action.payload,
      };
    },

    createPayment: (state, action: PayloadAction<IPayments>) => {
      return {
        ...state,
        payments: [...state.payments, action.payload],
      };
    },
    editPayment: (state, action: PayloadAction<IPayments[]>) => {
      return {
        ...state,
        payments: action.payload,
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
  PaymentGetStats,
  getHistoryPaymentDay,
  getHistoryPaymentMonth,
  createPayment,
  editPayment,
  deletePayment,
} = paymentSlice.actions;
export default paymentSlice.reducer;
