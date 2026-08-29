import {
  User,
  Package,
  Heart,
  Star,
  RotateCcw,
  LogOut,
  MapPin,
  Settings,
  X,
} from "lucide-react";

import { useLogoutMutation } from "../redux/auth.slice";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userData.slice";
import { useNavigate } from "react-router-dom";

export default function UserProfile({ user, onClose }) {
  const [logOut, { isLoading }] = useLogoutMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = async () => {
    try {
      const res = await logOut().unwrap();

      console.log("Logout response:", res);

      // Clear redux user data
      dispatch(logout());

      // Close profile
      onClose();

      // Go to login
      navigate("/login");

    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // ==========================================
  // LOGIN
  // ==========================================

  const handleLogin = () => {
    onClose();
    navigate("/login");
  };

  // ==========================================
  // NAVIGATION
  // ==========================================

  const handleOrders = () => {
    onClose();
    navigate("/orders");
  };

  const handleProfile = () => {
    onClose();
    navigate("/profile");
  };

  const handleWishlist = () => {
    onClose();
    navigate("/wishlist");
  };

  const handleAddress = () => {
    onClose();
    navigate("/addresses");
  };

  const handleSettings = () => {
    onClose();
    navigate("/settings");
  };

  return (
    <div className="w-full bg-white text-gray-700">

      {/* ==========================================
          PROFILE HEADER
      =========================================== */}

      <div className="bg-orange-500 p-5 text-white">

        <div className="flex items-center gap-3">

          {/* Avatar */}

          <div
            className="
              w-12
              h-12
              rounded-full
              bg-white
              flex
              items-center
              justify-center
              shrink-0
            "
          >
            <User
              size={25}
              className="text-orange-500"
            />
          </div>

          {/* User Information */}

          <div className="min-w-0">

            <h2 className="font-bold text-lg truncate">
              {user?.firstName || "User"}{" "}
              {user?.lastName || ""}
            </h2>

            <p className="text-sm text-orange-100 truncate">
              {user?.email || "Welcome"}
            </p>

          </div>
        </div>

        {/* View Profile */}

        {user && (
          <button
            type="button"
            onClick={handleProfile}
            className="
              mt-4
              w-full
              bg-white
              text-orange-600
              py-2
              rounded-lg
              text-sm
              font-semibold
              hover:bg-orange-50
              transition
            "
          >
            View Profile
          </button>
        )}
      </div>

      {/* ==========================================
          MENU
      =========================================== */}

      <div className="py-2">

        {/* My Orders */}

        <button
          type="button"
          onClick={handleOrders}
          className="
            w-full
            flex
            items-center
            gap-3
            px-5
            py-3
            hover:bg-orange-50
            transition
            text-left
          "
        >
          <Package size={18} />

          <span className="flex-1">
            My Orders
          </span>
        </button>

        {/* Wishlist */}

        <button
          type="button"
          onClick={handleWishlist}
          className="
            w-full
            flex
            items-center
            gap-3
            px-5
            py-3
            hover:bg-orange-50
            transition
            text-left
          "
        >
          <Heart size={18} />

          <span className="flex-1">
            Wishlist
          </span>
        </button>

        {/* Address */}

        <button
          type="button"
          onClick={handleAddress}
          className="
            w-full
            flex
            items-center
            gap-3
            px-5
            py-3
            hover:bg-orange-50
            transition
            text-left
          "
        >
          <MapPin size={18} />

          <span className="flex-1">
            My Addresses
          </span>
        </button>

        {/* Reviews */}

        <button
          type="button"
          className="
            w-full
            flex
            items-center
            gap-3
            px-5
            py-3
            hover:bg-orange-50
            transition
            text-left
          "
        >
          <Star size={18} />

          <span className="flex-1">
            My Reviews
          </span>
        </button>

        {/* Returns */}

        <button
          type="button"
          className="
            w-full
            flex
            items-center
            gap-3
            px-5
            py-3
            hover:bg-orange-50
            transition
            text-left
          "
        >
          <RotateCcw size={18} />

          <span className="flex-1">
            Returns & Cancellations
          </span>
        </button>

        {/* Settings */}

        <button
          type="button"
          onClick={handleSettings}
          className="
            w-full
            flex
            items-center
            gap-3
            px-5
            py-3
            hover:bg-orange-50
            transition
            text-left
          "
        >
          <Settings size={18} />

          <span className="flex-1">
            Settings
          </span>
        </button>
      </div>

      {/* ==========================================
          LOGIN / LOGOUT
      =========================================== */}

      <div className="border-t border-gray-200 p-2">

        {user ? (
          <button
            type="button"
            disabled={isLoading}
            onClick={handleLogout}
            className="
              w-full
              flex
              items-center
              gap-3
              px-5
              py-3
              rounded-lg
              text-red-600
              hover:bg-red-50
              transition
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            <LogOut size={18} />

            <span>
              {isLoading ? "Logging out..." : "Logout"}
            </span>
          </button>
        ) : (
          <button
            type="button"
            onClick={handleLogin}
            className="
              w-full
              flex
              items-center
              gap-3
              px-5
              py-3
              rounded-lg
              text-blue-600
              hover:bg-blue-50
              transition
            "
          >
            <LogOut size={18} />

            <span>
              Login
            </span>
          </button>
        )}
      </div>
    </div>
  );
}