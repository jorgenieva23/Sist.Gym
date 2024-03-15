import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./context/ProtectedRouted";
import { useAppDispatch } from "./redux/hooks";
import { setCredentials } from "./redux/Slices/authSlice";
import {
  Profile,
  Home,
  Balance,
  Income,
  MonthlyPayment,
  Movements,
  Partner,
  Roles,
  User,
  Promotion,
  Payment,
  Login,
  Signup,
} from "./pages";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Carga la información del usuario desde el almacenamiento local cuando la aplicación se carga
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      dispatch(setCredentials(JSON.parse(userInfo)));
    }
  }, [dispatch]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/home" element={<Home />} />
          <Route path="/partner" element={<Partner />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/promotions" element={<Promotion />} />
          <Route path="/income" element={<Income />} />
          <Route path="/user" element={<User />} />
          <Route path="/balance" element={<Balance />} />
          <Route path="/movements" element={<Movements />} />
          <Route path="/monthlyPayment" element={<MonthlyPayment />} />
          <Route path="/roles" element={<Roles />} />
        </Route>
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </div>
  );
}

export default App;
