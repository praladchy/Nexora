import { useEffect, useState, useMemo } from "react";
import {
  useAssignOwnerMutation,
  useGetShopsActiveQuery,
  useRemoveOwnerMutation,
} from "../../components/Redux/Shop.apiSlice";
import { useGetVendorAdminsQuery } from "../../components/Redux/vendor.apiSlice";

const OwnerAssign = () => {
  const { data: ownersData, isLoading: ownersLoading } = useGetVendorAdminsQuery();
  const { data: shopsData, isLoading: shopsLoading } = useGetShopsActiveQuery();

  const [assignOwner] = useAssignOwnerMutation();
  const [removeOwner] = useRemoveOwnerMutation();

  const owners = useMemo(() => {  
    return (
      ownersData?.vendorAdmins?.map((o) => ({
        ...o,
        _id: String(o._id),
        shops: (o.shops || []).map((s) =>
          typeof s === "object" ? String(s._id) : String(s)   // ✅ handle both {_id} and plain id
        ).filter(Boolean),
      })) || []
    );
  }, [ownersData]);

  const shops = useMemo(() => {
    return (
      shopsData?.shops?.map((s) => ({
        ...s,
        _id: String(s._id),
      })) || []
    );
  }, [shopsData]);

  const [assignments, setAssignments] = useState({});
  const [initialized, setInitialized] = useState(false);  // ✅ prevent re-init on re-render

  useEffect(() => {
    if (owners.length > 0 && !initialized) {
      const initial = {};
      owners.forEach((owner) => {
        initial[owner._id] = [...owner.shops];  // ✅ copy array properly
      });
      setAssignments(initial);
      setInitialized(true);
    }
  }, [owners, initialized]);

  const handleToggle = async (ownerId, shopId, isChecked) => {
    ownerId = String(ownerId);
    shopId = String(shopId);

    const currentAssigned = assignments[ownerId] || [];

    // ✅ Guard: don't assign if already assigned
    if (isChecked && currentAssigned.includes(shopId)) return;

    // ✅ Guard: don't remove if not assigned
    if (!isChecked && !currentAssigned.includes(shopId)) return;

    try {
      // Optimistic UI update
      setAssignments((prev) => {
        const current = prev[ownerId] || [];
        const updated = isChecked
          ? [...new Set([...current, shopId])]
          : current.filter((id) => id !== shopId);
        return { ...prev, [ownerId]: updated };
      });

      if (isChecked) {
       const res= await assignOwner({ userId: ownerId, shopId }).unwrap();
      } else {
       const res= await removeOwner({ userId: ownerId, shopId }).unwrap();

      }
    } catch (err) {
      console.error(err);

      // Rollback on error
      setAssignments((prev) => {
        const current = prev[ownerId] || [];
        const updated = isChecked
          ? current.filter((id) => id !== shopId)
          : [...new Set([...current, shopId])];
        return { ...prev, [ownerId]: updated };
      });

      alert("Failed to update assignment");
    }
  };

  if (ownersLoading || shopsLoading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Assign Shops to Admins</h1>

      <div className="overflow-auto border rounded shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="p-3 border text-left">Admin</th>
              {shops.map((shop) => (
                <th key={shop._id} className="p-3 border text-center">
                  {shop.name}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {owners.map((owner) => (
              <tr key={owner._id} className="hover:bg-gray-50">
                <td className="p-3 border font-medium">{owner.email}</td>

                {shops.map((shop) => {
                  const isChecked =
                    assignments[owner._id]?.includes(shop._id) ?? false;

                  return (
                    <td key={shop._id} className="p-3 border text-center">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) =>
                          handleToggle(owner._id, shop._id, e.target.checked)
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

export default OwnerAssign;