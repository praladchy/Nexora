import React from "react";
import { useGetCategoryAggregateQuery, useGetDataAggregateQuery, useGetOrderAggregateQuery, useGetProductAggregateQuery } from "../Redux/AggregateService.apiSlice";

const StatGrid = () => {

   const {data:productAggregateData}=useGetProductAggregateQuery();
    const {data:orderaggregateData}=useGetOrderAggregateQuery();
    const {data:categoryAggregateData}=useGetCategoryAggregateQuery();
    const {data:DataAggregate}=useGetDataAggregateQuery();
    console.log("poiuy",productAggregateData);
    const totalProduct = productAggregateData?.data?.ShopsStats[0]?.totalNumberofProductsInShops || [];
    console.log("poiuy11",totalProduct);
    console.log("poiuyfd",orderaggregateData);
    const totalOrders = orderaggregateData?.data?.OrderStatus[0]?.totalOrderproducts || [];
    const totalCancelledOrders = orderaggregateData?.data?.OrderStatus[0]?.totalCancelledOrderProducts || [];
    const totalPendingOrders = orderaggregateData?.data?.OrderStatus[0]?.totalPendingOrderProducts || [];
    const totalSale = orderaggregateData?.data?.OrderStatus[0]?.totalPrice || [];

    console.log("poiuy22",totalOrders);
    console.log("poiuysd",categoryAggregateData);
    console.log("poiuyqw",DataAggregate);

    const todaySales=DataAggregate?.orderInDay[0]?.TotalSales || [];
console.log("poiuyqw1",todaySales);
const TodayOrders=DataAggregate?.orderInDay[0]?.TotalOrder || [];
console.log("poiuyqw2",TodayOrders);
const totalProductsTodaySales=DataAggregate?.orderInDay[0]?.TotalProducts || [];
console.log("poiuyqw3",totalProductsTodaySales);

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
            <p className="text-gray-500 text-sm font-medium">Total Pending Products </p>

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
            <p className="text-gray-500 text-sm font-medium">Total Cancelled Orders</p>

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
           <p className="text-gray-500 text-sm font-medium">Today Sales</p>

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
            <p className="text-gray-500 text-sm font-medium">Today Orders</p>

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
            <p className="text-gray-500 text-sm font-medium">Today Sales Products</p>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-1">
              {totalProductsTodaySales}            </h3>

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
