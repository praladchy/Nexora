import { useState } from "react";
import { useGetProductAggregateQuery } from "../Redux/AggregateService.apiSlice";

const TopSellingTable = () => {
  const { data } = useGetProductAggregateQuery();

  const productAggregateData = data?.data.stockStats || [];

  const [showAll, setShowAll] = useState(false);

  // Show 6 initially, otherwise show everything
  const visibleProducts = showAll
    ? productAggregateData
    : productAggregateData.slice(0, 6);

  return (
    <div className="bg-white border p-4">
      <div className="flex justify-between mb-4">
        <h3 className="font-semibold">Top-Selling Products</h3>

        {productAggregateData.length > 6 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-purple-600 text-sm hover:underline"
          >
            {showAll ? "Show Less" : "View All"}
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-gray-500 border-b">
            <tr>
              <th className="text-left py-3">Product Name</th>
              <th className="text-left py-3">Stock</th>
              <th className="text-left py-3">Stock Limit</th>
              <th className="text-left py-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {visibleProducts.map((product) => (
              <tr
                key={product.id}
                className="border-b last:border-b-0 hover:bg-gray-50"
              >
                <td className="py-3 text-left">
                  {product.name}
                </td>

                <td className="py-3 text-left">
                  {product.stock}
                </td>

                <td className="py-3 text-left">
                  {product.stockLimit}
                </td>

                <td className="py-3 text-left font-medium">
                  {product.stockStatus}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopSellingTable;
