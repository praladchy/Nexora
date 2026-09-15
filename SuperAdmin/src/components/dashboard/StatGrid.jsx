import React from "react";
import {
  BarChart3,
  ShoppingCart,
  Package,
  Users,
  Store,
  Clock,
  FolderTree,
  TrendingUp,
} from "lucide-react";

import {
  useGetDashboardAggregateForSuperAdminQuery,
} from "../Redux/AggregateService.apiSlice";

const StatGrid = () => {
  const {
    data: dashboardCard,
    isLoading,
    isError,
    error,
  } = useGetDashboardAggregateForSuperAdminQuery();

  console.log("dashboardCard:", dashboardCard);

  // ==========================================
  // GET DATA
  // ==========================================

  const dashboard = dashboardCard?.data;

  // ==========================================
  // DASHBOARD VALUES
  // ==========================================

  const totalSales = dashboard?.totalSales || 0;

  const totalOrders = dashboard?.totalOrders || 0;

  const totalProducts = dashboard?.totalProducts || 0;

  const totalUsers = dashboard?.totalUsers || 0;

  const totalVendors = dashboard?.totalVendors || 0;

  const pendingShops = dashboard?.pendingShops || 0;

  const totalCategories = dashboard?.totalCategories || 0;

  const todaySalesProducts =
    dashboard?.todaySalesProducts || 0;

  // ==========================================
  // OPTIONAL TODAY DATA
  // ==========================================

  const todaySales = dashboard?.todaySales || 0;

  const todayOrders = dashboard?.todayOrders || 0;

  // ==========================================
  // CURRENCY FORMAT
  // ==========================================

  const formatCurrency = (value) => {
    return `Rs. ${Number(value || 0).toLocaleString(
      "en-IN"
    )}`;
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (isLoading) {
    return (
      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          {Array.from({ length: 8 }).map(
            (_, index) => (
              <div
                key={index}
                className="
                  bg-white
                  p-4
                  rounded-lg
                  border
                  border-gray-100
                  shadow-sm
                  animate-pulse
                "
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="h-4 w-28 bg-gray-200 rounded" />

                    <div className="h-7 w-20 bg-gray-200 rounded mt-3" />
                  </div>

                  <div className="h-12 w-12 bg-gray-200 rounded-full" />
                </div>
              </div>
            )
          )}

        </div>
      </div>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (isError) {
    console.error(
      "Dashboard Aggregate Error:",
      error
    );

    return (
      <div className="w-full">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600 font-medium">
            Failed to load dashboard statistics.
          </p>

          <p className="text-red-500 text-sm mt-1">
            Please try again.
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // CARD COMPONENT
  // ==========================================

  const StatCard = ({
    title,
    value,
    icon: Icon,
    bgColor,
    iconColor,
  }) => {
    return (
      <div
        className="
          bg-white
          p-4
          rounded-lg
          border
          border-gray-100
          shadow-sm
          flex
          items-center
          justify-between
          hover:shadow-md
          transition
        "
      >
        <div>
          <p className="text-gray-500 text-sm font-medium">
            {title}
          </p>

          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-1">
            {value}
          </h3>
        </div>

        <div
          className={`
            p-3
            rounded-full
            ${bgColor}
            ${iconColor}
          `}
        >
          <Icon size={22} />
        </div>
      </div>
    );
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="w-full">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        {/* =====================================
            1. TOTAL SALES
        ====================================== */}

        <StatCard
          title="Total Sales"
          value={formatCurrency(totalSales)}
          icon={BarChart3}
          bgColor="bg-green-100"
          iconColor="text-green-600"
        />

        {/* =====================================
            2. TOTAL ORDERS
        ====================================== */}

        <StatCard
          title="Total Orders"
          value={totalOrders}
          icon={ShoppingCart}
          bgColor="bg-blue-100"
          iconColor="text-blue-600"
        />

        {/* =====================================
            3. TOTAL PRODUCTS
        ====================================== */}

        <StatCard
          title="Total Products"
          value={totalProducts}
          icon={Package}
          bgColor="bg-purple-100"
          iconColor="text-purple-600"
        />

        {/* =====================================
            4. TOTAL USERS
        ====================================== */}

        <StatCard
          title="Total Users"
          value={totalUsers}
          icon={Users}
          bgColor="bg-orange-100"
          iconColor="text-orange-600"
        />

        {/* =====================================
            5. TOTAL VENDORS
        ====================================== */}

        <StatCard
          title="Total Vendors"
          value={totalVendors}
          icon={Store}
          bgColor="bg-indigo-100"
          iconColor="text-indigo-600"
        />

        {/* =====================================
            6. PENDING SHOPS
        ====================================== */}

        <StatCard
          title="Pending Shops"
          value={pendingShops}
          icon={Clock}
          bgColor="bg-yellow-100"
          iconColor="text-yellow-600"
        />

        {/* =====================================
            7. TOTAL CATEGORIES
        ====================================== */}

        <StatCard
          title="Total Categories"
          value={totalCategories}
          icon={FolderTree}
          bgColor="bg-fuchsia-100"
          iconColor="text-fuchsia-600"
        />

        {/* =====================================
            8. TODAY SALES PRODUCTS
        ====================================== */}

        <StatCard
          title="Today Sales Products"
          value={todaySalesProducts}
          icon={TrendingUp}
          bgColor="bg-rose-100"
          iconColor="text-rose-600"
        />

      </div>
    </div>
  );
};

export default StatGrid;
