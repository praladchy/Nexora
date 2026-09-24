import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useRefreshTokenQuery } from "./components/Redux/auth.slice";
import {
  setCredentials,
  setInitialized,
} from "./components/Redux/userData.slice.jsx";

import Navbar from "./components/Navbar";

import AddProduct from "./pages/product/AddProduct";
import MarketPlace from "./pages/MarketPlace";
import ProductList from "./pages/product/list.product.jsx";
import VendorDashboard from "./pages/VendorDashboard";
import Verification from "./pages/Verification";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import PermissionCreate from "./pages/permission/create.permission";
import AdminCreate from "./pages/createadmin";
import CreateVendor from "./pages/vendor/vendor.create";
import ListCategory from "./pages/category/List.category";
import CreateShop from "./pages/shop/addShop.jsx";
import PermissionList from "./pages/permission/list.permission.jsx";
import AssignPermission from "./pages/permission/assign.permission.jsx";
import ShopReport from "./pages/shop/shop.report.jsx";
import AdminAssign from "./pages/shop/AdminAssign.shop.jsx";
import OwnerAssign from "./pages/shop/OwnerAssign.shop.jsx";
import ShopList from "./pages/shop/shop.list.jsx";
import CreateAdmin from "./pages/vendor/createAdmin.vendor.jsx";
import CreateCategory from "./pages/category/create.category.jsx";
import ForgotPassword from "./pages/forgatePassword.jsx";
import VerifyForgatePassword from "./pages/VerifyForgatePass.jsx";

import { PrivateRoutes } from "./utils/privateRoute.jsx";

import VendorList from "./pages/vendor/VendorList.jsx";
import CreateShopAdmin from "./pages/shop/createAdmin.shop.jsx";
import CreateShopOwner from "./pages/shop/CreateShopOwner.jsx";

import { socket } from "./service/socket.service.jsx";

import { NotFound } from "./pages/NotFound.jsx";
import { NotificationList } from "./pages/notification/NotificationList.jsx";
import { notificationApiSlice } from "./components/Redux/notifiaction.apiSlice.jsx";

function App() {
  const dispatch = useDispatch();

  const { data, isSuccess, isLoading, isFetching } = useRefreshTokenQuery();

  const user = useSelector((state) => state.auth.user);

  /*
   * ------------------------------------------------
   * Restore authentication from refresh token
   * ------------------------------------------------
   */
  useEffect(() => {
    // Refresh successful
    if (isSuccess && data?.safeuser && data?.accessToken) {
      dispatch(
        setCredentials({
          safeuser: data.safeuser,
          accessToken: data.accessToken,
        }),
      );

      return;
    }

    // Refresh request finished but no valid session
    if (!isLoading && !isFetching) {
      dispatch(setInitialized());
    }
  }, [isSuccess, isLoading, isFetching, data, dispatch]);

  /*
   * ------------------------------------------------
   * Socket connection
   * ------------------------------------------------
   */
  useEffect(() => {
    if (!data?.accessToken) {
      return;
    }

    socket.auth = {
      accessToken: data.accessToken,
    };

    socket.connect();

    const handleWelcome = (data) => {
      console.log("welcome", data);
    };

    const handleNotification = (data) => {
      console.log("newNotification", data);
      notificationApiSlice.util.updateQueryData(
        "getNotification",
        undefined,
        (draft) => {
          draft.data.unshift(data);
        },
      );
    };

    socket.on("welcome", handleWelcome);
    socket.on("newNotification", handleNotification);

    return () => {
      socket.off("welcome", handleWelcome);
      socket.off("newNotification", handleNotification);

      socket.disconnect();
    };
  }, [data?.accessToken]);

  /*
   * ------------------------------------------------
   * Wait for initial refresh request
   * ------------------------------------------------
   */
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Routes>
      {/* =================================================
          PROTECTED ROUTES
          ================================================= */}

      <Route element={<Navbar />}>
        {privateRoutes.map((route, idx) => {
          /*
           * Index route
           * Example:
           * /
           */
          if (route.index) {
            return (
              <Route
                key={idx}
                index
                element={
                  <PrivateRoutes
                    element={route.element}
                    permission={route.permission}
                  />
                }
              />
            );
          }

          /*
           * Normal protected route
           */
          return (
            <Route
              key={idx}
              path={route.path}
              element={
                <PrivateRoutes
                  element={route.element}
                  permission={route.permission}
                />
              }
            />
          );
        })}
      </Route>

      {/* =================================================
          PUBLIC ROUTES
          ================================================= */}

      {publicRoutes.map((route, idx) => (
        <Route
          key={idx}
          path={route.path}
          element={
            route.path === "/login" && user ? (
              <Navigate to="/" replace />
            ) : (
              route.element
            )
          }
        />
      ))}

      {/* =================================================
          FALLBACK
          ================================================= */}

      <Route
        path="*"
        element={
          user ? <Navigate to="/" replace /> : <Navigate to="/login" replace />
        }
      />
    </Routes>
  );
}

