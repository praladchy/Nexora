import {
  MapPin,
  ChevronDown,
  Search,
  ShoppingCart,
  Menu,
} from "lucide-react";

import logo from "../../public/logo.png";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import UserProfile from "./UserProfile";

import { useState } from "react";

import { useGetCartQuery } from "../redux/cart.slice";

export default function Navbar({ onClick }) {
  const navigate = useNavigate();

  // ==========================================
  // USER
  // ==========================================

  const user = useSelector(
    (state) => state.auth.user
  );

  // ==========================================
  // CART
  // ==========================================

  const { data } = useGetCartQuery();

  const cartItems =
    data?.cart?.length || 0;

  // ==========================================
  // PROFILE
  // ==========================================

  const [profileOpen, setProfileOpen] =
    useState(false);

  const toggleProfile = () => {
    setProfileOpen((prev) => !prev);
  };

  const closeProfile = () => {
    setProfileOpen(false);
  };

  return (
    <>
      {/* =====================================================
          HEADER
      ====================================================== */}

      <header
        className="
          bg-[#131921]
          text-white
          fixed
          top-0
          left-0
          right-0
          w-full
          z-[9990]
        "
      >

        {/* =================================================
            TOP BAR
        ================================================== */}

        <div
          className="
            flex
            items-center
            gap-1
            px-1
            md:px-3
            py-2
            min-h-[60px]
          "
        >

          {/* ================================================
              LOGO
          ================================================= */}

          <div
            className="
              flex
              items-center
              px-1
              md:px-2
              py-1
              border
              border-transparent
              hover:border-white
              rounded
              cursor-pointer
              shrink-0
            "
            onClick={() => navigate("/")}
          >
            <img
              src={logo}
              alt="logo"
              className="
                w-14
                md:w-20
                object-contain
              "
            />
          </div>

          {/* ================================================
              LOCATION
          ================================================= */}

          <div
            className="
              hidden
              md:flex
              flex-col
              px-2
              py-1
              border
              border-transparent
              hover:border-white
              rounded
              cursor-pointer
              min-w-[100px]
            "
          >
            <span
              className="
                text-[11px]
                text-gray-300
                flex
                items-center
                gap-1
              "
            >
              <MapPin size={11} />

              Delivering to Rajbiraj 56400
            </span>

            <span className="text-[13px] font-bold">
              Update location
            </span>
          </div>

          {/* ================================================
              DESKTOP SEARCH
          ================================================= */}

          <div
            className="
              hidden
              md:flex
              flex-1
              h-10
              rounded
              overflow-hidden
            "
          >
            <button
              type="button"
              className="
                bg-gray-200
                text-black
                px-3
                flex
                items-center
                gap-1
                text-xs
                border-r
                border-gray-300
                hover:bg-gray-300
              "
            >
              All

              <ChevronDown size={12} />
            </button>

            <input
              type="text"
              placeholder="Search Amazon"
              className="
                flex-1
                px-3
                text-[15px]
                text-black
                outline-none
              "
            />

            <button
              type="button"
              className="
                bg-[#aedb3a]
                hover:bg-[#aedb3a]
                px-4
                flex
                items-center
                justify-center
              "
            >
              <Search
                size={20}
                className="text-black"
              />
            </button>
          </div>

          {/* ================================================
              RIGHT CONTROLS
          ================================================= */}

          <div
            className="
              flex
              items-center
              gap-1
              ml-auto
              shrink-0
            "
          >

            {/* ============================================
                MOBILE SEARCH
            ============================================= */}

            <button
              type="button"
              className="
                flex
                md:hidden
                items-center
                justify-center
                p-2
                border
                border-transparent
                hover:border-white
                rounded
              "
              onClick={() => navigate("/search")}
            >
              <Search size={25} />
            </button>

            {/* ============================================
                LANGUAGE
            ============================================= */}

            <div
              className="
                hidden
                md:flex
                items-center
                gap-1
                px-2
                py-1
                border
                border-transparent
                hover:border-white
                rounded
              "
            >
              <span className="text-lg">
                🇺🇸
              </span>

              <span className="text-[13px] font-bold">
                EN
              </span>

              <ChevronDown size={12} />
            </div>

            {/* ============================================
                ACCOUNT
            ============================================= */}

            <button
              type="button"
              onClick={toggleProfile}
              className="
                flex
                flex-col
                px-1
                md:px-2
                py-1
                border
                border-transparent
                hover:border-white
                rounded
                cursor-pointer
                min-w-[55px]
                md:min-w-[70px]
                text-left
                bg-transparent
                text-white
              "
            >
              <span
                className="
                  text-[9px]
                  md:text-[11px]
                  text-gray-300
                "
              >
                Hello, {user?.firstName || "User"}
              </span>

              <span
                className="
                  text-[10px]
                  md:text-[13px]
                  font-bold
                  flex
                  items-center
                  gap-1
                  whitespace-nowrap
                "
              >
                Account & Lists

                <ChevronDown size={12} />
              </span>
            </button>

            {/* ============================================
                RETURNS
            ============================================= */}

            <div
              className="
                hidden
                md:flex
                flex-col
                px-2
                py-1
                border
                border-transparent
                hover:border-white
                rounded
                cursor-pointer
              "
              onClick={() => navigate("/orders")}
            >
              <span className="text-[11px] text-gray-300">
                Returns
              </span>

              <span className="text-[13px] font-bold">
                & Orders
              </span>
            </div>

            {/* ============================================
                CART
            ============================================= */}

            <div
              className="
                flex
                items-center
                gap-1
                px-1
                md:px-2
                py-1
                border
                border-transparent
                hover:border-white
                rounded
                cursor-pointer
              "
              onClick={() =>
                navigate("/product/cart")
              }
            >
              <div className="relative">

                <ShoppingCart
                  size={30}
                  strokeWidth={1.5}
                  className="
                    md:w-[34px]
                    md:h-[34px]
                  "
                />

                <span
                  className="
                    absolute
                    -top-1
                    left-4
                    bg-[#c7da25]
                    text-black
                    text-xs
                    font-bold
                    w-5
                    h-5
                    rounded-full
                    flex
                    items-center
                    justify-center
                  "
                >
                  {cartItems}
                </span>

              </div>

              <span
                className="
                  hidden
                  md:block
                  text-[13px]
                  font-bold
                  mt-2
                "
              >
                Cart
              </span>
            </div>
          </div>
        </div>

        {/* =================================================
            SECOND NAVIGATION
        ================================================= */}

        <nav
          className="
            bg-[#232f3e]
            flex
            items-center
            px-2
            h-[38px]
            gap-0.5
            overflow-x-auto
            scrollbar-none
          "
        >

          {/* ALL */}

          <button
            type="button"
            className="
              flex
              items-center
              gap-1.5
              px-2.5
              py-1
              text-[13px]
              font-bold
              border
              border-transparent
              hover:border-white
              rounded
              whitespace-nowrap
            "
            onClick={onClick}
          >
            <Menu size={16} />

            All
          </button>

          {/* ALEXA */}

          <button
            type="button"
            className="
              flex
              items-center
              gap-1.5
              px-2.5
              py-1
              text-[13px]
              border
              border-[#00d2ff]
              rounded-full
              hover:bg-[#00d2ff]/10
              whitespace-nowrap
            "
          >
            <span className="text-[#00d2ff]">
              ◉
            </span>

            <span className="text-[#00d2ff] italic">
              alexa
            </span>

            <span className="text-gray-300 text-xs">
              for shopping
            </span>
          </button>

          {/* NAV ITEMS */}

          {[
            "Today's Deals",
            "Prime Video",
            "Buy Again",
            "Customer Service",
            "Registry",
            "Gift Cards",
            "Sell",
          ].map((item) => (
            <button
              type="button"
              key={item}
              className="
                px-2.5
                py-1
                text-[13px]
                border
                border-transparent
                hover:border-white
                rounded
                whitespace-nowrap
              "
            >
              {item}
            </button>
          ))}
        </nav>
      </header>

      {/* =====================================================
          PROFILE
          IMPORTANT:
          THIS IS OUTSIDE THE HEADER
      ====================================================== */}

      {profileOpen && (
        <>
          {/* ================================================
              MOBILE BACKDROP
          ================================================= */}

          <div
            className="
              fixed
              inset-0
              bg-black/40
              z-[9998]
              md:hidden
            "
            onClick={closeProfile}
          />

          {/* ================================================
              PROFILE CONTAINER
          ================================================= */}

          <div
            className="
              fixed

              z-[99999]

              /* Mobile */

              top-[70px]
              left-1/2
              -translate-x-1/2

              w-[calc(100%-24px)]
              max-w-[360px]

              /* Desktop */

              md:top-[65px]
              md:left-auto
              md:right-4
              md:translate-x-0
              md:w-[340px]

              bg-white

              rounded-xl

              shadow-2xl

              border
              border-gray-200

              overflow-hidden
            "
          >
            <UserProfile
              user={user}
              onClose={closeProfile}
            />
          </div>
        </>
      )}
    </>
  );
}