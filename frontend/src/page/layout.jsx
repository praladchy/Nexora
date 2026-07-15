import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../navBar/Navbar";
import Footer from "./Footer";
import SubcategorySlider from "../components/CategorySlider/SubcategorySlider";

const Layout = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Navbar onClick={() => setOpen(!open)} />

      <div className="flex mt-[6.1rem] pt-4">
        {open && (
          <div className="w-[20%] bg-gray-100">
            <SubcategorySlider />
          </div>
        )}

        <div className={open ? "w-[80%]" : "w-full"}>
          <Outlet />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Layout;