import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../utils/types";

interface userState {
  users: IUser[];
  token?: string;
  registerError?: string;
}

const initialState: userState = {
  users: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser: (state, action: PayloadAction<IUser[]>) => {
      return {
        ...state,
        users: action.payload,
      };
    },
    getSpecificUser: (state, action: PayloadAction<IUser>) => {
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
