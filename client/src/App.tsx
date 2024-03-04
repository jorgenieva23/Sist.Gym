import React from "react";
import {
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
  // NotFoundPage
} from "./pages";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./context/ProtectedRouted";

const App: React.FC = (): JSX.Element => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="home" element={<Home />} />
          <Route path="partner" element={<Partner />} />
          <Route path="payment" element={<Payment />} />
          <Route path="promotions" element={<Promotion />} />
          <Route path="income" element={<Income />} />
          <Route path="user" element={<User />} />
          <Route path="balance" element={<Balance />} />
          <Route path="movements" element={<Movements />} />
          <Route path="monthlyPayment" element={<MonthlyPayment />} />
          <Route path="roles" element={<Roles />} />
        </Route>
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </div>
  );
};

export default App;
