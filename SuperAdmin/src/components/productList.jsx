import React, { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  ChevronDown,
  Package,
  Store,
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
  MoreVertical,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// --------------------------------------------------
// STATIC DATA
// Replace with RTK Query later
// --------------------------------------------------

const products = [
  {
    id: "PROD-001",
    name: "iPhone 16 Pro Max",
    image:
      "https://images.unsplash.com/photo-1592286927505-2fd0c2f4f1b5",
    shop: "Tech World",
    category: "Smartphones",
    price: "Rs. 189,999",
    stock: 42,
    sales: 248,
    status: "Active",
    approval: "Approved",
    createdAt: "05 Sep 2026",
  },
  {
    id: "PROD-002",
    name: "MacBook Air M4",
    image:
      "https://images.unsplash.com/photo-1517336714739-489689fd1ca8",
    shop: "Apple Store Nepal",
    category: "Laptops",
    price: "Rs. 164,999",
    stock: 18,
    sales: 124,
    status: "Active",
    approval: "Approved",
    createdAt: "04 Sep 2026",
  },
  {
    id: "PROD-003",
    name: "Samsung Galaxy S25",
    image:
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c",
    shop: "Mobile Hub",
    category: "Smartphones",
    price: "Rs. 119,999",
    stock: 35,
    sales: 184,
    status: "Active",
    approval: "Approved",
    createdAt: "03 Sep 2026",
  },
  {
    id: "PROD-004",
    name: "Sony WH-1000XM6",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    shop: "Gadget House",
    category: "Accessories",
    price: "Rs. 54,999",
    stock: 64,
    sales: 96,
    status: "Active",
    approval: "Approved",
    createdAt: "02 Sep 2026",
  },
  {
    id: "PROD-005",
    name: "Dell XPS 15",
    image:
      "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6",
    shop: "Laptop World",
    category: "Laptops",
    price: "Rs. 179,999",
    stock: 8,
    sales: 72,
    status: "Active",
    approval: "Approved",
    createdAt: "01 Sep 2026",
  },
  {
    id: "PROD-006",
    name: "Nike Air Max",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    shop: "Fashion Hub",
    category: "Shoes",
    price: "Rs. 18,500",
    stock: 12,
    sales: 86,
    status: "Active",
    approval: "Pending",
    createdAt: "31 Aug 2026",
  },
  {
    id: "PROD-007",
    name: "Smart LED TV 55 inch",
    image:
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1",
    shop: "Home Electronics",
    category: "Televisions",
    price: "Rs. 89,999",
    stock: 0,
    sales: 54,
    status: "Out of Stock",
    approval: "Approved",
    createdAt: "29 Aug 2026",
  },
  {
    id: "PROD-008",
    name: "Gaming Laptop RTX 5070",
    image:
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302",
    shop: "Gaming Zone",
    category: "Laptops",
    price: "Rs. 249,999",
    stock: 6,
    sales: 31,
    status: "Active",
    approval: "Pending",
    createdAt: "28 Aug 2026",
  },
  {
    id: "PROD-009",
    name: "Leather Office Chair",
    image:
      "https://images.unsplash.com/photo-1580480055273-228ff5388ef8",
    shop: "Furniture World",
    category: "Furniture",
    price: "Rs. 32,000",
    stock: 24,
    sales: 42,
    status: "Inactive",
    approval: "Approved",
    createdAt: "27 Aug 2026",
  },
  {
    id: "PROD-010",
    name: "Mechanical Keyboard",
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
    shop: "Gaming Zone",
    category: "Accessories",
    price: "Rs. 12,500",
    stock: 48,
    sales: 68,
    status: "Active",
    approval: "Approved",
    createdAt: "25 Aug 2026",
  },
];


// --------------------------------------------------
// STATUS BADGE
// --------------------------------------------------

function StatusBadge({ status }) {
  const styles = {
    Active: "bg-emerald-50 text-emerald-700",
    Inactive: "bg-slate-100 text-slate-600",
    "Out of Stock": "bg-red-50 text-red-700",
    Approved: "bg-emerald-50 text-emerald-700",
    Pending: "bg-amber-50 text-amber-700",
    Rejected: "bg-red-50 text-red-700",
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
          <Icon
            size={21}
            className="text-slate-700"
          />
        </div>

      </div>
    </div>
  );
}


// --------------------------------------------------
// MAIN COMPONENT
// --------------------------------------------------

export default function ProductList() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [approval, setApproval] = useState("All");
  const [shopFilter, setShopFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");


  // ------------------------------------------------
  // FILTER DATA
  // ------------------------------------------------

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {

      const searchMatch =
        product.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        product.id
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        product.shop
          .toLowerCase()
          .includes(search.toLowerCase());

      const statusMatch =
        status === "All" ||
        product.status === status;

      const approvalMatch =
        approval === "All" ||
        product.approval === approval;

      const shopMatch =
        shopFilter === "All" ||
        product.shop === shopFilter;

      const categoryMatch =
        categoryFilter === "All" ||
        product.category === categoryFilter;

      return (
        searchMatch &&
        statusMatch &&
        approvalMatch &&
        shopMatch &&
        categoryMatch
      );
    });
  }, [
    search,
    status,
    approval,
    shopFilter,
    categoryFilter,
  ]);


  // ------------------------------------------------
  // STATISTICS
  // ------------------------------------------------

  const totalProducts = products.length;

  const activeProducts = products.filter(
    (product) =>
      product.status === "Active"
  ).length;

  const pendingProducts = products.filter(
    (product) =>
      product.approval === "Pending"
  ).length;

  const outOfStockProducts = products.filter(
    (product) =>
      product.status === "Out of Stock"
  ).length;


  // ------------------------------------------------
  // UNIQUE FILTER VALUES
  // ------------------------------------------------

  const shops = [
    ...new Set(
      products.map((product) => product.shop)
    ),
  ];

  const categories = [
    ...new Set(
      products.map(
        (product) => product.category
      )
    ),
  ];


  // ------------------------------------------------
  // DELETE
  // ------------------------------------------------

  const handleDelete = (id, name) => {

    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${name}"?`
    );

    if (!confirmDelete) return;

    console.log("Delete product:", id);

    // Later:
    // deleteProduct(id)
  };


  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">

      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <h1 className="text-2xl font-bold text-slate-900">
            Products
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage all products across Nexora shops
          </p>

        </div>


        <button
          onClick={() =>
            navigate(
              "/superadmin/products/create"
            )
          }
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          <Plus size={18} />
          Add Product
        </button>

      </div>


      {/* ==========================================
          STATISTICS
      ========================================== */}

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Products"
          value={totalProducts}
          description="All products"
          icon={Package}
        />

        <StatCard
          title="Active Products"
          value={activeProducts}
          description="Currently available"
          icon={CheckCircle}
        />

        <StatCard
          title="Pending Approval"
          value={pendingProducts}
          description="Waiting for review"
          icon={Clock}
        />

        <StatCard
          title="Out of Stock"
          value={outOfStockProducts}
          description="Need restocking"
          icon={AlertTriangle}
        />

      </div>


      {/* ==========================================
          FILTERS
      ========================================== */}

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">

          {/* SEARCH */}

          <div className="relative xl:col-span-1">

            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search product..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-slate-400"
            />

          </div>


          {/* SHOP */}

          <FilterSelect
            value={shopFilter}
            setValue={setShopFilter}
            options={shops}
            placeholder="All Shops"
          />


          {/* CATEGORY */}

          <FilterSelect
            value={categoryFilter}
            setValue={setCategoryFilter}
            options={categories}
            placeholder="All Categories"
          />


          {/* STATUS */}

          <FilterSelect
            value={status}
            setValue={setStatus}
            options={[
              "Active",
              "Inactive",
              "Out of Stock",
            ]}
            placeholder="All Status"
          />


          {/* APPROVAL */}

          <FilterSelect
            value={approval}
            setValue={setApproval}
            options={[
              "Approved",
              "Pending",
              "Rejected",
            ]}
            placeholder="All Approval"
          />

        </div>

      </div>


      {/* ==========================================
          PRODUCT TABLE
      ========================================== */}

      <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        {/* TABLE HEADER */}

        <div className="flex items-center justify-between p-5">

          <div>

            <h2 className="font-semibold text-slate-900">
              Product List
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              {filteredProducts.length} products found
            </p>

          </div>

        </div>


        {/* ========================================
            DESKTOP TABLE
        ======================================== */}

        <div className="hidden overflow-x-auto md:block">

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
                  Category
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500">
                  Price
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500">
                  Stock
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500">
                  Sales
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500">
                  Status
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500">
                  Approval
                </th>

                <th className="px-5 py-3 text-right text-xs font-semibold text-slate-500">
                  Actions
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredProducts.map(
                (product) => (

                  <tr
                    key={product.id}
                    className="border-b border-slate-100 transition last:border-0 hover:bg-slate-50"
                  >

                    {/* PRODUCT */}

                    <td className="px-5 py-4">

                      <div className="flex items-center gap-3">

                        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-slate-100">

                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />

                        </div>

                        <div className="min-w-0">

                          <p className="truncate text-sm font-semibold text-slate-800">
                            {product.name}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {product.id}
                          </p>

                        </div>

                      </div>

                    </td>


                    {/* SHOP */}

                    <td className="px-5 py-4">

                      <div className="flex items-center gap-2">

                        <Store
                          size={16}
                          className="text-slate-400"
                        />

                        <span className="text-sm text-slate-600">
                          {product.shop}
                        </span>

                      </div>

                    </td>


                    {/* CATEGORY */}

                    <td className="px-5 py-4">

                      <span className="text-sm text-slate-600">
                        {product.category}
                      </span>

                    </td>


                    {/* PRICE */}

                    <td className="px-5 py-4">

                      <span className="text-sm font-semibold text-slate-800">
                        {product.price}
                      </span>

                    </td>


                    {/* STOCK */}

                    <td className="px-5 py-4">

                      <span
                        className={`text-sm font-semibold ${
                          product.stock === 0
                            ? "text-red-600"
                            : product.stock < 20
                            ? "text-amber-600"
                            : "text-emerald-600"
                        }`}
                      >
                        {product.stock}
                      </span>

                    </td>


                    {/* SALES */}

                    <td className="px-5 py-4">

                      <span className="text-sm text-slate-600">
                        {product.sales}
                      </span>

                    </td>


                    {/* STATUS */}

                    <td className="px-5 py-4">

                      <StatusBadge
                        status={product.status}
                      />

                    </td>


                    {/* APPROVAL */}

                    <td className="px-5 py-4">

                      <StatusBadge
                        status={product.approval}
                      />

                    </td>


                    {/* ACTIONS */}

                    <td className="px-5 py-4">

                      <div className="flex justify-end gap-1">

                        <button
                          onClick={() =>
                            navigate(
                              `/superadmin/products/${product.id}`
                            )
                          }
                          title="View"
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                        >
                          <Eye size={17} />
                        </button>


                        <button
                          onClick={() =>
                            navigate(
                              `/superadmin/products/${product.id}/edit`
                            )
                          }
                          title="Edit"
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                        >
                          <Edit size={17} />
                        </button>


                        <button
                          onClick={() =>
                            handleDelete(
                              product.id,
                              product.name
                            )
                          }
                          title="Delete"
                          className="rounded-lg p-2 text-red-500 transition hover:bg-red-50"
                        >
                          <Trash2 size={17} />
                        </button>

                      </div>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>


        {/* ========================================
            MOBILE CARDS
        ======================================== */}

        <div className="divide-y divide-slate-100 md:hidden">

          {filteredProducts.map(
            (product) => (

              <div
                key={product.id}
                className="p-4"
              >

                {/* PRODUCT HEADER */}

                <div className="flex gap-3">

                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-100">

                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />

                  </div>


                  <div className="min-w-0 flex-1">

                    <div className="flex items-start justify-between gap-2">

                      <div className="min-w-0">

                        <h3 className="truncate text-sm font-semibold text-slate-900">
                          {product.name}
                        </h3>

                        <p className="mt-1 text-xs text-slate-400">
                          {product.id}
                        </p>

                      </div>

                      <StatusBadge
                        status={product.status}
                      />

                    </div>


                    <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">

                      <Store size={14} />

                      {product.shop}

                    </div>

                  </div>

                </div>


                {/* PRODUCT DETAILS */}

                <div className="mt-4 grid grid-cols-2 gap-3">

                  <ProductInfo
                    label="Category"
                    value={product.category}
                  />

                  <ProductInfo
                    label="Price"
                    value={product.price}
                  />

                  <ProductInfo
                    label="Stock"
                    value={product.stock}
                    danger={product.stock < 20}
                  />

                  <ProductInfo
                    label="Sales"
                    value={product.sales}
                  />

                </div>


                {/* APPROVAL */}

                <div className="mt-3">

                  <p className="mb-2 text-xs text-slate-400">
                    Approval
                  </p>

                  <StatusBadge
                    status={product.approval}
                  />

                </div>


                {/* ACTIONS */}

                <div className="mt-4 flex gap-2">

                  <button
                    onClick={() =>
                      navigate(
                        `/superadmin/products/${product.id}`
                      )
                    }
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    <Eye size={16} />
                    View
                  </button>


                  <button
                    onClick={() =>
                      navigate(
                        `/superadmin/products/${product.id}/edit`
                      )
                    }
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    <Edit size={16} />
                    Edit
                  </button>


                  <button
                    onClick={() =>
                      handleDelete(
                        product.id,
                        product.name
                      )
                    }
                    className="flex items-center justify-center rounded-xl border border-red-100 px-4 py-2.5 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 size={16} />
                  </button>

                </div>

              </div>

            )
          )}

        </div>


        {/* ========================================
            EMPTY STATE
        ======================================== */}

        {filteredProducts.length === 0 && (

          <div className="px-5 py-16 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">

              <Package
                size={25}
                className="text-slate-400"
              />

            </div>

            <h3 className="mt-4 font-semibold text-slate-800">
              No products found
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              Try changing your search or filters.
            </p>

          </div>

        )}

      </div>

    </div>
  );
}


// --------------------------------------------------
// FILTER SELECT
// --------------------------------------------------

function FilterSelect({
  value,
  setValue,
  options,
  placeholder,
}) {
  return (
    <div className="relative">

      <select
        value={value}
        onChange={(e) =>
          setValue(e.target.value)
        }
        className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 pr-10 text-sm outline-none focus:border-slate-400"
      >

        <option value="All">
          {placeholder}
        </option>

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}

      </select>

      <ChevronDown
        size={16}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
      />

    </div>
  );
}


// --------------------------------------------------
// MOBILE PRODUCT INFO
// --------------------------------------------------

function ProductInfo({
  label,
  value,
  danger = false,
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">

      <p className="text-xs text-slate-400">
        {label}
      </p>

      <p
        className={`mt-1 text-sm font-semibold ${
          danger
            ? "text-red-600"
            : "text-slate-800"
        }`}
      >
        {value}
      </p>

    </div>
  );
}