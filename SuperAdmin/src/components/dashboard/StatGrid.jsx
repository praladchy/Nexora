import React from "react";
import {
  useGetCategoryAggregateForSuperAdminForShopQuery,
  useGetCategoryAggregateForSuperAdminQuery,
  useGetCategoryAggregateQuery,
  useGetDateAggregateForSuperAdminForShopQuery,
  useGetDateAggregateForSuperAdminQuery,
  useGetDateAggregateQuery,
  useGetOrderAggregateForShopQuery,
  useGetOrderAggregateForSuperAdminQuery,
  useGetOrderAggregateQuery,
  useGetProductAggregateForSuperAdminForShopCategoryQuery,
  useGetProductAggregateForSuperAdminForShopQuery,
  useGetProductAggregateForSuperAdminQuery,
  useGetProductAggregateQuery,
} from "../Redux/AggregateService.apiSlice";

const StatGrid = () => {
  const { data: productAggregateData } = useGetProductAggregateQuery();
  const { data: orderaggregateData } = useGetOrderAggregateQuery();
  const { data: categoryAggregateData } = useGetCategoryAggregateQuery();
  const { data: DataAggregate } = useGetDateAggregateQuery();
  console.log("poiuy", productAggregateData);
  const totalProduct =
    productAggregateData?.data?.ShopsStats?.[0]?.totalNumberofProductsInShops ||
    0;
  console.log("poiuy11", totalProduct);
  console.log("poiuyfd", orderaggregateData);
  const totalOrders =
    orderaggregateData?.data?.OrderStatus?.[0]?.totalOrderproducts || 0;
  const totalCancelledOrders =
    orderaggregateData?.data?.OrderStatus?.[0]?.totalCancelledOrderProducts ||
    0;
  const totalPendingOrders =
    orderaggregateData?.data?.OrderStatus?.[0]?.totalPendingOrderProducts || 0;
  const totalSale = orderaggregateData?.data?.OrderStatus?.[0]?.totalPrice || 0;

  console.log("poiuy22", totalOrders);
  console.log("poiuysd", categoryAggregateData);
  console.log("poiuyqw", DataAggregate);

  const todaySales = DataAggregate?.data?.orderInDay?.[0]?.TotalSales || 0;
  console.log("poiuyqw1", todaySales);
  const TodayOrders = DataAggregate?.data?.orderInDay?.[0]?.TotalOrder || 0;
  console.log("poiuyqw2", TodayOrders);
  const totalProductsTodaySales =
    DataAggregate?.data?.orderInDay?.[0]?.TotalProducts || 0;
  console.log("poiuyqw3", totalProductsTodaySales);

  // Super Admin - Global

  const {
    data: superProductData,
    isLoading: superProductLoading,
    error: superProductError,
  } = useGetProductAggregateForSuperAdminQuery();

  const {
    data: superOrderData,
    isLoading: superOrderLoading,
    error: superOrderError,
  } = useGetOrderAggregateForSuperAdminQuery();

  const {
    data: superCategoryData,
    isLoading: superCategoryLoading,
    error: superCategoryError,
  } = useGetCategoryAggregateForSuperAdminQuery();

  const {
    data: superDateData,
    isLoading: superDateLoading,
    error: superDateError,
  } = useGetDateAggregateForSuperAdminQuery();


  // const {
  //   data: shopProductData,
  //   isLoading: shopProductLoading,
  //   error: shopProductError,
  // } = useGetProductAggregateForSuperAdminForShopQuery(shopId);

  // const {
  //   data: shopCategoryProductData,
  //   isLoading: shopCategoryProductLoading,
  //   error: shopCategoryProductError,
  // } =
  //   useGetProductAggregateForSuperAdminForShopCategoryQuery({
  //     shopId,
  //     categoryId,
  //   });

  // const {
  //   data: shopOrderData,
  //   isLoading: shopOrderLoading,
  //   error: shopOrderError,
  // } = useGetOrderAggregateForShopQuery(shopId);

  // const {
  //   data: shopCategoryData,
  //   isLoading: shopCategoryLoading,
  //   error: shopCategoryError,
  // } =
  //   useGetCategoryAggregateForSuperAdminForShopQuery(shopId);

  // const {
  //   data: shopDateData,
  //   isLoading: shopDateLoading,
  //   error: shopDateError,
  // } =
  //   useGetDateAggregateForSuperAdminForShopQuery(shopId);

  console.log("========== SUPER ADMIN GLOBAL ==========");

  console.log("Super Product:", superProductData);

  console.log("Super Order:", superOrderData);

  console.log("Super Category:", superCategoryData);

  console.log("Super Date:", superDateData);

  // console.log("Shop Product:", shopProductData);

  // console.log("Shop Category Product:", shopCategoryProductData);

  // console.log("Shop Order:", shopOrderData);

  // console.log("Shop Category:", shopCategoryData);

  // console.log("Shop Date:", shopDateData);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Sales */}
        <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">Total Sales</p>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-1">
              Rs.{totalSale}
            </h3>

            {/* <p className="text-green-500 text-xs mt-2">↑ 15% from last week</p> */}
          </div>

          <div className="p-3 rounded-full bg-purple-100 text-purple-600 text-xl">
            📊
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">Total Orders</p>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-1">
              {totalOrders}
            </h3>

            {/* <p className="text-green-500 text-xs mt-2">↑ 15% from last week</p> */}
          </div>

          <div className="p-3 rounded-full bg-purple-100 text-purple-600 text-xl">
            📊
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">Total Products</p>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-1">
              {totalProduct}
            </h3>

            {/* <p className="text-green-500 text-xs mt-2">↑ 15% from last week</p> */}
          </div>

          <div className="p-3 rounded-full bg-purple-100 text-purple-600 text-xl">
            📊
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">Total Users </p>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-1">
              {totalPendingOrders}
            </h3>

            {/* <p className="text-green-500 text-xs mt-2">↑ 15% from last week</p> */}
          </div>

          <div className="p-3 rounded-full bg-purple-100 text-purple-600 text-xl">
            📊
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">Total Vendors</p>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-1">
              {totalCancelledOrders}
            </h3>
          </div>

          <div className="p-3 rounded-full bg-purple-100 text-purple-600 text-xl">
            📊
          </div>
        </div>

        {/* Total Purchase */}
        <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">Pending Shops</p>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-1">
              Rs.{todaySales}
            </h3>

            {/* <p className="text-green-500 text-xs mt-2">↑ 12% from last week</p> */}
          </div>

          <div className="p-3 rounded-full bg-blue-100 text-blue-600 text-xl">
            🛒
          </div>
        </div>

        {/* Total Expense */}
        <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">Total Category</p>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-1">
              {TodayOrders}
            </h3>

            {/* <p className="text-green-500 text-xs mt-2">↑ 9% from last week</p> */}
          </div>

          <div className="p-3 rounded-full bg-fuchsia-100 text-fuchsia-600 text-xl">
            💸
          </div>
        </div>

        {/* Net Profit */}
        <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">
              Today Sales Products
            </p>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-1">
              {totalProductsTodaySales}{" "}
            </h3>

            {/* <p className="text-green-500 text-xs mt-2">↑ 13% from last week</p> */}
          </div>

          <div className="p-3 rounded-full bg-rose-100 text-rose-600 text-xl">
            💰
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatGrid;
