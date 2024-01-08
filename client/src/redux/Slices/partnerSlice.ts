import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IPartner } from "../../utils/types";

interface partnerState {
  partners: IPartner[];
  filteredPartners: IPartner[];
  registeredBy: string;
  // registrationDate: Date;
}

const initialState: partnerState = {
  partners: [],
  filteredPartners: [],
  registeredBy: "",
  // registrationDate: "",
};

export const partnerSlice = createSlice({
  name: "partner",
  initialState,
  reducers: {
    updateImage: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        partnerIMG: action.payload,
      };
    },
    getPartner: (state, action: PayloadAction<IPartner[]>) => {
      return {
        ...state,
        partners: action.payload,
        filteredPartners: action.payload,
      };
    },
    updateFilteredPartner: (state, action: PayloadAction<IPartner[]>) => {
      return {
        ...state,
        filteredPartners: action.payload,
      };
    },
  },
});

export const { getPartner, updateFilteredPartner, updateImage } =
  partnerSlice.actions;
export default partnerSlice.reducer;
