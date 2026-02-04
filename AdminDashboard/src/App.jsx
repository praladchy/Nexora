import Navbar from "./components/Navbar";
import AddProduct from "./pages/AddProduct";
import MarketPlace from "./pages/MarketPlace";
import ProductManag from "./pages/ProductManag";
import { Routes, Route } from "react-router-dom";
import VendorDashboard from "./pages/VendorDashboard";
import Verification from "./pages/verification"
import CreateShop from "./pages/addShop";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { useState } from "react";
function App() {
  const [islogedIn, setIslogedIn] = useState(true);
  return (
    <>
      <Routes>
        {islogedIn && (
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
