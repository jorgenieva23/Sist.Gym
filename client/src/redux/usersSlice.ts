import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { backLOCAL } from "../main";
import { IUser } from "../utils/types";

interface UserState {
  users: IUser[];
}

const initialState: UserState = {
  users: [],
};
