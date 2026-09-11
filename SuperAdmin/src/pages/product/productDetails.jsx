import React, { useState } from "react";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Package,
  Store,
  FolderTree,
  DollarSign,
  ShoppingCart,
  Star,
  Calendar,
  User,
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
  ShieldCheck,
  MoreVertical,
  Image as ImageIcon,
  Tag,
  BarChart3,
  Truck,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

// ==================================================
// STATIC PRODUCT
// Replace this with RTK Query later
// ==================================================

const product = {
  id: "PROD-001",

  name: "iPhone 16 Pro Max",

  slug: "iphone-16-pro-max",

  description:
    "The iPhone 16 Pro Max features a powerful processor, advanced camera system, premium titanium design, and a large Super Retina XDR display.",

  images: [
    "https://images.unsplash.com/photo-1592286927505-2fd0c2f4f1b5",
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd",
    "https://images.unsplash.com/photo-1556656793-08538906a9f8",
  ],

  price: 189999,

  discount: 5,

  finalPrice: 180499,

  stock: 42,

  stockLimit: 10,

  sku: "IPH16PM-256-BLK",

  category: "Smartphones",

  parentCategory: "Electronics",

  brand: "Apple",

  shop: "Tech World",

  shopId: "SHOP-001",

  owner: "Aarav Sharma",

  rating: 4.8,

  totalReviews: 128,

  sales: 248,

  status: "Active",

  isApproved: true,

  createdAt: "05 September 2026",

  updatedAt: "05 September 2026",

  variants: [
    {
      color: "Black Titanium",
      storage: "256GB",
      price: 189999,
      stock: 18,
      sku: "IP16PM-BLK-256",
    },
    {
      color: "Natural Titanium",
      storage: "256GB",
      price: 189999,
      stock: 12,
      sku: "IP16PM-NAT-256",
    },
    {
      color: "White Titanium",
      storage: "512GB",
      price: 219999,
      stock: 7,
      sku: "IP16PM-WHT-512",
    },
    {
      color: "Desert Titanium",
      storage: "1TB",
      price: 249999,
      stock: 5,
      sku: "IP16PM-DES-1TB",
    },
  ],
};


// ==================================================
// STATUS BADGE
// ==================================================

function StatusBadge({ status }) {
  const styles = {
    Active: "bg-emerald-50 text-emerald-700",
    Inactive: "bg-slate-100 text-slate-600",
    Approved: "bg-emerald-50 text-emerald-700",
    Pending: "bg-amber-50 text-amber-700",
    Rejected: "bg-red-50 text-red-700",
    "Out of Stock": "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status] ||
        "bg-slate-100 text-slate-600"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />

      {status}
    </span>
  );
}


// ==================================================
// STAT CARD
// ==================================================

function StatCard({
  title,
  value,
  description,
  icon: Icon,
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

          <p className="mt-1 text-xs text-slate-400">
            {description}
          </p>

        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">

          <Icon
            size={21}
            className="text-slate-700"
          />

        </div>

      </div>

    </div>
  );
}


// ==================================================
// INFO ITEM
// ==================================================

function InfoItem({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="flex gap-3">

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100">

        <Icon
          size={17}
          className="text-slate-500"
        />

      </div>

      <div className="min-w-0">

        <p className="text-xs text-slate-400">
          {label}
        </p>

        <p className="mt-1 break-words text-sm font-medium text-slate-700">
          {value}
        </p>

      </div>

    </div>
  );
}


// ==================================================
// MAIN COMPONENT
// ==================================================

