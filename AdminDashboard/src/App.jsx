import Navbar from "./components/Navbar";
import AddProduct from "./pages/AddProduct";
import MarketPlace from "./pages/MarketPlace";
import ProductManag from "./pages/ProductManag";
import { Routes, Route } from "react-router-dom";
import VendorDashboard from "./pages/VendorDashboard";
import Verification from "./pages/verification";
import CreateShop from "./pages/addShop";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { useRefreshTokenQuery } from "./components/Redux/auth.slice";
import { setCredentials } from "./components/Redux/userData.slice";
function App() {
 const dispatch = useDispatch();
  const { data, isSuccess } = useRefreshTokenQuery();
console.log("Data from refresh token:", data);
  // Dispatch user + accessToken after refresh token resolves
  useEffect(() => {
    if (isSuccess && data?.safeuser && data?.accessToken) {
      dispatch(
        setCredentials({
          safeuser: data.safeuser,      // matches slice
          accessToken: data.accessToken
        })
      );
    }
  }, [isSuccess, data, dispatch]);

  // Selector
  const user = useSelector((state) => state.authApi.user);
  const accessToken = useSelector((state) => state.authApi.accessToken);

  // Safe logging
  useEffect(() => {
    if (user) console.log("User from selector:", user);
    if (accessToken) console.log("Access token from selector:", accessToken);
  }, [user, accessToken]);
  return (
    <>
      <Routes>
        {user && (
          <Route path="/" element={<Navbar />}>
            <Route index element={<VendorDashboard />} />
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/marketplace" element={<MarketPlace />} />
            <Route path="/productmanag" element={<ProductManag />} />
            <Route path="/addShop" element={<CreateShop />} />
          </Route>
        )}
        <Route path="/login" element={<Login />} />
        <Route path="/Signup" element={<SignUp />} />

        <Route path="/verify-otp/:userId" element={<Verification />} />

        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
