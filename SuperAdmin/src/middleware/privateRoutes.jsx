import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = ({ allowRoutes = [] }) => {
  const { accessToken, user } = useSelector((state) => state.auth);
  if (!accessToken || !user) return <Navigate to="/login" />;
  if (!allowRoutes.includes(user.permission)) return <Navigate to="*" />;

  return <Outlet />;
};
