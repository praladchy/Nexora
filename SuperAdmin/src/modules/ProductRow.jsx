const ProductRow = () => {
  return (
    <div className="flex px-4 py-3 items-center border-t text-sm hover:bg-gray-50">

      {/* Product */}
      <div className="w-64 flex items-center gap-3">
        <img
          src="https://via.placeholder.com/40"
          className="w-10 h-10 rounded"
        />
        <span>Wireless Speaker</span>
      </div>

      <div className="w-40">Electronics</div>
      <div className="w-32">SoundWave</div>
      <div className="w-24">₹1,500</div>
      <div className="w-24">SW-01</div>
      <div className="w-28 text-green-600">In Stock</div>

      <div className="w-32">
        <span className="px-2 py-1 bg-yellow-100 text-yellow-600 rounded text-xs">
          Pending
        </span>
      </div>

      <div className="w-24 flex justify-center gap-2">
        <button className="text-purple-600">✏️</button>
        <button className="text-red-500">🗑</button>
      </div>

    </div>
  );
};

export default ProductRow;
