import React, { useEffect, useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";

import {
  useGetCartQuery,
  useRemoveCartMutation,
  useUpdateCartMutation,
} from "../redux/cart.slice";

export default function ShoppingCartPage() {
  const { data: cartData, isLoading, isError } = useGetCartQuery();
  const [updateCart] = useUpdateCartMutation();
  const [removeData] = useRemoveCartMutation();

  const [cartItems, setCartItems] = useState([]);
  // console.log("sdfjkghj", cartItems);

  // Sync API data with local state
  useEffect(() => {
    if (cartData?.cart) {
      const updatedCart = cartData.cart.map((item) => ({
        ...item,
        selected: item.selected || false,
      }));

      setCartItems(updatedCart);
    }
  }, [cartData]);

  // Select single product
  const handleSelectProduct = (id) => {
    const updatedItems = cartItems.map((item) =>
      item._id === id
        ? {
            ...item,
            selected: !item.selected,
          }
        : item,
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
  const increaseQuantity = async (id) => {
    try {
      const updatedItems = cartItems.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      );

      const updateItem = updatedItems.find(
        (items) => items._id.toString() === id,
      );

      // console.log("sdfghj", updateItem);

      const res = await updateCart({
        productId: updateItem.product._id,
        quantity: updateItem.quantity,
      }).unwrap();
      // alert(res.message);

      setCartItems(updatedItems);
    } catch (error) {
      console.log(`failed to update ${error}`);
    }
  };

  // Decrease quantity
  const decreaseQuantity = async (id) => {
    try {
      const updatedItems = cartItems.map((item) =>
        item._id === id && item.quantity > 1
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item,
      );
      const updateItem = updatedItems.find(
        (items) => items._id.toString() === id,
      );

      // console.log("sdfghj", updateItem);

      const res = await updateCart({
        productId: updateItem.product._id,
        quantity: updateItem.quantity,
      }).unwrap();
      // alert(res.message);

      setCartItems(updatedItems);
    } catch (error) {
      console.log(`failed to update ${error}`);
    }
  };

  // Delete product
  const removeProduct = async (itemId) => {
    try {
      const updatedItems = cartItems.filter((item) => item._id !== itemId);
      const res = await removeData(itemId).unwrap();
      alert(res.message);
      setCartItems(updatedItems);
    } catch (error) {
      alert("Failed to remove product: " + error.message);
    }
  };

  // Selected products
  const selectedItems = cartItems.filter((item) => item.selected);

  // Subtotal
  const subtotal = selectedItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  // Total quantity
  const totalQuantity = selectedItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-2xl font-semibold">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500 text-2xl font-semibold">
        Failed to load cart
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-slate-50 px-10 py-8">
          {/* Title */}
          <h2 className="text-4xl font-bold mb-8">Shopping Cart</h2>

          {/* Cart Table */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            {/* Header */}
            <div className="grid grid-cols-12 font-semibold text-gray-700 border-b pb-4 mb-4">
              <div className="col-span-1">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={
                    cartItems.length > 0 &&
                    cartItems.every((item) => item.selected)
                  }
                />
              </div>

              <div className="col-span-5">Product</div>

              <div className="col-span-2">Price</div>

              <div className="col-span-2">Quantity</div>

              <div className="col-span-2">Total</div>
            </div>

            {/* Empty Cart */}
            {cartItems.length === 0 && (
              <div className="text-center py-10 text-gray-500 text-xl">
                Cart is empty
              </div>
            )}

            {/* Products */}
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="grid grid-cols-12 items-center py-5 border-b"
              >
                {/* Checkbox */}
                <div className="col-span-1">
                  <input
                    type="checkbox"
                    checked={item.selected}
                    onChange={() => handleSelectProduct(item._id)}
                  />
                </div>

                {/* Product */}
                <div className="col-span-5 flex gap-4 items-center">
                  <img
                    src={
                      item.product?.images?.[0] ||
                      "https://via.placeholder.com/100"
                    }
                    alt={item.product?.name}
                    className="w-20 h-24 object-cover rounded-lg border"
                  />

                  <div>
                    <h3 className="font-medium text-sm">
                      {item.product?.name}
                    </h3>

                    <p className="text-gray-500 text-sm">
                      Product ID: {item.product?._id}
                    </p>
                  </div>
                </div>

                {/* Price */}
                <div className="col-span-2 font-medium">${item.price}</div>

                {/* Quantity */}
                <div className="col-span-2">
                  <div className="flex items-center gap-4 border rounded-full px-4 py-2 w-fit">
                    <button onClick={() => decreaseQuantity(item._id)}>
                      <Minus size={16} />
                    </button>

                    <span>{item.quantity}</span>

                    <button onClick={() => increaseQuantity(item._id)}>
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div className="col-span-1 font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>

                {/* Delete */}
                <div className="col-span-1 flex justify-end">
                  <button
                    onClick={() => removeProduct(item._id)}
                    className="text-red-500"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="mt-10 flex flex-col items-end gap-4">
                <div className="text-lg">
                  Selected Items:{" "}
                  <span className="font-bold">{totalQuantity}</span>
                </div>

                <h3 className="text-3xl font-bold">
                  Sub Total: ${subtotal.toFixed(2)}
                </h3>

                <button className="bg-indigo-600 hover:bg-indigo-700 transition text-white px-8 py-3 rounded-xl">
                  GO TO CHECKOUT
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
