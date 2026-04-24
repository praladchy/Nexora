import React, { useState } from "react";


const QuantityControl = ({ qty, onIncrease, onDecrease }) => (
  <div className="flex items-center gap-2 border rounded px-2">
    <button onClick={onDecrease} className="px-2">-</button>
    <span>{qty}</span>
    <button onClick={onIncrease} className="px-2">+</button>
  </div>
);

const CartItem = ({ item, onUpdateQty, onRemove }) => (
  <div className="grid grid-cols-5 items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
    <div className="flex items-center gap-3 col-span-2">
      <img src={item.image} className="w-16 h-16 object-contain" />
      <div>
        <h4 className="font-medium">{item.name}</h4>
        <p className="text-sm text-gray-500">{item.variant}</p>
      </div>
    </div>

    <p className="font-medium">${item.price}</p>

    <QuantityControl
      qty={item.qty}
      onIncrease={() => onUpdateQty(item.id, item.qty + 1)}
      onDecrease={() => onUpdateQty(item.id, Math.max(1, item.qty - 1))}
    />

    <div className="flex items-center justify-between">
      <p className="font-semibold">${item.price * item.qty}</p>
      <button
        onClick={() => onRemove(item.id)}
        className="text-gray-400 hover:text-red-500"
      >
        ✕
      </button>
    </div>
  </div>
);

const OrderSummary = ({ subtotal }) => {
  const deliveryFee = 0;
  const total = subtotal + deliveryFee;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="font-semibold mb-4">Order Details</h3>
      <div className="flex justify-between text-sm mb-2">
        <span>Items</span>
        <span>${subtotal}</span>
      </div>
      <div className="flex justify-between text-sm mb-2">
        <span>Delivery Fee</span>
        <span className="text-green-600">FREE</span>
      </div>
      <div className="flex justify-between font-semibold border-t pt-3 mt-3">
        <span>Total Price</span>
        <span>${total}</span>
      </div>

      <button className="w-full bg-blue-600 text-white py-2 rounded mt-5">
        Proceed to checkout
      </button>
    </div>
  );
};

// ======================
// Main Cart Page
// ======================

const CartPage = () => {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Amazon Echo Super Extra Bass",
      variant: "Home System",
      price: 70,
      qty: 2,
      image: "/echo.png",
    },
    {
      id: 2,
      name: "Apple AirPods with Wired Charging Case",
      variant: "",
      price: 150,
      qty: 1,
      image: "/airpod.png",
    },
  ]);

  const updateQty = (id, qty) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty } : item))
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center">Your cart</h1>
      <p className="text-center text-gray-500 mb-10">
        {cart.length} items in your cart
      </p>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 space-y-4">
          <div className="grid grid-cols-5 text-sm text-gray-500 px-2">
            <span className="col-span-2">Product</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Total</span>
          </div>

          {cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQty={updateQty}
              onRemove={removeItem}
            />
          ))}

          <button className="text-sm border px-4 py-2 rounded">
            Continue Shopping
          </button>
        </div>

        <OrderSummary subtotal={subtotal} />
      </div>
    </div>
  );
};

export default CartPage;
