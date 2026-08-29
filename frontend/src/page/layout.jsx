import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../navBar/Navbar";
import SubcategorySlider from "../components/CategorySlider/SubcategorySlider";
import Footer from "../components/Footer";

const Layout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">

      {/* =================================================
          NAVBAR
      ================================================== */}

      <Navbar
        onClick={() => setOpen((prev) => !prev)}
      />

      {/* =================================================
          MAIN CONTENT
      ================================================== */}

      <main
        className="
          flex-1
          w-full
          mt-[98px]
          md:mt-[98px]
          px-0
          overflow-x-hidden
        "
      >

        <div className="flex w-full min-h-[calc(100vh-98px)]">

          {/* =================================================
              SIDEBAR
          ================================================== */}

          {open && (
            <>
              {/* ---------------------------------------------
                  MOBILE BACKDROP
              ---------------------------------------------- */}

              <div
                className="
                  fixed
                  inset-0
                  bg-black/40
                  z-[9000]
                  md:hidden
                "
                onClick={() => setOpen(false)}
              />

              {/* ---------------------------------------------
                  SIDEBAR
              ---------------------------------------------- */}

              <aside
                className="
                  fixed
                  top-[98px]
                  left-0
                  bottom-0

                  w-[85%]
                  max-w-[340px]

                  bg-gray-100

                  z-[9001]

                  overflow-y-auto

                  md:static
                  md:z-auto
                  md:w-[250px]
                  lg:w-[280px]
                  xl:w-[300px]
                  md:max-w-none
                  md:shrink-0

                  border-r
                  border-gray-200
                "
              >
                <SubcategorySlider />
              </aside>
            </>
          )}

          {/* =================================================
              PAGE CONTENT
          ================================================== */}

          <section
            className="
              flex-1
              min-w-0
              w-full
              bg-white
            "
          >
            <Outlet />
          </section>

        </div>
      </main>

      {/* =================================================
          FOOTER
      ================================================== */}

      <Footer />

    </div>
  );
};

export default Layout;