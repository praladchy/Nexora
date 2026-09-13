import React, { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  ChevronDown,
  Filter,
  X,
} from "lucide-react";

import {
  useGetCategoryAggregateForSuperAdminQuery,
} from "../../components/Redux/AggregateService.apiSlice";
import { useNavigate } from "react-router-dom";

const CategoryList = () => {
  // ==========================================
  // STATE
  // ==========================================

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("All");

  const [parentFilter, setParentFilter] = useState("All");
const navigate=useNavigate();

  const {
    data: superCategoryData,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetCategoryAggregateForSuperAdminQuery();

  // ==========================================
  // EXTRACT DATA
  // ==========================================

  const categoryData =
    superCategoryData?.data?.[0]?.categoryStats ?? [];

  const categoryOverview =
    superCategoryData?.data?.[0]?.categoryOvervies?.[0] ?? {};

  // ==========================================
  // PARENT CATEGORIES
  // ==========================================

  const parentCategories = useMemo(() => {
    return categoryData.filter(
      (category) => category.isParent === true
    );
  }, [categoryData]);

  // ==========================================
  // FILTER
  // ==========================================

  const filteredCategories = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return categoryData.filter((category) => {
      // ----------------------------
      // SEARCH
      // ----------------------------

      const searchMatch =
        !searchValue ||
        category.name
          ?.toLowerCase()
          .includes(searchValue) ||
        category.slug
          ?.toLowerCase()
          .includes(searchValue);

      // ----------------------------
      // STATUS
      // ----------------------------

      const statusMatch =
        status === "All" ||
        (status === "Active" &&
          category.isActive === true) ||
        (status === "Inactive" &&
          category.isActive === false);

      // ----------------------------
      // PARENT
      // ----------------------------

      let parentMatch = true;

      if (parentFilter === "Parent") {
        parentMatch = category.isParent === true;
      } else if (parentFilter !== "All") {
        parentMatch = category.parent === parentFilter;
      }

      return (
        searchMatch &&
        statusMatch &&
        parentMatch
      );
    });
  }, [
    categoryData,
    search,
    status,
    parentFilter,
  ]);

  // ==========================================
  // CLEAR FILTER
  // ==========================================

  const clearFilters = () => {
    setSearch("");
    setStatus("All");
    setParentFilter("All");
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="animate-pulse">
          <div className="h-8 w-64 bg-gray-200 rounded mb-6" />

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-28 bg-white rounded-xl"
              />
            ))}
          </div>

          <div className="h-96 bg-white rounded-xl" />
        </div>
      </div>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-5">
          <h2 className="font-semibold text-lg">
            Failed to load categories
          </h2>

          <p className="text-sm mt-1">
            {error?.data?.message ||
              "Something went wrong while loading categories."}
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">

      {/* ======================================
          HEADER
      ======================================= */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">

        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Categories
          </h1>

          <p className="text-gray-500 text-sm mt-1">
            Manage all global and shop categories
          </p>
        </div>

        <button
          className="
            flex items-center justify-center gap-2
            bg-green-600
            hover:bg-green-700
            text-white
            px-5 py-3
            rounded-lg
            font-medium
            transition
          "
        >
          <Plus size={18} />

          Add Category
        </button>
      </div>

      {/* ======================================
          OVERVIEW CARDS
      ======================================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">

        {/* Total */}

        <div className="bg-white rounded-xl border border-gray-200 p-5">

          <p className="text-sm text-gray-500">
            Total Categories
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-2">
            {categoryOverview.totalCategories ?? 0}
          </h2>

        </div>

        {/* Active */}

        <div className="bg-white rounded-xl border border-gray-200 p-5">

          <p className="text-sm text-gray-500">
            Active Categories
          </p>

          <h2 className="text-2xl font-bold text-green-600 mt-2">
            {categoryOverview.totalActiveCategories ?? 0}
          </h2>

        </div>

        {/* Global */}

        <div className="bg-white rounded-xl border border-gray-200 p-5">

          <p className="text-sm text-gray-500">
            Global Categories
          </p>

          <h2 className="text-2xl font-bold text-blue-600 mt-2">
            {categoryOverview.totalGlobalCategories ?? 0}
          </h2>

        </div>

        {/* Parent */}

        <div className="bg-white rounded-xl border border-gray-200 p-5">

          <p className="text-sm text-gray-500">
            Parent Categories
          </p>

          <h2 className="text-2xl font-bold text-purple-600 mt-2">
            {categoryOverview.totalParentCategories ??
              parentCategories.length}
          </h2>

        </div>
      </div>

      {/* ======================================
          FILTER SECTION
      ======================================= */}

      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">

        <div className="flex flex-col xl:flex-row gap-3">

          {/* SEARCH */}

          <div className="relative flex-1">

            <Search
              size={18}
              className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-gray-400
              "
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search category or slug..."
              className="
                w-full
                border
                border-gray-300
                rounded-lg
                pl-10
                pr-4
                py-2.5
                outline-none
                focus:ring-2
                focus:ring-green-500
                focus:border-green-500
              "
            />
          </div>

          {/* STATUS */}

          <div className="relative">

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              className="
                appearance-none
                w-full
                xl:w-44
                border
                border-gray-300
                rounded-lg
                px-4
                py-2.5
                pr-10
                outline-none
                focus:ring-2
                focus:ring-green-500
              "
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
              size={17}
              className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                pointer-events-none
                text-gray-400
              "
            />
          </div>

          {/* PARENT */}

          <div className="relative">

            <select
              value={parentFilter}
              onChange={(e) =>
                setParentFilter(e.target.value)
              }
              className="
                appearance-none
                w-full
                xl:w-56
                border
                border-gray-300
                rounded-lg
                px-4
                py-2.5
                pr-10
                outline-none
                focus:ring-2
                focus:ring-green-500
              "
            >
              <option value="All">
                All Categories
              </option>

              <option value="Parent">
                Parent Categories
              </option>

              {parentCategories.map(
                (category) => (
                  <option
                    key={category._id}
                    value={category.name}
                  >
                    {category.name}
                  </option>
                )
              )}
            </select>

            <ChevronDown
              size={17}
              className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                pointer-events-none
                text-gray-400
              "
            />
          </div>

          {/* CLEAR */}

          {(search ||
            status !== "All" ||
            parentFilter !== "All") && (
            <button
              onClick={clearFilters}
              className="
                flex
                items-center
                justify-center
                gap-2
                px-4
                py-2.5
                rounded-lg
                border
                border-gray-300
                hover:bg-gray-50
                text-gray-600
              "
            >
              <X size={17} />

              Clear
            </button>
          )}
        </div>
      </div>

      {/* ======================================
          TABLE
      ======================================= */}

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">

        {/* TABLE HEADER */}

        <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">

          <div>
            <h2 className="font-semibold text-gray-900">
              Category List
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Showing {filteredCategories.length} of{" "}
              {categoryData.length} categories
            </p>
          </div>

          {isFetching && (
            <span className="text-sm text-gray-400">
              Updating...
            </span>
          )}
        </div>

        {/* DESKTOP TABLE */}

        <div className="hidden lg:block overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-50">

              <tr className="text-left text-sm text-gray-500">

                <th className="px-5 py-4 font-medium">
                  Category
                </th>

                <th className="px-5 py-4 font-medium">
                  Parent
                </th>

                <th className="px-5 py-4 font-medium">
                  Shop
                </th>

                <th className="px-5 py-4 font-medium">
                  Scope
                </th>

                <th className="px-5 py-4 font-medium">
                  Status
                </th>

                <th className="px-5 py-4 font-medium">
                  Created
                </th>

                <th className="px-5 py-4 font-medium text-right">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-gray-100">

              {filteredCategories.length === 0 ? (

                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-16 text-gray-500"
                  >
                    <Filter
                      size={30}
                      className="mx-auto mb-3 text-gray-300"
                    />

                    No categories found.
                  </td>
                </tr>

              ) : (

                filteredCategories.map(
                  (category) => (
                    <tr
                      key={category._id}
                      className="hover:bg-gray-50 transition"
                    >

                      {/* CATEGORY */}

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-3">

                          <div className="w-11 h-11 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">

                            {category.image?.[0]?.url ? (

                              <img
                                src={
                                  category.image[0].url
                                }
                                alt={
                                  category.name
                                }
                                className="
                                  w-full
                                  h-full
                                  object-cover
                                "
                              />

                            ) : (

                              <div className="
                                w-full
                                h-full
                                flex
                                items-center
                                justify-center
                                text-gray-400
                                text-xs
                              ">
                                No image
                              </div>

                            )}

                          </div>

                          <div>

                            <p className="font-medium text-gray-900">
                              {category.name}
                            </p>

                            <p className="text-xs text-gray-500">
                              {category.slug}
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* PARENT */}

                      <td className="px-5 py-4">

                        {category.parent ? (

                          <span className="text-gray-700">
                            {category.parent}
                          </span>

                        ) : (

                          <span className="text-gray-400">
                            —
                          </span>

                        )}

                      </td>

                      {/* SHOP */}

                      <td className="px-5 py-4">

                        {category.shop ? (

                          <span className="text-gray-700">
                            {category.shop}
                          </span>

                        ) : (

                          <span className="text-gray-400">
                            Global
                          </span>

                        )}

                      </td>

                      {/* SCOPE */}

                      <td className="px-5 py-4">

                        {category.isGlobal ? (

                          <span className="
                            inline-flex
                            px-2.5
                            py-1
                            rounded-full
                            text-xs
                            font-medium
                            bg-blue-50
                            text-blue-700
                          ">
                            Global
                          </span>

                        ) : (

                          <span className="
                            inline-flex
                            px-2.5
                            py-1
                            rounded-full
                            text-xs
                            font-medium
                            bg-purple-50
                            text-purple-700
                          ">
                            Shop
                          </span>

                        )}

                      </td>

                      {/* STATUS */}

                      <td className="px-5 py-4">

                        {category.isActive ? (

                          <span className="
                            inline-flex
                            items-center
                            gap-1.5
                            px-2.5
                            py-1
                            rounded-full
                            text-xs
                            font-medium
                            bg-green-50
                            text-green-700
                          ">
                            <span className="
                              w-1.5
                              h-1.5
                              rounded-full
                              bg-green-500
                            " />

                            Active
                          </span>

                        ) : (

                          <span className="
                            inline-flex
                            items-center
                            gap-1.5
                            px-2.5
                            py-1
                            rounded-full
                            text-xs
                            font-medium
                            bg-red-50
                            text-red-700
                          ">
                            <span className="
                              w-1.5
                              h-1.5
                              rounded-full
                              bg-red-500
                            " />

                            Inactive
                          </span>

                        )}

                      </td>

                      {/* CREATED */}

                      <td className="px-5 py-4 text-sm text-gray-500">

                        {category.createdAt
                          ? new Date(
                              category.createdAt
                            ).toLocaleDateString()
                          : "—"}

                      </td>

                      {/* ACTIONS */}

                      <td className="px-5 py-4">

                        <div className="flex justify-end gap-2">

                          <button
                            title="View"
                            className="
                              p-2
                              rounded-lg
                              hover:bg-blue-50
                              text-gray-500
                              hover:text-blue-600
                            "
                          onClick={() =>category.isparent? '/':navigate(`/categoryDetails/${category._id}`)}>
                            <Eye size={17} />
                          </button>

                          <button
                            title="Edit"
                            className="
                              p-2
                              rounded-lg
                              hover:bg-green-50
                              text-gray-500
                              hover:text-green-600
                            "
                          >
                            <Edit size={17} />
                          </button>

                          <button
                            title="Delete"
                            className="
                              p-2
                              rounded-lg
                              hover:bg-red-50
                              text-gray-500
                              hover:text-red-600
                            "
                          >
                            <Trash2 size={17} />
                          </button>

                        </div>

                      </td>

                    </tr>
                  )
                )

              )}

            </tbody>

          </table>

        </div>

        {/* ======================================
            MOBILE CARDS
        ======================================= */}

        <div className="lg:hidden divide-y divide-gray-100">

          {filteredCategories.length === 0 ? (

            <div className="text-center py-16 text-gray-500">
              No categories found.
            </div>

          ) : (

            filteredCategories.map(
              (category) => (

                <div
                  key={category._id}
                  className="p-4"
                >

                  <div className="flex gap-3">

                    {/* IMAGE */}

                    <div className="
                      w-14
                      h-14
                      rounded-lg
                      bg-gray-100
                      overflow-hidden
                      flex-shrink-0
                    ">

                      {category.image?.[0]?.url ? (

                        <img
                          src={
                            category.image[0].url
                          }
                          alt={category.name}
                          className="
                            w-full
                            h-full
                            object-cover
                          "
                        />

                      ) : (

                        <div className="
                          w-full
                          h-full
                          flex
                          items-center
                          justify-center
                          text-xs
                          text-gray-400
                        ">
                          No image
                        </div>

                      )}

                    </div>

                    {/* INFO */}

                    <div className="flex-1 min-w-0">

                      <div className="flex justify-between gap-2">

                        <div>

                          <h3 className="font-semibold text-gray-900 truncate">
                            {category.name}
                          </h3>

                          <p className="text-xs text-gray-500 truncate">
                            {category.slug}
                          </p>

                        </div>

                        {category.isActive ? (

                          <span className="
                            h-fit
                            px-2
                            py-1
                            rounded-full
                            text-xs
                            bg-green-50
                            text-green-700
                          ">
                            Active
                          </span>

                        ) : (

                          <span className="
                            h-fit
                            px-2
                            py-1
                            rounded-full
                            text-xs
                            bg-red-50
                            text-red-700
                          ">
                            Inactive
                          </span>

                        )}

                      </div>

                      <div className="
                        grid
                        grid-cols-2
                        gap-2
                        mt-3
                        text-sm
                      ">

                        <div>
                          <p className="text-xs text-gray-400">
                            Parent
                          </p>

                          <p className="text-gray-700 truncate">
                            {category.parent ||
                              "—"}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-400">
                            Shop
                          </p>

                          <p className="text-gray-700 truncate">
                            {category.shop ||
                              "Global"}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-400">
                            Scope
                          </p>

                          <p className="text-gray-700">
                            {category.isGlobal
                              ? "Global"
                              : "Shop"}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-400">
                            Created
                          </p>

                          <p className="text-gray-700">
                            {category.createdAt
                              ? new Date(
                                  category.createdAt
                                ).toLocaleDateString()
                              : "—"}
                          </p>
                        </div>

                      </div>

                      {/* ACTIONS */}

                      <div className="
                        flex
                        justify-end
                        gap-2
                        mt-4
                      ">

                        <button
                          className="
                            p-2
                            rounded-lg
                            bg-gray-50
                            text-gray-600
                          "
                        >
                          <Eye size={16} />
                        </button>

                        <button
                          className="
                            p-2
                            rounded-lg
                            bg-gray-50
                            text-gray-600
                          "
                        >
                          <Edit size={16} />
                        </button>

                        <button
                          className="
                            p-2
                            rounded-lg
                            bg-red-50
                            text-red-600
                          "
                        >
                          <Trash2 size={16} />
                        </button>

                      </div>

                    </div>

                  </div>

                </div>

              )
            )

          )}

        </div>

      </div>

    </div>
  );
};

export default CategoryList;