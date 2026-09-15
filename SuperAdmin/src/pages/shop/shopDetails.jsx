import React from "react";
import {
  ArrowLeft,
  Store,
  MapPin,
  Mail,
  Phone,
  Calendar,
  User,
  Package,
  ShoppingCart,
  DollarSign,
  Users,
  MoreVertical,
  CheckCircle,
  XCircle,
  Edit,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import {
  useGetShopAggregateForSuperAdminforShopIdQuery,
} from "../../components/Redux/AggregateService.apiSlice";

// ============================================================
// STATUS BADGE
// ============================================================

function StatusBadge({ status }) {
  const styles = {
    Active: "bg-emerald-50 text-emerald-700",
    Suspended: "bg-red-50 text-red-700",

    Pending: "bg-amber-50 text-amber-700",
    Confirmed: "bg-blue-50 text-blue-700",
    Packed: "bg-indigo-50 text-indigo-700",
    Shipped: "bg-violet-50 text-violet-700",
    Delivered: "bg-emerald-50 text-emerald-700",
    Cancelled: "bg-red-50 text-red-700",

    draft: "bg-slate-100 text-slate-600",
    active: "bg-emerald-50 text-emerald-700",
    inactive: "bg-amber-50 text-amber-700",
    blocked: "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status] || "bg-slate-100 text-slate-600"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status || "Unknown"}
    </span>
  );
}

// ============================================================
// STAT CARD
// ============================================================

function StatCard({
  title,
  value,
  icon: Icon,
  description,
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

          {description && (
            <p className="mt-1 text-xs text-slate-400">
              {description}
            </p>
          )}
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
          <Icon size={21} className="text-slate-700" />
        </div>
      </div>
    </div>
  );
}

// ============================================================
// INFO ITEM
// ============================================================

function InfoItem({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="flex gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100">
        <Icon size={17} className="text-slate-500" />
      </div>

      <div className="min-w-0">
        <p className="text-xs text-slate-400">
          {label}
        </p>

        <p className="mt-1 break-words text-sm font-medium text-slate-700">
          {value || "N/A"}
        </p>
      </div>
    </div>
  );
}

// ============================================================
// ORDER SUMMARY
// ============================================================

function OrderSummary({
  label,
  value,
  icon: Icon,
  className,
}) {
  return (
    <div className="rounded-xl border border-slate-100 p-4">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${className}`}
        >
          <Icon size={18} />
        </div>

        <div>
          <p className="text-xs text-slate-400">
            {label}
          </p>

          <p className="mt-1 text-lg font-bold text-slate-900">
            {value || 0}
          </p>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// PERFORMANCE CARD
// ============================================================

function PerformanceCard({
  label,
  value,
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-xs text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-lg font-bold text-slate-900">
        {typeof value === "number"
          ? value.toLocaleString()
          : value}
      </p>
    </div>
  );
}

// ============================================================
// HELPERS
// ============================================================

function formatDate(date) {
  if (!date) return "N/A";

  return new Date(date).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}

function formatCurrency(value) {
  return `Rs. ${Number(value || 0).toLocaleString(
    "en-IN"
  )}`;
}

function getUserName(user) {
  if (!user) return "N/A";

  if (user.name) {
    return user.name;
  }

  return `${user.firstName || ""} ${
    user.lastName || ""
  }`.trim() || "N/A";
}

function getInitials(user) {
  const name = getUserName(user);

  if (!name || name === "N/A") {
    return "U";
  }

  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function ShopDetails() {
  const navigate = useNavigate();

  const { id: shopId } = useParams();

  // ==========================================================
  // API
  // ==========================================================

  const {
    data: ShopAggregate,
    isLoading,
    isError,
    error,
  } =
    useGetShopAggregateForSuperAdminforShopIdQuery(
      shopId,
      {
        skip: !shopId,
      }
    );

  console.log("Shop ID:", shopId);

  console.log(
    "Shop Aggregate:",
    ShopAggregate
  );

  // ==========================================================
  // GET SHOP DATA
  // ==========================================================

  const shopData =
    ShopAggregate?.data?.shopStats?.[0];

  // ==========================================================
  // GET NESTED DATA
  // ==========================================================

  const productStats =
    shopData?.products?.[0];

  const orderStats =
    shopData?.orders?.[0];

  const admins =
    shopData?.adminDetails || [];

  const deliveryMen =
    shopData?.deliveryMenDetails || [];

  const products =
    shopData?.productList || [];

  const recentOrders =
    shopData?.recentOrders || [];

  // ==========================================================
  // LOADING
  // ==========================================================

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />

          <p className="mt-4 text-sm text-slate-500">
            Loading shop details...
          </p>
        </div>
      </div>
    );
  }

  // ==========================================================
  // ERROR
  // ==========================================================

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <div className="rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
          <XCircle
            size={40}
            className="mx-auto text-red-500"
          />

          <h2 className="mt-4 text-lg font-bold text-slate-900">
            Failed to load shop
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            {error?.data?.message ||
              "Something went wrong."}
          </p>

          <button
            onClick={() =>
              navigate("/superadmin/shops")
            }
            className="mt-5 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white"
          >
            Back to Shops
          </button>
        </div>
      </div>
    );
  }

  // ==========================================================
  // SHOP NOT FOUND
  // ==========================================================

  if (!shopData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <Store
            size={40}
            className="mx-auto text-slate-400"
          />

          <h2 className="mt-4 text-lg font-bold text-slate-900">
            Shop not found
          </h2>

          <button
            onClick={() =>
              navigate("/superadmin/shops")
            }
            className="mt-5 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white"
          >
            Back to Shops
          </button>
        </div>
      </div>
    );
  }

  // ==========================================================
  // SHOP DATA
  // ==========================================================

  const {
    _id,
    name,
    description,
    logo,
    address,
    isActive,
    createdAt,
    updatedAt,
    owner,
  } = shopData;

  // ==========================================================
  // PRODUCT DATA
  // ==========================================================

  const totalProducts =
    productStats?.totalProducts || 0;

  const totalActiveProducts =
    productStats?.totalActiveProducts || 0;

  const totalInactiveProducts =
    productStats?.totalInactiveProducts || 0;

  const totalDraftProducts =
    productStats?.totalDraftProducts || 0;

  const totalBlockedProducts =
    productStats?.totalBlockedProducts || 0;

  const totalApprovedProducts =
    productStats?.totalApprovedProducts || 0;

  const totalStock =
    productStats?.totalStock || 0;

  // ==========================================================
  // ORDER DATA
  // ==========================================================

  const totalOrderItems =
    orderStats?.totalOrderItems || 0;

  const totalQuantity =
    orderStats?.totalQuantity || 0;

  const totalRevenue =
    orderStats?.totalRevenue || 0;

  const totalCustomers =
    orderStats?.customers?.length || 0;

  const totalPendingOrders =
    orderStats?.totalPendingOrders || 0;

  const totalConfirmedOrders =
    orderStats?.totalConfirmedOrders || 0;

  const totalPackedOrders =
    orderStats?.totalPackedOrders || 0;

  const totalShippedOrders =
    orderStats?.totalShippedOrders || 0;

  const totalDeliveredOrders =
    orderStats?.totalDeliveredOrders || 0;

  const totalCancelledOrders =
    orderStats?.totalCancelledOrders || 0;

  // ==========================================================
  // TOTAL ADMINS / DELIVERY MEN
  // ==========================================================

  const totalAdmins = admins.length;

  const totalDeliveryMen =
    deliveryMen.length;

  // ==========================================================
  // UI
  // ==========================================================

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">

      {/* ======================================================
          BACK
      ====================================================== */}

      <button
        onClick={() =>
          navigate("/superadmin/shops")
        }
        className="mb-5 flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft size={18} />

        Back to Shops
      </button>

      {/* ======================================================
          SHOP HEADER
      ====================================================== */}

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex items-center gap-4">

            {/* LOGO */}

            <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-slate-900 text-white sm:h-20 sm:w-20">

              {logo ? (
                <img
                  src={logo}
                  alt={name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <Store size={32} />
              )}

            </div>

            {/* SHOP NAME */}

            <div>

              <div className="flex flex-wrap items-center gap-3">

                <h1 className="text-2xl font-bold text-slate-900">
                  {name}
                </h1>

                <StatusBadge
                  status={
                    isActive
                      ? "Active"
                      : "Suspended"
                  }
                />

              </div>

              <p className="mt-1 text-sm text-slate-500">
                SHOP-
                {String(_id)
                  .slice(-6)
                  .toUpperCase()}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Created on{" "}
                {formatDate(createdAt)}
              </p>

            </div>

          </div>

          {/* ACTIONS */}

          <div className="flex flex-wrap gap-2">

            <button
              className="
                flex items-center gap-2
                rounded-xl border border-slate-200
                bg-white px-4 py-2.5
                text-sm font-medium
                hover:bg-slate-50
              "
            >
              <Edit size={17} />

              Edit
            </button>

            <button
              className="
                flex items-center gap-2
                rounded-xl bg-red-600
                px-4 py-2.5
                text-sm font-semibold
                text-white hover:bg-red-700
              "
            >
              <XCircle size={17} />

              {isActive
                ? "Suspend Shop"
                : "Activate Shop"}
            </button>

          </div>

        </div>

      </div>

      {/* ======================================================
          MAIN STATS
      ====================================================== */}

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Revenue"
          value={formatCurrency(
            totalRevenue
          )}
          icon={DollarSign}
          description={`${totalQuantity.toLocaleString()} items`}
        />

        <StatCard
          title="Order Items"
          value={totalOrderItems.toLocaleString()}
          icon={ShoppingCart}
          description="Shop order items"
        />

        <StatCard
          title="Total Products"
          value={totalProducts.toLocaleString()}
          icon={Package}
          description={`${totalStock.toLocaleString()} total stock`}
        />

        <StatCard
          title="Customers"
          value={totalCustomers.toLocaleString()}
          icon={Users}
          description={`${totalAdmins} admins · ${totalDeliveryMen} delivery`}
        />

      </div>

      {/* ======================================================
          SHOP INFORMATION + PERFORMANCE
      ====================================================== */}

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-3">

        {/* ====================================================
            SHOP INFORMATION
        ==================================================== */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-1">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="font-semibold">
                Shop Information
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Basic shop information
              </p>

            </div>

            <button className="rounded-lg p-2 hover:bg-slate-100">
              <MoreVertical size={18} />
            </button>

          </div>

          <div className="mt-6 space-y-5">

            <InfoItem
              icon={Store}
              label="Shop Name"
              value={name}
            />

            <InfoItem
              icon={User}
              label="Shop Owner"
              value={getUserName(owner)}
            />

            <InfoItem
              icon={Mail}
              label="Email"
              value={owner?.email}
            />

            <InfoItem
              icon={Phone}
              label="Phone"
              value={owner?.phone}
            />

            <InfoItem
              icon={MapPin}
              label="Address"
              value={address}
            />

            <InfoItem
              icon={Calendar}
              label="Created At"
              value={formatDate(
                createdAt
              )}
            />

            <InfoItem
              icon={Calendar}
              label="Updated At"
              value={formatDate(
                updatedAt
              )}
            />

          </div>
        </div>

        {/* ====================================================
            PERFORMANCE
        ==================================================== */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="font-semibold">
                Shop Performance
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Current shop statistics
              </p>

            </div>

          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">

            <PerformanceCard
              label="Products"
              value={totalProducts}
            />

            <PerformanceCard
              label="Active Products"
              value={
                totalActiveProducts
              }
            />

            <PerformanceCard
              label="Order Items"
              value={totalOrderItems}
            />

            <PerformanceCard
              label="Revenue"
              value={formatCurrency(
                totalRevenue
              )}
            />

          </div>

          {/* PRODUCT STATUS */}

          <div className="mt-6">

            <p className="mb-3 text-sm font-semibold">
              Product Status
            </p>

            <div className="flex flex-wrap gap-2">

              <div className="rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
                Active:{" "}
                {totalActiveProducts}
              </div>

              <div className="rounded-lg bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700">
                Inactive:{" "}
                {totalInactiveProducts}
              </div>

              <div className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600">
                Draft:{" "}
                {totalDraftProducts}
              </div>

              <div className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">
                Blocked:{" "}
                {totalBlockedProducts}
              </div>

              <div className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700">
                Approved:{" "}
                {totalApprovedProducts}
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* ======================================================
          ORDER SUMMARY
      ====================================================== */}

      <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

        <div>

          <h2 className="font-semibold">
            Order Summary
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            Current order item status
          </p>

        </div>

        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">

          <OrderSummary
            label="Pending"
            value={
              totalPendingOrders
            }
            icon={ShoppingCart}
            className="bg-amber-50 text-amber-600"
          />

          <OrderSummary
            label="Confirmed"
            value={
              totalConfirmedOrders
            }
            icon={Package}
            className="bg-blue-50 text-blue-600"
          />

          <OrderSummary
            label="Packed"
            value={
              totalPackedOrders
            }
            icon={Package}
            className="bg-indigo-50 text-indigo-600"
          />

          <OrderSummary
            label="Shipped"
            value={
              totalShippedOrders
            }
            icon={Truck}
            className="bg-violet-50 text-violet-600"
          />

          <OrderSummary
            label="Delivered"
            value={
              totalDeliveredOrders
            }
            icon={CheckCircle}
            className="bg-emerald-50 text-emerald-600"
          />

          <OrderSummary
            label="Cancelled"
            value={
              totalCancelledOrders
            }
            icon={XCircle}
            className="bg-red-50 text-red-600"
          />

        </div>
      </div>

      {/* ======================================================
          PRODUCTS + ADMINS
      ====================================================== */}

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-3">

        {/* ====================================================
            PRODUCTS
        ==================================================== */}

        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm xl:col-span-2">

          <div className="flex items-center justify-between p-5">

            <div>

              <h2 className="font-semibold">
                Products
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Latest products from this shop
              </p>

            </div>

            <button className="text-sm font-medium hover:underline">
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
                    Price
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

                {products.length > 0 ? (

                  products.map(
                    (product) => (

                      <tr
                        key={product._id}
                        className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                      >

                        {/* PRODUCT */}

                        <td className="px-5 py-4">

                          <div className="flex items-center gap-3">

                            <div className="h-10 w-10 overflow-hidden rounded-lg bg-slate-100">

                              {product.images?.[0]?.url ? (

                                <img
                                  src={
                                    product
                                      .images[0]
                                      .url
                                  }
                                  alt={
                                    product.name
                                  }
                                  className="h-full w-full object-cover"
                                />

                              ) : (

                                <div className="flex h-full w-full items-center justify-center">
                                  <Package
                                    size={18}
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
                                {product.category
                                  ?.name ||
                                  "No Category"}
                              </p>

                            </div>

                          </div>

                        </td>

                        {/* PRICE */}

                        <td className="px-5 py-4">

                          <p className="text-sm font-semibold text-slate-800">
                            {formatCurrency(
                              product.finalPrice ??
                                product.price
                            )}
                          </p>

                          {product.discount >
                            0 && (
                            <p className="text-xs text-slate-400 line-through">
                              {formatCurrency(
                                product.price
                              )}
                            </p>
                          )}

                        </td>

                        {/* STOCK */}

                        <td className="px-5 py-4">

                          <span
                            className={`text-sm font-medium ${
                              product.stock <=
                              product.stockLimit
                                ? "text-red-600"
                                : "text-emerald-600"
                            }`}
                          >
                            {product.stock}
                          </span>

                        </td>

                        {/* STATUS */}

                        <td className="px-5 py-4">

                          <StatusBadge
                            status={
                              product.status
                            }
                          />

                        </td>

                      </tr>

                    )
                  )

                ) : (

                  <tr>

                    <td
                      colSpan="4"
                      className="px-5 py-10 text-center text-sm text-slate-400"
                    >
                      No products found
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>
        </div>

        {/* ====================================================
            ADMINS
        ==================================================== */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="font-semibold">
                Shop Admins
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Users managing this shop
              </p>

            </div>

            <ShieldCheck
              size={20}
              className="text-slate-500"
            />

          </div>

          <div className="mt-6 space-y-5">

            {/* OWNER */}

            {owner && (

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                  {getInitials(owner)}
                </div>

                <div className="min-w-0 flex-1">

                  <p className="truncate text-sm font-semibold">
                    {getUserName(owner)}
                  </p>

                  <p className="truncate text-xs text-slate-400">
                    {owner.email}
                  </p>

                  <p className="mt-1 text-xs font-medium text-slate-600">
                    Shop Owner
                  </p>

                </div>

              </div>

            )}

            {/* ADMIN LIST */}

            {admins.map(
              (admin) => (

                <div
                  key={admin._id}
                  className="flex items-center gap-3"
                >

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                    {getInitials(admin)}
                  </div>

                  <div className="min-w-0 flex-1">

                    <p className="truncate text-sm font-semibold">
                      {getUserName(admin)}
                    </p>

                    <p className="truncate text-xs text-slate-400">
                      {admin.email}
                    </p>

                    <p className="mt-1 text-xs font-medium text-slate-600">
                      Shop Admin
                    </p>

                  </div>

                </div>

              )
            )}

            {admins.length ===
              0 && (
              <p className="text-sm text-slate-400">
                No additional admins found.
              </p>
            )}

          </div>
        </div>
      </div>

      {/* ======================================================
          DELIVERY TEAM
      ====================================================== */}

      {deliveryMen.length > 0 && (

        <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
              <Truck size={19} />
            </div>

            <div>

              <h2 className="font-semibold">
                Delivery Team
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                {totalDeliveryMen} delivery personnel
              </p>

            </div>

          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {deliveryMen.map(
              (person) => (

                <div
                  key={person._id}
                  className="rounded-xl border border-slate-100 p-4"
                >

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                      {getInitials(person)}
                    </div>

                    <div className="min-w-0">

                      <p className="truncate text-sm font-semibold">
                        {getUserName(person)}
                      </p>

                      <p className="truncate text-xs text-slate-400">
                        {person.email}
                      </p>

                    </div>

                  </div>

                </div>

              )
            )}

          </div>

        </div>

      )}

      {/* ======================================================
          RECENT ORDERS
      ====================================================== */}

      <div className="mt-5 rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="flex items-center justify-between p-5">

          <div>

            <h2 className="font-semibold">
              Recent Orders
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Latest orders from this shop
            </p>

          </div>

          <button className="text-sm font-medium hover:underline">
            View All
          </button>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-y border-slate-100 bg-slate-50">

                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500">
                  Order ID
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500">
                  Customer
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500">
                  Product
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500">
                  Amount
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500">
                  Date
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {recentOrders.length > 0 ? (

                recentOrders.map(
                  (order) => (

                    <tr
                      key={order._id}
                      className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                    >

                      {/* ORDER ID */}

                      <td className="px-5 py-4 text-sm font-semibold">
                        #
                        {String(order._id)
                          .slice(-8)
                          .toUpperCase()}
                      </td>

                      {/* CUSTOMER */}

                      <td className="px-5 py-4">

                        <p className="text-sm text-slate-700">
                          {getUserName(
                            order.customer
                          )}
                        </p>

                        <p className="text-xs text-slate-400">
                          {order.customer
                            ?.email || ""}
                        </p>

                      </td>

                      {/* PRODUCT */}

                      <td className="px-5 py-4">

                        <p className="text-sm font-medium text-slate-700">
                          {order.product
                            ?.name ||
                            "Product"}
                        </p>

                        <p className="text-xs text-slate-400">
                          Qty:{" "}
                          {order.quantity ||
                            0}
                        </p>

                      </td>

                      {/* AMOUNT */}

                      <td className="px-5 py-4 text-sm font-semibold">
                        {formatCurrency(
                          order.totalPrice
                        )}
                      </td>

                      {/* DATE */}

                      <td className="px-5 py-4 text-sm text-slate-500">
                        {formatDate(
                          order.createdAt
                        )}
                      </td>

                      {/* STATUS */}

                      <td className="px-5 py-4">

                        <StatusBadge
                          status={
                            order.orderStatus
                          }
                        />

                      </td>

                    </tr>

                  )
                )

              ) : (

                <tr>

                  <td
                    colSpan="6"
                    className="px-5 py-10 text-center text-sm text-slate-400"
                  >
                    No recent orders found
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>
      </div>
    </div>
  );
}
