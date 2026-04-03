import { useEffect, useState } from "react";
import {
  useGetPermissionQuery,
  useAssignPermissionMutation,
  useRemovePermissionMutation,
} from "../../components/Redux/permission.apislice";

import { useGetUserQuery } from "../../components/Redux/auth.slice";

export default function AssignPermissionList() {
  const { data: permissionData } = useGetPermissionQuery();
  const { data: user } = useGetUserQuery();
  const users = user?.users;
  const [assignPermission] = useAssignPermissionMutation();
  const [removePermission] = useRemovePermissionMutation();

  const permissions = permissionData?.permissions || [];
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    if (users) {
      setUserData(users);
    }
  }, [users]);

  const togglePermission = async (userId, permissionId) => {
    const user = userData.find((u) => u._id.toString() === userId);
    const hasPermission = user?.permissions?.some((p) => p === permissionId);
    try {
      if (hasPermission) {
        await removePermission({ id: permissionId, userId }).unwrap();
      } else {
        await assignPermission({ id: permissionId, userId }).unwrap();
      }

      setUserData((prev) =>
        prev.map((u) => {
          if (u._id === userId) {
            return {
              ...u,
              permissions: hasPermission
                ? u.permissions.filter((p) => p!== permissionId)
                : [...(u.permissions || []), permissionId],
            };
          }
          return u;
        }),
      );
    } catch (error) {
      console.error("Permission update failed", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Assign Permissions</h2>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3">Id</th>
              <th className="px-4 py-3">User</th>

              {permissions.map((perm) => (
                <th key={perm._id} className="px-4 py-3 text-center">
                  {perm.name}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {userData.map((user) => (
              <tr key={user._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{user._id}</td>

                <td className="px-4 py-3 font-medium">{user.email}</td>

                {permissions.map((perm) => (
                  <td key={perm._id} className="px-4 py-3 text-center">
                    <input
                      type="checkbox"
                      checked={user.permissions?.some(
                        (p) => p.toString() === perm._id,
                      )}
                      onChange={() => togglePermission(user._id, perm._id)}
                      className="w-4 h-4"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
