import { useState } from "react";
import { useGetProductAggregateQuery } from "../Redux/AggregateService.apiSlice";

const TopSellingCategoryTable = () => {
  const { data } = useGetProductAggregateQuery();

  const productAggregateData =
    data?.data?.CategoryStats || [];

  const [showAll, setShowAll] = useState(false);

  const visibleCategories = showAll
    ? productAggregateData
    : productAggregateData.slice(0, 5);

  return (
    <div className="bg-white border p-4">
      <div className="flex justify-between mb-4">
        <h3 className="font-semibold">
          Top-Selling Category
        </h3>

        {productAggregateData.length > 5 && (
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
              <th className="text-left py-3">
                Category Name
              </th>

              <th className="text-left py-3">
                Total Product
              </th>

              <th className="text-left py-3">
                Active Product
              </th>

              <th className="text-left py-3">
                Draft Product
              </th>

              <th className="text-left py-3">
                InActive Product
              </th>

              <th className="text-left py-3">
                Blocked Product
              </th>
            </tr>
          </thead>

          <tbody>
            {visibleCategories.map((product) => (
              <tr
                key={product._id}
                className="border-b last:border-b-0 hover:bg-gray-50"
              >
                <td className="py-3 text-left">
                  {product.name}
                </td>

                <td className="py-3 text-left">
                  {product.totalNumberOfProductsInCategory?.toLocaleString()}
                </td>

                <td className="py-3 text-left">
                  {product.totalActiveProductsInCategory}
                </td>

                <td className="py-3 text-left">
                  {product.totalDraftProductInCategory}
                </td>

                <td className="py-3 text-left">
                  {product.totalInactiveProductInCategory}
                </td>

                <td className="py-3 text-left">
                  {product.totalBlockedProductInCategory}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopSellingCategoryTable;

