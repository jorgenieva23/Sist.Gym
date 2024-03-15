import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

export default function ProtectedRoute() {
  const { userInfo, accessToken } = useAppSelector((state) => state.auth);

  return userInfo && accessToken ? <Outlet /> : <Navigate to="/" />;
}
