import React from 'react';

const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Forgot Password?</h2>
        <p className="text-gray-600 mb-6">Enter your details to reset your password.</p>
        <form className="space-y-4 text-left">
          <input type="text" placeholder="Email or Phone" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          <button className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition">Send Reset Code</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;