import { Routes, Route } from "react-router-dom";
import SignUp from "./page/SignUp"
import Login from "./page/Login";
import ForgotPassword from "./page/ForgatePassword";
import Verification from "./page/verification";
import Home from "./page/Home";
import ProductList from "./components/product/ProductList";
import ShoppingCartPage from "./page/cart";
function App() {

  return (
    <>
    <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp/:userId" element={<Verification />} />
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/product/cart" element={<ShoppingCartPage />} />
      </Routes>
      
    </>
  );
}

export default App;