export default App;

/*
==========================================================
PRIVATE ROUTES
==========================================================
*/

export const privateRoutes = [
  /*
   * Dashboard
   */
  {
    index: true,
    element: <VendorDashboard />,
  },

  /*
   * Product
   */
  {
    path: "/product/create",
    element: <AddProduct />,
    permission: "product.create",
  },

  {
    path: "/product/list",
    element: <ProductList />,
    permission: "product.list",
  },

  /*
   * Marketplace
   */
  {
    path: "/marketplace",
    element: <MarketPlace />,
    permission: "marketplace.view",
  },

  /*
   * Shop
   */
  {
    path: "/shop/create",
    element: <CreateShop />,
    permission: "shop.create",
  },

  {
    path: "/shop/Report",
    element: <ShopReport />,
    permission: "shop.report",
  },

  {
    path: "/shop/list",
    element: <ShopList />,
    permission: "shop.list",
  },

  {
    path: "/shop/createAdmin",
    element: <CreateShopAdmin />,
    permission: "create.shopAdmin",
  },

  {
    path: "/shop/createShopOwner",
    element: <CreateShopOwner />,
    permission: "create.shopAdmin",
  },

  {
    path: "/shop/assignAdmin",
    element: <AdminAssign />,
    permission: "user.assign_permission",
  },

  {
    path: "/shop/assignOwner",
    element: <OwnerAssign />,
    permission: "user.assign_permission",
  },

  /*
   * Category
   */
  {
    path: "/category/create",
    element: <CreateCategory />,
    permission: "category.create",
  },

  {
    path: "/category/list",
    element: <ListCategory />,
    permission: "category.list",
  },

  /*
   * Permission
   */
  {
    path: "/permission/create",
    element: <PermissionCreate />,
    permission: "permission.create",
  },

  {
    path: "/permissions",
    element: <PermissionList />,
    permission: "permission.list",
  },

  {
    path: "/permission/assign",
    element: <AssignPermission />,
    permission: "user.assign_permission",
  },

  /*
   * Admin
   */
  {
    path: "/createAdmin",
    element: <AdminCreate />,
    permission: "admin.create",
  },

  /*
   * Vendor
   */
  {
    path: "/createVendor",
    element: <CreateVendor />,
    permission: "vendor.create",
  },

  {
    path: "/vendor/createAdmin",
    element: <CreateAdmin />,
    permission: "vendor.create",
  },

  {
    path: "/vendor/list",
    element: <VendorList />,
    permission: "vendor.list",
  },

  /*
   * Notification
   *
   * IMPORTANT:
   * Use the permission that actually exists
   * in your database.
   */
  {
    path: "/notification",
    element: <NotificationList />,
    permission: "product.list",
  },

  /*
   * Not Found
   */
  {
    path: "/*",
    element: <NotFound />,
  },
];

/*
==========================================================
PUBLIC ROUTES
==========================================================
*/

export const publicRoutes = [
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/signup",
    element: <SignUp />,
  },

  {
    path: "/forgot-password/:userId",
    element: <ForgotPassword />,
  },

  {
    path: "/verify-otp/:userId",
    element: <Verification />,
  },

  {
    path: "/verifyotp/:userId",
    element: <VerifyForgatePassword />,
  },
];
