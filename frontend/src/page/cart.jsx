import React, { useState } from "react";
import { Minus, Plus, Trash2, Phone } from "lucide-react";

const initialCartItems = [
  {
    id: 1,
    name: "HIKING RAIN PONCHO 50 - 10 L TURQUOISE",
    color: "Green-D",
    size: "XL",
    stock: "In Stock (12 Pcs)",
    price: 41.78,
    quantity: 1,
    selected: true,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
  },
  {
    id: 2,
    name: "HIKING RAIN PONCHO 50 - 10 L TURQUISE",
    color: "Green-D",
    size: "XL",
    stock: "In Stock (1 Pcs)",
    price: 41.78,
    quantity: 2,
    selected: false,
    image:
      "https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=500",
  },
  {
    id: 3,
    name: "BAG - 10 L TURQUOISE",
    color: "Green-D",
    size: "XL",
    stock: "In Stock (12 Pcs)",
    price: 41.78,
    quantity: 1,
    selected: false,
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500",
  },
];

export default function ShoppingCartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const items = []
  console.log("sdfghjk",items)
  // Select single product
  const handleSelectProduct = (id) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id
        ? { ...item, selected: !item.selected }
        : item
    );

    setCartItems(updatedItems);
  };

  // Select all products
  const handleSelectAll = () => {
    const allSelected = cartItems.every((item) => item.selected);

    const updatedItems = cartItems.map((item) => ({
      ...item,
      selected: !allSelected,
    }));

    setCartItems(updatedItems);
  };

  // Increase quantity
  const increaseQuantity = (id) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    setCartItems(updatedItems);
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );

    setCartItems(updatedItems);
  };

  // Subtotal only selected products
  const subtotal = cartItems.reduce((total, item) => {
    if (item.selected) {
      items.push(item)
      console.log("fghjkl",items);
      return total + item.price * item.quantity;
    }
    return total;
  }, 0);

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-slate-50 px-10 py-8">
          <h2 className="text-4xl font-bold mb-8">
            Shopping Cart
          </h2>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            {/* Header */}
            <div className="grid grid-cols-12 font-semibold text-gray-700 border-b pb-4 mb-4">
              <div className="col-span-1">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={cartItems.every(
                    (item) => item.selected
                  )}
                />
              </div>

              <div className="col-span-5">Product</div>
              <div className="col-span-2">Price</div>
              <div className="col-span-2">Quantity</div>
              <div className="col-span-2">Total</div>
            </div>

            {/* Products */}
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-12 items-center py-5 border-b"
              >
                {/* Checkbox */}
                <div className="col-span-1">
                  <input
                    type="checkbox"
                    checked={item.selected}
                    onChange={() =>
                      handleSelectProduct(item.id)
                    }
                  />
                </div>

                {/* Product */}
                <div className="col-span-5 flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-24 object-cover rounded-lg border"
                  />

                  <div>
                    <h3 className="font-medium text-sm">
                      {item.name}
                    </h3>
                    <p>Color: {item.color}</p>
                    <p>Size: {item.size}</p>
                    <p>{item.stock}</p>
                  </div>
                </div>

                {/* Price */}
                <div className="col-span-2">
                  ${item.price}
                </div>

                {/* Quantity */}
                <div className="col-span-2">
                  <div className="flex items-center gap-4 border rounded-full px-4 py-2 w-fit">
                    <button
                      onClick={() =>
                        decreaseQuantity(item.id)
                      }
                    >
                      <Minus size={16} />
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        increaseQuantity(item.id)
                      }
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div className="col-span-2 font-medium">
                  $
                  {(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}

            {/* Footer */}
            <div className="text-right mt-8">
              <h3 className="text-3xl font-bold">
                Sub Total: ${subtotal.toFixed(2)}
              </h3>

              <button className="bg-indigo-600 text-white px-8 py-3 rounded-xl mt-4">
                GO TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}