import { Pencil, Trash2 } from "lucide-react";
import { useGetActivePermissionQuery } from "../../components/Redux/permission.apislice.jsx";

// const permissions = [
//   {
//     id: 1,
//     name: "John Doe",
//     role: "Admin",
//     permission: "Create Vendor",
//     date: "2026-03-12",
//     status: "Active",
//   },
//   {
//     id: 2,
//     name: "Ram Sharma",
//     role: "Vendor",
//     permission: "Add Product",
//     date: "2026-03-10",
//     status: "Inactive",
//   },
// ];

export default function PermissionList() {
  const {
    data: permissionData,
    isLoading
  } = useGetActivePermissionQuery();
  const permissions = permissionData?.permissions || [];
  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Permission History</h2>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {permissions.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No permissions found
                </td>
              </tr>
            ) : (
              permissions.map((item) => (
                <tr key={item._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">{item._id}</td>
                  <td className="px-4 py-3">{item.name}</td>
                  <td className="px-4 py-3">{item.description}</td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 text-xs rounded-full ${
                        item.status
                          ? "bg-blue-100 text-blue-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {item.status ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="px-4 py-3 flex justify-center gap-3">
                    <button className="text-blue-500 hover:text-blue-700">
                      <Pencil size={18} />
                    </button>

                    <button className="text-red-500 hover:text-red-700">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
