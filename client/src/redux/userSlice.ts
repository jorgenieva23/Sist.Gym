import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backLOCAL } from "../main";
// import { IUser } from "../utils/types";

export interface userState {
  id: string;
  name: string;
  email: string;
  password: string;
  image: string;
  rol: string;
  token: string | null;
  registerStatus: string;
  registerError: string | null; // Cambio en el tipo de registerError
  loginStatus: string;
  loginError: string;
  userLoader: boolean;
}

interface UserCredentials {
  name: string;
  email: string;
  password: string;
  image: string;
  rol: string;
}

export const registerUser = createAsyncThunk<
  string,
  UserCredentials,
  { rejectValue: string }
>("auth/registerUser", async (value, { rejectWithValue }) => {
  try {
    const token = await axios.post<string>(`${backLOCAL}/register`, {
      name: value.name,
      email: value.email,
      password: value.password,
      image: value.image,
      rol: value.rol,
    });
    localStorage.setItem("token", token.data);
    return token.data;
  } catch (error: any) {
    console.log(error.response.data);
    return rejectWithValue(error.response.data);
  }
});

const initialState: userState = {
  id: "",
  name: "",
  email: "",
  password: "",
  image: "",
  rol: "",
  token:  localStorage.getItem("token"),
  registerStatus: "",
  registerError: null,
  loginStatus: "",
  loginError: "",
  userLoader: false,
}

const authSlice = createSlice({
  name:"auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.registerStatus ="pending";
    })
    builder.addCase(registerUser.fulfilled, (state, { payload }) =>{
      state.registerStatus ="fulfilled";
      state.token = payload;
    })
    builder.addCase(registerUser.fulfilled, (state, { payload }) =>{
      state.registerStatus ="rejeted";
      state.registerError = payload ?? state.registerError
    });
  },
});

export default authSlice.reducer;
