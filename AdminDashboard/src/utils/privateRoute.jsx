import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const PrivateRoutes = ({permission,element}) => {
  const user = useSelector((state) => state.auth.user);

    if (!user) {
      return <Navigate to="/login" replace />;
    }

    const permissions =
      user.permissions?.map((item) => item.name || item) || [];

    if (permission && !permissions.includes(permission)) {
      return <Navigate to="/403" replace />;
    }

    return element;
  };
