import { useEffect, useState, useMemo } from "react";
import {
  useAssignAdminMutation,
  useRemoveAdminMutation,
  useGetShopsActiveQuery,
} from "../../components/Redux/Shop.apiSlice";
import { useGetVendorAdminsQuery } from "../../components/Redux/vendor.apiSlice";

const AssignAdmin = () => {
  const { data: adminsData, isLoading: adminsLoading } =
    useGetVendorAdminsQuery();
  const { data: shopsData, isLoading: shopsLoading } =
    useGetShopsActiveQuery();

  const [assignAdmin] = useAssignAdminMutation();
  const [removeAdmin] = useRemoveAdminMutation();

  // ✅ normalize admins
  const admins = useMemo(() => {
    return (
      adminsData?.vendorAdmins?.map((a) => ({
        ...a,
        _id: String(a._id),
        shops: (a.shops || []).map((s) =>
          typeof s === "object" ? String(s._id) : String(s)
        ),
      })) || []
    );
  }, [adminsData]);

  // ✅ normalize shops
  const shops = useMemo(() => {
    return (
      shopsData?.shops?.map((s) => ({
        ...s,
        _id: String(s._id),
      })) || []
    );
  }, [shopsData]);

  // ✅ state: shopId -> [adminIds]
  const [assignments, setAssignments] = useState({});
  const [initialized, setInitialized] = useState(false);

  // ✅ initialize from backend data
  useEffect(() => {
    if (admins.length > 0 && shops.length > 0 && !initialized) {
      const initial = {};

      shops.forEach((shop) => {
        initial[shop._id] = [];

        admins.forEach((admin) => {
          if (admin.shops.includes(shop._id)) {
            initial[shop._id].push(admin._id);
          }
        });
      });

      setAssignments(initial);
      setInitialized(true);
    }
  }, [admins, shops, initialized]);

  // ✅ toggle handler
  const handleToggle = async (shopId, adminId, isChecked) => {
    shopId = String(shopId);
    adminId = String(adminId);

    const currentAssigned = assignments[shopId] || [];

    if (isChecked && currentAssigned.includes(adminId)) return;
    if (!isChecked && !currentAssigned.includes(adminId)) return;

    try {
      // ✅ optimistic update
      setAssignments((prev) => {
        const current = prev[shopId] || [];

        const updated = isChecked
          ? [...new Set([...current, adminId])]
          : current.filter((id) => id !== adminId);

        return { ...prev, [shopId]: updated };
      });

      if (isChecked) {
        await assignAdmin({ shopId, userId: adminId }).unwrap();
      } else {
        await removeAdmin({ shopId, userId: adminId }).unwrap();
      }
    } catch (err) {
      console.error(err);

      // ❌ rollback
      setAssignments((prev) => {
        const current = prev[shopId] || [];

        const updated = isChecked
          ? current.filter((id) => id !== adminId)
          : [...new Set([...current, adminId])];

        return { ...prev, [shopId]: updated };
      });

      alert("Failed to update admin assignment");
    }
  };

  if (adminsLoading || shopsLoading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Assign Admins to Shops</h1>

      <div className="overflow-auto border rounded shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="p-3 border text-left">Shop</th>

              {admins.map((admin) => (
                <th key={admin._id} className="p-3 border text-center">
                  {admin.email}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {shops.map((shop) => (
              <tr key={shop._id} className="hover:bg-gray-50">
                <td className="p-3 border font-medium">{shop.name}</td>

                {admins.map((admin) => {
                  const isChecked =
                    assignments[shop._id]?.includes(admin._id) ?? false;

                  return (
                    <td key={admin._id} className="p-3 border text-center">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) =>
                          handleToggle(
                            shop._id,
                            admin._id,
                            e.target.checked
                          )
                        }
                        className="w-4 h-4 cursor-pointer"
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignAdmin;