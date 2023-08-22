import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import partnerReducer from "./partnerSlice";

export const store = configureStore({
  reducer: {
    partner: partnerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
