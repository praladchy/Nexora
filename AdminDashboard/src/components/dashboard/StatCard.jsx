import React from 'react';

const StatCard = ({ title, value, change, changeText, icon, colorClass, isTrendUp = true }) => {
  return (
    <div className="bg-white p-2 rounded-lg border border-gray-100 shadow-sm flex justify-between items-start">
      <div>
        <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
        
        <div className="flex items-center mt-2">
          {/* Simple Up/Down Arrow SVG */}
          <span className={`flex items-center text-xs font-semibold ${isTrendUp ? 'text-purple-500' : 'text-red-500'}`}>
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d={isTrendUp ? "M5 15l7-7 7 7" : "M19 5l-7 7-7-7"} stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
            {change}
          </span>
          <span className="text-gray-400 text-xs ml-1">{changeText}</span>
        </div>
      </div>

      <div className={`my-auto p-3 rounded-full ${colorClass}`}>
        {icon}
      </div>
    </div>
  );
};

export default StatCard;