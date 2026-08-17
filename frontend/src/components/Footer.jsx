import { FaFacebookF, FaPinterestP, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer>
      {/* Newsletter */}
      <div className="bg-[#F7F7F7]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-4 py-10 lg:flex-row">
          <div className="max-w-md">
            <h2 className="text-3xl font-semibold text-gray-900">
              Subscribe our Newsletter
            </h2>

            <p className="mt-3 text-gray-500">
              Pellentesque eu nibh eget mauris congue mattis mattis nec tellus.
              Phasellus imperdiet elit eu magna.
            </p>
          </div>

          <div className="flex w-full max-w-3xl flex-col items-center gap-4 lg:flex-row">
            <div className="flex w-full overflow-hidden rounded-full border bg-white">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-6 py-4 outline-none"
              />

              <button className="bg-[#00B207] px-8 font-semibold text-white transition hover:bg-[#009a06]">
                Subscribe
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00B207] text-white">
                <FaFacebookF size={16} />
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition hover:bg-[#00B207] hover:text-white">
                <FaXTwitter size={16} />
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition hover:bg-[#00B207] hover:text-white">
                <FaPinterestP size={16} />
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition hover:bg-[#00B207] hover:text-white">
                <FaInstagram size={16} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-[#111111] text-white">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2">
                 <img src="/logo.png" alt="logo" className="w-[224px]" />
              </div>

              <p className="mt-6 max-w-md text-gray-400">
                Morbi cursus porttitor enim lobortis molestie. Duis gravida
                turpis dui, eget bibendum magna congue nec.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4 text-sm">
                <span className="border-b border-[#00B207] pb-1 font-semibold">
                  +9779804719547
               </span>

                <span className="text-gray-500">or</span>

                <span className="border-b border-[#00B207] pb-1 font-semibold">
                  Praladchy028@gmail.com
                </span>
              </div>
            </div>

            {/* Links */}
            <FooterColumn
              title="My Account"
              links={[
                "My Account",
                "Order History",
                "Shopping Cart",
                "Wishlist",
              ]}
            />

            <FooterColumn
              title="Helps"
              links={["Contact", "FAQs", "Terms & Condition", "Privacy Policy"]}
            />

            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-2 lg:col-span-1">
              <FooterColumn
                title="Proxy"
                links={["About", "Shop", "Product", "Track Order"]}
              />

              <FooterColumn
                title="Categories"
                links={[
                  "Fruit & Vegetables",
                  "Meat & Fish",
                  "Bread & Bakery",
                  "Beauty & Health",
                ]}
              />
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-12 border-t border-gray-800 pt-8">
            <div className="flex flex-col items-center justify-between gap-5 lg:flex-row">
              <p className="text-sm text-gray-500">
                Nexora eCommerce © 2026. All Rights Reserved
              </p>

              <div className="flex flex-wrap items-center gap-3">
                {[
                  "Pay",
                  "VISA",
                  "DISCOVER",
                  "Mastercard",
                  "Secure Payment",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="rounded border border-gray-700 px-3 py-2 text-xs text-gray-300"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div>
      <h4 className="mb-5 text-lg font-semibold">{title}</h4>

      <ul className="space-y-3">
        {links.map((link) => (
          <li
            key={link}
            className="cursor-pointer text-gray-400 transition hover:text-white"
          >
            {link}
          </li>
        ))}
      </ul>
    </div>
  );
}
