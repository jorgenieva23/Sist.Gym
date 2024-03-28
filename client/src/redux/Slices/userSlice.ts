import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../utils/types";

export interface userState {
  users: IUser[];
  specificUser: IUser[];
  user: IUser | null;
}

export const initialState: userState = {
  users: [],
  specificUser: [],
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser: (state, action: PayloadAction<IUser[]>) => {
      return {
        ...state,
        users: action.payload,
      };
    },
    getSpecificUser: (state, action: PayloadAction<IUser[]>) => {
      return {
        ...state,
        specificUser: action.payload,
      };
    },
    createUser: (state, action: PayloadAction<IUser>) => {
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    },
    searchUser: (state, action: PayloadAction<IUser[]>) => {
      return {
        ...state,
        users: action.payload,
      };
    },
    editUser: (state, action: PayloadAction<IUser[]>) => {
      return {
        ...state,
        users: action.payload,
      };
    },
    deleteUser: (state, action: PayloadAction<IUser[]>) => {
      return {
        ...state,
        users: action.payload,
      };
    },
  },
});
export const {
  getUser,
  getSpecificUser,
  createUser,
  searchUser,
  editUser,
  deleteUser,
} = userSlice.actions;
export default userSlice.reducer;
