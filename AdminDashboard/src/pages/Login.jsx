import React from "react";
import { useState } from "react";
// import { useDispatch } from "react-redux";
import { useLoginMutation } from "../components/Redux/auth.slice";
import { setCredentials  } from "../components/Redux/userData.slice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [Login] = useLoginMutation();
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
      dispatch(setCredentials(res.accessToken));

      // localStorage.setItem("accessToken", JSON.stringify(res.accessToken));

      navigate("/");
      setFormData({ email: "", password: "" });
    } catch (error) {
      alert(error?.data?.message);
      console.error("Login failed:", error.data.message);
    }
  };
  return (
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
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
