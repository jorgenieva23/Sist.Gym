import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../AuthProvider/AuthProvider";

export default function ProtectedRoute() {
  const auth = useAuth();

  return auth.isAuthenticate ? <Outlet /> : <Navigate to="/" />;
}
