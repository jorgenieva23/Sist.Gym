import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IPartner } from "../../utils/types";

interface partnerState {
  partners: IPartner[];
  specificPartner: IPartner | null;
  historyIncome: Array<{ year: number; incomePerMonth: number[] }>;
  registeredBy: string;
  // registrationDate: Date;
}

const initialState: partnerState = {
  partners: [],
  specificPartner: null,
  historyIncome: [],
  registeredBy: "",
  // registrationDate: "",
};

export const partnerSlice = createSlice({
  name: "partner",
  initialState,
  reducers: {
    getPartner: (state, action: PayloadAction<IPartner[]>) => {
      return {
        ...state,
        partners: action.payload,
      };
    },
    getSpecificPartner: (state, action: PayloadAction<IPartner>) => {
      return {
        ...state,
        specificPartner: action.payload,
      };
    },
    clearSpecificPartner: (state) => {
      return {
        ...state,
        specificPartner: null,
      };
    },
    createPartner: (state, action: PayloadAction<IPartner>) => {
      return {
        ...state,
        partners: [...state.partners, action.payload],
      };
    },
    searchPartners: (state, action: PayloadAction<IPartner[]>) => {
      return {
        ...state,
        partners: action.payload,
      };
    },
    editPartner: (state, action: PayloadAction<IPartner[]>) => {
      return {
        ...state,
        partners: action.payload,
      };
    },
    getHistory(state, action: PayloadAction<[]>) {
      return {
        ...state,
        historyIncome: action.payload,
      };
    },
    deletePartners: (state, action: PayloadAction<string>) => {
      state.partners = state.partners.filter(
        (part) => part._id !== action.payload
      );
    },
    // deletePartners: (state, action: PayloadAction<string>) => {
    //   return {
    //     ...state,
    //     partners: state.partners.filter((part) => part._id !== action.payload),
    //   };
    // },
  },
});

export const {
  getPartner,
  getSpecificPartner,
  clearSpecificPartner,
  createPartner,
  searchPartners,
  editPartner,
  getHistory,
  deletePartners,
} = partnerSlice.actions;
export default partnerSlice.reducer;
