import React from "react";
import {
  ArrowLeft,
  FolderTree,
  Package,
  Store,
  DollarSign,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Calendar,
  Layers,
  MoreVertical,
  AlertCircle,
  Clock,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductAggregateForSuperAdminForCategoryQuery } from "../../components/Redux/AggregateService.apiSlice";

 

// --------------------------------------------------
// STATUS BADGE
// --------------------------------------------------

function StatusBadge({ status }) {
  const styles = {
    Active: "bg-emerald-50 text-emerald-700",
    Inactive: "bg-slate-100 text-slate-600",
    Pending: "bg-amber-50 text-amber-700",
    Approved: "bg-emerald-50 text-emerald-700",
    Blocked: "bg-red-50 text-red-700",
    Draft: "bg-slate-100 text-slate-600",
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
// LOADING
// --------------------------------------------------

function LoadingState() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="animate-pulse space-y-5">
        <div className="h-5 w-40 rounded bg-slate-200" />

        <div className="h-32 rounded-2xl bg-white" />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-32 rounded-2xl bg-white"
            />
          ))}
        </div>

        <div className="h-80 rounded-2xl bg-white" />
      </div>
    </div>
  );
}

// --------------------------------------------------
// ERROR
// --------------------------------------------------

function ErrorState({ error }) {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-xl rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
          <AlertCircle
            size={24}
            className="text-red-600"
          />
        </div>

        <h2 className="mt-4 text-lg font-semibold text-slate-900">
          Failed to load category
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Something went wrong while loading
          category information.
        </p>

        {error?.data?.message && (
          <p className="mt-2 text-xs text-red-500">
            {error.data.message}
          </p>
        )}
      </div>
    </div>
  );
}

// --------------------------------------------------
// MAIN COMPONENT
// --------------------------------------------------

