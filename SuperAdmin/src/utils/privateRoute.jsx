import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const PrivateRoutes = ({ permission, element }) => {
  const user = useSelector((state) => state.auth.user);

  const isInitialized = useSelector(
    (state) => state.auth.isInitialized
  );

  /*
   * Auth is still being restored
   */
  if (!isInitialized) {
    return <h1>Loading...</h1>;
  }

  /*
   * No authenticated user
   */
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  /*
   * Get permission names
   */
  const permissions =
    user.permissions?.map(
      (item) => item.name || item
    ) || [];

  console.log("PRIVATE ROUTE", {
    permission,
    permissions,
    user: user?._id,
    isInitialized,
  });

  /*
   * Permission check
   */
  if (
    permission &&
    !permissions.includes(permission)
  ) {
    return <Navigate to="/403" replace />;
  }

  /*
   * Authorized
   */
  return element;
};