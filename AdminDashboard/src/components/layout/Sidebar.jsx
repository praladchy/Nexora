import { LayoutDashboard, PlusSquare, List, Store } from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r min-h-screen px-4 py-6">
      <nav className="space-y-1">
        <NavLink to="/">
          <SidebarItem
            icon={<LayoutDashboard />}
            text="Vendor Dashboard"
            active
          />
        </NavLink>

        <NavLink to="/addproduct">
          <SidebarItem icon={<PlusSquare />} text="Add Product Flow" />
        </NavLink>
        <NavLink to="/addShop">
          <SidebarItem icon={<PlusSquare />} text="Add Shop" />
        </NavLink>

        <NavLink to="/productManag">
          <SidebarItem icon={<List />} text="Product Management List" />
        </NavLink>

        <NavLink to="/marketplace">
          <SidebarItem icon={<Store />} text="Marketplace Request Flow" />
        </NavLink>
      </nav>
    </aside>
  );
};

const SidebarItem = ({ icon, text, active }) => (
  <div
    className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer
    ${
      active
        ? "bg-purple-100 text-purple-600"
        : "text-gray-600 hover:bg-gray-100"
    }`}
  >
    {icon}
    <span className="text-sm font-medium">{text}</span>
  </div>
);

export default Sidebar;
