import { useState, useRef } from "react";

const images = [
  "https://images.unsplash.com/photo-1594938298603-c8148f4851f9?w=600&q=80",
  "https://images.unsplash.com/photo-1547945090-7e8e4eb24d1a?w=600&q=80",
  "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&q=80",
];

const sizes = [6, 8, 10, 9, 10, 12, 14, 16, 18, 20, 22];
const uniqueSizes = [6, 8, 9, 10, 12, 14, 16, 18, 20, 22];

const tabs = ["Product Details", "Care Guide", "Reviews"];

const reviews = [
  { name: "Sarah M.", rating: 5, comment: "Absolutely love these joggers! The acid wash is so unique and the fit is perfect." },
  { name: "Jamie L.", rating: 4, comment: "Great quality fabric, very comfortable for all-day wear." },
  { name: "Alex T.", rating: 4, comment: "Stylish and comfortable. Runs a little big so size down." },
];

function StarRating({ rating, size = "sm" }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          className={size === "sm" ? "w-4 h-4" : "w-5 h-5"}
          fill={s <= Math.floor(rating) ? "#F59E0B" : s - 0.5 <= rating ? "url(#half)" : "#D1D5DB"}
          viewBox="0 0 20 20"
        >
          <defs>
            <linearGradient id="half">
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="50%" stopColor="#D1D5DB" />
            </linearGradient>
          </defs>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ProductPage() {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(6);
  const [activeTab, setActiveTab] = useState("Product Details");
  const [added, setAdded] = useState(false);
  const [wished, setWished] = useState(false);
  const [dragging, setDragging] = useState(false);
  const dragStartX = useRef(null);
  const dragDelta = useRef(0);

  const goTo = (index) => {
    setActiveImage(Math.max(0, Math.min(images.length - 1, index)));
  };

  const handleDragStart = (clientX) => {
    dragStartX.current = clientX;
    dragDelta.current = 0;
    setDragging(false);
  };

  const handleDragMove = (clientX) => {
    if (dragStartX.current === null) return;
    dragDelta.current = clientX - dragStartX.current;
    if (Math.abs(dragDelta.current) > 5) setDragging(true);
  };

  const handleDragEnd = () => {
    if (Math.abs(dragDelta.current) > 50) {
      if (dragDelta.current < 0) goTo(activeImage + 1);
      else goTo(activeImage - 1);
    }
    dragStartX.current = null;
    dragDelta.current = 0;
    setTimeout(() => setDragging(false), 0);
  };

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4] font-sans">
      {/* Navbar */}
     
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Images */}
          <div className="flex gap-4">
            {/* Thumbnails */}
            <div className="flex flex-col gap-3">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`w-[72px] h-[88px] rounded-lg overflow-hidden border-2 transition-all duration-200 flex-shrink-0 ${
                    activeImage === i
                      ? "border-black shadow-md scale-105"
                      : "border-transparent opacity-50 hover:opacity-80 hover:border-gray-300"
                  }`}
                >
                  <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main Image Slider */}
            <div className="flex-1 flex flex-col gap-3">
              {/* Slider viewport */}
              <div
                className="rounded-2xl overflow-hidden bg-gray-100 aspect-[3/4] relative select-none cursor-grab active:cursor-grabbing"
                style={{ isolation: "isolate" }}
                onMouseDown={(e) => handleDragStart(e.clientX)}
                onMouseMove={(e) => handleDragMove(e.clientX)}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
                onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
                onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
                onTouchEnd={handleDragEnd}
              >
                {/* Sliding strip */}
                <div
                  className="flex h-full transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(calc(-${activeImage} * (100% / ${images.length})))`,
                    width: `${images.length * 100}%`,
                  }}
                >
                  {images.map((img, i) => (
                    <div
                      key={i}
                      className="h-full flex-shrink-0"
                      style={{ width: `calc(100% / ${images.length})` }}
                    >
                      <img
                        src={img}
                        alt={`Product view ${i + 1}`}
                        className="w-full h-full object-cover object-center pointer-events-none"
                        draggable={false}
                      />
                    </div>
                  ))}
                </div>

                {/* SALE badge */}
                <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                  SALE
                </div>

                {/* Prev / Next arrows */}
                {activeImage > 0 && (
                  <button
                    onClick={() => goTo(activeImage - 1)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm shadow flex items-center justify-center hover:bg-white transition z-10"
                  >
                    <svg className="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                )}
                {activeImage < images.length - 1 && (
                  <button
                    onClick={() => goTo(activeImage + 1)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm shadow flex items-center justify-center hover:bg-white transition z-10"
                  >
                    <svg className="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                )}

                {/* Dot indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      className={`rounded-full transition-all duration-300 ${
                        activeImage === i ? "w-5 h-2 bg-white" : "w-2 h-2 bg-white/50 hover:bg-white/80"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Image counter */}
              <p className="text-center text-xs text-gray-400 tracking-wider">
                {activeImage + 1} / {images.length}
              </p>
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="pt-2 flex flex-col gap-5">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 leading-tight tracking-tight">
                Grey Acid Wash<br />Wide Leg Jogger
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <StarRating rating={4.5} />
              <span className="text-sm font-semibold text-gray-800">4.5</span>
              <span className="text-sm text-gray-400">(212 reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-gray-900">$215.00</span>
              <span className="text-xl text-gray-400 line-through">$290.00</span>
              <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-full">
                26% OFF
              </span>
            </div>

            {/* Color */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">
                  Color: <span className="font-normal text-gray-500">Black</span>
                </span>
              </div>
              <div className="flex gap-2">
                {["#2D2D2D", "#6B7280", "#D1C4A8", "#9CA3AF"].map((color, i) => (
                  <button
                    key={i}
                    className={`w-8 h-8 rounded-full border-2 transition ${
                      i === 0 ? "border-black ring-2 ring-offset-1 ring-black" : "border-gray-200 hover:border-gray-400"
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-gray-700">
                  Size: <span className="font-normal text-gray-500">{selectedSize}</span>
                </span>
                <button className="text-sm text-gray-500 underline hover:text-black transition">
                  View size guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {uniqueSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-11 h-11 rounded-lg text-sm font-medium border transition-all duration-150 ${
                      selectedSize === size
                        ? "bg-gray-900 text-white border-gray-900"
                        : "bg-white text-gray-700 border-gray-200 hover:border-gray-800"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex gap-3 pt-1">
              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  added
                    ? "bg-green-600 text-white"
                    : "bg-gray-900 text-white hover:bg-gray-700 active:scale-95"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {added ? "Added to Cart ✓" : "Add to Cart"}
              </button>
              <button
                onClick={() => setWished(!wished)}
                className={`w-14 h-14 rounded-xl border flex items-center justify-center transition-all duration-200 ${
                  wished
                    ? "bg-red-50 border-red-300 text-red-500"
                    : "bg-white border-gray-200 text-gray-400 hover:border-gray-400"
                }`}
              >
                <svg className="w-5 h-5" fill={wished ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              <button className="flex items-center gap-1.5 px-4 h-14 rounded-xl border border-gray-200 text-sm text-gray-600 hover:border-gray-400 transition bg-white">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                Find in store
              </button>
            </div>

            {/* Shipping Banner */}
            <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 text-sm">
              <p className="text-gray-800">
                Enjoy <span className="font-bold text-amber-700">FREE express</span> &amp;{" "}
                <span className="font-bold text-amber-700">Free Returns</span> on orders over £35!
              </p>
              <p className="text-gray-500 mt-0.5 text-xs">
                Place your order by 6pm on December 22nd for expedited processing.
              </p>
            </div>

            {/* Payment */}
            <div>
              <p className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wider">Payment methods</p>
              <div className="flex items-center gap-3">
                {/* Visa */}
                <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 flex items-center">
                  <svg width="38" height="12" viewBox="0 0 38 12" fill="none">
                    <text x="0" y="10" fontSize="12" fontWeight="bold" fill="#1A1F71">VISA</text>
                  </svg>
                </div>
                {/* Mastercard */}
                <div className="bg-white border border-gray-200 rounded-lg px-2 py-2 flex items-center gap-1">
                  <div className="w-5 h-5 rounded-full bg-red-500 opacity-90" />
                  <div className="w-5 h-5 rounded-full bg-amber-400 opacity-90 -ml-2" />
                </div>
                {/* Amex */}
                <div className="bg-blue-600 border border-blue-600 rounded-lg px-3 py-2">
                  <span className="text-white text-xs font-bold tracking-tight">AMEX</span>
                </div>
                <button className="text-xs text-gray-500 underline hover:text-black transition ml-1">
                  Learn more
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-16 border-b border-gray-200">
          <div className="flex gap-0">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-semibold transition-all border-b-2 -mb-px ${
                  activeTab === tab
                    ? "border-gray-900 text-gray-900"
                    : "border-transparent text-gray-400 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8">
          {activeTab === "Product Details" && (
            <div className="max-w-2xl text-gray-600 leading-relaxed text-sm space-y-4">
              <p>
                Step into a realm of unparalleled off-duty style with these grey acid wash joggers that effortlessly marry fashion with comfort. Crafted for those committed to style even on their days off, these joggers feature a chic drawstring waist and a wide leg cut.
              </p>
              <p>
                The distinctive acid wash adds a touch of urban edge, making these joggers a versatile choice for leisurely pursuits and relaxed outings. Elevate your casual wardrobe with the perfect blend of fashion-forward design and comfort-driven details.
              </p>
              <ul className="space-y-1 list-none">
                {["Wide leg silhouette", "Chic drawstring waist", "Acid wash finish", "Relaxed fit", "95% Cotton, 5% Elastane"].map((d) => (
                  <li key={d} className="flex items-center gap-2 text-gray-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 inline-block" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "Care Guide" && (
            <div className="max-w-2xl text-sm text-gray-600 space-y-3">
              {[
                ["Machine wash", "Cold, delicate cycle (30°C)"],
                ["Do not tumble dry", "Air dry flat"],
                ["Iron low heat", "Avoid direct contact with print"],
                ["Do not bleach", "Preserve the acid wash finish"],
              ].map(([title, desc]) => (
                <div key={title} className="flex items-start gap-4 py-3 border-b border-gray-100">
                  <span className="font-semibold text-gray-800 w-40 shrink-0">{title}</span>
                  <span>{desc}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "Reviews" && (
            <div className="max-w-2xl space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-5xl font-bold text-gray-900">4.5</span>
                <div>
                  <StarRating rating={4.5} size="lg" />
                  <p className="text-sm text-gray-400 mt-1">Based on 212 reviews</p>
                </div>
              </div>
              {reviews.map((r) => (
                <div key={r.name} className="border-b border-gray-100 pb-5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-gray-800 text-sm">{r.name}</span>
                    <StarRating rating={r.rating} />
                  </div>
                  <p className="text-sm text-gray-500">{r.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 