 import { useState } from "react";

const categories = [
  {
    id: 1,
    name: "Electronics",
    count: 1240,
    badge: "Trending",
    emoji: "💻",
    bg: "bg-blue-50",
    badgeBg: "bg-blue-100 text-blue-700",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    id: 2,
    name: "Fashion",
    count: 3800,
    badge: null,
    emoji: "👗",
    bg: "bg-pink-50",
    badgeBg: "",
    iconBg: "bg-pink-100",
    iconColor: "text-pink-600",
  },
  {
    id: 3,
    name: "Home & Living",
    count: 920,
    badge: null,
    emoji: "🛋️",
    bg: "bg-teal-50",
    badgeBg: "",
    iconBg: "bg-teal-100",
    iconColor: "text-teal-600",
  },
  {
    id: 4,
    name: "Sports & Outdoors",
    count: 670,
    badge: "New",
    emoji: "🏃",
    bg: "bg-green-50",
    badgeBg: "bg-green-100 text-green-700",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    id: 5,
    name: "Beauty & Health",
    count: 540,
    badge: null,
    emoji: "✨",
    bg: "bg-purple-50",
    badgeBg: "",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    id: 6,
    name: "Toys & Kids",
    count: 430,
    badge: null,
    emoji: "⭐",
    bg: "bg-amber-50",
    badgeBg: "",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  {
    id: 7,
    name: "Books",
    count: 310,
    badge: null,
    emoji: "📚",
    bg: "bg-orange-50",
    badgeBg: "",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
  },
  {
    id: 8,
    name: "Automotive",
    count: 210,
    badge: "Sale",
    emoji: "🚗",
    bg: "bg-red-50",
    badgeBg: "bg-red-100 text-red-700",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
  },
  {
    id: 9,
    name: "Groceries",
    count: 880,
    badge: null,
    emoji: "🛒",
    bg: "bg-lime-50",
    badgeBg: "",
    iconBg: "bg-lime-100",
    iconColor: "text-lime-600",
  },
  {
    id: 10,
    name: "Jewelry & Watches",
    count: 190,
    badge: null,
    emoji: "💎",
    bg: "bg-yellow-50",
    badgeBg: "",
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
];

function MenuCategory({ category, onClick }) {
  const [pressed, setPressed] = useState(false);

  return (
    <div
      className={`
        flex-1 min-w-0
        bg-white border border-gray-100 rounded-2xl
        overflow-hidden cursor-pointer
        transition-all duration-200
        hover:border-gray-200 hover:shadow-md
        ${pressed ? "scale-95" : "scale-100"}
      `}
      onClick={() => onClick(category)}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
    >
      {/* Image / Icon Area with padding */}
      <div className="p-3 pb-0">
        <div
          className={`
            w-full h-28 rounded-xl
            ${category.bg}
            flex items-center justify-center
          `}
        >
          <span className="text-5xl select-none">{category.emoji}</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-3 pt-2">
        <p className="text-sm font-medium text-gray-800 truncate mb-0.5">
          {category.name}
        </p>
        <p className="text-xs text-gray-400 mb-2">
          {category.count.toLocaleString()} items
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          {category.badge ? (
            <span
              className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${category.badgeBg}`}
            >
              {category.badge}
            </span>
          ) : (
            <span />
          )}
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

// chunk array into rows of n items
function chunkArray(arr, size) {
  const rows = [];
  for (let i = 0; i < arr.length; i += size) {
    rows.push(arr.slice(i, i + size));
  }
  return rows;
}

export default function CategoryGrid() {
  const [selected, setSelected] = useState(null);

  const handleSelect = (category) => {
    setSelected(category);
    alert(`Navigating to: ${category.name}`);
  };

  const rows = chunkArray(categories, 2);

  return (
    <div className="max-w-md mx-auto px-4 py-6 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold text-gray-800">
          Browse Categories
        </h1>
        <span className="text-xs text-gray-400">
          {categories.length} categories
        </span>
      </div>

      {/* Rows of 2 items each */}
      <div className="flex flex-col gap-3.5">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex flex-row gap-3.5">
            {row.map((cat) => (
              <CategoryCard
                key={cat.id}
                category={cat}
                onClick={handleSelect}
              />
            ))}
            {/* If last row has only 1 item, fill the gap */}
            {row.length === 1 && <div className="flex-1" />}
          </div>
        ))}
      </div>
    </div>
  );
}