export default function SubCategoryDetails() {
  const navigate = useNavigate();

  const { id } = useParams();

  // --------------------------------------------------
  // API
  // --------------------------------------------------

  const {
    data: productAggregateData,
    isLoading,
    isFetching,
    isError,
    error,
  } =
    useGetProductAggregateForSuperAdminForCategoryQuery(
      id,
      {
        skip: !id,
      }
    );

  console.log(
    "Product Aggregate:",
    productAggregateData
  );

  // --------------------------------------------------
  // LOADING
  // --------------------------------------------------

  if (isLoading) {
    return <LoadingState />;
  }

  // --------------------------------------------------
  // ERROR
  // --------------------------------------------------

  if (isError) {
    return <ErrorState error={error} />;
  }

  // --------------------------------------------------
  // API DATA
  // --------------------------------------------------

  const aggregate =
    productAggregateData?.data;
console.log("poiuy",aggregate)
  const categoryStats =
    aggregate?.CategoryStats;

  const productOverview =
    aggregate?.productOverview;

  const productStats =
    aggregate?.productStats;

  const stockStats =
    aggregate?.stockStats;

  const shopsStats =
    aggregate?.ShopsStats;

  // --------------------------------------------------
  // CATEGORY DATA
  // --------------------------------------------------

  const category =
    productOverview?.category;

  const categoryName =
    categoryStats?.name ||
    category?.name ||
    "Unknown Category";

  const categoryId =
    categoryStats?._id ||
    category?._id ||
    id;

  const categorySlug =
    category?.slug || "";

  const categoryDescription =
    category?.description ||
    "No description available.";

  // Your API shows image as an array.
  const categoryImage =
    category?.image?.[0]?.url ||
    category?.image?.[0] ||
    "";

  const categoryStatus =
    category?.isActive
      ? "Active"
      : "Inactive";

  // --------------------------------------------------
  // CATEGORY STATISTICS
  // --------------------------------------------------

  const totalProducts =
    categoryStats
      ?.totalNumberOfProductsInCategory || 0;

  const activeProducts =
    categoryStats
      ?.totalActiveProductsInCategory || 0;

  const inactiveProducts =
    categoryStats
      ?.totalInactiveProductInCategory || 0;

  const blockedProducts =
    categoryStats
      ?.totalBlockedProductInCategory || 0;

  const draftProducts =
    categoryStats
      ?.totalDraftProductInCategory || 0;

  // --------------------------------------------------
  // PRODUCT APPROVAL STATS
  // --------------------------------------------------

  const approvedProducts =
    productStats?.approvedProducts || 0;

  const pendingProducts =
    productStats?.pendingProductsapproval || 0;

  // --------------------------------------------------
  // PRODUCT
  // --------------------------------------------------

  const product =
    productOverview;

  // --------------------------------------------------
  // SHOP
  // --------------------------------------------------

  const shopName =
    stockStats?.shop || "No shop";

  const stock =
    stockStats?.stock ?? 0;

  const stockLimit =
    stockStats?.stockLimit ?? 0;

  // --------------------------------------------------
  // PRODUCT STATUS
  // --------------------------------------------------

  const productStatus =
    product?.isApproved
      ? "Approved"
      : "Pending";

  // --------------------------------------------------
  // PRODUCT IMAGE
  // --------------------------------------------------

  const productImage =
    product?.images?.[0]?.url || "";

  // --------------------------------------------------
  // PERCENTAGE
  // --------------------------------------------------

  const activePercentage =
    totalProducts > 0
      ? (activeProducts / totalProducts) * 100
      : 0;

  // --------------------------------------------------
  // DATE FORMATTER
  // --------------------------------------------------

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    );
  };

  // --------------------------------------------------
  // RENDER
  // --------------------------------------------------

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

              {categoryImage ? (
                <img
                  src={categoryImage}
                  alt={categoryName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <FolderTree
                    size={30}
                    className="text-slate-400"
                  />
                </div>
              )}

            </div>

            {/* CATEGORY NAME */}

            <div>

              <div className="flex flex-wrap items-center gap-3">

                <h1 className="text-2xl font-bold text-slate-900">
                  {categoryName}
                </h1>

                <StatusBadge
                  status={categoryStatus}
                />

              </div>

              <p className="mt-1 text-sm text-slate-500">
                {categoryId}
                {categorySlug &&
                  ` · ${categorySlug}`}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Parent:{" "}
                {category?.parent
                  ? category.parent
                  : "None"}
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
          value={totalProducts}
          description="Products in this category"
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
          description="Products waiting for approval"
          icon={Clock}
        />

        <StatCard
          title="Approved Products"
          value={approvedProducts}
          description="Approved products"
          icon={CheckCircle}
        />

      </div>

      {/* ------------------------------------------
          CATEGORY INFORMATION + OVERVIEW
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
              value={categoryName}
            />

            <InfoItem
              icon={Layers}
              label="Parent Category"
              value={
                category?.parent || "None"
              }
            />

            <InfoItem
              icon={Calendar}
              label="Created At"
              value={formatDate(
                category?.createdAt
              )}
            />

            <InfoItem
              icon={Calendar}
              label="Last Updated"
              value={formatDate(
                category?.updatedAt
              )}
            />

            <InfoItem
              icon={CheckCircle}
              label="Status"
              value={categoryStatus}
            />

            <InfoItem
              icon={Layers}
              label="Category Type"
              value={
                category?.isParent
                  ? "Parent Category"
                  : "Sub Category"
              }
            />

          </div>

        </div>

        {/* DESCRIPTION + PERFORMANCE */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">

          <h2 className="font-semibold text-slate-900">
            Category Overview
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            Category description and product
            distribution
          </p>

          {/* DESCRIPTION */}

          <div className="mt-5 rounded-xl bg-slate-50 p-4">

            <p className="text-sm leading-6 text-slate-600">
              {categoryDescription}
            </p>

          </div>

          {/* PRODUCT DISTRIBUTION */}

          <div className="mt-6">

            <div className="flex items-center justify-between">

              <p className="text-sm font-semibold text-slate-700">
                Product Status
              </p>

              <p className="text-xs text-slate-400">
                {totalProducts} Total
              </p>

            </div>

            <div className="mt-4">

              <div className="h-3 overflow-hidden rounded-full bg-slate-100">

                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{
                    width: `${Math.min(
                      activePercentage,
                      100
                    )}%`,
                  }}
                />

              </div>

            </div>

            <div className="mt-4 flex flex-wrap gap-5 text-xs">

              {/* ACTIVE */}

              <div className="flex items-center gap-2">

                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />

                <span className="text-slate-500">
                  Active
                </span>

                <span className="font-semibold text-slate-700">
                  {activeProducts}
                </span>

              </div>

              {/* INACTIVE */}

              <div className="flex items-center gap-2">

                <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />

                <span className="text-slate-500">
                  Inactive
                </span>

                <span className="font-semibold text-slate-700">
                  {inactiveProducts}
                </span>

              </div>

              {/* BLOCKED */}

              <div className="flex items-center gap-2">

                <span className="h-2.5 w-2.5 rounded-full bg-red-500" />

                <span className="text-slate-500">
                  Blocked
                </span>

                <span className="font-semibold text-slate-700">
                  {blockedProducts}
                </span>

              </div>

              {/* DRAFT */}

              <div className="flex items-center gap-2">

                <span className="h-2.5 w-2.5 rounded-full bg-slate-400" />

                <span className="text-slate-500">
                  Draft
                </span>

                <span className="font-semibold text-slate-700">
                  {draftProducts}
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ------------------------------------------
          PRODUCT
      ------------------------------------------ */}

      {product && (
        <div className="mt-5 rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="flex items-center justify-between p-5">

            <div>

              <h2 className="font-semibold text-slate-900">
                Product in This Category
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Product information from this category
              </p>

            </div>

            <StatusBadge
              status={productStatus}
            />

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
                    Discount
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500">
                    Final Price
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

                <tr className="border-b border-slate-100 hover:bg-slate-50">

                  {/* PRODUCT */}

                  <td className="px-5 py-4">

                    <div className="flex items-center gap-3">

                      <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-slate-100">

                        {productImage ? (
                          <img
                            src={productImage}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <Package
                              size={20}
                              className="text-slate-400"
                            />
                          </div>
                        )}

                      </div>

                      <div>

                        <p className="text-sm font-semibold text-slate-800">
                          {product.name}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          SKU: {product.sku}
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* SHOP */}

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {shopName}
                  </td>

                  {/* PRICE */}

                  <td className="px-5 py-4 text-sm font-semibold text-slate-700">
                    Rs. {product.price?.toLocaleString()}
                  </td>

                  {/* DISCOUNT */}

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {product.discount || 0}%
                  </td>

                  {/* FINAL PRICE */}

                  <td className="px-5 py-4 text-sm font-semibold text-emerald-600">
                    Rs.{" "}
                    {product.finalPrice?.toLocaleString()}
                  </td>

                  {/* STOCK */}

                  <td className="px-5 py-4">

                    <span
                      className={`text-sm font-semibold ${
                        stock <= stockLimit
                          ? "text-red-600"
                          : "text-emerald-600"
                      }`}
                    >
                      {stock}
                    </span>

                  </td>

                  {/* STATUS */}

                  <td className="px-5 py-4">
                    <StatusBadge
                      status={productStatus}
                    />
                  </td>

                </tr>

              </tbody>

            </table>

          </div>

        </div>
      )}

      {/* ------------------------------------------
          PRODUCT STOCK INFORMATION
      ------------------------------------------ */}

      {stockStats && (
        <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="font-semibold text-slate-900">
                Stock Information
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Current inventory information
              </p>

            </div>

            <Package
              size={20}
              className="text-slate-400"
            />

          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <StatCard
              title="Current Stock"
              value={stock}
              description="Available units"
              icon={Package}
            />

            <StatCard
              title="Stock Limit"
              value={stockLimit}
              description="Low stock threshold"
              icon={AlertCircle}
            />

            <StatCard
              title="Stock Status"
              value={
                stockStats.stockStatus || "Unknown"
              }
              description="Current inventory state"
              icon={CheckCircle}
            />

            <StatCard
              title="Shop"
              value={shopName}
              description="Product shop"
              icon={Store}
            />

          </div>

        </div>
      )}

      {/* ------------------------------------------
          API FETCHING INDICATOR
      ------------------------------------------ */}

      {isFetching && (
        <div className="fixed bottom-5 right-5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-medium text-white shadow-lg">
          Updating...
        </div>
      )}

    </div>
  );
}