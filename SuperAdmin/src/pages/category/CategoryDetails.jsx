import React from "react";
import {
  ArrowLeft,
  FolderTree,
  Package,
  Store,
  ShoppingCart,
  DollarSign,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Calendar,
  Layers,
  MoreVertical,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

// --------------------------------------------------
// STATIC DATA
// Replace this later with RTK Query API data
// --------------------------------------------------

const category = {
  id: "CAT-001",
  name: "Electronics",
  slug: "electronics",
  description:
    "Electronic products including smartphones, laptops, accessories and other electronic devices.",
  image:
    "https://images.unsplash.com/photo-1498049794561-7780e7231661",
  parent: "Main Category",
  status: "Active",
  createdAt: "12 January 2026",
  updatedAt: "05 September 2026",
  products: 248,
  activeProducts: 224,
  shops: 38,
  sales: "Rs. 42.8M",
};

const subCategories = [
  {
    id: "SUB-001",
    name: "Smartphones",
    products: 84,
    shops: 24,
    status: "Active",
  },
  {
    id: "SUB-002",
    name: "Laptops",
    products: 52,
    shops: 18,
    status: "Active",
  },
  {
    id: "SUB-003",
    name: "Accessories",
    products: 68,
    shops: 29,
    status: "Active",
  },
  {
    id: "SUB-004",
    name: "Televisions",
    products: 31,
    shops: 14,
    status: "Active",
  },
  {
    id: "SUB-005",
    name: "Gaming",
    products: 13,
    shops: 9,
    status: "Inactive",
  },
];

const products = [
  {
    id: "PROD-001",
    name: "iPhone 16 Pro Max",
    shop: "Tech World",
    price: "Rs. 189,999",
    sales: 248,
    stock: 42,
    status: "Active",
  },
  {
    id: "PROD-002",
    name: "MacBook Air M4",
    shop: "Apple Store Nepal",
    price: "Rs. 164,999",
    sales: 124,
    stock: 18,
    status: "Active",
  },
  {
    id: "PROD-003",
    name: "Samsung Galaxy S25",
    shop: "Mobile Hub",
    price: "Rs. 119,999",
    sales: 184,
    stock: 35,
    status: "Active",
  },
  {
    id: "PROD-004",
    name: "Sony WH-1000XM6",
    shop: "Gadget House",
    price: "Rs. 54,999",
    sales: 96,
    stock: 64,
    status: "Active",
  },
  {
    id: "PROD-005",
    name: "Dell XPS 15",
    shop: "Laptop World",
    price: "Rs. 179,999",
    sales: 72,
    stock: 8,
    status: "Active",
  },
];

const shops = [
  {
    id: "SHOP-001",
    name: "Tech World",
    owner: "Aarav Sharma",
    products: 84,
    sales: "Rs. 12.4M",
    status: "Active",
  },
  {
    id: "SHOP-002",
    name: "Mobile Hub",
    owner: "Nabin Shrestha",
    products: 62,
    sales: "Rs. 9.8M",
    status: "Active",
  },
  {
    id: "SHOP-003",
    name: "Gadget House",
    owner: "Bibek Lama",
    products: 48,
    sales: "Rs. 7.2M",
    status: "Active",
  },
  {
    id: "SHOP-004",
    name: "Laptop World",
    owner: "Ramesh Thapa",
    products: 31,
    sales: "Rs. 6.4M",
    status: "Active",
  },
];


// --------------------------------------------------
// STATUS BADGE
// --------------------------------------------------

function StatusBadge({ status }) {
  const styles = {
    Active: "bg-emerald-50 text-emerald-700",
    Inactive: "bg-slate-100 text-slate-600",
    Pending: "bg-amber-50 text-amber-700",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status] || "bg-slate-100 text-slate-600"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}


// --------------------------------------------------
// STAT CARD
// --------------------------------------------------

function StatCard({
  title,
  value,
  description,
  icon: Icon,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">

        <div>
          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            {value}
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            {description}
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
          <Icon size={21} className="text-slate-700" />
        </div>

      </div>
    </div>
  );
}


// --------------------------------------------------
// INFO ITEM
// --------------------------------------------------

function InfoItem({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="flex gap-3">

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100">
        <Icon
          size={17}
          className="text-slate-500"
        />
      </div>

      <div className="min-w-0">

        <p className="text-xs text-slate-400">
          {label}
        </p>

        <p className="mt-1 break-words text-sm font-medium text-slate-700">
          {value}
        </p>

      </div>

    </div>
  );
}


// --------------------------------------------------
// MAIN COMPONENT
// --------------------------------------------------

export default function CategoryDetails() {

  const navigate = useNavigate();

  const { id } = useParams();

  console.log("Category ID:", id);

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">

      {/* ------------------------------------------
          BACK BUTTON
      ------------------------------------------ */}

      <button
        onClick={() =>
          navigate("/superadmin/categories")
        }
        className="mb-5 flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
      >
        <ArrowLeft size={18} />
        Back to Categories
      </button>


      {/* ------------------------------------------
          CATEGORY HEADER
      ------------------------------------------ */}

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex items-center gap-4">

            {/* CATEGORY IMAGE */}

            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-slate-100">

              <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover"
              />

            </div>


            {/* CATEGORY NAME */}

            <div>

              <div className="flex flex-wrap items-center gap-3">

                <h1 className="text-2xl font-bold text-slate-900">
                  {category.name}
                </h1>

                <StatusBadge
                  status={category.status}
                />

              </div>

              <p className="mt-1 text-sm text-slate-500">
                {category.id} · {category.slug}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Parent: {category.parent}
              </p>

            </div>

          </div>


          {/* ACTIONS */}

          <div className="flex flex-wrap gap-2">

            <button
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium transition hover:bg-slate-50"
            >
              <Edit size={17} />
              Edit
            </button>

            <button
              className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              <Trash2 size={17} />
              Delete
            </button>

          </div>

        </div>

      </div>


      {/* ------------------------------------------
          STATISTICS
      ------------------------------------------ */}

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Products"
          value={category.products}
          description="Products in this category"
          icon={Package}
        />

        <StatCard
          title="Active Products"
          value={category.activeProducts}
          description="Currently available"
          icon={CheckCircle}
        />

        <StatCard
          title="Total Shops"
          value={category.shops}
          description="Shops using this category"
          icon={Store}
        />

        <StatCard
          title="Total Sales"
          value={category.sales}
          description="Revenue generated"
          icon={DollarSign}
        />

      </div>


      {/* ------------------------------------------
          CATEGORY INFO + PERFORMANCE
      ------------------------------------------ */}

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-3">


        {/* CATEGORY INFORMATION */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="font-semibold text-slate-900">
                Category Information
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Basic category details
              </p>

            </div>

            <button className="rounded-lg p-2 transition hover:bg-slate-100">
              <MoreVertical size={18} />
            </button>

          </div>


          <div className="mt-6 space-y-5">

            <InfoItem
              icon={FolderTree}
              label="Category Name"
              value={category.name}
            />

            <InfoItem
              icon={Layers}
              label="Parent Category"
              value={category.parent}
            />

            <InfoItem
              icon={Calendar}
              label="Created At"
              value={category.createdAt}
            />

            <InfoItem
              icon={Calendar}
              label="Last Updated"
              value={category.updatedAt}
            />

            <InfoItem
              icon={CheckCircle}
              label="Status"
              value={category.status}
            />

          </div>

        </div>


        {/* DESCRIPTION + PERFORMANCE */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">

          <h2 className="font-semibold text-slate-900">
            Category Overview
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            Category description and product distribution
          </p>


          {/* DESCRIPTION */}

          <div className="mt-5 rounded-xl bg-slate-50 p-4">

            <p className="text-sm leading-6 text-slate-600">
              {category.description}
            </p>

          </div>


          {/* PRODUCT DISTRIBUTION */}

          <div className="mt-6">

            <div className="flex items-center justify-between">

              <p className="text-sm font-semibold text-slate-700">
                Product Status
              </p>

              <p className="text-xs text-slate-400">
                {category.products} Total
              </p>

            </div>


            <div className="mt-4">

              <div className="h-3 overflow-hidden rounded-full bg-slate-100">

                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{
                    width: `${
                      (category.activeProducts /
                        category.products) *
                      100
                    }%`,
                  }}
                />

              </div>

            </div>


            <div className="mt-4 flex flex-wrap gap-5 text-xs">

              <div className="flex items-center gap-2">

                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />

                <span className="text-slate-500">
                  Active
                </span>

                <span className="font-semibold text-slate-700">
                  {category.activeProducts}
                </span>

              </div>


              <div className="flex items-center gap-2">

                <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />

                <span className="text-slate-500">
                  Inactive
                </span>

                <span className="font-semibold text-slate-700">
                  {category.products -
                    category.activeProducts}
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* ------------------------------------------
          SUB CATEGORIES
      ------------------------------------------ */}

      <div className="mt-5 rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="flex items-center justify-between p-5">

          <div>

            <h2 className="font-semibold text-slate-900">
              Sub Categories
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Categories under {category.name}
            </p>

          </div>

          <button className="text-sm font-medium text-slate-700 hover:underline">
            Add Sub Category
          </button>

        </div>


        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-y border-slate-100 bg-slate-50">

                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500">
                  Category
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500">
                  Products
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500">
                  Shops
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500">
                  Status
                </th>

                <th className="px-5 py-3 text-right text-xs font-semibold text-slate-500">
                  Action
                </th>

              </tr>

            </thead>


            <tbody>

              {subCategories.map((sub) => (

                <tr
                  key={sub.id}
                  className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                >

                  <td className="px-5 py-4">

                    <p className="text-sm font-semibold text-slate-800">
                      {sub.name}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {sub.id}
                    </p>

                  </td>


                  <td className="px-5 py-4 text-sm text-slate-600">
                    {sub.products}
                  </td>


                  <td className="px-5 py-4 text-sm text-slate-600">
                    {sub.shops}
                  </td>


                  <td className="px-5 py-4">

                    <StatusBadge
                      status={sub.status}
                    />

                  </td>


                  <td className="px-5 py-4 text-right">

                    <button
                      onClick={() =>
                        navigate(
                          `/superadmin/categories/${sub.id}`
                        )
                      }
                      className="text-sm font-medium text-slate-700 hover:underline"
                    >
                      View
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>


      {/* ------------------------------------------
          TOP PRODUCTS
      ------------------------------------------ */}

      <div className="mt-5 rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="flex items-center justify-between p-5">

          <div>

            <h2 className="font-semibold text-slate-900">
              Top Products
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Best selling products in this category
            </p>

          </div>

          <button className="text-sm font-medium text-slate-700 hover:underline">
            View All
          </button>

        </div>


        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-y border-slate-100 bg-slate-50">

                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500">
                  Product
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500">
                  Shop
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500">
                  Price
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500">
                  Sales
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500">
                  Stock
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500">
                  Status
                </th>

              </tr>

            </thead>


            <tbody>

              {products.map((product) => (

                <tr
                  key={product.id}
                  className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                >

                  <td className="px-5 py-4">

                    <p className="text-sm font-semibold text-slate-800">
                      {product.name}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {product.id}
                    </p>

                  </td>


                  <td className="px-5 py-4 text-sm text-slate-600">
                    {product.shop}
                  </td>


                  <td className="px-5 py-4 text-sm font-semibold text-slate-700">
                    {product.price}
                  </td>


                  <td className="px-5 py-4 text-sm text-slate-600">
                    {product.sales}
                  </td>


                  <td className="px-5 py-4">

                    <span
                      className={`text-sm font-semibold ${
                        product.stock < 20
                          ? "text-red-600"
                          : "text-emerald-600"
                      }`}
                    >
                      {product.stock}
                    </span>

                  </td>


                  <td className="px-5 py-4">

                    <StatusBadge
                      status={product.status}
                    />

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>


      {/* ------------------------------------------
          SHOPS USING CATEGORY
      ------------------------------------------ */}

      <div className="mt-5 rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="flex items-center justify-between p-5">

          <div>

            <h2 className="font-semibold text-slate-900">
              Shops Using This Category
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Shops selling products under this category
            </p>

          </div>

          <button className="text-sm font-medium text-slate-700 hover:underline">
            View All
          </button>

        </div>


        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-y border-slate-100 bg-slate-50">

                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500">
                  Shop
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500">
                  Owner
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500">
                  Products
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500">
                  Sales
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500">
                  Status
                </th>

                <th className="px-5 py-3 text-right text-xs font-semibold text-slate-500">
                  Action
                </th>

              </tr>

            </thead>


            <tbody>

              {shops.map((shop) => (

                <tr
                  key={shop.id}
                  className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                >

                  <td className="px-5 py-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100">

                        <Store size={17} />

                      </div>

                      <div>

                        <p className="text-sm font-semibold text-slate-800">
                          {shop.name}
                        </p>

                        <p className="text-xs text-slate-400">
                          {shop.id}
                        </p>

                      </div>

                    </div>

                  </td>


                  <td className="px-5 py-4 text-sm text-slate-600">
                    {shop.owner}
                  </td>


                  <td className="px-5 py-4 text-sm text-slate-600">
                    {shop.products}
                  </td>


                  <td className="px-5 py-4 text-sm font-semibold text-slate-700">
                    {shop.sales}
                  </td>


                  <td className="px-5 py-4">

                    <StatusBadge
                      status={shop.status}
                    />

                  </td>


                  <td className="px-5 py-4 text-right">

                    <button
                      onClick={() =>
                        navigate(
                          `/superadmin/shops/${shop.id}`
                        )
                      }
                      className="text-sm font-medium text-slate-700 hover:underline"
                    >
                      View Shop
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}