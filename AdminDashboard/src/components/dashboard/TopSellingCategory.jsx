 const TopSellingCategoryTable = () => {
  const products = [
    {
      id: 1,
      name: "Cotton Polo T-Shirt",
      price: 200,
      totalSale: 25,
      revenue: 5000,
    },
    {
      id: 2,
      name: "Running Shoes",
      price: 1500,
      totalSale: 18,
      revenue: 27000,
    },
    {
      id: 3,
      name: "Classic Denim Jacket",
      price: 2200,
      totalSale: 15,
      revenue: 33000,
    },
    {
      id: 4,
      name: "Casual Sneakers",
      price: 1200,
      totalSale: 12,
      revenue: 14400,
    },
    {
      id: 5,
      name: "Slim Fit Jeans",
      price: 1800,
      totalSale: 10,
      revenue: 18000,
    },
  ];

  return (
    <div className="bg-white border p-4">
      <div className="flex justify-between mb-4">
        <h3 className="font-semibold">Top-Selling Category</h3>

        <button className="text-purple-600 text-sm">
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-gray-500 border-b">
            <tr>
              <th className="text-left py-3">Product Name</th>
              <th className="text-left py-3">Price</th>
              <th className="text-left py-3">Total Sale</th>
              <th className="text-left py-3">Revenue</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b last:border-b-0 hover:bg-gray-50"
              >
                <td className="py-3 text-left">
                  {product.name}
                </td>

                <td className="py-3 text-left">
                  ৳{product.price.toLocaleString()}
                </td>

                <td className="py-3 text-left">
                  {product.totalSale}
                </td>

                <td className="py-3 text-left font-medium">
                  ৳{product.revenue.toLocaleString()}
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
