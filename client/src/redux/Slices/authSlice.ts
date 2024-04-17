import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { registerUser, userLogin } from "../Actions/authActions";
import { IUser } from "../../utils/types";

const accessToken = localStorage.getItem("accessToken")
  ? localStorage.getItem("accessToken")
  : null;

export interface authState {
  loading: boolean;
  userInfo: IUser;
  // userInfo: IUser[];
  accessToken: string | null;
  error: string | undefined | null;
  success: boolean;
}

export const initialState: authState = {
  loading: false,
  // userInfo: [],
  userInfo: {} as IUser,
  accessToken,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("accessToken"); // deletes token from storage
      state.loading = false;
      // state.userInfo = [];
      state.userInfo = {} as IUser;
      state.accessToken = null;
      state.error = null;
    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    // builder.addCase(
    //   userLogin.fulfilled,
    //   (state, action: PayloadAction<{ accessToken: string; user: IUser }>) => {
    //     state.loading = false;
    //     state.userInfo.push(action.payload.user); // Agrega el usuario al array
    //     state.accessToken = action.payload.accessToken;
    //   }
    // );
    builder.addCase(
      userLogin.fulfilled,
      (state, action: PayloadAction<{ accessToken: string; user: IUser }>) => {
        state.loading = false;
        state.userInfo = action.payload.user; // Asigna el usuario directamente
        state.accessToken = action.payload.accessToken;
      }
    );
    builder.addCase(userLogin.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(registerUser.pending, (state) => {
      return {
        ...state,
        loading: true,
        error: null,
      };
    });
    builder.addCase(
      registerUser.fulfilled,
      (state, action: PayloadAction<any>) => {
        return {
          ...state,
          success: true,
          userToken: action.payload.accessToken,
        };
      }
    );
    builder.addCase(registerUser.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    });
  },
});

export const { setCredentials } = authSlice.actions;
export default authSlice.reducer;
