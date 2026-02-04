import React from "react";

const ProductNav = () => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-lg font-semibold">Product Management List</h2>

      <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm">
        + Add New Product
      </button>
    </div>
  );
};

export default ProductNav;
