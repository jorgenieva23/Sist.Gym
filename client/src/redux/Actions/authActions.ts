import axios from "axios";
import { IUser } from "../../utils/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const registerUser = createAsyncThunk<
  string,
  IUser,
  { rejectValue: string }
>("auth/registerUser", async (value, { rejectWithValue }) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const user = await axios.post(
      `/user/create`,
      {
        name: value.name,
        email: value.email,
        password: value.password,
      },
      config
    );
    localStorage.setItem("userToken", user.data.accessToken);
    return user.data;
  } catch (error: any) {
    console.log(error.response.data);
    return rejectWithValue(error.response.data);
  }
});

export const userLogin = createAsyncThunk(
  "auth/login",
  async (user: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        `/user/login`,
        {
          email: user.email,
          password: user.password,
        },
        config
      );
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("userInfo", JSON.stringify(response.data.user));
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  async (_id: string, thunkAPI) => {
    try {
      const response = await axios.post(`/user/logout/${_id}`);
      localStorage.removeItem("userInfo");
      localStorage.removeItem("accessToken");
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
