import React, { useState } from "react";
import Navbar from "../navBar/Navbar";
import Home from "./Home";
import Footer from "./Footer";
import SubcategorySlider from "../components/CategorySlider/SubcategorySlider";
const Layout = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Navbar onClick={() => setOpen(!open)} />
      <div className="flex">
        <div className={` ${open ? "w-[20%]" : "hidden"}`}>
          <SubcategorySlider />
        </div>

        <div className={` ${open ? "w-[80%]" : "w-full"}`}>
          <Home />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
