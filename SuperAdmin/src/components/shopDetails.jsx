import React from "react";
import {
  ArrowLeft,
  Store,
  MapPin,
  Mail,
  Phone,
  Calendar,
  User,
  Package,
  ShoppingCart,
  DollarSign,
  Users,
  MoreVertical,
  CheckCircle,
  XCircle,
  Edit,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const shop = {
  id: "SHOP-001",
  name: "Tech World",
  owner: "Aarav Sharma",
  email: "aarav@example.com",
  phone: "+977 9812345678",
  category: "Electronics",
  address: "New Road, Kathmandu, Nepal",
  createdAt: "12 January 2026",
  status: "Active",
  products: 248,
  orders: 1248,
  customers: 984,
  revenue: "Rs. 18.4M",
};

const admins = [
  {
    name: "Aarav Sharma",
    email: "aarav@example.com",
    role: "Shop Owner",
  },
  {
    name: "Nabin Shrestha",
    email: "nabin@example.com",
    role: "Shop Admin",
  },
];

const products = [
  {
    name: "iPhone 16 Pro Max",
    category: "Smartphones",
    sales: 248,
    revenue: "Rs. 7.4M",
    stock: 42,
  },
  {
    name: "MacBook Air M4",
    category: "Laptops",
    sales: 124,
    revenue: "Rs. 5.2M",
    stock: 18,
  },
  {
    name: "Samsung Galaxy S25",
    category: "Smartphones",
    sales: 184,
    revenue: "Rs. 3.8M",
    stock: 35,
  },
  {
    name: "Sony WH-1000XM6",
    category: "Accessories",
    sales: 96,
    revenue: "Rs. 1.2M",
    stock: 64,
  },
];

const orders = [
  {
    id: "#NX-10025",
    customer: "Ramesh Thapa",
    amount: "Rs. 24,500",
    status: "Delivered",
    date: "05 Sep 2026",
  },
  {
    id: "#NX-10024",
    customer: "Sita Rai",
    amount: "Rs. 84,000",
    status: "Processing",
    date: "05 Sep 2026",
  },
  {
    id: "#NX-10023",
    customer: "Bibek Lama",
    amount: "Rs. 15,800",
    status: "Shipped",
    date: "04 Sep 2026",
  },
  {
    id: "#NX-10022",
    customer: "Anisha KC",
    amount: "Rs. 5,600",
    status: "Pending",
    date: "04 Sep 2026",
  },
];

function StatusBadge({ status }) {
  const styles = {
    Active: "bg-emerald-50 text-emerald-700",
    Pending: "bg-amber-50 text-amber-700",
    Suspended: "bg-red-50 text-red-700",
    Delivered: "bg-emerald-50 text-emerald-700",
    Processing: "bg-blue-50 text-blue-700",
    Shipped: "bg-violet-50 text-violet-700",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status] || "bg-slate-100 text-slate-600"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

function StatCard({
  title,
  value,
  icon: Icon,
  description,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            {value}
          </h2>

          {description && (
            <p className="mt-1 text-xs text-slate-400">
              {description}
            </p>
          )}
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
          <Icon size={21} />
        </div>
      </div>
    </div>
  );
}

function InfoItem({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="flex gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100">
        <Icon size={17} className="text-slate-500" />
      </div>

      <div>
        <p className="text-xs text-slate-400">
          {label}
        </p>

        <p className="mt-1 text-sm font-medium text-slate-700">
          {value}
        </p>
      </div>
    </div>
  );
}

export default function ShopDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  console.log("Shop ID:", id);

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">

      {/* Back */}
      <button
        onClick={() => navigate("/superadmin/shops")}
        className="mb-5 flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft size={18} />
        Back to Shops
      </button>

      {/* Shop Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex items-center gap-4">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-white sm:h-20 sm:w-20">
              <Store size={32} />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold text-slate-900">
                  {shop.name}
                </h1>

                <StatusBadge status={shop.status} />
              </div>

              <p className="mt-1 text-sm text-slate-500">
                {shop.id} · {shop.category}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Created on {shop.createdAt}
              </p>
            </div>

          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2">

            <button
              className="
                flex
                items-center
                gap-2
                rounded-xl
                border
                border-slate-200
                bg-white
                px-4
                py-2.5
                text-sm
                font-medium
                hover:bg-slate-50
              "
            >
              <Edit size={17} />
              Edit
            </button>

            <button
              className="
                flex
                items-center
                gap-2
                rounded-xl
                bg-red-600
                px-4
                py-2.5
                text-sm
                font-semibold
                text-white
                hover:bg-red-700
              "
            >
              <XCircle size={17} />
              Suspend Shop
            </button>

          </div>

        </div>

      </div>

      {/* Stats */}
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Revenue"
          value={shop.revenue}
          icon={DollarSign}
          description="+18.4% from last month"
        />

        <StatCard
          title="Total Orders"
          value={shop.orders}
          icon={ShoppingCart}
          description="+12.8% from last month"
        />

        <StatCard
          title="Total Products"
          value={shop.products}
          icon={Package}
          description="12 products low in stock"
        />

        <StatCard
          title="Customers"
          value={shop.customers}
          icon={Users}
          description="+8.2% from last month"
        />

      </div>

      {/* Main Content */}
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-3">

        {/* Shop Information */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-1">

          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold">
                Shop Information
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Basic shop information
              </p>
            </div>

            <button className="rounded-lg p-2 hover:bg-slate-100">
              <MoreVertical size={18} />
            </button>
          </div>

          <div className="mt-6 space-y-5">

            <InfoItem
              icon={Store}
              label="Shop Name"
              value={shop.name}
            />

            <InfoItem
              icon={User}
              label="Shop Owner"
              value={shop.owner}
            />

            <InfoItem
              icon={Mail}
              label="Email"
              value={shop.email}
            />

            <InfoItem
              icon={Phone}
              label="Phone"
              value={shop.phone}
            />

            <InfoItem
              icon={MapPin}
              label="Address"
              value={shop.address}
            />

            <InfoItem
              icon={Calendar}
              label="Created At"
              value={shop.createdAt}
            />

          </div>

        </div>

        {/* Performance */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="font-semibold">
                Shop Performance
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Revenue performance over the last 7 months
              </p>
            </div>

            <select
              className="
                rounded-lg
                border
                border-slate-200
                bg-white
                px-3
                py-2
                text-xs
                outline-none
              "
            >
              <option>Last 7 Months</option>
              <option>Last 30 Days</option>
              <option>Last 12 Months</option>
            </select>

          </div>

          {/* Fake Chart */}
          <div className="mt-8">

            <div className="relative h-64">

              {/* Grid */}
              <div className="absolute inset-0 flex flex-col justify-between">

                <div className="border-t border-dashed border-slate-200" />
                <div className="border-t border-dashed border-slate-200" />
                <div className="border-t border-dashed border-slate-200" />
                <div className="border-t border-dashed border-slate-200" />
                <div className="border-t border-dashed border-slate-200" />

              </div>

              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full"
              >
                <polyline
                  points="0,72 15,62 30,68 45,44 60,52 75,30 100,18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  vectorEffect="non-scaling-stroke"
                  className="text-slate-900"
                />
              </svg>

            </div>

            <div className="flex justify-between text-xs text-slate-400">
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
              <span>Sep</span>
            </div>

          </div>

        </div>

      </div>

      {/* Order Summary */}
      <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

        <div>
          <h2 className="font-semibold">
            Order Summary
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            Current order status
          </p>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">

          <OrderSummary
            label="Pending"
            value="48"
            icon={ShoppingCart}
            className="text-amber-600 bg-amber-50"
          />

          <OrderSummary
            label="Processing"
            value="84"
            icon={Package}
            className="text-blue-600 bg-blue-50"
          />

          <OrderSummary
            label="Shipped"
            value="72"
            icon={Truck}
            className="text-violet-600 bg-violet-50"
          />

          <OrderSummary
            label="Delivered"
            value="986"
            icon={CheckCircle}
            className="text-emerald-600 bg-emerald-50"
          />

          <OrderSummary
            label="Cancelled"
            value="58"
            icon={XCircle}
            className="text-red-600 bg-red-50"
          />

        </div>

      </div>

      {/* Products + Admins */}
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-3">

        {/* Products */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm xl:col-span-2">

          <div className="flex items-center justify-between p-5">

            <div>
              <h2 className="font-semibold">
                Top Products
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Best selling products from this shop
              </p>
            </div>

            <button className="text-sm font-medium hover:underline">
              View All
            </button>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>
                <tr className="border-y border-slate-100 bg-slate-50">

                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500">
                    Product
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500">
                    Sales
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500">
                    Revenue
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500">
                    Stock
                  </th>

                </tr>
              </thead>

              <tbody>

                {products.map((product) => (
                  <tr
                    key={product.name}
                    className="border-b border-slate-100 last:border-0"
                  >

                    <td className="px-5 py-4">

                      <p className="text-sm font-semibold">
                        {product.name}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {product.category}
                      </p>

                    </td>

                    <td className="px-5 py-4 text-sm">
                      {product.sales}
                    </td>

                    <td className="px-5 py-4 text-sm font-semibold">
                      {product.revenue}
                    </td>

                    <td className="px-5 py-4">

                      <span
                        className={`text-sm font-medium ${
                          product.stock < 20
                            ? "text-red-600"
                            : "text-emerald-600"
                        }`}
                      >
                        {product.stock}
                      </span>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </div>

        {/* Admins */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="font-semibold">
                Shop Admins
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Users managing this shop
              </p>
            </div>

            <ShieldCheck
              size={20}
              className="text-slate-500"
            />

          </div>

          <div className="mt-6 space-y-5">

            {admins.map((admin) => (
              <div
                key={admin.email}
                className="flex items-center gap-3"
              >

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                  {admin.name
                    .split(" ")
                    .map((word) => word[0])
                    .join("")}
                </div>

                <div className="min-w-0 flex-1">

                  <p className="truncate text-sm font-semibold">
                    {admin.name}
                  </p>

                  <p className="truncate text-xs text-slate-400">
                    {admin.email}
                  </p>

                  <p className="mt-1 text-xs font-medium text-slate-600">
                    {admin.role}
                  </p>

                </div>

              </div>
            ))}

          </div>

        </div>

      </div>

      {/* Recent Orders */}
      <div className="mt-5 rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="flex items-center justify-between p-5">

          <div>
            <h2 className="font-semibold">
              Recent Orders
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Latest orders from this shop
            </p>
          </div>

          <button className="text-sm font-medium hover:underline">
            View All
          </button>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>
              <tr className="border-y border-slate-100 bg-slate-50">

                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500">
                  Order ID
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500">
                  Customer
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500">
                  Amount
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500">
                  Date
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500">
                  Status
                </th>

              </tr>
            </thead>

            <tbody>

              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                >

                  <td className="px-5 py-4 text-sm font-semibold">
                    {order.id}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {order.customer}
                  </td>

                  <td className="px-5 py-4 text-sm font-semibold">
                    {order.amount}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {order.date}
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge status={order.status} />
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

function OrderSummary({
  label,
  value,
  icon: Icon,
  className,
}) {
  return (
    <div className="rounded-xl border border-slate-100 p-4">

      <div className="flex items-center gap-3">

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${className}`}
        >
          <Icon size={18} />
        </div>

        <div>
          <p className="text-xs text-slate-400">
            {label}
          </p>

          <p className="mt-1 text-lg font-bold">
            {value}
          </p>
        </div>

      </div>

    </div>
  );
}