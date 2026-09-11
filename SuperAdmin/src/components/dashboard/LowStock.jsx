const LowStock = () => {
  const items = [
    { name: "Bluetooth Speaker", stock: 20, limit: 25 },
    { name: "Smart Watch", stock: 0, limit: 20 },
    { name: "Laptop Cooling Pad", stock: 16, limit: 30 },
  ];

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border">
      <h3 className="font-semibold mb-4">Low Stock Alerts</h3>

      {items.map((i, idx) => (
        <div key={idx} className="flex justify-between py-2 text-sm border-b last:border-none">
          <span>{i.name}</span>
          <span className="text-red-500">{i.stock} / {i.limit}</span>
        </div>
      ))}
    </div>
  );
};

export default LowStock;
