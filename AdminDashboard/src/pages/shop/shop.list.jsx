import { useEffect, useState } from "react";
import { FaTrash, FaPencilAlt } from "react-icons/fa"; // Icons
import { useGetShopsActiveQuery } from "../../components/Redux/Shop.apiSlice";

const ShopList = () => {
  const { data: shopList, isLoading } = useGetShopsActiveQuery();
  
  const shops = shopList?.shops;
  console.log(shops);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this shop?")) return;
  };

  const handleEdit = (id) => {
    // Navigate to edit page or open modal
    console.log("Edit shop with id:", id);
  };

  if (isLoading) return <p className="text-center mt-10">Loading shops...</p>;

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full bg-white border rounded-lg shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Owner</th>
            <th className="px-4 py-2 border">Admins</th>
            <th className="px-4 py-2 border">Address</th>
            <th className="px-4 py-2 border">Logo</th>
            <th className="px-4 py-2 border">Active</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {shops.map((shop) => (
            <tr key={shop._id} className="text-center hover:bg-gray-50">
              <td className="px-4 py-2 border">{shop._id.slice(-6)}</td>
              <td className="px-4 py-2 border">{shop.name}</td>
              <td className="px-4 py-2 border">{shop.owner?.name || "N/A"}</td>
              <td className="px-4 py-2 border">
                {shop.admins?.map((a) => a.name).join(", ") || "N/A"}
              </td>
               
              <td className="px-4 py-2 border">{shop.address}</td>
              <td className="px-4 py-2 border">
                {shop.logo ? (
                  <img
                    src={shop.logo}
                    alt={shop.name}
                    className="h-10 w-10 mx-auto rounded"
                  />
                ) : (
                  "N/A"
                )}
              </td>
              <td className="px-4 py-2 border">
                {shop.isActive ? (
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                    Active
                  </span>
                ) : (
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded">
                    Inactive
                  </span>
                )}
              </td>
              <td className="px-4 py-6 border flex justify-center gap-2">
                <button
                  onClick={() => handleEdit(shop._id)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaPencilAlt />
                </button>
                <button
                  onClick={() => handleDelete(shop._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShopList;
