import StatGrid from "../components/dashboard/StatGrid";
import SalesPurchaseChart from "../components/dashboard/SalesPurchaseChart";
import TopSellingTable from "../components/dashboard/TopSellingTable";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetCategoryAggregateQuery, useGetDataAggregateQuery, useGetOrderAggregateQuery, useGetProductAggregateQuery } from "../components/Redux/AggregateService.apiSlice";
import TopSellingCategoryTable from "../components/dashboard/TopSellingCategory";

const VendorDashboard = () => {
  const {data:productAggregateData}=useGetProductAggregateQuery();
  const {data:orderaggregateData}=useGetOrderAggregateQuery();
  const {data:categoryAggregateData}=useGetCategoryAggregateQuery();
  const {data:DataAggregate}=useGetDataAggregateQuery();
  console.log("poiuy",productAggregateData);
  console.log("poiuyfd",orderaggregateData);
  console.log("poiuysd",categoryAggregateData);
  console.log("poiuyqw",DataAggregate);
  return (
    <>
      <div className=" p-4 space-y-4">
        {/* Stats */}
        <StatGrid />

        {/* Chart + Table (Flex instead of Grid) */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Chart */}
          <div className="flex-[2] bg-white rounded shadow">
            <SalesPurchaseChart />
          </div>

          {/* Top Selling */}
          <div className="flex-1 bg-white rounded shadow">
            <TopSellingTable />
          </div>
        </div>

        {/* Two Equal Tables */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 min-h-screen bg-white rounded shadow">
            <TopSellingCategoryTable />
          </div>
          {/* <div className="flex-1 min-h-screen bg-white rounded shadow">
            <TopSellingTable />
          </div> */}
        </div>
      </div>
    </>
  );
};

export default VendorDashboard;
