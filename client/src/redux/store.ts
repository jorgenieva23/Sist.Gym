import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import partnerReducer from "./Slices/partnerSlice";
import incomeReducer from "./Slices/incomeSlice";
import userReducer from "./Slices/userSlice";

export const store = configureStore({
  reducer: {
    partner: partnerReducer,
    income: incomeReducer,
    user: userReducer,
  },
});

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
