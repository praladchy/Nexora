import React from "react";
import { Check } from "lucide-react";
import { useParams } from "react-router-dom";
import { useGetOrdersByIdQuery } from "../../redux/order.slice";

const PRODUCTS = [
  {
    id: 1,
    name: "Red Capsicum",
    price: 14.0,
    qty: 5,
    subtotal: 70.0,
    emoji: "🫑",
    img: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=80&q=80&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Green Capsicum",
    price: 14.0,
    qty: 2,
    subtotal: 28.0,
    img: "https://images.unsplash.com/photo-1585011664466-b7bbb0821f2b?w=80&q=80&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Green Chili",
    price: 26.7,
    qty: 10,
    subtotal: 267.0,
    img: "https://images.unsplash.com/photo-1573575155376-b5010099301b?w=80&q=80&auto=format&fit=crop",
  },
];

const STEPS = [
  { id: 1, label: "Order received", status: "done" },
  { id: 2, label: "Processing", status: "active" },
  { id: 3, label: "On the way", status: "pending" },
  { id: 4, label: "Delivered", status: "pending" },
];

function StatusTracker() {
  return (
    <div className="flex items-center px-2 sm:px-4">
      {STEPS.map((step, idx) => {
        const isLast = idx === STEPS.length - 1;
        const isDone = step.status === "done";
        const isActive = step.status === "active";
        const lineFilled = isDone || isActive;

        return (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center gap-2 shrink-0">
              <div
                className={[
                  "w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold shrink-0",
                  isDone
                    ? "bg-emerald-600 text-white"
                    : isActive
                    ? "bg-emerald-600 text-white"
                    : "bg-white border-2 border-dashed border-emerald-300 text-emerald-500",
                ].join(" ")}
              >
                {isDone ? <Check size={18} strokeWidth={3} /> : step.id.toString().padStart(2, "0")}
              </div>
              <span
                className={[
                  "text-xs sm:text-sm font-medium whitespace-nowrap",
                  isDone || isActive ? "text-emerald-600" : "text-gray-400",
                ].join(" ")}
              >
                {step.label}
              </span>
            </div>

            {!isLast && (
              <div className="flex-1 h-[2px] mb-6 mx-1 sm:mx-2 min-w-[16px]">
                <div
                  className={[
                    "h-full w-full rounded",
                    lineFilled && STEPS[idx + 1].status !== "pending"
                      ? "bg-emerald-600"
                      : lineFilled
                      ? "bg-gradient-to-r from-emerald-600 to-emerald-100"
                      : "bg-gray-200",
                  ].join(" ")}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function InfoBlock({ label, name, address, email, phone }) {
  return (
    <div className="flex-1 px-6 py-5">
      <p className="text-xs font-semibold tracking-wider text-gray-400 uppercase mb-3">
        {label}
      </p>
      <p className="font-semibold text-gray-900">{name}</p>
      <p className="text-sm text-gray-500 mt-1 leading-relaxed">{address}</p>

      <div className="mt-4">
        <p className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
          Email
        </p>
        <p className="text-sm text-gray-700 mt-1">{email}</p>
      </div>
      <div className="mt-3">
        <p className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
          Phone
        </p>
        <p className="text-sm text-gray-700 mt-1">{phone}</p>
      </div>
    </div>
  );
}

export default function OrderDetails() {
  const {id}=useParams()
  console.log("qwertyui",id)
  const {data:order}=useGetOrdersByIdQuery(id)
  console.log("sdfghjk",order)
  const subtotal = 365.0;
  const discountPct = 20;
  const total = 84.0;

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center p-4 sm:p-8">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-gray-100">
          <h1 className="flex flex-wrap items-baseline gap-2 text-lg sm:text-xl font-bold text-gray-900">
            Order Details
            <span className="text-gray-300 font-normal">•</span>
            <span className="text-sm font-normal text-gray-400">April 24, 2021</span>
            <span className="text-gray-300 font-normal">•</span>
            <span className="text-sm font-normal text-gray-400">3 Products</span>
          </h1>
          <button className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
            Back to List
          </button>
        </div>

        {/* Address + Order Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 px-6 sm:px-8 pt-6">
          <div className="lg:col-span-2 flex flex-col sm:flex-row border border-gray-100 rounded-xl divide-y sm:divide-y-0 sm:divide-x divide-gray-100 overflow-hidden">
            <InfoBlock
              label="Billing Address"
              name="Dainne Russell"
              address="4140 Parker Rd. Allentown, New Mexico 31134"
              email="dainne.ressell@gmail.com"
              phone="(671) 555-0110"
            />
            <InfoBlock
              label="Shipping Address"
              name="Dainne Russell"
              address="4140 Parker Rd. Allentown, New Mexico 31134"
              email="dainne.ressell@gmail.com"
              phone="(671) 555-0110"
            />
          </div>

          <div className="lg:ml-6 mt-6 lg:mt-0 border border-gray-100 rounded-xl overflow-hidden">
            <div className="flex divide-x divide-gray-100 px-6 py-4">
              <div className="pr-6">
                <p className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                  Order ID:
                </p>
                <p className="text-sm font-semibold text-gray-900 mt-1">#4152</p>
              </div>
              <div className="pl-6">
                <p className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                  Payment Method:
                </p>
                <p className="text-sm font-semibold text-gray-900 mt-1">Paypal</p>
              </div>
            </div>

            <div className="border-t border-gray-100 px-6 py-3 flex items-center justify-between">
              <span className="text-sm text-gray-500">Subtotal:</span>
              <span className="text-sm font-semibold text-gray-900">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <div className="border-t border-gray-100 px-6 py-3 flex items-center justify-between">
              <span className="text-sm text-gray-500">Discount</span>
              <span className="text-sm font-semibold text-gray-900">{discountPct}%</span>
            </div>
            <div className="border-t border-gray-100 px-6 py-3 flex items-center justify-between">
              <span className="text-sm text-gray-500">Shipping</span>
              <span className="text-sm font-semibold text-gray-900">Free</span>
            </div>
            <div className="border-t border-gray-100 px-6 py-4 flex items-center justify-between">
              <span className="text-base font-bold text-gray-900">Total</span>
              <span className="text-lg font-bold text-emerald-600">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Status tracker */}
        <div className="px-6 sm:px-8 py-10">
          <StatusTracker />
        </div>

        {/* Products table */}
        <div className="border-t border-gray-100">
          <div className="grid grid-cols-4 bg-gray-50 px-6 sm:px-8 py-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">
            <span>Product</span>
            <span className="text-center">Price</span>
            <span className="text-center">Quantity</span>
            <span className="text-right">Subtotal</span>
          </div>

          {PRODUCTS.map((p) => (
            <div
              key={p.id}
              className="grid grid-cols-4 items-center px-6 sm:px-8 py-4 border-b border-gray-50 last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-10 h-10 rounded-full object-cover bg-gray-100"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <span className="text-sm font-medium text-gray-800">{p.name}</span>
              </div>
              <span className="text-sm text-gray-500 text-center">
                ${p.price.toFixed(2)}
              </span>
              <span className="text-sm text-gray-500 text-center">x{p.qty}</span>
              <span className="text-sm font-semibold text-gray-900 text-right">
                ${p.subtotal.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
