import { Leaf, Apple, Wheat, BookOpen, Gem } from "lucide-react";

export default function CompanyLogoStrip() {
  return (
    <section className="py-8">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-2 items-center gap-6 rounded-lg border border-gray-200 bg-white p-6 md:grid-cols-3 lg:grid-cols-6">
          <LogoItem green>
            <Leaf className="h-9 w-9" />
            <span className="text-3xl italic font-bold">steps</span>
          </LogoItem>

          <LogoItem>
            <Apple className="h-10 w-10" />
            <span>Mango</span>
          </LogoItem>

          <LogoItem>
            <Wheat className="h-10 w-10" />
            <span>Food</span>
          </LogoItem>

          <LogoItem>
            <BookOpen className="h-10 w-10" />
            <span>BookOff</span>
          </LogoItem>

          <LogoItem>
            <Gem className="h-10 w-10" />
            <span>G Series</span>
          </LogoItem>

          <LogoItem>
            <Leaf className="h-10 w-10" />
            <span>Organic</span>
          </LogoItem>
        </div>
      </div>
    </section>
  );
}

function LogoItem({ children, green = false }) {
  return (
    <div className="flex items-center justify-center gap-2 text-center lg:border-l lg:border-gray-200 first:lg:border-l-0">
      <div
        className={`flex items-center gap-2 ${
          green ? "text-[#00B207]" : "text-gray-500"
        }`}
      >
        {children}
      </div>
    </div>
  );
}