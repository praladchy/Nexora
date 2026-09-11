import Sidebar from "./layout/Sidebar";
import Header from "./layout/Header";
import { Outlet } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <Header />

      <div className="flex bg-gray-50 min-h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1  ">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Navbar;
