import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

const data = [
  { day: "05 Jul", sales: 20000, purchase: 10000 },
  { day: "06 Jul", sales: 25000, purchase: 15000 },
  { day: "07 Jul", sales: 15000, purchase: 8000 },
  { day: "08 Jul", sales: 30000, purchase: 18000 },
  { day: "09 Jul", sales: 18000, purchase: 12000 },
];

const SalesPurchaseChart = () => {
  return (
    <div className="bg-white border rounded-xl p-4">
      <div className="flex justify-between mb-4">
        <h3 className="font-semibold">Sales and Purchase graph</h3>
        <select className="border rounded px-2 text-sm">
          <option>Last Week</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="sales" fill="#8b5cf6" />
          <Bar dataKey="purchase" fill="#60a5fa" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesPurchaseChart;
