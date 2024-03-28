import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { PartnerDetail } from "./components/PartnerDetail/PartnerDetail";
import ProtectedRoute from "./context/ProtectedRouted";
import { useAppDispatch } from "./redux/hooks";
import { setCredentials } from "./redux/Slices/authSlice";
import {
  Profile,
  Home,
  Balance,
  Income,
  MonthlyPayment,
  Movement,
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
          <Route path="/partner/:_id" element={<PartnerDetail />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/promotions" element={<Promotion />} />
          <Route path="/income" element={<Income />} />
          <Route path="/user" element={<User />} />
          <Route path="/balance" element={<Balance />} />
          <Route path="/movements" element={<Movement />} />
          <Route path="/monthlyPayment" element={<MonthlyPayment />} />
          <Route path="/roles" element={<Roles />} />
        </Route>
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </div>
  );
}

export default App;
