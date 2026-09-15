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
  Calendar,
  Layers,
  MoreVertical,
  Clock,
  AlertCircle,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import {
  useGetCategoryAggregateForParentCategorySuperAdminQuery,
  useGetProductAggregateForSuperAdminForCategoryQuery,
} from "../../components/Redux/AggregateService.apiSlice";

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

function StatCard({ title, value, description, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>

          <h2 className="mt-2 text-2xl font-bold text-slate-900">{value}</h2>

          <p className="mt-1 text-xs text-slate-400">{description}</p>
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

function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="flex gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100">
        <Icon size={17} className="text-slate-500" />
      </div>

      <div className="min-w-0">
        <p className="text-xs text-slate-400">{label}</p>

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
            <div key={item} className="h-32 rounded-2xl bg-white" />
          ))}
        </div>

        <div className="h-80 rounded-2xl bg-white" />
      </div>
    </div>
  );
}

// --------------------------------------------------
// MAIN COMPONENT
// --------------------------------------------------

export default function CategoryDetails() {
  const navigate = useNavigate();

  const { id: categoryId } = useParams();

  // --------------------------------------------------
  // PARENT CATEGORY -> CHILD CATEGORIES
  // --------------------------------------------------

  const {
    data: ChildCategory,
    isLoading: childCategoryLoading,
    isError: childCategoryError,
  } = useGetCategoryAggregateForParentCategorySuperAdminQuery(categoryId, {
    skip: !categoryId,
  });

  // --------------------------------------------------
  // CATEGORY -> PRODUCTS
  // --------------------------------------------------

  const {
    data: ProductData,
    isLoading: productLoading,
    isError: productError,
  } = useGetProductAggregateForSuperAdminForCategoryQuery(categoryId, {
    skip: !categoryId,
  });

  console.log("ChildCategory:", ChildCategory);
  console.log("ProductData:", ProductData);

  // --------------------------------------------------
  // LOADING
  // --------------------------------------------------

  if (childCategoryLoading || productLoading) {
    return <LoadingState />;
  }

  // --------------------------------------------------
  // ERROR
  // --------------------------------------------------

  if (childCategoryError || productError) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-xl rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
          <AlertCircle size={30} className="mx-auto text-red-500" />

          <h2 className="mt-4 text-lg font-semibold text-slate-900">
            Failed to load category
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Unable to fetch category information.
          </p>
        </div>
      </div>
    );
  }

  // ==================================================
  // CHILD CATEGORY API DATA
  // ==================================================

  const childCategoryData = ChildCategory?.data;

  const subCategories = childCategoryData?.categoryStats || [];
  const currentCategory = childCategoryData?.currentCategory || {};
  console.log("currentCategory iop:", currentCategory);
  const categoryOverviews = childCategoryData?.categoryOverviews || {};

  // ==================================================
  // PRODUCT API DATA
  // ==================================================

  const productAggregate = ProductData?.data;
  const categoryStats = productAggregate?.CategoryStats || {};

  const shopsStats = productAggregate?.ShopsStats || {};

  const productStats = productAggregate?.productStats || {};

  const stockStats = productAggregate?.stockStats || {};

  const productOverview = productAggregate?.productOverview || [];
  console.log("productAggregate ccxxcx:", productOverview);


  // ==================================================
  // CATEGORY
  // ==================================================

  /*
    IMPORTANT:

    The product API does not return category information
    when productOverview is empty.

    Therefore, get the selected category from:

    1. child category list if found
    2. otherwise fallback values
  */

  // const currentCategory =
  //   subCategories.find(
  //     (item) => item._id === categoryId
  //   );

  // If selected category is parent category,
  // it may not exist in categoryStats because
  // categoryStats contains its children.

  const categoryName = currentCategory?.name || "Category Details";

  const categorySlug = currentCategory?.slug || "";

  const categoryDescription =
    currentCategory?.description || "Category information and product details.";

  const categoryImage =
    currentCategory?.image?.[0]?.url || currentCategory?.image?.[0] || "";

  const categoryStatus = currentCategory?.isActive ? "Active" : "Inactive";

  // ==================================================
  // PRODUCT STATISTICS
  // ==================================================
  const totalCategories = categoryOverviews?.totalCategories || 0;

  const totalActiveCategories = categoryOverviews?.totalActiveCategories || 0;

  const totalGlobalCategories = categoryOverviews?.totalGlobalCategories || 0;

  // const totalProducts = categoryStats?.totalNumberOfProductsInCategory || 0;

  // const activeProducts = categoryStats?.totalActiveProductsInCategory || 0;

  // const inactiveProducts = categoryStats?.totalInactiveProductInCategory || 0;

  // const blockedProducts = categoryStats?.totalBlockedProductInCategory || 0;

  // const draftProducts = categoryStats?.totalDraftProductInCategory || 0;

  // ==================================================
  // APPROVAL STATISTICS
  // ==================================================

  const approvedProducts = productStats?.approvedProducts || 0;

  const pendingProducts = productStats?.pendingProductsapproval || 0;

  // ==================================================
  // SHOP PRODUCT COUNT
  // ==================================================

  const totalProductsInShops = shopsStats?.totalNumberofProductsInShops || 0;

  // ==================================================
  // PRODUCT ARRAY
  // ==================================================

  const products = Array.isArray(productOverview)
    ? productOverview
    : productOverview
      ? [productOverview]
      : [];

  // ==================================================
  // PRODUCT STATUS PERCENTAGE
  // ==================================================

  // const activePercentage =
  //   totalProducts > 0 ? (activeProducts / totalProducts) * 100 : 0;

  // ==================================================
  // DATE FORMATTER
  // ==================================================

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  // ==================================================
  // RENDER
  // ==================================================

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      {/* ==========================================
          BACK
      ========================================== */}

      <button
        onClick={() => navigate("/superadmin/categories")}
        className="mb-5 flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
      >
        <ArrowLeft size={18} />
        Back to Categories
      </button>

      {/* ==========================================
          CATEGORY HEADER
      ========================================== */}

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            {/* IMAGE */}

            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-slate-100">
              {categoryImage ? (
                <img
                  src={categoryImage}
                  alt={categoryName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <FolderTree size={30} className="text-slate-400" />
                </div>
              )}
            </div>

            {/* NAME */}

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold text-slate-900">
                  {categoryName}
                </h1>

                <StatusBadge status={categoryStatus} />
              </div>

              <p className="mt-1 text-sm text-slate-500">
                {categoryId}
                {categorySlug && ` · ${categorySlug}`}
              </p>

              <p className="mt-1 text-xs text-slate-400">Parent Category</p>
            </div>
          </div>

          {/* ACTIONS */}

          <div className="flex flex-wrap gap-2">
            <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium transition hover:bg-slate-50">
              <Edit size={17} />
              Edit
            </button>

            <button className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700">
              <Trash2 size={17} />
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* ==========================================
          STATISTICS
      ========================================== */}

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total SubCategories"
          value={totalCategories}
          description="Products in this category"
          icon={Package}
        />

        <StatCard
          title="Active Categories"
          value={totalActiveCategories}
          description="Currently available"
          icon={CheckCircle}
        />

        <StatCard
          title="Global Categories"
          value={totalGlobalCategories}
          description="Waiting for approval"
          icon={Clock}
        />
      </div>

      {/* ==========================================
          CATEGORY INFO
      ========================================== */}

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
              label="Category Type"
              value={
                currentCategory?.isParent ? "Parent Category" : "Sub Category"
              }
            />

            <InfoItem
              icon={Calendar}
              label="Created At"
              value={formatDate(currentCategory?.createdAt)}
            />

            <InfoItem
              icon={Calendar}
              label="Last Updated"
              value={formatDate(currentCategory?.updatedAt)}
            />

            <InfoItem
              icon={CheckCircle}
              label="Status"
              value={categoryStatus}
            />
          </div>
        </div>

        {/* CATEGORY OVERVIEW */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
          <h2 className="font-semibold text-slate-900">Category Overview</h2>

          <p className="mt-1 text-xs text-slate-400">
            Category description and product distribution
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

              {/* <p className="text-xs text-slate-400">{totalProducts} Total</p> */}
            </div>

            {/* <div className="mt-4">
              <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{
                    width: `${Math.min(activePercentage, 100)}%`,
                  }}
                />
              </div>
            </div> */}

            <div className="mt-4 flex flex-wrap gap-5 text-xs">
              {/* ACTIVE */}

              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />

                <span className="text-slate-500">Active</span>

                {/* <span className="font-semibold text-slate-700">
                  {activeProducts}
                </span> */}
              </div>

              {/* INACTIVE */}

              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />

                <span className="text-slate-500">Inactive</span>

                {/* <span className="font-semibold text-slate-700">
                  {inactiveProducts}
                </span> */}
              </div>

              {/* BLOCKED */}

              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500" />

                <span className="text-slate-500">Blocked</span>

                {/* <span className="font-semibold text-slate-700">
                  {blockedProducts}
                </span> */}
              </div>

              {/* DRAFT */}

              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-slate-400" />

                <span className="text-slate-500">Draft</span>

                {/* <span className="font-semibold text-slate-700">
                  {draftProducts}
                </span> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          SUB CATEGORIES
      ========================================== */}

      <div className="mt-5 rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between p-5">
          <div>
            <h2 className="font-semibold text-slate-900">Sub Categories</h2>

            <p className="mt-1 text-xs text-slate-400">
              Categories under this parent category
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
                  Type
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500">
                  Global
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500">
                  Status
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500">
                  Created
                </th>

                <th className="px-5 py-3 text-right text-xs font-semibold text-slate-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {subCategories.length > 0 ? (
                subCategories.map((sub) => (
                  <tr
                    key={sub._id}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                  >
                    {/* CATEGORY */}

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                          {sub.image?.[0]?.url ? (
                            <img
                              src={sub.image[0].url}
                              alt={sub.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center">
                              <FolderTree
                                size={18}
                                className="text-slate-400"
                              />
                            </div>
                          )}
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-slate-800">
                            {sub.name}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {sub._id}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* TYPE */}

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {sub.isParent ? "Parent" : "Sub Category"}
                    </td>

                    {/* GLOBAL */}

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {sub.isGlobal ? "Global" : "Shop"}
                    </td>

                    {/* STATUS */}

                    <td className="px-5 py-4">
                      <StatusBadge
                        status={sub.isActive ? "Active" : "Inactive"}
                      />
                    </td>

                    {/* CREATED */}

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {formatDate(sub.createdAt)}
                    </td>

                    {/* ACTION */}

                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() =>
                          navigate(`/superadmin/categories/${sub._id}`)
                        }
                        className="text-sm font-medium text-slate-700 hover:underline"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-5 py-10 text-center text-sm text-slate-400"
                  >
                    No sub categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ==========================================
          PRODUCTS
      ========================================== */}

      <div className="mt-5 rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* <div className="flex items-center justify-between p-5">
          <div>
            <h2 className="font-semibold text-slate-900">
              Products in This Category
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Products belonging to this category
            </p>
          </div>

          <button className="text-sm font-medium text-slate-700 hover:underline">
            View All
          </button>
        </div> */}

        <div className="overflow-x-auto">
          <table className="w-full">
            {/* <thead>
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
                  Approval
                </th>
              </tr>
            </thead> */}

            {/* <tbody>
              {products.length > 0 ? (
                products.map((product) => {
                  const image = product?.images?.[0]?.url;

                  const approvalStatus = product?.isApproved
                    ? "Approved"
                    : "Pending";

                  return (
                    <tr
                      key={product._id}
                      className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                    >

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                            {image ? (
                              <img
                                src={image}
                                alt={product.name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center">
                                <Package size={20} className="text-slate-400" />
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


                      <td className="px-5 py-4 text-sm text-slate-600">
                        {product.shop || "N/A"}
                      </td>


                      <td className="px-5 py-4 text-sm font-semibold text-slate-700">
                        Rs. {product.price?.toLocaleString() || 0}
                      </td>


                      <td className="px-5 py-4 text-sm text-slate-600">
                        {product.discount || 0}%
                      </td>


                      <td className="px-5 py-4 text-sm font-semibold text-emerald-600">
                        Rs. {product.finalPrice?.toLocaleString() || 0}
                      </td>


                      <td className="px-5 py-4">
                        <span
                          className={`text-sm font-semibold ${
                            product.stock <= product.stockLimit
                              ? "text-red-600"
                              : "text-emerald-600"
                          }`}
                        >
                          {product.stock ?? 0}
                        </span>
                      </td>


                      <td className="px-5 py-4">
                        <StatusBadge status={approvalStatus} />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="px-5 py-10 text-center">
                    <Package size={30} className="mx-auto text-slate-300" />

                    <p className="mt-3 text-sm font-medium text-slate-500">
                      No products found
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      This category currently has no products.
                    </p>
                  </td>
                </tr>
              )}
            </tbody> */}
          </table>
        </div>
      </div>

      {/* <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"> */}
        {/* <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-slate-900">Stock Information</h2>

            <p className="mt-1 text-xs text-slate-400">
              Current inventory information
            </p>
          </div>

          <Package size={20} className="text-slate-400" />
        </div> */}

        {/* <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Current Stock"
            value={stockStats?.stock || 0}
            description="Available units"
            icon={Package}
          />

          <StatCard
            title="Stock Limit"
            value={stockStats?.stockLimit || 0}
            description="Low stock threshold"
            icon={AlertCircle}
          />

          <StatCard
            title="Stock Price"
            value={`Rs. ${(stockStats?.price || 0).toLocaleString()}`}
            description="Product price"
            icon={DollarSign}
          />

          <StatCard
            title="Total Products"
            value={productStats?.totalProducts || 0}
            description="Products in category"
            icon={Package}
          />
        </div> */}
      {/* </div>  */}
    </div>
  );
}
