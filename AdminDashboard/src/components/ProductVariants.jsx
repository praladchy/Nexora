
const ProductVariant = () => {
  return (
    <div className="p-6 flex flex-col gap-6">
      <h2 className="text-xl font-semibold">Product Variants</h2>

      <div className="flex flex-col gap-4">
        <div className="bg-white p-4 rounded-xl shadow flex gap-4">
          {/* IMAGE */}
          <div
            className="w-32 h-32 bg-gray-100 rounded-lg
                      flex items-center justify-center text-xs"
          >
            Variant Image
          </div>

          {/* DETAILS */}
          <div className="flex-1 flex flex-col gap-3">
            {/* Row 1 */}
            <div className="flex gap-4">
              <input className="input flex-1" placeholder="Color" />
              <input className="input flex-1" placeholder="Size" />
              <input className="input flex-1" placeholder="SKU" />
            </div>

            {/* Row 2 */}
            <div className="flex gap-4">
              <input className="input flex-1" placeholder="Price" />
              <input className="input flex-1" placeholder="Stock" />
              <input className="input flex-1" placeholder="Discount %" />
            </div>

            {/* Row 3 */}
            <div className="flex gap-4 items-center">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" />
                Default Variant
              </label>

              <button className="text-red-500 text-sm ml-auto">Remove</button>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow flex gap-4">
          {/* IMAGE */}
          <div
            className="w-32 h-32 bg-gray-100 rounded-lg
                      flex items-center justify-center text-xs"
          >
            Variant Image
          </div>

          {/* DETAILS */}
          <div className="flex-1 flex flex-col gap-3">
            {/* Row 1 */}
            <div className="flex gap-4">
              <input className="input flex-1" placeholder="Color" />
              <input className="input flex-1" placeholder="Size" />
              <input className="input flex-1" placeholder="SKU" />
            </div>

            {/* Row 2 */}
            <div className="flex gap-4">
              <input className="input flex-1" placeholder="Price" />
              <input className="input flex-1" placeholder="Stock" />
              <input className="input flex-1" placeholder="Discount %" />
            </div>

            {/* Row 3 */}
            <div className="flex gap-4 items-center">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" />
                Default Variant
              </label>

              <button className="text-red-500 text-sm ml-auto">Remove</button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="bg-purple-600 text-white px-6 py-2 rounded-lg">
          + Add Variant
        </button>
      </div>
    </div>
  );
};

export default ProductVariant;
