import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import partnerReducer from "./partnerSlice";
import incomereducer from "./incomeState"

export const store = configureStore({
  reducer: {
    partner: partnerReducer,
    income: incomereducer,
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
