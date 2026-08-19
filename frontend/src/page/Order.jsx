import React, { useState } from "react";
import {
  Search,
  Store,
  MessageCircle,
  Truck,
  PackageCheck,
  Clock,
  XCircle,
  ChevronRight,
} from "lucide-react";
import {
  useDeleteOrderMutation,
  useGetOrdersForUserQuery,
} from "../redux/order.slice";
import { useNavigate } from "react-router-dom";

const TABS = [
  { key: "all", label: "All" },
  { key: "Pending", label: "Pending" },
  { key: "Shipped", label: "To Ship" },
  { key: "Delivered", label: "Delivered" },
  { key: "Cancelled", label: "Cancelled" },
];

const statusStyles = {
  Pending: "bg-[#fff1eb] text-[#f85606]",
  Confirmed: "bg-[#eaf1ff] text-[#2e6bde]",
  Packed: "bg-[#eaf1ff] text-[#2e6bde]",
  Shipped: "bg-[#eaf1ff] text-[#2e6bde]",
  Delivered: "bg-[#e9f9ee] text-[#1c9a4b]",
  Cancelled: "bg-[#f2f2f3] text-[#6b7280]",
};

const StatusIcon = ({ status }) => {
  switch (status) {
    case "Shipped":
      return <Truck size={15} />;
    case "Delivered":
      return <PackageCheck size={15} />;
    case "Cancelled":
      return <XCircle size={15} />;
    default:
      return <Clock size={15} />;
  }
};

function OrderActions({ id, status }) {
  const navigate = useNavigate();
  const [deleteOrder, { isLoading }] = useDeleteOrderMutation();

  const handleOnClick = async () => {
    const confirm = window.confirm(
      "Are you sure you want to cancel this order?"
    );
    if (!confirm) return;

    try {
      const res = await deleteOrder(id).unwrap();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const base =
    "px-4 py-[9px] rounded-[6px] text-[13px] font-semibold transition whitespace-nowrap";

  if (status === "Pending") {
    return (
      <button
        className={`${base} border border-[#dcdde0] text-[#333] hover:bg-[#f7f7f8]`}
        onClick={handleOnClick}
        disabled={isLoading}
      >
        {isLoading ? "Cancelling..." : "Cancel Order"}
      </button>
    );
  }

  return (
    <button
      className={`${base} border border-[#dcdde0] text-[#333] hover:bg-[#f7f7f8]`}
      onClick={() => navigate(`/order/detail/${id}`)}
    >
      View Details
    </button>
  );
}

export default function Orders() {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const { data, isLoading } = useGetOrdersForUserQuery();
  const orders = data?.orders || [];

  const filteredOrders = orders.filter((order) => {
    const matchesTab =
      activeTab === "all" ||
      order.status.toLowerCase() === activeTab.toLowerCase();

    const matchesSearch =
      order._id.toLowerCase().includes(search.toLowerCase()) ||
      order.orderItems.some(
        (item) =>
          item.product?.name?.toLowerCase().includes(search.toLowerCase()) ||
          item.shop?.name?.toLowerCase().includes(search.toLowerCase())
      );

    return matchesTab && matchesSearch;
  });

  if (isLoading) {
    return <div className="flex justify-center py-20">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <div className="bg-white border-b border-[#ececee]">
        <div className="max-w-5xl mx-auto px-4 py-5">
          <h1 className="text-[22px] font-bold">My Orders</h1>

          <div className="relative mt-4 max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search by order ID, product or shop"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-11 rounded-md border pl-10 pr-4 bg-[#f7f7f8] focus:border-[#f85606] outline-none"
            />
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-3 text-sm whitespace-nowrap ${
                  activeTab === tab.key
                    ? "text-[#f85606] border-b-2 border-[#f85606]"
                    : "text-gray-500"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-5 space-y-4">
        {filteredOrders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-lg border overflow-hidden"
          >
            <div className="flex flex-wrap justify-between items-center gap-3 px-5 py-3 border-b">
              <div className="flex items-center gap-2">
                <Store size={16} />
                <span className="font-semibold">
                  {order.orderItems[0]?.shop?.name}
                </span>

                <button className="flex items-center gap-1 border rounded-full px-3 py-1 text-xs hover:bg-gray-100">
                  <MessageCircle size={12} />
                  Chat
                </button>
              </div>

              <span
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                  statusStyles[order.status]
                }`}
              >
                <StatusIcon status={order.status} />
                {order.status}
              </span>
            </div>

            <div className="divide-y">
              {order.orderItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 px-5 py-4 cursor-pointer"
                  onClick={() => navigate(`/order/detail/${order._id}`)}
                >
                  <img
                    src={
                      item.product?.images?.[0]?.url ||
                      item.product?.images?.[0]?.secure_url
                    }
                    alt={item.product?.name}
                    className="w-20 h-20 rounded-md object-cover bg-gray-100"
                  />

                  <div className="flex-1">
                    <p className="font-medium line-clamp-2">
                      {item.product?.name}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      Brand: {item.product?.brand}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold">
                      Rs. {item.price.toLocaleString()}
                    </p>

                    <p className="text-sm text-gray-500">x{item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap justify-between items-center gap-4 px-5 py-4 bg-gray-50 border-t">
              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  Order ID:
                  <span className="font-medium text-black ml-1">
                    {order._id.slice(-8).toUpperCase()}
                  </span>
                </p>

                <p>
                  Order Date:{" "}
                  {new Date(order.createdAt).toLocaleDateString("en-GB")}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-gray-500">Order Total</p>

                  <p className="text-lg font-bold text-[#f85606]">
                    Rs. {order.totalAmount.toLocaleString()}
                  </p>
                </div>

                <OrderActions id={order._id} status={order.status} />
              </div>
            </div>
          </div>
        ))}

        {filteredOrders.length === 0 && (
          <div className="bg-white rounded-lg border py-20 text-center">
            <p className="font-semibold">No orders found</p>
            <p className="text-gray-500 mt-1">Try a different search.</p>
          </div>
        )}

        {filteredOrders.length > 0 && (
          <button className="w-full flex justify-center items-center gap-1 py-3 text-sm text-gray-600 hover:text-black">
            View More Orders
            <ChevronRight size={15} />
          </button>
        )}
      </div>
    </div>
  );
}