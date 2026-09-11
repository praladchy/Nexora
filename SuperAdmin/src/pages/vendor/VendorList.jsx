import React, { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  Store,
  Users,
  DollarSign,
  Package,
  MoreVertical,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const vendors = [
  {
    id: "VEN-001",
    name: "Tech World",
    owner: "Rahul Sharma",
    email: "rahul@techworld.com",
    phone: "+977 9812345678",
    avatar: "https://i.pravatar.cc/150?img=12",
    shops: 2,
    products: 84,
    orders: 1250,
    revenue: 485000,
    status: "Active",
    verification: "Verified",
    joined: "2026-01-12",
  },
  {
    id: "VEN-002",
    name: "Fashion Hub",
    owner: "Aarav Thapa",
    email: "aarav@fashionhub.com",
    phone: "+977 9823456789",
    avatar: "https://i.pravatar.cc/150?img=11",
    shops: 1,
    products: 126,
    orders: 980,
    revenue: 365000,
    status: "Active",
    verification: "Verified",
    joined: "2026-02-04",
  },
  {
    id: "VEN-003",
    name: "Home Essentials",
    owner: "Suman KC",
    email: "suman@homeessentials.com",
    phone: "+977 9801234567",
    avatar: "https://i.pravatar.cc/150?img=33",
    shops: 3,
    products: 215,
    orders: 1740,
    revenue: 620000,
    status: "Active",
    verification: "Verified",
    joined: "2026-02-15",
  },
  {
    id: "VEN-004",
    name: "Sports Zone",
    owner: "Rohan Gurung",
    email: "rohan@sportszone.com",
    phone: "+977 9865432109",
    avatar: "https://i.pravatar.cc/150?img=15",
    shops: 1,
    products: 62,
    orders: 450,
    revenue: 185000,
    status: "Pending",
    verification: "Pending",
    joined: "2026-04-21",
  },
  {
    id: "VEN-005",
    name: "Beauty Store",
    owner: "Anisha Rai",
    email: "anisha@beautystore.com",
    phone: "+977 9845671234",
    avatar: "https://i.pravatar.cc/150?img=47",
    shops: 1,
    products: 96,
    orders: 720,
    revenue: 275000,
    status: "Suspended",
    verification: "Verified",
    joined: "2026-03-08",
  },
  {
    id: "VEN-006",
    name: "Mobile Point",
    owner: "Bibek Adhikari",
    email: "bibek@mobilepoint.com",
    phone: "+977 9811122233",
    avatar: "https://i.pravatar.cc/150?img=68",
    shops: 2,
    products: 73,
    orders: 890,
    revenue: 410000,
    status: "Active",
    verification: "Verified",
    joined: "2026-05-11",
  },
];

const statusStyles = {
  Active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  Suspended: "bg-red-50 text-red-700 border-red-200",
};

function StatCard({ title, value, icon: Icon, description }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="mt-2 text-2xl font-bold text-slate-900">
            {value}
          </h3>
          <p className="mt-1 text-xs text-slate-400">{description}</p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50">
          <Icon className="h-6 w-6 text-indigo-600" />
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium ${
        statusStyles[status]
      }`}
    >
      {status === "Active" && <CheckCircle size={13} />}
      {status === "Pending" && <Clock size={13} />}
      {status === "Suspended" && <XCircle size={13} />}

      {status}
    </span>
  );
}

function VerificationBadge({ verification }) {
  if (verification === "Verified") {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
        <ShieldCheck size={14} />
        Verified
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-600">
      <Clock size={14} />
      Pending
    </span>
  );
}

export default function VendorList() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [verificationFilter, setVerificationFilter] = useState("All");
  const [openMenu, setOpenMenu] = useState(null);

  const stats = useMemo(() => {
    return {
      total: vendors.length,
      active: vendors.filter((v) => v.status === "Active").length,
      pending: vendors.filter((v) => v.status === "Pending").length,
      suspended: vendors.filter((v) => v.status === "Suspended").length,
    };
  }, []);

  const filteredVendors = useMemo(() => {
    return vendors.filter((vendor) => {
      const searchMatch =
        vendor.name.toLowerCase().includes(search.toLowerCase()) ||
        vendor.owner.toLowerCase().includes(search.toLowerCase()) ||
        vendor.email.toLowerCase().includes(search.toLowerCase()) ||
        vendor.id.toLowerCase().includes(search.toLowerCase());

      const statusMatch =
        statusFilter === "All" || vendor.status === statusFilter;

      const verificationMatch =
        verificationFilter === "All" ||
        vendor.verification === verificationFilter;

      return searchMatch && statusMatch && verificationMatch;
    });
  }, [search, statusFilter, verificationFilter]);

  const handleDelete = (vendorId) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete vendor ${vendorId}?`
    );

    if (confirmDelete) {
      console.log("Delete vendor:", vendorId);
    }
  };

  const handleApprove = (vendorId) => {
    console.log("Approve vendor:", vendorId);
  };

  const handleSuspend = (vendorId) => {
    console.log("Suspend vendor:", vendorId);
  };

  const handleActivate = (vendorId) => {
    console.log("Activate vendor:", vendorId);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Vendors
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage all vendors registered on Nexora.
          </p>
        </div>

        <button
          onClick={() => navigate("/superadmin/vendors/create")}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          <Plus size={18} />
          Add Vendor
        </button>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Vendors"
          value={stats.total}
          icon={Users}
          description="All registered vendors"
        />

        <StatCard
          title="Active Vendors"
          value={stats.active}
          icon={CheckCircle}
          description="Currently operating"
        />

        <StatCard
          title="Pending Vendors"
          value={stats.pending}
          icon={Clock}
          description="Waiting for approval"
        />

        <StatCard
          title="Suspended Vendors"
          value={stats.suspended}
          icon={XCircle}
          description="Currently suspended"
        />
      </div>

      {/* Main Card */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Filters */}
        <div className="border-b border-slate-200 p-4 sm:p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search vendor, owner, email or ID..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            {/* Status */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-indigo-500"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Suspended">Suspended</option>
            </select>

            {/* Verification */}
            <select
              value={verificationFilter}
              onChange={(e) => setVerificationFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-indigo-500"
            >
              <option value="All">All Verification</option>
              <option value="Verified">Verified</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[1100px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Vendor
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Owner
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Shops
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Products
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Orders
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Revenue
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>

                <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredVendors.map((vendor) => (
                <tr
                  key={vendor.id}
                  className="border-b border-slate-100 transition hover:bg-slate-50"
                >
                  {/* Vendor */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={vendor.avatar}
                        alt={vendor.name}
                        className="h-11 w-11 rounded-xl object-cover"
                      />

                      <div>
                        <p className="font-semibold text-slate-900">
                          {vendor.name}
                        </p>

                        <p className="text-xs text-slate-500">
                          {vendor.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Owner */}
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-slate-800">
                      {vendor.owner}
                    </p>

                    <p className="text-xs text-slate-500">
                      {vendor.email}
                    </p>
                  </td>

                  {/* Shops */}
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700">
                      <Store size={15} />
                      {vendor.shops}
                    </span>
                  </td>

                  {/* Products */}
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1.5 text-sm text-slate-700">
                      <Package size={15} />
                      {vendor.products}
                    </span>
                  </td>

                  {/* Orders */}
                  <td className="px-5 py-4">
                    <span className="text-sm text-slate-700">
                      {vendor.orders.toLocaleString()}
                    </span>
                  </td>

                  {/* Revenue */}
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-slate-900">
                      <DollarSign size={15} />
                      {vendor.revenue.toLocaleString()}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <StatusBadge status={vendor.status} />
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-1">
                      <button
                        onClick={() =>
                          navigate(`/superadmin/vendors/${vendor.id}`)
                        }
                        className="rounded-lg p-2 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600"
                        title="View"
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        onClick={() =>
                          navigate(`/superadmin/vendors/${vendor.id}/edit`)
                        }
                        className="rounded-lg p-2 text-slate-500 hover:bg-blue-50 hover:text-blue-600"
                        title="Edit"
                      >
                        <Edit size={17} />
                      </button>

                      <button
                        onClick={() => handleDelete(vendor.id)}
                        className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
                        title="Delete"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="space-y-4 p-4 md:hidden">
          {filteredVendors.map((vendor) => (
            <div
              key={vendor.id}
              className="rounded-2xl border border-slate-200 p-4"
            >
              {/* Vendor Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={vendor.avatar}
                    alt={vendor.name}
                    className="h-12 w-12 rounded-xl object-cover"
                  />

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {vendor.name}
                    </h3>

                    <p className="text-xs text-slate-500">
                      {vendor.id}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() =>
                    setOpenMenu(openMenu === vendor.id ? null : vendor.id)
                  }
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                >
                  <MoreVertical size={18} />
                </button>
              </div>

              {/* Owner */}
              <div className="mt-4 border-t border-slate-100 pt-4">
                <p className="text-xs text-slate-400">Owner</p>

                <p className="mt-1 text-sm font-medium text-slate-800">
                  {vendor.owner}
                </p>

                <p className="text-xs text-slate-500">
                  {vendor.email}
                </p>
              </div>

              {/* Stats */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-400">Shops</p>
                  <p className="mt-1 font-semibold text-slate-900">
                    {vendor.shops}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-400">Products</p>
                  <p className="mt-1 font-semibold text-slate-900">
                    {vendor.products}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-400">Orders</p>
                  <p className="mt-1 font-semibold text-slate-900">
                    {vendor.orders.toLocaleString()}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-400">Revenue</p>
                  <p className="mt-1 font-semibold text-slate-900">
                    Rs. {vendor.revenue.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Status */}
              <div className="mt-4 flex items-center justify-between">
                <StatusBadge status={vendor.status} />

                <VerificationBadge
                  verification={vendor.verification}
                />
              </div>

              {/* Actions */}
              <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-4">
                <button
                  onClick={() =>
                    navigate(`/superadmin/vendors/${vendor.id}`)
                  }
                  className="flex items-center justify-center gap-1 rounded-xl bg-slate-100 py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-200"
                >
                  <Eye size={15} />
                  View
                </button>

                <button
                  onClick={() =>
                    navigate(`/superadmin/vendors/${vendor.id}/edit`)
                  }
                  className="flex items-center justify-center gap-1 rounded-xl bg-blue-50 py-2.5 text-xs font-medium text-blue-600 hover:bg-blue-100"
                >
                  <Edit size={15} />
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(vendor.id)}
                  className="flex items-center justify-center gap-1 rounded-xl bg-red-50 py-2.5 text-xs font-medium text-red-600 hover:bg-red-100"
                >
                  <Trash2 size={15} />
                  Delete
                </button>
              </div>

              {/* Mobile More Menu */}
              {openMenu === vendor.id && (
                <div className="mt-3 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
                  {vendor.status === "Pending" && (
                    <button
                      onClick={() => handleApprove(vendor.id)}
                      className="w-full rounded-lg px-3 py-2 text-left text-sm text-emerald-600 hover:bg-emerald-50"
                    >
                      Approve Vendor
                    </button>
                  )}

                  {vendor.status === "Active" && (
                    <button
                      onClick={() => handleSuspend(vendor.id)}
                      className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                    >
                      Suspend Vendor
                    </button>
                  )}

                  {vendor.status === "Suspended" && (
                    <button
                      onClick={() => handleActivate(vendor.id)}
                      className="w-full rounded-lg px-3 py-2 text-left text-sm text-emerald-600 hover:bg-emerald-50"
                    >
                      Activate Vendor
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty */}
        {filteredVendors.length === 0 && (
          <div className="p-12 text-center">
            <Users className="mx-auto h-12 w-12 text-slate-300" />

            <h3 className="mt-4 font-semibold text-slate-800">
              No vendors found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Try changing your search or filters.
            </p>
          </div>
        )}

        {/* Footer */}
        {filteredVendors.length > 0 && (
          <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-medium text-slate-700">
                {filteredVendors.length}
              </span>{" "}
              of{" "}
              <span className="font-medium text-slate-700">
                {vendors.length}
              </span>{" "}
              vendors
            </p>

            <div className="flex gap-2">
              <button className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-500 hover:bg-slate-50">
                Previous
              </button>

              <button className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white">
                1
              </button>

              <button className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-500 hover:bg-slate-50">
                2
              </button>

              <button className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-500 hover:bg-slate-50">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}