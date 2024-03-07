import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
// import ProtectedRoute from "./context/ProtectedRouted";
// import { useAuth } from "./context/AuthProvider";
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
} from "./pages";

const App: React.FC = (): JSX.Element => {
  // const auth = useAuth();
  // const [isAdmin, setIsAdmin] = useState(false);
  // const [isUser, setIsUser] = useState(false);
  // const [isDevelop, setIsDevelop] = useState(false);

  // useEffect(() => {
  //   const userRole = auth.getUser()?.rol;
  //   setIsAdmin(userRole === "admin");
  //   setIsUser(userRole === "user");
  //   setIsDevelop(userRole === "developer");
  // }, [auth]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/" element={<ProtectedRoute />}> */}
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
        {/* </Route> */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </div>
  );
};

export default App;

{
  /* <Route path="/" element={<ProtectedRoute />}>
          <Route
            path="home"
            element={(isUser && <Home />) || (isAdmin && <Home />)}
          />
          <Route
            path="partner"
            element={(isUser && <Partner />) || (isAdmin && <Partner />)}
          />
          <Route
            path="payment"
            element={(isUser && <Payment />) || (isAdmin && <Payment />)}
          />
          <Route
            path="promotions"
            element={(isUser && <Promotion />) || (isAdmin && <Promotion />)}
          />
          <Route
            path="income"
            element={(isUser && <Income />) || (isAdmin && <Income />)}
          />
          <Route path="user" element={isAdmin && <User />} />
          <Route path="balance" element={isAdmin && <Balance />} />
          <Route path="movements" element={isAdmin && <Movements />} />
          <Route
            path="monthlyPayment"
            element={isAdmin && <MonthlyPayment />}
          />
          <Route path="roles" element={isAdmin && <Roles />} /> */
}
