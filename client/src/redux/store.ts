import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import partnerReducer from "./Slices/partnerSlice";
import incomeReducer from "./Slices/incomeSlice";
import userReducer from "./Slices/userSlice";
import rolesReducers from "./Slices/rolesSlice";
import movementReducer from "./Slices/movementSlice"
import paymentReducer from "./Slices/paymentSlice";
import promotionReducer from "./Slices/promotionSlice";
import authReducers from "./Slices/authSlice";

export const store = configureStore({
  reducer: {
    partner: partnerReducer,
    income: incomeReducer,
    movement:movementReducer,
    payment: paymentReducer,
    promotion:promotionReducer,
    user: userReducer,
    roles: rolesReducers,
    auth: authReducers,
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
