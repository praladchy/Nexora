import { ArrowRight } from "lucide-react";

const banners = [
  {
    title: "Sale of the Month",
    subtitle: "BEST DEALS",
    bg: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80",
    overlay: "bg-blue-900/45",
    text: "text-white",
    extra: (
      <div className="mt-5 flex justify-center gap-5 text-center">
        {[
          ["00", "DAYS"],
          ["02", "HOURS"],
          ["18", "MINS"],
          ["46", "SECS"],
        ].map(([num, label]) => (
          <div key={label}>
            <p className="text-3xl font-medium">{num}</p>
            <p className="text-xs tracking-wider text-gray-200">{label}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Low-Fat Meat",
    subtitle: "85% FAT FREE",
    bg: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800&q=80",
    overlay: "bg-black/55",
    text: "text-white",
    extra: (
      <p className="mt-4 text-2xl">
        Started at <span className="font-bold text-orange-400">$79.99</span>
      </p>
    ),
  },
  {
    title: "100% Fresh Fruit",
    subtitle: "SUMMER SALE",
    bg: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=800&q=80",
    overlay: "bg-yellow-400/80",
    text: "text-gray-900",
    extra: (
      <div className="mt-4 flex items-center justify-center gap-3 text-2xl">
        <span>Up to</span>
        <span className="rounded bg-gray-900 px-3 py-1 text-xl font-bold text-yellow-400">
          64% OFF
        </span>
      </div>
    ),
  },
];

export default function PromoBanners() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid gap-5 md:grid-cols-3">
        {banners.map((banner, index) => (
          <div
            key={index}
            className="relative h-[520px] overflow-hidden rounded-xl bg-cover bg-center"
            style={{ backgroundImage: `url(${banner.bg})` }}
          >
            <div className={`absolute inset-0 ${banner.overlay}`} />

            <div
              className={`relative z-10 flex h-full flex-col items-center px-8 pt-10 text-center ${banner.text}`}
            >
              <p className="text-sm font-semibold tracking-[0.2em]">
                {banner.subtitle}
              </p>

              <h2 className="mt-4 text-4xl font-bold leading-tight">
                {banner.title}
              </h2>

              {banner.extra}

              <button className="mt-8 flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-[#00B207] transition hover:gap-3">
                Shop Now
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}