import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { PartnerProfile } from "./components/PartnerDetail/PartnerProfile";
import ProtectedRoute from "./context/ProtectedRouted";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { setCredentials } from "./redux/Slices/authSlice";
import { useRolesAction } from "./redux/Actions/rolesAction";
import { LoadingOrNotFound } from "./components/LoadingOrNotFound/LoadingOrNotFound";
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
  const { getAllRoles } = useRolesAction();

  const roles = useAppSelector((state) => state.roles.roles);
  const { userInfo } = useAppSelector((state) => state.auth);

  const userRole = roles.find((role) => role.name === userInfo.rol);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      dispatch(setCredentials(JSON.parse(userInfo)));
      getAllRoles();
    }
  }, [dispatch]);

  const hasPermission = (requiredPermission: any) => {
    return userRole && userRole.permissions.includes(requiredPermission);
  };

  // if (loading || !userLoaded) {
  //   return (
  //     <div>
  //       <Spinner />
  //     </div>
  //   );
  // }

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
            element={
              <LoadingOrNotFound
                hasPermission={hasPermission("index_panel")}
                Component={Home}
                NotFound={NotFound}
              />
            }
          />

          <Route
            path="/partner"
            element={
              <LoadingOrNotFound
                hasPermission={hasPermission("indeSocio")}
                Component={Partner}
                NotFound={NotFound}
              />
            }
          />

          <Route
            path="/partner/:_id"
            element={
              <LoadingOrNotFound
                hasPermission={hasPermission("ShowSocio")}
                Component={PartnerProfile}
                NotFound={NotFound}
              />
            }
          />

          <Route
            path="/payment"
            element={
              <LoadingOrNotFound
                hasPermission={hasPermission("indexCuota")}
                Component={Payment}
                NotFound={NotFound}
              />
            }
          />

          <Route
            path="/promotions"
            element={
              <LoadingOrNotFound
                hasPermission={hasPermission("indexPromocion")}
                Component={Promotion}
                NotFound={NotFound}
              />
            }
          />

          <Route
            path="/income"
            element={
              <LoadingOrNotFound
                hasPermission={hasPermission("indexIngresos")}
                Component={Income}
                NotFound={NotFound}
              />
            }
          />

          <Route
            path="/user"
            element={
              <LoadingOrNotFound
                hasPermission={hasPermission("indexUsuario")}
                Component={User}
                NotFound={NotFound}
              />
            }
          />

          <Route
            path="/balance"
            element={
              <LoadingOrNotFound
                hasPermission={hasPermission("indexBalande")}
                Component={Balance}
                NotFound={NotFound}
              />
            }
          />

          <Route
            path="/movements"
            element={
              <LoadingOrNotFound
                hasPermission={hasPermission("indexMovimiento")}
                Component={Movement}
                NotFound={NotFound}
              />
            }
          />

          <Route
            path="/monthlyPayment"
            element={
              <LoadingOrNotFound
                hasPermission={hasPermission("indexMensualidad")}
                Component={MonthlyPayment}
                NotFound={NotFound}
              />
            }
          />

          <Route
            path="/roles"
            element={
              <LoadingOrNotFound
                hasPermission={hasPermission("indexjob")}
                Component={Roles}
                NotFound={NotFound}
              />
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
        {/* <Route path="/not-found" element={<NotFoundPage />} /> */}
      </Routes>
    </div>
  );
}

export default App;
