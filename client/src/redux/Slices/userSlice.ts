import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IUser } from "../../utils/types";

interface userState {
  users: IUser[];
  registerStatus: "idle" | "pending" | "fulfilled" | "rejected";
  token?: string;
  registerError?: string;
}

const initialState: userState = {
  users: [],
  registerStatus: "idle",
};

export const registerUser = createAsyncThunk<
  string,
  IUser,
  { rejectValue: string }
>("auth/registerUser", async (value, { rejectWithValue }) => {
  try {
    const token = await axios.post<string>(`/register`, {
      name: value.name,
      email: value.email,
      password: value.password,
      rol: value.rol,
    });
    localStorage.setItem("token", token.data);
    return token.data;
  } catch (error: any) {
    console.log(error.response.data);
    return rejectWithValue(error.response.data);
  }
});

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
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.registerStatus = "pending";
    });
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      state.registerStatus = "fulfilled";
      state.token = payload;
    });
    builder.addCase(registerUser.rejected, (state, { payload }) => {
      state.registerStatus = "rejected";
      state.registerError =
        payload ?? "Unknown error occurred during registration.";
    });
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
