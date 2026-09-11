const TopProducts = () => {
  const products = [
    { name: "Cotton Polo T-Shirt", price: "₹200", qty: 25, revenue: "₹5,000" },
    { name: "Leather Watch", price: "₹500", qty: 8, revenue: "₹4,000" },
    { name: "Sunglasses", price: "₹300", qty: 16, revenue: "₹4,800" },
  ];

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border">
      <h3 className="font-semibold mb-4">Top-Selling Products</h3>

      <table className="w-full text-sm">
        <thead className="text-gray-500 border-b">
          <tr>
            <th className="text-left py-2">Product</th>
            <th>Price</th>
            <th>Sold</th>
            <th>Revenue</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p, i) => (
            <tr key={i} className="border-b last:border-none">
              <td className="py-2">{p.name}</td>
              <td className="text-center">{p.price}</td>
              <td className="text-center">{p.qty}</td>
              <td className="text-center">{p.revenue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopProducts;

