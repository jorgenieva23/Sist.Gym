import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IRoles, IPermission } from "../../utils/types";

interface rolesState {
  permissions: IPermission[];
  roles: IRoles[];
  specificRole: IRoles | null;
  registerdBy: string;
}

const initialState: rolesState = {
  permissions: [],
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
    getPermission: (state, action: PayloadAction<IPermission[]>) => {
      return {
        ...state,
        permissions: action.payload,
      };
    },
    getSpecificRole: (state, action: PayloadAction<IRoles>) => {
      return {
        ...state,
        specificRole: action.payload,
      };
    },
    createRoles: (state, action: PayloadAction<IRoles>) => {
      return {
        ...state,
        roles: [...state.roles, action.payload],
      };
    },
    editRoles: (state, action: PayloadAction<IRoles>) => {
      return {
        ...state,
        specificRole: action.payload,
      };
    },
    deleteRoles: (state, action: PayloadAction<string>) => {
      state.roles = state.roles.filter((rol) => rol._id !== action.payload);
    },
  },
});

export const {
  getRoles,
  getPermission,
  getSpecificRole,
  createRoles,
  editRoles,
  deleteRoles,
} = rolesSlice.actions;
export default rolesSlice.reducer;
