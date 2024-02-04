import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IRoles } from "../../utils/types";

interface rolesState {
  roles: IRoles[];
  specificRole: IRoles | null;
  registerdBy: string;
}

const initialState: rolesState = {
  roles: [],
  specificRole: null,
  registerdBy: "",
};

export const rolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    getRoles: (state, action: PayloadAction<IRoles[]>) => {
      return {
        ...state,
        roles: action.payload,
      };
    },
    createRoles: (state, action: PayloadAction<IRoles>) => {
      return {
        ...state,
        partners: [...state.roles, action.payload],
      };
    },
  },
});

export const { getRoles, createRoles } = rolesSlice.actions;
export default rolesSlice.reducer;
