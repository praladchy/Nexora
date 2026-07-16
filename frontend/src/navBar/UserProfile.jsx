import { User, Package, Heart, Star, RotateCcw, LogOut } from "lucide-react";
import { useLogoutMutation } from "../redux/auth.slice";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userData.slice";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const [logOut, { isLoading }] = useLogoutMutation();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  console.log(user);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    // Implement logout logic here (e.g., clear auth tokens, redirect to login page)
    const res = await logOut().unwrap();
    dispatch(logout());
    console.log(res);
    alert(res.data.message);
  };
  {
    isLoading && <p>Logging out...</p>;
  }

  const handleLogin=()=>{
    navigate("/login");

  }
  return (
    <div className="absolute top-16 flex items-center justify-center bg-gray-100 p-6 z-10">
      {/* Simple Profile Menu (NO dropdown, NO arrays, NO state) */}
      <div className="w-72 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Profile Header */}
        <div className="bg-orange-500 p-5 text-white flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/150"
            alt="profile"
            className="w-12 h-12 rounded-full border-2 border-white"
          />
          <div>
            <h2 className="font-bold text-lg">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-sm text-orange-100">{user?.email}</p>
          </div>
        </div>

        {/* Menu (STATIC - NO ARRAY) */}
        <div>
          <button className="w-full flex items-center gap-3 px-5 py-3 hover:bg-orange-50 text-gray-700">
            <User size={18} />
            Manage My Account
          </button>

          <button className="w-full flex items-center gap-3 px-5 py-3 hover:bg-orange-50 text-gray-700">
            <Package size={18} />
            My Orders
          </button>

          <button className="w-full flex items-center gap-3 px-5 py-3 hover:bg-orange-50 text-gray-700">
            <Heart size={18} />
            Wishlist
          </button>

          <button className="w-full flex items-center gap-3 px-5 py-3 hover:bg-orange-50 text-gray-700">
            <Star size={18} />
            My Reviews
          </button>

          <button className="w-full flex items-center gap-3 px-5 py-3 hover:bg-orange-50 text-gray-700">
            <RotateCcw size={18} />
            Returns & Cancellations
          </button>

          {user ? (
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-5 py-3 hover:bg-orange-50 text-gray-700">
              <LogOut size={18} />
              Logout
            </button>
          ) : (
            <button className="w-full flex items-center gap-3 px-5 py-3 hover:bg-orange-50 text-gray-700" onClick={handleLogin}> <LogOut size={18} />Login</button>
          )}
        </div>
      </div>
    </div>
  );
}
