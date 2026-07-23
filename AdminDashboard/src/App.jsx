import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRefreshTokenQuery } from "./components/Redux/auth.slice";
import { setCredentials } from "./components/Redux/userData.slice";

import Navbar from "./components/Navbar";

import AddProduct from "./pages/product/AddProduct";
import MarketPlace from "./pages/MarketPlace";
import ProductManag from "./pages/product/list.product.jsx";
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
import ProductList from "./pages/product/list.product.jsx";

function App() {
  const dispatch = useDispatch();

  const { data, isSuccess, isLoading } = useRefreshTokenQuery();

  useEffect(() => {
    if (isSuccess && data?.safeuser && data?.accessToken) {
      dispatch(
        setCredentials({
          safeuser: data.safeuser,
          accessToken: data.accessToken,
        }),
      );
    }
  }, [isSuccess, data, dispatch]);

  const user = useSelector((state) => state.auth.user);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Routes>
      {/* Protected Routes */}
      {user && (
        <Route element={<Navbar />}>
          {privateRoutes.map((route, idx) =>
            route.index ? (
              <Route key={idx} index element={<PrivateRoutes element={route.element} permission={route.permission}/>} />
            ) : (
              <Route key={idx} path={route.path} element={<PrivateRoutes element={route.element} permission={route.permission}/>} />
            ),
          )}
        </Route>
      )}

      {/* Public Routes */}
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

      {/* Redirect */}
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

// ================= Routes =================

export const privateRoutes = [
  { index: true, element: <VendorDashboard /> },

  {
    path: "/product/create",
    element: <AddProduct />,
    permission: "product.create",
  },
  {
    path: "/product/list",
    element: <ProductManag />,
    permission: "product.list",
  },
  {
    path: "/marketplace",
    element: <MarketPlace />,
    permission: "marketplace.view",
  },
  { path: "/shop/create", element: <CreateShop />, permission: "shop.create" },
  {
    path: "/permission/create",
    element: <PermissionCreate />,
    permission: "permission.create",
  },
  {
    path: "/createAdmin",
    element: <AdminCreate />,
    permission: "admin.create",
  },
  {
    path: "/createVendor",
    element: <CreateVendor />,
    permission: "vendor.create",
  },
  { path: "/shop/Report", element: <ShopReport />, permission: "shop.report" },

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
  {
    path: "/shop/assignOwner",
    element: <OwnerAssign />,
    permission: "user.assign_permission",
  },
  {
    path: "/shop/assignAdmin",
    element: <AdminAssign />,
    permission: "user.assign_permission",
  },
  { path: "/shop/list", element: <ShopList />, permission: "shop.list" },
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
  {
    path: "/product/list",
    element: <ProductList />,
    permission: "product.list",
  },
  {
    path: "/category/list",
    element: <ListCategory />,
    permission: "category.list",
  },

];

export const publicRoutes = [
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/forgot-password/:userId", element: <ForgotPassword /> },
  { path: "/verify-otp/:userId", element: <Verification /> },
  { path: "/verifyotp/:userId", element: <VerifyForgatePassword /> },
];
