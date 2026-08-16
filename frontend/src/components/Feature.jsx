import {
  Truck,
  Headset,
  ShieldCheck,
  Package,
} from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free shipping on all your order",
  },
  {
    icon: Headset,
    title: "Customer Support 24/7",
    description: "Instant access to Support",
  },
  {
    icon: ShieldCheck,
    title: "100% Secure Payment",
    description: "We ensure your money is save",
  },
  {
    icon: Package,
    title: "Money-Back Guarantee",
    description: "30 Days Money-Back Guarantee",
  },
];

export default function FeaturedServices() {
  return (
    <section className="w-full px-4 py-8">
      <div className="mx-auto max-w-7xl rounded-2xl bg-[#F5F5F5] px-6 py-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <div key={index} className="flex items-start gap-4">
                <Icon className="mt-1 h-8 w-8 text-[#00B207] stroke-[1.8]" />

                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}