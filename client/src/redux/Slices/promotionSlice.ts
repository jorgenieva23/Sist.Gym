import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IPromotion } from "../../utils/types";

interface promotionState {
  promotions: IPromotion[];
  specificPromotions: IPromotion | null;
}

const initialState: promotionState = {
  promotions: [],
  specificPromotions: null,
};

export const promotionSlice = createSlice({
  name: "promotion",
  initialState,
  reducers: {
    getPromotion: (state, action: PayloadAction<IPromotion[]>) => {
      return {
        ...state,
        promotions: action.payload,
      };
    },
    getSpecificPromotion: (state, action: PayloadAction<IPromotion>) => {
      return {
        ...state,
        specificPromotions: action.payload,
      };
    },
    createPromotion: (state, action: PayloadAction<IPromotion>) => {
      return {
        ...state,
        promotions: [...state.promotions, action.payload],
      };
    },
    editPromotion: (state, action: PayloadAction<IPromotion[]>) => {
      return {
        ...state,
        promotions: action.payload,
      };
    },
    deletePromotion: (state, action: PayloadAction<string>) => {
      state.promotions = state.promotions.filter(
        (promotion) => promotion._id !== action.payload
      );
    },
  },
});

export const {
  getPromotion,
  getSpecificPromotion,
  createPromotion,
  editPromotion,
  deletePromotion,
} = promotionSlice.actions;
export default promotionSlice.reducer;
