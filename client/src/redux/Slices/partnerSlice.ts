import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IPartner } from "../../utils/types";

interface partnerState {
  partners: IPartner[];
  specificPartner: IPartner | null;
  registeredBy: string;
  // registrationDate: Date;
}

const initialState: partnerState = {
  partners: [],
  specificPartner: null,
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
    deletePartners: (state, action: PayloadAction<IPartner[]>) => {
      return {
        ...state,
        partners: action.payload,
      };
    },
  },
});

export const {
  getPartner,
  getSpecificPartner,
  createPartner,
  searchPartners,
  editPartner,
  deletePartners,
} = partnerSlice.actions;
export default partnerSlice.reducer;
