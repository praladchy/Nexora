import React, { useState } from "react";
import {
  Sun,
  Moon,
  Bell,
  Search,
  User,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { useSelector } from "react-redux";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  // const userProfile = useSelector((state) => state.user.data);
  // console.log(userProfile);
  return (
    <header
      className={`flex items-center justify-between px-6 py-3 border-b transition-colors duration-300 ${
        isDarkMode
          ? "bg-slate-900 border-slate-700 text-white"
          : "bg-white border-gray-100 text-gray-800"
      }`}
    >
      {/* Left Section: Branding */}
      <div className="flex items-center shrink-0">
        <h1 className="text-xl font-bold text-purple-500">XYZ Vendor</h1>
      </div>

      {/* Middle Section: Search Bar */}
      <div className="flex items-center flex-1 max-w-xl mx-8 space-x-4">
        <span className="text-lg font-semibold hidden lg:block">Welcome!</span>
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search anything..."
            className={`w-full py-2 pl-4 pr-10 text-sm rounded-full border transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              isDarkMode
                ? "bg-slate-800 border-slate-600 text-gray-200 placeholder-gray-500"
                : "bg-gray-50 border-gray-300 text-gray-900"
            }`}
          />
          <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
      </div>

      {/* Right Section: Utilities & Profile */}
      <div className="flex items-center space-x-3">
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`p-2 rounded-full border transition-colors ${
            isDarkMode
              ? "hover:bg-slate-800 border-slate-700"
              : "hover:bg-gray-100 border-gray-200"
          }`}
        >
          {isDarkMode ? (
            <Sun size={18} className="text-yellow-400" />
          ) : (
            <Moon size={18} />
          )}
        </button>

        {/* Notifications */}
        <div
          className={`relative p-2 rounded-full border cursor-pointer transition-colors ${
            isDarkMode
              ? "hover:bg-slate-800 border-slate-700"
              : "hover:bg-gray-100 border-gray-200"
          }`}
        >
          <Bell size={18} />
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white font-bold border-2 border-white dark:border-slate-900">
            5
          </span>
        </div>

        {/* Profile Dropdown Container */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center space-x-3 pl-2 focus:outline-none"
          >
            <div className="text-right leading-tight hidden sm:block">
              <p
                className={`text-sm font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}
              >
                Nabin Islam
              </p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
            <div className="relative">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Nabin"
                alt="User avatar"
                className="h-9 w-9 rounded-full object-cover ring-2 ring-purple-500/20"
              />
              <div className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
            </div>
            <ChevronDown
              size={14}
              className={`transition-transform ${isProfileOpen ? "rotate-180" : ""}`}
            />
          </button>

          {/* Actual Dropdown Menu */}
          {isProfileOpen && (
            <>
              {/* Invisible overlay to close dropdown when clicking outside */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsProfileOpen(false)}
              ></div>

              <div
                className={`absolute right-0 mt-3 w-48 rounded-xl shadow-lg border z-20 overflow-hidden ${
                  isDarkMode
                    ? "bg-slate-800 border-slate-700"
                    : "bg-white border-gray-100"
                }`}
              >
                <div className="py-2">
                  <button
                    className={`flex items-center w-full px-4 py-2 text-sm space-x-2 ${isDarkMode ? "hover:bg-slate-700 text-gray-200" : "hover:bg-gray-50 text-gray-700"}`}
                  >
                    <User size={16} /> <span>My Profile</span>
                  </button>
                  <button
                    className={`flex items-center w-full px-4 py-2 text-sm space-x-2 ${isDarkMode ? "hover:bg-slate-700 text-gray-200" : "hover:bg-gray-50 text-gray-700"}`}
                  >
                    <Settings size={16} /> <span>Settings</span>
                  </button>
                  <hr
                    className={
                      isDarkMode ? "border-slate-700" : "border-gray-100"
                    }
                  />
                  <button className="flex items-center w-full px-4 py-2 text-sm space-x-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                    <LogOut size={16} /> <span>Logout</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
