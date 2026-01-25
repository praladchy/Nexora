import React from "react";
import {  Route, Routes } from "react-router-dom";

import SignUp from "../page/SignUp";
import Login from "../page/Login";
import ForgotPassword from "../page/ForgatePassword";
import Verification from "../page/verification";
import Home from "../page/Home";

const NavRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<Verification />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
};

export default NavRouter;
