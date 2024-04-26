import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { PartnerProfile } from "./components/PartnerDetail/PartnerProfile";
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
  NotFound,
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

  const roles = useAppSelector((state) => state.roles.roles);
  const user = useAppSelector((state) => state.auth.userInfo);

  const userRole = roles.find((role) => role.name === user.rol);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      dispatch(setCredentials(JSON.parse(userInfo)));
    }
  }, [dispatch]);

  const hasPermission = (requiredPermission: any) => {
    return userRole && userRole.permissions.includes(requiredPermission);
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route
            path="/profile"
            element={hasPermission("ShowSocio") ? <Profile /> : <NotFound />}
          />

          <Route
            path="/home"
            element={hasPermission("index_anel") ? <Home /> : <NotFound />}
          />

          <Route
            path="/partner"
            element={hasPermission("indeSocio") ? <Partner /> : <NotFound />}
          />

          <Route
            path="/partner/:_id"
            element={
              hasPermission("ShowSocio") ? <PartnerProfile /> : <NotFound />
            }
          />

          <Route
            path="/payment"
            element={hasPermission("indexCuota") ? <Payment /> : <NotFound />}
          />

          <Route
            path="/promotions"
            element={
              hasPermission("indexPromocion") ? <Promotion /> : <NotFound />
            }
          />

          <Route
            path="/income"
            element={hasPermission("indexIngresos") ? <Income /> : <NotFound />}
          />

          <Route
            path="/user"
            element={hasPermission("indexUsuario") ? <User /> : <NotFound />}
          />

          <Route
            path="/balance"
            element={hasPermission("indexBalande") ? <Balance /> : <NotFound />}
          />

          <Route
            path="/movements"
            element={
              hasPermission("indexMovimiento") ? <Movement /> : <NotFound />
            }
          />

          <Route
            path="/monthlyPayment"
            element={
              hasPermission("indexMensualidad") ? (
                <MonthlyPayment />
              ) : (
                <NotFound />
              )
            }
          />

          <Route
            path="/roles"
            element={hasPermission("indexjob") ? <Roles /> : <NotFound />}
          />
        </Route>
        <Route path="*" element={<NotFound />} />
        {/* <Route path="/not-found" element={<NotFoundPage />} /> */}
      </Routes>
    </div>
  );
}

export default App;
