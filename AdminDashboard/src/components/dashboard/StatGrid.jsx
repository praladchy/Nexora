import React from 'react';
import StatCard from './StatCard'; // Import the component above

const StatGrid = () => {
  const stats = [
    { title: "Total Sales", value: "৳150,000", change: "+15%", changeText: "from last week", colorClass: "bg-purple-100 text-purple-600", icon: "📊" },
    { title: "Total Purchase", value: "৳70,000", change: "+12%", changeText: "from last week", colorClass: "bg-blue-100 text-blue-600", icon: "🛒" },
    { title: "Total Expense", value: "৳50,000", change: "+9%", changeText: "from last week", colorClass: "bg-fuchsia-100 text-fuchsia-600", icon: "💸" },
    { title: "Revenue", value: "৳150,000", change: "+11.5%", changeText: "from last week", colorClass: "bg-pink-100 text-pink-600", icon: "📈" },
    { title: "Net Profit", value: "৳30,000", change: "+13%", changeText: "from last week", colorClass: "bg-rose-100 text-rose-600", icon: "💰" },
    { title: "Earnings from XYZ", value: "৳60,000", change: "+22%", changeText: "from last week", colorClass: "bg-red-100 text-red-400", icon: "🏢" },
    { title: "Total Products", value: "520", change: "+15", changeText: "products add last week", colorClass: "bg-orange-100 text-orange-600", icon: "📦" },
    { title: "Total Customers", value: "350", change: "+25", changeText: "new customer last week", colorClass: "bg-sky-100 text-sky-600", icon: "👥" },
  ];

  return (
    <div className=" bg-gray-50  ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
    </div>
  );
};

export default StatGrid;