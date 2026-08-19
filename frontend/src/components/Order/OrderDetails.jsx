import { useParams } from "react-router-dom";
import { useGetOrdersByIdQuery } from "../../redux/order.slice";
import { useState } from "react";
import {
  CheckCircle2,
  MapPin,
  Copy,
  Download,
  RotateCcw,
  MessageCircle,
  ChevronRight,
  Truck,
} from "lucide-react";

const money = (n) => `Rs. ${Number(n).toLocaleString("en-IN")}`;

const statusMeta = {
  pending: { label: "Order placed", color: "text-amber-600 bg-amber-50" },
  shipped: { label: "Shipped", color: "text-blue-600 bg-blue-50" },
  out_for_delivery: {
    label: "Out for delivery",
    color: "text-blue-600 bg-blue-50",
  },
  delivered: { label: "Delivered", color: "text-emerald-600 bg-emerald-50" },
  cancelled: { label: "Cancelled", color: "text-red-600 bg-red-50" },
};

function StatusStep({ step, isLast }) {
  return (
    <div className="flex-1 flex flex-col items-center relative">
      {!isLast && (
        <div
          className={`absolute top-3 left-1/2 w-full h-0.5 ${
            step.done ? "bg-orange-500" : "bg-gray-200"
          }`}
        />
      )}
      <div
        className={`z-10 w-6 h-6 rounded-full flex items-center justify-center ${
          step.done ? "bg-orange-500" : "bg-gray-200"
        }`}
      >
        {step.done && <CheckCircle2 className="w-4 h-4 text-white" />}
      </div>
      <p className="mt-2 text-xs font-medium text-gray-800 text-center">
        {step.label}
      </p>
      <p className="text-[11px] text-gray-400 text-center">{step.date}</p>
    </div>
  );
}

export default function OrderDetails() {
  const [copied, setCopied] = useState(false);
  const { id } = useParams();

  const { data, isLoading, isError } = useGetOrdersByIdQuery(id);
  const order = data?.order;
console.log("dsgghjjs",order);
  if (isLoading)
    return <div className="p-10 text-center">Loading...</div>;
  if (isError || !order)
    return <div className="p-10 text-center">Order not found.</div>;

  const meta = statusMeta[order.status] || statusMeta.pending;

  const timeline = [
    {
      key: "placed",
      label: "Order placed",
      date: new Date(order.createdAt).toLocaleString("en-US", {
        day: "2-digit",
        month: "short",
        hour: "numeric",
        minute: "2-digit",
      }),
      done: true,
    },
    {
      key: "shipped",
      label: "Shipped",
      date: "",
      done: ["shipped", "out_for_delivery", "delivered"].includes(order.status),
    },
    {
      key: "out_for_delivery",
      label: "Out for delivery",
      date: "",
      done: ["out_for_delivery", "delivered"].includes(order.status),
    },
    {
      key: "delivered",
      label: "Delivered",
      date: "",
      done: order.status === "delivered",
    },
  ];

  const copyOrderId = () => {
    navigator.clipboard.writeText(order._id);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4">
      <div className="max-w-3xl mx-auto space-y-4">
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <span>My orders</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-800 font-medium">Order details</span>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-semibold text-gray-900">
                  Order #{order._id}
                </h1>
                <button
                  onClick={copyOrderId}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
                {copied && (
                  <span className="text-[11px] text-emerald-600">Copied</span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Placed on{" "}
                {new Date(order.createdAt).toLocaleString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </p>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${meta.color}`}
            >
              {meta.label}
            </span>
          </div>

          <div className="flex mt-6">
            {timeline.map((step, i) => (
              <StatusStep
                key={step.key}
                step={step}
                isLast={i === timeline.length - 1}
              />
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-5">
            <h2 className="text-sm font-semibold flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4 text-orange-500" />
              Delivery Address
            </h2>
            <p className="text-sm text-gray-500">
              Address not available in API.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-5">
            <h2 className="text-sm font-semibold mb-3">Payment</h2>

            <div className="flex justify-between text-sm text-gray-500">
              <span>Method</span>
              <span className="text-gray-800 capitalize">
                {order.paymentMethod}
              </span>
            </div>

            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>Status</span>
              <span>{order.paymentStatus}</span>
            </div>

            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>Total</span>
              <span className="font-semibold text-gray-900">
                {money(order.totalAmount)}
              </span>
            </div>

            <div className="flex gap-2 mt-4">
              <button className="flex items-center gap-1 text-xs border rounded-md px-3 py-1.5">
                <Download className="w-3.5 h-3.5" />
                Invoice
              </button>

              <button className="flex items-center gap-1 text-xs border rounded-md px-3 py-1.5">
                <MessageCircle className="w-3.5 h-3.5" />
                Contact
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-5">
          <h2 className="text-sm font-semibold mb-4">
            Items ({order.orderItems.length})
          </h2>

          <div className="divide-y divide-gray-100">
            {order.orderItems.map((item) => (
              <div
                key={item.product._id}
                className="flex items-center gap-4 py-4"
              >
                <img
                  src={item.product.images?.[0].url}
                  alt={item.product.name}
                  className="w-16 h-16 rounded-md object-cover border"
                />

                <div className="flex-1">
                  <p className="text-sm text-gray-800">{item.product.name}</p>
                  <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                </div>

                <p className="text-sm font-medium">
                  {money(item.product.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t space-y-2">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Subtotal</span>
              <span>{money(order.itemsPrice)}</span>
            </div>

            <div className="flex justify-between text-sm text-gray-500">
              <span>Shipping</span>
              <span>{money(order.shippingPrice)}</span>
            </div>

            <div className="flex justify-between text-sm text-gray-500">
              <span>Tax</span>
              <span>{money(order.taxPrice)}</span>
            </div>

            <div className="flex justify-between text-sm text-gray-500">
              <span>Discount</span>
              <span className="text-emerald-600">
                -{money(order.totalDiscount)}
              </span>
            </div>

            <div className="flex justify-between text-sm font-semibold pt-2 border-t">
              <span>Total</span>
              <span>{money(order.totalAmount)}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button className="flex items-center gap-2 border rounded-md px-4 py-2 text-sm">
            <RotateCcw className="w-4 h-4" />
            Buy Again
          </button>

          {order.status === "delivered" ? (
            <button className="bg-orange-500 text-white rounded-md px-4 py-2 text-sm">
              Return / Refund
            </button>
          ) : (
            <button className="flex items-center gap-2 bg-orange-500 text-white rounded-md px-4 py-2 text-sm">
              <Truck className="w-4 h-4" />
              Track Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
}