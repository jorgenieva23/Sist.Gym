import { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { PartnerDetail } from "./components/PartnerDetail/PartnerDetail";
import ProtectedRoute from "./context/ProtectedRouted";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
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
  const user = useAppSelector((state) => state.auth.userInfo);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      dispatch(setCredentials(JSON.parse(userInfo)));
    }
  }, [dispatch]);

  const hasAccess = (role: string): boolean => {
    if (user && user.rol) {
      switch (role) {
        case "admin":
          return user.rol === "admin";
        case "user":
          return ["admin", "user"].includes(user.rol);
        case "partner":
          return ["admin", "partner"].includes(user.rol);
        case "developer":
          return ["admin", "developer"].includes(user.rol);
        default:
          return false;
      }
    }
    return false;
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {hasAccess("admin") && (
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
        )}
        {hasAccess("user") && (
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/home" element={<Home />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/promotions" element={<Promotion />} />
            <Route path="/income" element={<Income />} />
            <Route path="/user" element={<User />} />
          </Route>
        )}
        {hasAccess("partner") && (
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/home" element={<Home />} />
            <Route path="/partner" element={<Partner />} />
            <Route path="/partner/:_id" element={<PartnerDetail />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/promotions" element={<Promotion />} />
            <Route path="/income" element={<Income />} />
          </Route>
        )}
        {hasAccess("developer") && (
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/home" element={<Home />} />
            <Route path="/movements" element={<Movement />} />
            <Route path="/monthlyPayment" element={<MonthlyPayment />} />
            <Route path="/roles" element={<Roles />} />
          </Route>
        )}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </div>
  );
}

export default App;
