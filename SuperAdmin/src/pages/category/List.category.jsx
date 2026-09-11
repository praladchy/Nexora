import React, { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  ChevronDown,
  FolderTree,
  Package,
  Store,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// --------------------------------------------------
// STATIC DATA
// Replace this later with RTK Query
// --------------------------------------------------

const categories = [
  {
    id: "CAT-001",
    name: "Electronics",
    slug: "electronics",
    parent: null,
    products: 248,
    shops: 38,
    status: "Active",
    createdAt: "12 Jan 2026",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661",
  },
  {
    id: "CAT-002",
    name: "Smartphones",
    slug: "smartphones",
    parent: "Electronics",
    products: 84,
    shops: 24,
    status: "Active",
    createdAt: "14 Jan 2026",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
  },
  {
    id: "CAT-003",
    name: "Laptops",
    slug: "laptops",
    parent: "Electronics",
    products: 52,
    shops: 18,
    status: "Active",
    createdAt: "15 Jan 2026",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
  },
  {
    id: "CAT-004",
    name: "Fashion",
    slug: "fashion",
    parent: null,
    products: 386,
    shops: 52,
    status: "Active",
    createdAt: "18 Jan 2026",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050",
  },
  {
    id: "CAT-005",
    name: "Men Fashion",
    slug: "men-fashion",
    parent: "Fashion",
    products: 126,
    shops: 31,
    status: "Active",
    createdAt: "19 Jan 2026",
    image:
      "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891",
  },
  {
    id: "CAT-006",
    name: "Women Fashion",
    slug: "women-fashion",
    parent: "Fashion",
    products: 174,
    shops: 42,
    status: "Active",
    createdAt: "19 Jan 2026",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b",
  },
  {
    id: "CAT-007",
    name: "Home & Kitchen",
    slug: "home-kitchen",
    parent: null,
    products: 214,
    shops: 34,
    status: "Active",
    createdAt: "22 Jan 2026",
    image:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba",
  },
  {
    id: "CAT-008",
    name: "Furniture",
    slug: "furniture",
    parent: "Home & Kitchen",
    products: 68,
    shops: 16,
    status: "Inactive",
    createdAt: "24 Jan 2026",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
  },
  {
    id: "CAT-009",
    name: "Beauty",
    slug: "beauty",
    parent: null,
    products: 142,
    shops: 27,
    status: "Active",
    createdAt: "28 Jan 2026",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348",
  },
  {
    id: "CAT-010",
    name: "Sports",
    slug: "sports",
    parent: null,
    products: 98,
    shops: 21,
    status: "Inactive",
    createdAt: "02 Feb 2026",
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211",
  },
];

// --------------------------------------------------
// STATUS BADGE
// --------------------------------------------------

function StatusBadge({ status }) {
  const active = status === "Active";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
        active
          ? "bg-emerald-50 text-emerald-700"
          : "bg-slate-100 text-slate-600"
      }`}
    >
      {active ? (
        <CheckCircle size={13} />
      ) : (
        <XCircle size={13} />
      )}

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
  icon: Icon,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            {value}
          </h2>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
          <Icon size={21} className="text-slate-700" />
        </div>

      </div>
    </div>
  );
}

// --------------------------------------------------
// MAIN COMPONENT
// --------------------------------------------------

export default function CategoryList() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [parentFilter, setParentFilter] = useState("All");

  // ------------------------------------------------
  // FILTER
  // ------------------------------------------------

  const filteredCategories = useMemo(() => {
    return categories.filter((category) => {
      const searchMatch =
        category.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        category.slug
          .toLowerCase()
          .includes(search.toLowerCase());

      const statusMatch =
        status === "All" ||
        category.status === status;

      const parentMatch =
        parentFilter === "All" ||
        (parentFilter === "Parent"
          ? category.parent === null
          : category.parent === parentFilter);

      return (
        searchMatch &&
        statusMatch &&
        parentMatch
      );
    });
  }, [search, status, parentFilter]);

  // ------------------------------------------------
  // STATS
  // ------------------------------------------------

  const totalCategories = categories.length;

  const parentCategories = categories.filter(
    (category) => category.parent === null
  ).length;

  const activeCategories = categories.filter(
    (category) => category.status === "Active"
  ).length;

  const inactiveCategories = categories.filter(
    (category) => category.status === "Inactive"
  ).length;

  // ------------------------------------------------
  // DELETE
  // ------------------------------------------------

  const handleDelete = (id, name) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${name}"?`
    );

    if (!confirmDelete) return;

    console.log("Delete category:", id);

    // Later:
    // deleteCategory(id)
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">

      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Categories
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage product categories and subcategories
          </p>
        </div>

        <button
          onClick={() =>
            navigate("/superadmin/categories/create")
          }
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          <Plus size={18} />
          Add Category
        </button>

      </div>


      {/* ==========================================
          STATISTICS
      ========================================== */}

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Categories"
          value={totalCategories}
          icon={FolderTree}
        />

        <StatCard
          title="Parent Categories"
          value={parentCategories}
          icon={FolderTree}
        />

        <StatCard
          title="Active Categories"
          value={activeCategories}
          icon={CheckCircle}
        />

        <StatCard
          title="Inactive Categories"
          value={inactiveCategories}
          icon={XCircle}
        />

      </div>


      {/* ==========================================
          FILTER SECTION
      ========================================== */}

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

        <div className="flex flex-col gap-3 lg:flex-row">

          {/* SEARCH */}

          <div className="relative flex-1">

            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search category or slug..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-slate-400"
            />

          </div>


          {/* STATUS */}

          <div className="relative">

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 pr-10 text-sm outline-none lg:w-44"
            >
              <option value="All">
                All Status
              </option>

              <option value="Active">
                Active
              </option>

              <option value="Inactive">
                Inactive
              </option>
            </select>

            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

          </div>


          {/* PARENT FILTER */}

          <div className="relative">

            <select
              value={parentFilter}
              onChange={(e) =>
                setParentFilter(e.target.value)
              }
              className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 pr-10 text-sm outline-none lg:w-52"
            >

              <option value="All">
                All Categories
              </option>

              <option value="Parent">
                Parent Only
              </option>

              {categories
                .filter(
                  (category) =>
                    category.parent === null
                )
                .map((category) => (
                  <option
                    key={category.id}
                    value={category.name}
                  >
                    {category.name}
                  </option>
                ))}

            </select>

            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

          </div>

        </div>

      </div>


      {/* ==========================================
          CATEGORY TABLE
      ========================================== */}

      <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        {/* TABLE HEADER */}

        <div className="flex items-center justify-between p-5">

          <div>
            <h2 className="font-semibold text-slate-900">
              Category List
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              {filteredCategories.length} categories found
            </p>
          </div>

        </div>


        {/* DESKTOP TABLE */}

        <div className="hidden overflow-x-auto md:block">

          <table className="w-full">

            <thead>

              <tr className="border-y border-slate-100 bg-slate-50">

                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500">
                  Category
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500">
                  Parent
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

                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500">
                  Created
                </th>

                <th className="px-5 py-3 text-right text-xs font-semibold text-slate-500">
                  Actions
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredCategories.map(
                (category) => (

                  <tr
                    key={category.id}
                    className="border-b border-slate-100 transition last:border-0 hover:bg-slate-50"
                  >

                    {/* CATEGORY */}

                    <td className="px-5 py-4">

                      <div className="flex items-center gap-3 pointer cursor-pointer" onClick={() => navigate(`/categoryDetails/${category.id}`)}>

                        <div className="h-11 w-11 shrink-0 overflow-hidden rounded-xl bg-slate-100">

                          <img
                            src={category.image}
                            alt={category.name}
                            className="h-full w-full object-cover"
                          />

                        </div>

                        <div>

                          <p className="text-sm font-semibold text-slate-800">
                            {category.name}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {category.slug}
                          </p>

                        </div>

                      </div>

                    </td>


                    {/* PARENT */}

                    <td className="px-5 py-4">

                      {category.parent ? (
                        <span className="inline-flex items-center gap-1.5 text-sm text-slate-600">
                          <FolderTree size={15} />
                          {category.parent}
                        </span>
                      ) : (
                        <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                          Parent Category
                        </span>
                      )}

                    </td>


                    {/* PRODUCTS */}

                    <td className="px-5 py-4">

                      <div className="flex items-center gap-2">

                        <Package
                          size={16}
                          className="text-slate-400"
                        />

                        <span className="text-sm text-slate-600">
                          {category.products}
                        </span>

                      </div>

                    </td>


                    {/* SHOPS */}

                    <td className="px-5 py-4">

                      <div className="flex items-center gap-2">

                        <Store
                          size={16}
                          className="text-slate-400"
                        />

                        <span className="text-sm text-slate-600">
                          {category.shops}
                        </span>

                      </div>

                    </td>


                    {/* STATUS */}

                    <td className="px-5 py-4">

                      <StatusBadge
                        status={category.status}
                      />

                    </td>


                    {/* CREATED */}

                    <td className="px-5 py-4 text-sm text-slate-500">
                      {category.createdAt}
                    </td>


                    {/* ACTIONS */}

                    <td className="px-5 py-4">

                      <div className="flex justify-end gap-1">

                        {/* VIEW */}

                        <button
                          onClick={() =>
                            navigate(
                              `/superadmin/categories/${category.id}`
                            )
                          }
                          title="View"
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                        >
                          <Eye size={17} />
                        </button>


                        {/* EDIT */}

                        <button
                          onClick={() =>
                            navigate(
                              `/superadmin/categories/${category.id}/edit`
                            )
                          }
                          title="Edit"
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                        >
                          <Edit size={17} />
                        </button>


                        {/* DELETE */}

                        <button
                          onClick={() =>
                            handleDelete(
                              category.id,
                              category.name
                            )
                          }
                          title="Delete"
                          className="rounded-lg p-2 text-red-500 transition hover:bg-red-50 hover:text-red-600"
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

          {filteredCategories.map(
            (category) => (

              <div
                key={category.id}
                className="p-4"
              >

                <div className="flex gap-3">

                  {/* IMAGE */}

                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-slate-100">

                    <img
                      src={category.image}
                      alt={category.name}
                      className="h-full w-full object-cover"
                    />

                  </div>


                  {/* INFO */}

                  <div className="min-w-0 flex-1">

                    <div className="flex items-start justify-between gap-2">

                      <div>

                        <h3 className="text-sm font-semibold text-slate-900">
                          {category.name}
                        </h3>

                        <p className="mt-1 text-xs text-slate-400">
                          {category.id}
                        </p>

                      </div>

                      <StatusBadge
                        status={category.status}
                      />

                    </div>


                    <p className="mt-2 text-xs text-slate-500">

                      {category.parent
                        ? `Parent: ${category.parent}`
                        : "Parent Category"}

                    </p>

                  </div>

                </div>


                {/* STATS */}

                <div className="mt-4 grid grid-cols-2 gap-3">

                  <div className="rounded-xl bg-slate-50 p-3">

                    <div className="flex items-center gap-2">

                      <Package
                        size={15}
                        className="text-slate-400"
                      />

                      <span className="text-xs text-slate-400">
                        Products
                      </span>

                    </div>

                    <p className="mt-1 text-sm font-bold text-slate-800">
                      {category.products}
                    </p>

                  </div>


                  <div className="rounded-xl bg-slate-50 p-3">

                    <div className="flex items-center gap-2">

                      <Store
                        size={15}
                        className="text-slate-400"
                      />

                      <span className="text-xs text-slate-400">
                        Shops
                      </span>

                    </div>

                    <p className="mt-1 text-sm font-bold text-slate-800">
                      {category.shops}
                    </p>

                  </div>

                </div>


                {/* ACTIONS */}

                <div className="mt-4 flex gap-2">

                  <button
                    onClick={() =>
                      navigate(
                        `/superadmin/categories/${category.id}`
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
                        `/superadmin/categories/${category.id}/edit`
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
                        category.id,
                        category.name
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

        {filteredCategories.length === 0 && (

          <div className="px-5 py-16 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
              <FolderTree
                size={24}
                className="text-slate-400"
              />
            </div>

            <h3 className="mt-4 font-semibold text-slate-800">
              No categories found
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