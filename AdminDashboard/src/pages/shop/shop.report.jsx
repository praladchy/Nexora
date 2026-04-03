import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

const ShopReport = () => {
  return (
    
<div className="p-6">
  <h2 className="text-2xl font-semibold mb-4">Shop Report</h2>

  <div className="overflow-x-auto bg-white shadow rounded-lg">
    <table className="min-w-full text-sm text-left">
      <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
        <tr>
          <th className="px-6 py-3">ID</th>
          <th className="px-6 py-3">Name</th>
          <th className="px-6 py-3">Product</th>
          <th className="px-6 py-3">Category</th>
          <th className="px-6 py-3">Admin</th>
          <th className="px-6 py-3">Total Sales</th>
          <th className="px-6 py-3">Status</th>
          <th className="px-6 py-3 text-center">Action</th>
        </tr>
      </thead>

      <tbody>
        <tr className="border-b hover:bg-gray-50">
          <td className="px-6 py-4">1</td>
          <td className="px-6 py-4 font-medium">Tech World</td>
          <td className="px-6 py-4">120</td>
          <td className="px-6 py-4">Electronics</td>
          <td className="px-6 py-4">Ram Admin</td>
          <td className="px-6 py-4">250000</td>
          <td className="px-6 py-4">
            <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">
              Active
            </span>
          </td>

          {/* ✅ Action Column */}
          <td className="px-6 py-4">
            <div className="flex items-center justify-center gap-4">
              {/* Edit */}
              <button className="text-blue-600 hover:text-blue-800 transition">
                <Pencil size={18} />
              </button>

              {/* Delete */}
              <button className="text-red-600 hover:text-red-800 transition">
                <Trash2 size={18} />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
  )
}

export default ShopReport
