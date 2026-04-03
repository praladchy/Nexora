import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  PlusSquare,
  List,
  Store,
  Building2,
  Package,
  FolderTree,
  Shield,   UserCheck, UserX, Edit2, Trash2
} from "lucide-react";
import {  } from "lucide-react";
const iconStyle = "w-5 h-5";

const Sidebar = () => {
  const [vendorOpen, setVendorOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [permissionOpen, setPermissionOpen] = useState(false);
  return (
    <aside className="w-64 bg-white border-r min-h-screen px-4 py-6">
      <nav className="space-y-1">
        {/* Main Menu */}
        {mainMenu.map((item, index) => (
          <NavLink key={index} to={item.link}>
            {({ isActive }) => (
              <div
                className={`flex items-center gap-3 px-4 py-2 rounded-lg
                ${
                  isActive
                    ? "bg-purple-100 text-purple-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {item.icon}
                <span className="text-sm font-medium">{item.text}</span>
              </div>
            )}
          </NavLink>
        ))}

        {/* Shop Management Dropdown */}
        <div className="space-y-1">
          <button
            onClick={() => setShopOpen(!shopOpen)}
            className="w-full flex items-center justify-between px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <Building2 className="w-5 h-5" />
              <span className="text-sm font-medium">Shop Management</span>
            </div>

            <span
              className={`transition-transform duration-300 ${
                shopOpen ? "rotate-180" : ""
              }`}
            >
              ▾
            </span>
          </button>

          {shopOpen && (
            <div className="ml-4 space-y-1">
              {shopMenu.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.link}
                  className={({ isActive }) =>
                    `block px-4 py-2 text-sm rounded-lg ${
                      isActive
                        ? "bg-purple-100 text-purple-600"
                        : "text-gray-600 hover:bg-gray-100"
                    }`
                  }
                >
                  {item.text}
                </NavLink>
              ))}
            </div>
          )}
        </div>

        {/* Vendor Dropdown */}
        <div className="space-y-1">
          <button
            onClick={() => setVendorOpen(!vendorOpen)}
            className="w-full flex items-center justify-between px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <Store className="w-5 h-5" />
              <span className="text-sm font-medium">Vendors</span>
            </div>

            <span
              className={`transition-transform duration-300 ${
                vendorOpen ? "rotate-180" : ""
              }`}
            >
              ▾
            </span>
          </button>

          {vendorOpen && (
            <div className="ml-4 space-y-1">
              {vendorMenu.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.link}
                  className={({ isActive }) =>
                    `block px-4 py-2 text-sm rounded-lg ${
                      isActive
                        ? "bg-purple-100 text-purple-600"
                        : "text-gray-600 hover:bg-gray-100"
                    }`
                  }
                >
                  {item.text}
                </NavLink>
              ))}
            </div>
          )}
        </div>
        {/* Product Management Dropdown */}
        <div className="space-y-1">
          <button
            onClick={() => setProductOpen(!productOpen)}
            className="w-full flex items-center justify-between px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <Package className="w-5 h-5" />
              <span className="text-sm font-medium">Product Management</span>
            </div>

            <span
              className={`transition-transform duration-300 ${
                productOpen ? "rotate-180" : ""
              }`}
            >
              ▾
            </span>
          </button>

          {productOpen && (
            <div className="ml-4 space-y-1">
              {productMenu.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.link}
                  className={({ isActive }) =>
                    `block px-4 py-2 text-sm rounded-lg ${
                      isActive
                        ? "bg-purple-100 text-purple-600"
                        : "text-gray-600 hover:bg-gray-100"
                    }`
                  }
                >
                  {item.text}
                </NavLink>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-1">
          <button
            onClick={() => setCategoryOpen(!categoryOpen)}
            className="w-full flex items-center justify-between px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <FolderTree className="w-5 h-5" />
              <span className="text-sm font-medium whitespace-nowrap">Category Management</span>
            </div>

            <span
              className={`transition-transform duration-300 ${
                categoryOpen ? "rotate-180" : ""
              }`}
            >
              ▾
            </span>
          </button>

          {categoryOpen && (
            <div className="ml-4 space-y-1">
              {categoryManagement.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.link}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 text-sm rounded-lg ${
                      isActive
                        ? "bg-purple-100 text-purple-600"
                        : "text-gray-600 hover:bg-gray-100"
                    }`
                  }
                >
                  {item.icon}
                  {item.text}
                </NavLink>
              ))}
            </div>
          )}
        </div>


        <div className="space-y-1">
  <button
    onClick={() => setPermissionOpen(!permissionOpen)}
    className="w-full flex items-center justify-between px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
  >
    <div className="flex items-center gap-3">
      <Shield className="w-5 h-5" />
      <span className="text-sm font-medium whitespace-nowrap">
        Permissions Management
      </span>
    </div>

    <span
      className={`transition-transform duration-300 ${
        permissionOpen ? "rotate-180" : ""
      }`}
    >
      ▾
    </span>
  </button>

  {permissionOpen && (
    <div className="ml-8 space-y-1">
      {permissionMenu.map((item, index) => (
        <NavLink
          key={index}
          to={item.link}
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 text-sm rounded-lg ${
              isActive
                ? "bg-purple-100 text-purple-600"
                : "text-gray-600 hover:bg-gray-100"
            }`
          }
        >
          {item.icon}
          {item.text}
        </NavLink>
      ))}
    </div>
  )}
</div>
      </nav>
    </aside>
  );
};

export default Sidebar;

export const productMenu = [
  {
    link: "/product/create",
    text: "Add Product",
  },
  {
    link: "/product/list",
    text: "Product List",
  },
  {
    link: "/product/by-shop",
    text: "Products By Shop",
  },
  {
    link: "/product/by-category",
    text: "Products By Category",
  },
];
export const mainMenu = [
  {
    link: "/",
    text: "Vendor Dashboard",
    icon: <LayoutDashboard className={iconStyle} />,
  },
   
  
  
   
];

export const vendorMenu = [
  {
    link: "/createVendor",
    text: "Create Vendor",
  },
  {
    link: "/vendor/user/create",
    text: "Create Vendor User",
  },
  {
    link: "/vendor/createAdmin",
    text: "Create Vendor Admin",
  },
  {
    link: "/vendor/list",
    text: "Vendor List",
  },
];
export const shopMenu = [
  {
    link: "/shop/create",
    text: "Add Shop",
  },
  {
    link: "/shop/report",
    text: "Shop report",
  },
  {
    link: "/shop/list",
    text: "Shop List",
  },
   {
    link: "/shop/assignOwner",
    text: "AssignUser",
  },
   {
    link: "/shop/assignAdmin",
    text: "AssignAdmin",
  },
];

const categoryManagement = [
  {
    link: "/category/create",
    text: "Create Category",
    icon: <PlusSquare className="w-4 h-4" />,
  },
  {
    link: "/category/list",
    text: "Category List",
    icon: <List className="w-4 h-4" />,
  },
];


const permissionMenu = [
  {
    text: "Create Permission",
    link: "/permission/create",
    icon: <PlusSquare className="w-4 h-4" />,
  },
  {
    text: "Permission List",
    link: "/permissions",
    icon: <List className="w-4 h-4" />,
  },
  {
    text: "Assign Permission",
    link: "/permission/assign",
    icon: <UserCheck className="w-4 h-4" />,
  },
  {
    text: "Remove Permission",
    link: "/permission/remove",
    icon: <UserX className="w-4 h-4" />,
  },
  {
    text: "Update Permission",
    link: "/permission/update",
    icon: <Edit2 className="w-4 h-4" />,
  },
  {
    text: "Delete Permission",
    link: "/permission/delete",
    icon: <Trash2 className="w-4 h-4" />,
  },
];