export default function ProductDetails() {

  const navigate = useNavigate();

  const { id } = useParams();

  const [selectedImage, setSelectedImage] =
    useState(product.images[0]);

  console.log("Product ID:", id);


  // ==================================================
  // DELETE
  // ==================================================

  const handleDelete = () => {

    const confirmed = window.confirm(
      `Are you sure you want to delete "${product.name}"?`
    );

    if (!confirmed) return;

    console.log("Delete product:", product.id);

    // Later:
    // deleteProduct(product.id)
  };


  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">

      {/* ==================================================
          BACK
      ================================================== */}

      <button
        onClick={() =>
          navigate("/superadmin/products")
        }
        className="mb-5 flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
      >
        <ArrowLeft size={18} />

        Back to Products
      </button>


      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex min-w-0 items-center gap-4">

            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white">

              <Package size={30} />

            </div>


            <div className="min-w-0">

              <div className="flex flex-wrap items-center gap-3">

                <h1 className="text-2xl font-bold text-slate-900">
                  {product.name}
                </h1>

                <StatusBadge
                  status={product.status}
                />

                <StatusBadge
                  status={
                    product.isApproved
                      ? "Approved"
                      : "Pending"
                  }
                />

              </div>

              <p className="mt-1 text-sm text-slate-500">
                {product.id} · {product.sku}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                {product.category} ·{" "}
                {product.brand}
              </p>

            </div>

          </div>


          {/* ACTIONS */}

          <div className="flex flex-wrap gap-2">

            <button
              onClick={() =>
                navigate(
                  `/superadmin/products/${product.id}/edit`
                )
              }
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium transition hover:bg-slate-50"
            >
              <Edit size={17} />

              Edit
            </button>


            <button
              onClick={handleDelete}
              className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              <Trash2 size={17} />

              Delete
            </button>

          </div>

        </div>

      </div>


      {/* ==================================================
          STATS
      ================================================== */}

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Sales"
          value={product.sales}
          description="Units sold"
          icon={ShoppingCart}
        />

        <StatCard
          title="Current Stock"
          value={product.stock}
          description="Available inventory"
          icon={Package}
        />

        <StatCard
          title="Product Rating"
          value={product.rating}
          description={`${product.totalReviews} reviews`}
          icon={Star}
        />

        <StatCard
          title="Product Revenue"
          value={`Rs. ${(
            product.finalPrice *
            product.sales
          ).toLocaleString()}`}
          description="Based on total sales"
          icon={DollarSign}
        />

      </div>


      {/* ==================================================
          PRODUCT OVERVIEW
      ================================================== */}

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-3">


        {/* ==================================================
            IMAGE GALLERY
        ================================================== */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="font-semibold text-slate-900">
                Product Images
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                {product.images.length} product images
              </p>

            </div>

            <ImageIcon
              size={19}
              className="text-slate-400"
            />

          </div>


          {/* MAIN IMAGE */}

          <div className="mt-5 aspect-square overflow-hidden rounded-2xl bg-slate-100">

            <img
              src={selectedImage}
              alt={product.name}
              className="h-full w-full object-cover"
            />

          </div>


          {/* THUMBNAILS */}

          <div className="mt-4 grid grid-cols-4 gap-3">

            {product.images.map(
              (image, index) => (

                <button
                  key={image}
                  onClick={() =>
                    setSelectedImage(image)
                  }
                  className={`aspect-square overflow-hidden rounded-xl border-2 ${
                    selectedImage === image
                      ? "border-slate-900"
                      : "border-transparent"
                  }`}
                >

                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="h-full w-full object-cover"
                  />

                </button>

              )
            )}

          </div>

        </div>


        {/* ==================================================
            PRODUCT INFORMATION
        ================================================== */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="font-semibold text-slate-900">
                Product Information
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Basic product information
              </p>

            </div>

            <button className="rounded-lg p-2 hover:bg-slate-100">

              <MoreVertical size={18} />

            </button>

          </div>


          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">

            <InfoItem
              icon={Package}
              label="Product Name"
              value={product.name}
            />

            <InfoItem
              icon={Tag}
              label="SKU"
              value={product.sku}
            />

            <InfoItem
              icon={Store}
              label="Shop"
              value={product.shop}
            />

            <InfoItem
              icon={FolderTree}
              label="Category"
              value={`${product.parentCategory} / ${product.category}`}
            />

            <InfoItem
              icon={Tag}
              label="Brand"
              value={product.brand}
            />

            <InfoItem
              icon={DollarSign}
              label="Original Price"
              value={`Rs. ${product.price.toLocaleString()}`}
            />

            <InfoItem
              icon={DollarSign}
              label="Discount"
              value={`${product.discount}%`}
            />

            <InfoItem
              icon={DollarSign}
              label="Final Price"
              value={`Rs. ${product.finalPrice.toLocaleString()}`}
            />

            <InfoItem
              icon={Calendar}
              label="Created At"
              value={product.createdAt}
            />

            <InfoItem
              icon={Calendar}
              label="Updated At"
              value={product.updatedAt}
            />

          </div>


          {/* DESCRIPTION */}

          <div className="mt-7">

            <h3 className="text-sm font-semibold text-slate-800">
              Description
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              {product.description}
            </p>

          </div>

        </div>

      </div>


      {/* ==================================================
          SHOP + INVENTORY
      ================================================== */}

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">


        {/* SHOP */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="font-semibold text-slate-900">
                Shop Information
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Shop selling this product
              </p>

            </div>

            <Store
              size={20}
              className="text-slate-400"
            />

          </div>


          <div className="mt-6 flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-900 text-white">

              <Store size={25} />

            </div>

            <div className="flex-1">

              <p className="font-semibold text-slate-900">
                {product.shop}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                {product.shopId}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Owner: {product.owner}
              </p>

            </div>

            <button
              onClick={() =>
                navigate(
                  `/superadmin/shops/${product.shopId}`
                )
              }
              className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium hover:bg-slate-50"
            >
              View Shop
            </button>

          </div>

        </div>


        {/* INVENTORY */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="font-semibold text-slate-900">
                Inventory
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Current product stock
              </p>

            </div>

            <Package
              size={20}
              className="text-slate-400"
            />

          </div>


          <div className="mt-6">

            <div className="flex items-end justify-between">

              <div>

                <p className="text-xs text-slate-400">
                  Available Stock
                </p>

                <p className="mt-1 text-3xl font-bold text-slate-900">
                  {product.stock}
                </p>

              </div>

              <div className="text-right">

                <p className="text-xs text-slate-400">
                  Low Stock Limit
                </p>

                <p className="mt-1 font-semibold text-amber-600">
                  {product.stockLimit}
                </p>

              </div>

            </div>


            <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">

              <div
                className={`h-full rounded-full ${
                  product.stock <=
                  product.stockLimit
                    ? "bg-red-500"
                    : "bg-emerald-500"
                }`}
                style={{
                  width: `${Math.min(
                    (product.stock / 60) * 100,
                    100
                  )}%`,
                }}
              />

            </div>


            <div className="mt-3 flex items-center gap-2 text-xs">

              {product.stock <=
              product.stockLimit ? (
                <>
                  <AlertTriangle
                    size={15}
                    className="text-red-500"
                  />

                  <span className="text-red-600">
                    Low stock
                  </span>
                </>
              ) : (
                <>
                  <CheckCircle
                    size={15}
                    className="text-emerald-500"
                  />

                  <span className="text-emerald-600">
                    Stock level is healthy
                  </span>
                </>
              )}

            </div>

          </div>

        </div>

      </div>


      {/* ==================================================
          VARIANTS
      ================================================== */}

      <div className="mt-5 rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="flex items-center justify-between p-5">

          <div>

            <h2 className="font-semibold text-slate-900">
              Product Variants
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Available product variants
            </p>

          </div>

          <button className="text-sm font-medium text-slate-700 hover:underline">
            Manage Variants
          </button>

        </div>


        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-y border-slate-100 bg-slate-50">

                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500">
                  Color
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500">
                  Storage
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500">
                  SKU
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500">
                  Price
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500">
                  Stock
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500">
                  Status
                </th>

              </tr>

            </thead>


            <tbody>

              {product.variants.map(
                (variant) => (

                  <tr
                    key={variant.sku}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                  >

                    <td className="px-5 py-4 text-sm font-medium text-slate-700">
                      {variant.color}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {variant.storage}
                    </td>

                    <td className="px-5 py-4 text-xs text-slate-500">
                      {variant.sku}
                    </td>

                    <td className="px-5 py-4 text-sm font-semibold text-slate-700">
                      Rs. {variant.price.toLocaleString()}
                    </td>

                    <td className="px-5 py-4">

                      <span
                        className={`text-sm font-semibold ${
                          variant.stock < 10
                            ? "text-red-600"
                            : "text-emerald-600"
                        }`}
                      >
                        {variant.stock}
                      </span>

                    </td>

                    <td className="px-5 py-4">

                      <StatusBadge
                        status={
                          variant.stock === 0
                            ? "Out of Stock"
                            : variant.stock < 10
                            ? "Pending"
                            : "Active"
                        }
                      />

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </div>


      {/* ==================================================
          SALES + APPROVAL
      ================================================== */}

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">


        {/* SALES */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="font-semibold text-slate-900">
                Sales Overview
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Product sales performance
              </p>

            </div>

            <BarChart3
              size={20}
              className="text-slate-400"
            />

          </div>


          <div className="mt-6 grid grid-cols-2 gap-4">

            <div className="rounded-xl bg-slate-50 p-4">

              <p className="text-xs text-slate-400">
                Units Sold
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {product.sales}
              </p>

            </div>


            <div className="rounded-xl bg-slate-50 p-4">

              <p className="text-xs text-slate-400">
                Revenue
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">

                Rs.{" "}
                {(
                  product.finalPrice *
                  product.sales
                ).toLocaleString()}

              </p>

            </div>

          </div>


          {/* SIMPLE BAR */}

          <div className="mt-6 flex h-32 items-end gap-3">

            {[45, 65, 52, 80, 62, 88, 72].map(
              (height, index) => (

                <div
                  key={index}
                  className="flex flex-1 items-end"
                >

                  <div
                    className="w-full rounded-t-lg bg-slate-800"
                    style={{
                      height: `${height}%`,
                    }}
                  />

                </div>

              )
            )}

          </div>

          <div className="mt-2 flex justify-between text-xs text-slate-400">

            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>

          </div>

        </div>


        {/* APPROVAL */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="font-semibold text-slate-900">
                Product Approval
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Super Admin approval status
              </p>

            </div>

            <ShieldCheck
              size={21}
              className="text-slate-400"
            />

          </div>


          <div className="mt-6 rounded-2xl bg-emerald-50 p-5">

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">

                <CheckCircle
                  size={24}
                  className="text-emerald-600"
                />

              </div>

              <div>

                <p className="font-semibold text-emerald-800">
                  Product Approved
                </p>

                <p className="mt-1 text-xs text-emerald-600">
                  This product is approved for sale.
                </p>

              </div>

            </div>

          </div>


          <div className="mt-5 space-y-4">

            <InfoItem
              icon={ShieldCheck}
              label="Approval Status"
              value={
                product.isApproved
                  ? "Approved"
                  : "Pending"
              }
            />

            <InfoItem
              icon={Calendar}
              label="Last Updated"
              value={product.updatedAt}
            />

            <InfoItem
              icon={User}
              label="Product Owner"
              value={product.owner}
            />

          </div>


          <div className="mt-6 flex gap-2">

            <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50">

              <XCircle size={17} />

              Reject

            </button>

            <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700">

              <CheckCircle size={17} />

              Approve

            </button>

          </div>

        </div>

      </div>


      {/* ==================================================
          DESCRIPTION / META
      ================================================== */}

      <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

        <div className="flex items-center gap-2">

          <Truck
            size={19}
            className="text-slate-500"
          />

          <h2 className="font-semibold text-slate-900">
            Product Metadata
          </h2>

        </div>


        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <InfoItem
            icon={Package}
            label="Product ID"
            value={product.id}
          />

          <InfoItem
            icon={Tag}
            label="Slug"
            value={product.slug}
          />

          <InfoItem
            icon={Calendar}
            label="Created"
            value={product.createdAt}
          />

          <InfoItem
            icon={Calendar}
            label="Updated"
            value={product.updatedAt}
          />

        </div>

      </div>

    </div>
  );
}