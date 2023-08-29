import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AppThunk } from "./store";
import { getItem, setItem } from "../components/localStorage/localStorage";
import { IPartner } from "../utils/types";
import { backLOCAL } from "../main";
import axios from "axios";

interface partnerState {
  partnerIMG: string;
  partners: IPartner[];
  filteredPartners: IPartner[];
  registeredBy: string;
  registrationDate: Date;
}

const localStorageState = getItem("partnerState");

const initialState: partnerState = localStorageState
  ? localStorageState
  : {
      partnerIMG: "",
      partners: [],
      filteredPartners: [],
      registeredBy: "",
      registrationDate: ""
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
    fetchPartner: (state, action: PayloadAction<IPartner[]>) => {
      const newState = {
        ...state,
        partners: action.payload,
        filteredPartners: action.payload,
      };
      setItem("partnerState", newState);
      return newState;
    },
    updateFilteredPartner: (state, action: PayloadAction<IPartner[]>) => {
      const newState = {
        ...state,
        filteredPartners: action.payload,
      };
      setItem("partnerState", newState);
      return newState;
    },
  },
});

export const getPartner = (): AppThunk => {
  return async (dispatch) => {
    try {
      const rawData = await axios.get(`${backLOCAL}/partner`);
      const response = rawData.data;
      dispatch(fetchPartner(response));
    } catch (error) {
      console.error("Error fetching partner data:", error);
    }
  };
};

export const getPartnerByName = (name: string): AppThunk => {
  return async (dispatch) => {
    try {
      const rawData = await axios.get(
        `${backLOCAL}/partner?name=${name}`
      );
      const response = rawData.data;
      dispatch(fetchPartner(response));
    } catch (error) {
      console.error("Error fetching partner data:", error);
    }
  };
};

export const { fetchPartner, updateFilteredPartner, updateImage } =
  partnerSlice.actions;
export default partnerSlice.reducer;
