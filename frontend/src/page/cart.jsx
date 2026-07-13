import React, { useEffect, useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";

import {
  useGetCartQuery,
  useRemoveCartMutation,
  useUpdateCartMutation,
} from "../redux/cart.slice";
import { useCreateOrderMutation } from "../redux/order.slice";
import { useDispatch } from "react-redux";
import { setCart } from "../redux/userData.slice";

export default function ShoppingCartPage() {
  const [cartItems, setCartItems] = useState([]);
const dispatch=useDispatch()
  const { data, isLoading, isError ,refetch } = useGetCartQuery();
  const [updateCart] = useUpdateCartMutation();
  const [removeCart] = useRemoveCartMutation();
  const [createOrder] = useCreateOrderMutation();

  const cartData = data?.cart;
console.log("Cart Datadfghjklbv:", cartData);
dispatch(setCart({cart:cartData}))
  // Sync API cart → local UI state
  useEffect(() => {
    if (cartData) {
      const updatedCart = cartData.map((item) => ({
        ...item,
        selected: item.selected || false,
      }));
      setCartItems(updatedCart);
    }
  }, [cartData]);

  // Select single product
  const handleSelectProduct = (id) => {
    const updated = cartItems.map((item) =>
      item._id === id
        ? { ...item, selected: !item.selected }
        : item
    );
    setCartItems(updated);
  };

  // Select all
  const handleSelectAll = () => {
    const allSelected = cartItems.every((item) => item.selected);

    const updated = cartItems.map((item) => ({
      ...item,
      selected: !allSelected,
    }));

    setCartItems(updated);
  };

  // Unified quantity handler
  const updateQuantity = async (id, delta) => {
    try {
      const updatedItems = cartItems.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + delta),
            }
          : item
      );

      const updateItem = updatedItems.find((i) => i._id === id);
      if (!updateItem) return;

      await updateCart({
        shopId: updateItem.shopId,
        productId: updateItem.product._id,
        quantity: updateItem.quantity,
      }).unwrap();

      setCartItems(updatedItems);
    } catch (error) {
      console.log("Quantity update failed:", error);
    }
  };

  // Remove item
  const removeProduct = async (itemId) => {
    try {
      const updatedItems = cartItems.filter((item) => item._id !== itemId);

      const res = await removeCart(itemId).unwrap();
      alert(res.message);

      setCartItems(updatedItems);
    } catch (error) {
      alert("Failed to remove product: " + error.message);
    }
  };

  // Selected items
  const selectedItems = cartItems.filter((item) => item.selected);

  // Subtotal
  const subtotal = selectedItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Total quantity
  const totalQuantity = selectedItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Create order (FIXED)
  const handleCreateOrder = async () => {
    try {
      if (selectedItems.length === 0) {
        alert("Please select items first");
        return;
      }

      const res = await createOrder({selectedItems}).unwrap();
      refetch();
      alert(res.message);
    } catch (error) {
      alert("Failed to create order: " + error.message);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-2xl font-semibold">
        Loading...
      </div>
    );
  }

  

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-slate-50 px-10 py-8">

          <h2 className="text-4xl font-bold mb-8">Shopping Cart</h2>

          <div className="bg-white rounded-xl p-6 shadow-sm">

            {/* Header */}
            <div className="grid grid-cols-12 font-semibold border-b pb-4 mb-4">
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

            {/* Empty */}
            {cartItems.length === 0 && (
              <div className="text-center py-10 text-gray-500 text-xl">
                Cart is empty
              </div>
            )}

            {/* Items */}
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="grid grid-cols-12 items-center py-5 border-b"
              >
                {/* checkbox */}
                <div className="col-span-1">
                  <input
                    type="checkbox"
                    checked={item.selected}
                    onChange={() => handleSelectProduct(item._id)}
                  />
                </div>

                {/* product */}
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
                      ID: {item.product?._id}
                    </p>
                  </div>
                </div>

                {/* price */}
                <div className="col-span-2 font-medium">
                  ${item.price}
                </div>

                {/* quantity */}
                <div className="col-span-2">
                  <div className="flex items-center gap-3 border rounded-full px-3 py-1 w-fit">
                    <button onClick={() => updateQuantity(item._id, -1)}>
                      <Minus size={16} />
                    </button>

                    <span>{item.quantity}</span>

                    <button onClick={() => updateQuantity(item._id, 1)}>
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* total */}
                <div className="col-span-1 font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>

                {/* delete */}
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

                <button
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl"
                  onClick={handleCreateOrder}
                >
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