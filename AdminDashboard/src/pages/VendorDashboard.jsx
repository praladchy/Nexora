 
import StatGrid from "../components/dashboard/StatGrid";
import SalesPurchaseChart from "../components/dashboard/SalesPurchaseChart";
import TopSellingTable from "../components/dashboard/TopSellingTable";

const VendorDashboard = () => {
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
            <TopSellingTable />
          </div>
          <div className="flex-1 min-h-screen bg-white rounded shadow">
            <TopSellingTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorDashboard;
