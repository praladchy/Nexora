import React, { useMemo, useState } from "react";
import {
  Bell,
  Check,
  CheckCheck,
  Trash2,
  Search,
  ShoppingBag,
  Store,
  Users,
  Package,
  AlertTriangle,
  ShieldCheck,
  DollarSign,
  Clock,
  MoreVertical,
  Eye,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const initialNotifications = [
  {
    id: "NOT-001",
    type: "order",
    title: "New Order Received",
    message:
      "Order #ORD-1082 has been placed by Amit KC from Tech World.",
    time: "5 minutes ago",
    date: "Sep 06, 2026",
    read: false,
    priority: "normal",
    relatedId: "ORD-1082",
  },
  {
    id: "NOT-002",
    type: "vendor",
    title: "New Vendor Registration",
    message:
      "Sports Zone has submitted a new vendor registration request.",
    time: "18 minutes ago",
    date: "Sep 06, 2026",
    read: false,
    priority: "high",
    relatedId: "VEN-004",
  },
  {
    id: "NOT-003",
    type: "product",
    title: "Product Approval Required",
    message:
      "A new product from Fashion Hub is waiting for approval.",
    time: "42 minutes ago",
    date: "Sep 06, 2026",
    read: false,
    priority: "high",
    relatedId: "PRD-109",
  },
  {
    id: "NOT-004",
    type: "shop",
    title: "New Shop Created",
    message:
      "Tech World has created a new shop: Tech World Accessories.",
    time: "1 hour ago",
    date: "Sep 06, 2026",
    read: true,
    priority: "normal",
    relatedId: "SHOP-002",
  },
  {
    id: "NOT-005",
    type: "user",
    title: "New User Registered",
    message:
      "A new customer account has been registered on Nexora.",
    time: "2 hours ago",
    date: "Sep 06, 2026",
    read: true,
    priority: "normal",
    relatedId: "USR-882",
  },
  {
    id: "NOT-006",
    type: "payment",
    title: "Payment Completed",
    message:
      "Payment of Rs. 109,999 for order #ORD-1078 has been completed.",
    time: "3 hours ago",
    date: "Sep 06, 2026",
    read: true,
    priority: "normal",
    relatedId: "ORD-1078",
  },
  {
    id: "NOT-007",
    type: "alert",
    title: "Low Stock Alert",
    message:
      "iPhone 15 Pro at Tech World is running low on stock.",
    time: "5 hours ago",
    date: "Sep 06, 2026",
    read: false,
    priority: "high",
    relatedId: "PRD-001",
  },
  {
    id: "NOT-008",
    type: "vendor",
    title: "Vendor Suspended",
    message:
      "Beauty Store has been suspended due to policy violations.",
    time: "Yesterday",
    date: "Sep 05, 2026",
    read: true,
    priority: "high",
    relatedId: "VEN-005",
  },
  {
    id: "NOT-009",
    type: "product",
    title: "Product Approved",
    message:
      "MacBook Air M3 has been approved and is now visible on Nexora.",
    time: "Yesterday",
    date: "Sep 05, 2026",
    read: true,
    priority: "normal",
    relatedId: "PRD-002",
  },
  {
    id: "NOT-010",
    type: "order",
    title: "Order Delivered",
    message:
      "Order #ORD-1074 has been successfully delivered.",
    time: "Yesterday",
    date: "Sep 05, 2026",
    read: true,
    priority: "normal",
    relatedId: "ORD-1074",
  },
];

const typeConfig = {
  order: {
    icon: ShoppingBag,
    bg: "bg-blue-50",
    text: "text-blue-600",
    label: "Order",
  },
  vendor: {
    icon: Store,
    bg: "bg-purple-50",
    text: "text-purple-600",
    label: "Vendor",
  },
  product: {
    icon: Package,
    bg: "bg-indigo-50",
    text: "Product",
    label: "Product",
  },
  shop: {
    icon: Store,
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    label: "Shop",
  },
  user: {
    icon: Users,
    bg: "bg-cyan-50",
    text: "text-cyan-600",
    label: "User",
  },
  payment: {
    icon: DollarSign,
    bg: "bg-green-50",
    text: "text-green-600",
    label: "Payment",
  },
  alert: {
    icon: AlertTriangle,
    bg: "bg-red-50",
    text: "text-red-600",
    label: "Alert",
  },
};

function NotificationIcon({ type }) {
  const config = typeConfig[type] || typeConfig.alert;
  const Icon = config.icon;

  return (
    <div
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${config.bg}`}
    >
      <Icon className={`h-5 w-5 ${config.text}`} />
    </div>
  );
}

function PriorityBadge({ priority }) {
  if (priority !== "high") return null;

  return (
    <span className="rounded-full bg-red-50 px-2 py-1 text-[10px] font-semibold uppercase text-red-600">
      Important
    </span>
  );
}

export default function NotificationList() {
  const navigate = useNavigate();

  const [notifications, setNotifications] =
    useState(initialNotifications);

  const [activeTab, setActiveTab] = useState("all");
  const [typeFilter, setTypeFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [openMenu, setOpenMenu] = useState(null);

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const filteredNotifications = useMemo(() => {
    return notifications.filter((notification) => {
      const tabMatch =
        activeTab === "all" ||
        (activeTab === "unread" && !notification.read) ||
        (activeTab === "read" && notification.read);

      const typeMatch =
        typeFilter === "All" ||
        notification.type === typeFilter;

      const searchMatch =
        notification.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        notification.message
          .toLowerCase()
          .includes(search.toLowerCase());

      return tabMatch && typeMatch && searchMatch;
    });
  }, [notifications, activeTab, typeFilter, search]);

  const markAsRead = (id) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAsUnread = (id) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, read: false }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications((current) =>
      current.filter((notification) => notification.id !== id)
    );

    setOpenMenu(null);
  };

  const clearReadNotifications = () => {
    setNotifications((current) =>
      current.filter((notification) => !notification.read)
    );
  };

  const handleNotificationClick = (notification) => {
    markAsRead(notification.id);

    if (notification.type === "vendor") {
      navigate(
        `/superadmin/vendors/${notification.relatedId}`
      );
    }

    if (notification.type === "shop") {
      navigate(
        `/superadmin/shops/${notification.relatedId}`
      );
    }

    if (notification.type === "product") {
      navigate(
        `/superadmin/products/${notification.relatedId}`
      );
    }

    if (notification.type === "order") {
      navigate(
        `/superadmin/orders/${notification.relatedId}`
      );
    }

    if (notification.type === "user") {
      navigate(
        `/superadmin/users/${notification.relatedId}`
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50">
              <Bell className="h-5 w-5 text-indigo-600" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Notifications
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Stay updated with activity across Nexora.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <CheckCheck size={17} />
            Mark all read
          </button>

          <button
            onClick={clearReadNotifications}
            className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
          >
            <Trash2 size={17} />
            Clear read
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Total Notifications
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {notifications.length}
          </p>
        </div>

        <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-5">
          <p className="text-sm text-indigo-600">
            Unread Notifications
          </p>

          <p className="mt-2 text-2xl font-bold text-indigo-700">
            {unreadCount}
          </p>
        </div>

        <div className="rounded-2xl border border-red-100 bg-red-50 p-5">
          <p className="text-sm text-red-600">
            Important
          </p>

          <p className="mt-2 text-2xl font-bold text-red-700">
            {
              notifications.filter(
                (notification) =>
                  notification.priority === "high" &&
                  !notification.read
              ).length
            }
          </p>
        </div>
      </div>

      {/* Notification Card */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Tabs */}
        <div className="border-b border-slate-200 px-4 sm:px-5">
          <div className="flex gap-5 overflow-x-auto">
            <button
              onClick={() => setActiveTab("all")}
              className={`relative whitespace-nowrap py-4 text-sm font-medium ${
                activeTab === "all"
                  ? "text-indigo-600"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              All

              <span className="ml-2 rounded-full bg-slate-100 px-2 py-0.5 text-xs">
                {notifications.length}
              </span>

              {activeTab === "all" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" />
              )}
            </button>

            <button
              onClick={() => setActiveTab("unread")}
              className={`relative whitespace-nowrap py-4 text-sm font-medium ${
                activeTab === "unread"
                  ? "text-indigo-600"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Unread

              {unreadCount > 0 && (
                <span className="ml-2 rounded-full bg-indigo-100 px-2 py-0.5 text-xs text-indigo-600">
                  {unreadCount}
                </span>
              )}

              {activeTab === "unread" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" />
              )}
            </button>

            <button
              onClick={() => setActiveTab("read")}
              className={`relative whitespace-nowrap py-4 text-sm font-medium ${
                activeTab === "read"
                  ? "text-indigo-600"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Read

              {activeTab === "read" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" />
              )}
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 border-b border-slate-200 p-4 sm:p-5 lg:flex-row">
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
              placeholder="Search notifications..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          {/* Type */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-indigo-500"
          >
            <option value="All">All Types</option>
            <option value="order">Orders</option>
            <option value="vendor">Vendors</option>
            <option value="shop">Shops</option>
            <option value="product">Products</option>
            <option value="user">Users</option>
            <option value="payment">Payments</option>
            <option value="alert">Alerts</option>
          </select>
        </div>

        {/* Notification List */}
        <div>
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => {
              const config =
                typeConfig[notification.type] ||
                typeConfig.alert;

              return (
                <div
                  key={notification.id}
                  className={`group relative border-b border-slate-100 p-4 transition sm:p-5 ${
                    notification.read
                      ? "bg-white hover:bg-slate-50"
                      : "bg-indigo-50/40 hover:bg-indigo-50/70"
                  }`}
                >
                  <div className="flex gap-3 sm:gap-4">
                    {/* Unread indicator */}
                    <div className="flex w-2 shrink-0 justify-center">
                      {!notification.read && (
                        <span className="mt-2 h-2.5 w-2.5 rounded-full bg-indigo-600" />
                      )}
                    </div>

                    {/* Icon */}
                    <NotificationIcon
                      type={notification.type}
                    />

                    {/* Content */}
                    <button
                      onClick={() =>
                        handleNotificationClick(notification)
                      }
                      className="min-w-0 flex-1 text-left"
                    >
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
                        <h3
                          className={`text-sm ${
                            notification.read
                              ? "font-medium text-slate-800"
                              : "font-semibold text-slate-900"
                          }`}
                        >
                          {notification.title}
                        </h3>

                        <PriorityBadge
                          priority={notification.priority}
                        />
                      </div>

                      <p className="mt-1 max-w-3xl text-sm leading-5 text-slate-500">
                        {notification.message}
                      </p>

                      <div className="mt-2 flex flex-wrap items-center gap-3">
                        <span
                          className={`rounded-full px-2 py-1 text-[10px] font-medium ${config.bg} ${config.text}`}
                        >
                          {config.label}
                        </span>

                        <span className="flex items-center gap-1 text-xs text-slate-400">
                          <Clock size={12} />
                          {notification.time}
                        </span>
                      </div>
                    </button>

                    {/* Actions */}
                    <div className="relative shrink-0">
                      <button
                        onClick={() =>
                          setOpenMenu(
                            openMenu === notification.id
                              ? null
                              : notification.id
                          )
                        }
                        className="rounded-lg p-2 text-slate-400 opacity-100 transition hover:bg-slate-100 hover:text-slate-700 sm:opacity-0 sm:group-hover:opacity-100"
                      >
                        <MoreVertical size={18} />
                      </button>

                      {openMenu === notification.id && (
                        <div className="absolute right-0 top-10 z-20 w-44 rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
                          {!notification.read ? (
                            <button
                              onClick={() => {
                                markAsRead(notification.id);
                                setOpenMenu(null);
                              }}
                              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                            >
                              <Check size={16} />
                              Mark as read
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                markAsUnread(notification.id);
                                setOpenMenu(null);
                              }}
                              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                            >
                              <Eye size={16} />
                              Mark as unread
                            </button>
                          )}

                          <button
                            onClick={() =>
                              deleteNotification(
                                notification.id
                              )
                            }
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                          >
                            <Trash2 size={16} />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="px-5 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                <Bell className="h-6 w-6 text-slate-400" />
              </div>

              <h3 className="mt-4 font-semibold text-slate-800">
                No notifications found
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Try changing your search or notification filter.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        {filteredNotifications.length > 0 && (
          <div className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-medium text-slate-700">
                {filteredNotifications.length}
              </span>{" "}
              notifications
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

 