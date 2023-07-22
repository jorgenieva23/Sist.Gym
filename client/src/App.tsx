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
} from "./pages";
import { Route, Routes } from "react-router-dom";

const App: React.FC = (): JSX.Element => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/partner" element={<Partner />} />
        <Route path="/payment" element={<Roles />} />
        <Route path="/promotions" element={<User />} />
        <Route path="/income" element={<Income />} />
        <Route path="/user" element={<User />} />
        <Route path="/balance" element={<Balance />} />
        <Route path="/movements" element={<Movements />} />
        <Route path="/monthlyPayment" element={<MonthlyPayment />} />
        <Route path="/roles" element={<Roles />} />
       
      </Routes>
    </div>
  );
};

export default App;
