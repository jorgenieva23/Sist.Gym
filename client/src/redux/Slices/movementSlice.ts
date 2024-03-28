import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IMovement } from "../../utils/types";

interface movementState {
  movement: IMovement[];
  registeredBy: string;
}

const initialState: movementState = {
  movement: [],
  registeredBy: "",
};

export const movementSlice = createSlice({
  name: "movement",
  initialState,
  reducers: {
    getMovement: (state, action: PayloadAction<IMovement[]>) => {
      return {
        ...state,
        movement: action.payload,
      };
    },
    // fetchMovement: (state, action: PayloadAction<IMovement[]>) => {
    //   return {
    //     ...state,
    //     movement: action.payload,
    //   };
    // },
    // createMovement: (state, action: PayloadAction<IMovement>) => {
    //   return {
    //     ...state,
    //     movement: [...state.movement, action.payload],
    //   };
    // },
    // editMovement: (state, action: PayloadAction<IMovement[]>) => {
    //   return {
    //     ...state,
    //     movement: action.payload,
    //   };
    // },
  },
});

export const {
  getMovement,
  // fetchMovement,
  // createMovement,
  // editMovement
} = movementSlice.actions;
export default movementSlice.reducer;
