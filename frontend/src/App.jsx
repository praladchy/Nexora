import { Routes, Route } from "react-router-dom";
import SignUp from "./page/SignUp";
import Login from "./page/Login";
import ForgotPassword from "./page/ForgatePassword";
import Verification from "./page/verification";
import Home from "./page/Home";
import ProductList from "./components/product/ProductList";
import ShoppingCartPage from "./page/cart";
import { useDispatch, useSelector } from "react-redux";
import { useRefreshTokenQuery } from "./redux/auth.slice";
import { useEffect } from "react";
import { setCredentials } from "./redux/userData.slice";
import CategorySlider from "./components/CategorySlider/CategorySlider";
import HeroSectionSlider from "./components/CategorySlider/HeroSectionSlider";
import SubcategorySlider from "./components/CategorySlider/SubcategorySlider";
import Layout from "./page/layout";
import ProductDetails from "./components/product/ProductDetails";
import VerifyForgatePassword from "./page/verifyForgatePassword";
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

  console.log("mnbvcxz", user);
  if (isLoading) return <h1>Loading...</h1>;

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="products" element={<ProductList />} />
        <Route path="category/products" element={<ProductList />} />

        <Route path="product/productdetails/:id" element={<ProductDetails />} />

        <Route path="product/cart" element={<ShoppingCartPage />} />
      </Route>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password/:userId" element={<ForgotPassword />} />
      <Route path="/verifyotp/:userId" element={<VerifyForgatePassword />} />
      <Route path="/verify-otp/:userId" element={<Verification />} />
    </Routes>
  );
}

export default App;
