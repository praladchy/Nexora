import React, { useState } from "react";
import { useForgatePasswordMutation } from "../components/Redux/auth.slice";
import { useNavigate, useParams } from "react-router-dom";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const {userId}=useParams();
  console.log("dfghjk",userId)
const navigate = useNavigate();
  const [forgatePassword, { isLoading }] =
    useForgatePasswordMutation();

  const handleOnchange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnclick = async (e) => {
    e.preventDefault();

    try {
      const res = await forgatePassword({...formData,userId}).unwrap();
      console.log(res);
      alert(res.message);
      navigate("/login");
    } catch (error) {
      console.log("Failed to reset Password ,please try again",error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-2">
          Reset Password
        </h2>

        <p className="mb-6 text-gray-600">
          Enter your new password.
        </p>

        <form onSubmit={handleOnclick} className="space-y-4">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleOnchange}
            placeholder="New Password"
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleOnchange}
            placeholder="Confirm Password"
            className="w-full p-3 border rounded-lg"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white p-3 rounded-lg"
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;