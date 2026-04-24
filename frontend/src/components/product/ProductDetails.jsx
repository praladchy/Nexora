import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {useNavigate} from "react-router-dom"

export const ProductGallery = ({ images }) => {
  const [active, setActive] = useState(images[0]);

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-2">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            onClick={() => setActive(img)}
            className={`w-16 h-16 object-cover rounded cursor-pointer border ${
              active === img ? "border-blue-500" : "border-gray-200"
            }`}
          />
        ))}
      </div>
      <img
        src={active}
        className="w-96 h-96 object-contain rounded-lg border"
      />
    </div>
  );
};

export const Rating = ({ value }) => (
  <div className="flex items-center gap-1 text-yellow-500">
    {Array.from({ length: 5 }).map((_, i) => (
      <span key={i}>{i < value ? "★" : "☆"}</span>
    ))}
  </div>
);

export const QuantitySelector = ({ qty, setQty }) => (
  <div className="flex items-center border rounded">
    <button
      className="px-3 py-1"
      onClick={() => setQty((p) => Math.max(1, p - 1))}
    >
      -
    </button>
    <span className="px-4">{qty}</span>
    <button className="px-3 py-1" onClick={() => setQty(qty + 1)}>
      +
    </button>
  </div>
);

export const ProductTabs = () => {
  const [tab, setTab] = useState("description");

  return (
    <div className="mt-10">
      <div className="flex gap-6 border-b">
        {["description", "specification", "reviews"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`pb-2 capitalize ${
              tab === t ? "border-b-2 border-blue-500" : "text-gray-500"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-4 text-gray-600">
        {tab === "description" && (
          <p>
            Experience high-quality sound with Apple AirPods featuring a wired
            charging case. Designed for comfort and seamless connectivity.
          </p>
        )}
        {tab === "specification" && (
          <ul className="list-disc ml-6">
            <li>Bluetooth Connectivity</li>
            <li>Wired Charging Case</li>
            <li>High-quality Audio</li>
          </ul>
        )}
        {tab === "reviews" && <p>No reviews yet.</p>}
      </div>
    </div>
  );
};

export const RelatedProducts = ({ products }) => (
  <div className="mt-16">
    <h2 className="text-2xl font-semibold mb-6 text-center">
      Related Products
    </h2>
    <div className="grid grid-cols-4 gap-6">
      {products.map((p) => (
        <div key={p.id} className="border rounded-lg p-4 text-center">
          <img
            src={p.image}
            className="w-full h-40 object-contain"
          />
          <h3 className="mt-2 font-medium">{p.name}</h3>
          <Rating value={4} />
          <p className="font-semibold mt-1">${p.price}</p>
        </div>
      ))}
    </div>
  </div>
);


const ProductDetailPage = () => {
  const [qty, setQty] = useState(1);
  const {id}=useParams()
  const navigate=useNavigate()
console.log("Product ID:", id);
  const product = {
    name: "Apple AirPods with Wired Charging Case",
    price: 70,
    rating: 4,
    images: [
      "/airpod1.png",
      "/airpod2.png",
      "/airpod3.png",
    ],
  };

  const related = [
    { id: 1, name: "Apple AirPods 2", price: 80, image: "/airpod1.png" },
    { id: 2, name: "Wooden Speaker", price: 40, image: "/speaker.png" },
    { id: 3, name: "Men Shoe", price: 60, image: "/shoe.png" },
    { id: 4, name: "Apple AirPod Pro", price: 120, image: "/airpod2.png" },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-2 gap-10">
        <ProductGallery images={product.images} />

        <div>
          <h1 className="text-3xl font-semibold">{product.name}</h1>
          <Rating value={product.rating} />
          <p className="text-2xl font-bold mt-4">${product.price}</p>

          <ul className="mt-4 text-gray-600 list-disc ml-5">
            <li>Active noise cancellation</li>
            <li>Transparency mode</li>
            <li>Wired charging case</li>
          </ul>

          <div className="mt-6 flex items-center gap-4">
            <QuantitySelector qty={qty} setQty={setQty} />
            <button className="bg-blue-600 text-white px-6 py-2 rounded">
              Buy Now
            </button>
            <button className="border px-6 py-2 rounded" onClick={() => navigate("/addtocart")}>Add to cart</button>
          </div>
        </div>
      </div>

      <ProductTabs />
      <RelatedProducts products={related} />
    </div>
  );
};

export default ProductDetailPage;
