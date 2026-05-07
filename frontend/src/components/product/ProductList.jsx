import React from "react";
// import ProductCard from "./ProductCard";
import { Heart, ShoppingCart } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useGetproductsQuery } from "../../redux/product.slice";
import { useCreateCartMutation } from "../../redux/cart.slice";

const ProductList = () => {
  const [param, setParam] = useState({
    productId: "",
  });
  const { data } = useGetproductsQuery();
  const [createCart,{isLoading}] = useCreateCartMutation();

  const handleAddToCart = async (productId) => {
    // Implement the logic to add the product to the cart
    console.log("Adding product to cart:", productId);
    try {
      const res = await createCart({
        productId,
        quantity: 1,
      }).unwrap();
      console.log("add to cart response", res);
      alert(res.message);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  console.log("data", data?.products[6].images[0].url);
  return (
    <div className="bg-gray-50 py-4 ">
      <div className="w-[98%] mx-auto flex flex-wrap gap-4">
        {data?.products.map((products, index) => (
          // <ProductCard  product={product} />
          <div className="w-full sm:w-1/2 md:w-1/5 lg:w-[14%] p-2 " key={index}>
            <div className="border rounded-lg p-3 h-full relative bg-white overflow-hidden">
              {/* Wishlist */}
              <button className="absolute top-4 right-4 text-gray-400 hover:text-red-500">
                <Heart size={18} />
              </button>

              {/* Image */}
              <div className="h-40 flex items-center justify-center py-2 overflow-hidden">
                <NavLink to={`/product/productDetails/${products._id}`}>
                  <img
                    src={products?.images[0]?.url}
                    alt={products.name}
                    className="max-h-full object-contain"
                  />
                </NavLink>
              </div>

              {/* Title */}
              <p className="text-sm mt-3 line-clamp-2">{products.name}</p>

              {/* Rating */}
              {/* <div className="flex items-center gap-1 text-sm mt-1">
          <span className="text-yellow-500">★</span>
          <span>{product.rating}</span>
          <span className="text-gray-400 text-xs">
            ({product.reviews} reviews)
          </span>
        </div> */}

              {/* Price + Cart */}
              <div className="flex items-center justify-between mt-2">
                <span className="font-semibold text-sm">
                  {products.price} USD
                </span>

                <button className="border p-1 rounded hover:bg-gray-100">
                  <ShoppingCart
                    size={16}
                    onClick={() => handleAddToCart(products._id)}/>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
