const TopSellingTable = () => (
  <div className="bg-white border   p-4">
    <div className="flex justify-between mb-4">
      <h3 className="font-semibold">Top-Selling Products</h3>
      <button className="text-purple-600 text-sm">View All</button>
    </div>

    <table className="w-full text-sm">
      <thead className="text-gray-500 border-b">
        <tr>
          <th className="text-left py-2">Product Name</th>
          <th>Price</th>
          <th>Total Sale</th>
          <th>Revenue</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b">
          <td className="py-2">Cotton Polo T-Shirt</td>
          <td>৳200</td>
          <td>25</td>
          <td>৳5,000</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default TopSellingTable;
