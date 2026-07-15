import { MapPin, ChevronDown, Search, ShoppingCart, Menu } from "lucide-react";
import logo from "../../public/logo.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserProfile from "./UserProfile";
import { useState } from "react";
import CategorySlider from "../components/CategorySlider/CategorySlider";
import SubcategorySlider from "../components/CategorySlider/SubcategorySlider";
import { useGetCartQuery } from "../redux/cart.slice";

export default function Navbar({ onClick }) {
  const user = useSelector((state) => state.auth.user);

  const { data } = useGetCartQuery();

  const cartItems = data?.cart?.length || 0;
  console.log("cartItems", cartItems);
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  console.log("navbar", user);
  return (
    <header className="bg-[#131921] text-white  fixed top-0 left-0 right-0 z-50">
      {/* Top Bar */}
      <div className="flex items-center gap-1 px-3 py-2 min-h-[60px]">
        {/* Logo */}
        <a
          href="#"
          className="flex flex-col items-center px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer"
        >
          <img src={logo} alt="logo" className="w-20 object-contain" />
        </a>

        {/* Deliver To */}
        <div className="flex flex-col px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer min-w-[100px]">
          <span className="text-[11px] text-gray-300 flex items-center gap-1">
            <MapPin size={11} /> Delivering to Rajbiraj 56400
          </span>
          <span className="text-[13px] font-bold">Update location</span>
        </div>

        {/* Search */}
        <div className="flex flex-1 h-10 rounded overflow-hidden">
          <button className="bg-gray-200 text-black px-3 flex items-center gap-1 text-xs border-r border-gray-300 hover:bg-gray-300">
            All <ChevronDown size={12} />
          </button>
          <input
            type="text"
            placeholder="Search Amazon"
            className="flex-1 px-3 text-[15px] text-black outline-none"
          />
          <button className="bg-[#aedb3a] hover:bg-[#aedb3a] px-4 flex items-center justify-center">
            <Search size={20} className="text-black" />
          </button>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-1 ml-2">
          {/* Language */}
          <div className="flex items-center gap-1 px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer">
            <span className="text-lg">🇺🇸</span>
            <span className="text-[13px] font-bold">EN</span>
            <ChevronDown size={12} />
          </div>

          {/* Account */}
          <div
            className="relative flex flex-col px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer min-w-[70px]"
            onClick={() => setProfileOpen(!profileOpen)}
          >
            <span className="text-[11px] text-gray-300">
              Hello, {user?.firstName}
            </span>
            <span className="text-[13px] font-bold flex items-center gap-1">
              Account & Lists <ChevronDown size={12} />
            </span>
          </div>
          {profileOpen && <UserProfile />}
          {/* Returns */}
          <div className="flex flex-col px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer">
            <span className="text-[11px] text-gray-300">Returns</span>
            <span className="text-[13px] font-bold">& Orders</span>
          </div>

          {/* Cart */}
          <div
            className="flex items-center gap-1 px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer relative"
            onClick={() => navigate("/product/cart")}
          >
            <div className="relative">
              <ShoppingCart size={34} strokeWidth={1.5} />
              <span className="absolute -top-1 left-4 bg-[#c7da25] text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartItems || 0}
              </span>
            </div>
            <span className="text-[13px] font-bold mt-2">Cart</span>
          </div>
        </div>
      </div>

      {/* Nav Bar */}
      <nav className="bg-[#232f3e] flex items-center px-2 h-[38px] gap-0.5 overflow-x-auto scrollbar-none ">
        <button
          className={`flex items-center gap-1.5 px-2.5 py-1 text-[13px] font-bold border border-transparent hover:border-white rounded whitespace-nowrap`}
          onClick={onClick}
        >
          <Menu size={16} /> All
        </button>

        <button className="flex items-center gap-1.5 px-2.5 py-1 text-[13px] border border-[#00d2ff] rounded-full hover:bg-[#00d2ff]/10 whitespace-nowrap">
          <span className="text-[#00d2ff]">◉</span>
          <span className="text-[#00d2ff] italic">alexa</span>
          <span className="text-gray-300 text-xs"> for shopping</span>
        </button>

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
            key={item}
            className="px-2.5 py-1 text-[13px] border border-transparent hover:border-white rounded whitespace-nowrap"
          >
            {item}
          </button>
        ))}
      </nav>
    </header>
  );
}
