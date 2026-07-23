import React from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation, useReSendOtpMutation, useSendOtpMutation } from "../redux/auth.slice";
import { setCredentials } from "../redux/userData.slice";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [Login] = useLoginMutation();
  const [forgateEmail, { isLoading }] = useSendOtpMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await Login(formData).unwrap();
      console.log("Login response:", res);
      alert(res.message);

      dispatch(
        setCredentials({
          safeuser: res.safeuser,
          accessToken: res.accessToken,
        }),
      );

      // localStorage.setItem("accessToken", JSON.stringify(res.accessToken));

      navigate("/");
      setFormData({ email: "", password: "" });
    } catch (error) {
      alert(error?.data?.message);
      console.error("Login failed:", error);
    }
  };
  const handleOnclick = async (e) => {
    try {
      e.preventDefault();
      const data = { identifier: formData.email };
      const res = await forgateEmail(data).unwrap();
      console.log(res.userId);

      navigate(`/verifyotp/${res.userId}`);
      
    } catch (error) {
      console.log("error occurs when forgate password", error);
    }
  };
  return (<>
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="text"
            placeholder="Email or Phone"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <div className="text-right">
            <div
              className="text-sm text-blue-600 hover:underline"
              onClick={(e) => handleOnclick(e)}
            >
              Forgot Password?
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <div className="mt-3">
          <NavLink
            to="/signup"
            className="text-sm text-blue-600 hover:underline"
          >
            Don't have an account? Register
          </NavLink>
           <p>login id:chipkii028@gmail.com</p>
          <p>password:1234567890</p>
        </div>
      </div>
    </div>
    <div className="text-center font-semibold">PLZ !Enable third party for login cookies </div></>
  );
};

export default Login;