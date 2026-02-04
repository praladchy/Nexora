import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

const data = [
  { day: "05 Jul", sales: 20000, purchase: 12000 },
  { day: "06 Jul", sales: 25000, purchase: 15000 },
  { day: "07 Jul", sales: 15000, purchase: 10000 },
  { day: "08 Jul", sales: 30000, purchase: 18000 },
  { day: "09 Jul", sales: 18000, purchase: 12000 },
];

const SalesChart = () => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border">
      <h3 className="font-semibold mb-4">Sales & Purchase</h3>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="sales" fill="#8b5cf6" />
          <Bar dataKey="purchase" fill="#c4b5fd" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
