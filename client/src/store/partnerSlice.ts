import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getItem, setItem } from "../components/localStorage/localStorage";
import { IPartner } from "../utils/types";

interface partnerState {
  partnerIMG: string;
  partners: IPartner[];
  filteredPartners: IPartner[];
}

const localStorageState = getItem("partnerState");

const initialState: partnerState = localStorageState
  ? localStorageState
  : {
      partnerIMG: "",
      partners: [],
      filteredPartners: [],
    };

export const partnerSlice = createSlice({
  name: "partner",
  initialState,
  reducers: {
    updateIame: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        partnerIMG: action.payload,
      };
    },
    fetchPartner: (state, action: PayloadAction<IPartner[]>) => {
      const newState = {
        ...state,
        partner: action.payload,
        filteredPartners: action.payload,
      };
      setItem("partnerState", newState);
      return newState;
    },
  },
});
