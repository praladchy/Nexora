import React from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { NavLink } from "react-router-dom";
const ProductCard = ({ product }) => {
 

  return (
    <div className="w-full sm:w-1/2 md:w-1/5 lg:w-[14%] p-2 ">
      <div className="border rounded-lg p-3 h-full relative bg-white overflow-hidden">
        {/* Wishlist */}
        <button className="absolute top-4 right-4 text-gray-400 hover:text-red-500">
          <Heart size={18} />
        </button>

        {/* Image */}
        <div className="h-40 flex items-center justify-center py-2 overflow-hidden">
          <NavLink to={`/product/productDetails/${product._id}`}>
            <img
              src={product.images[0]}
              alt={product.productName}
              className="max-h-full object-contain"
            />
          </NavLink>
        </div>

        {/* Title */}
        <p className="text-sm mt-3 line-clamp-2">{product.productName}</p>

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
          <span className="font-semibold text-sm">{product.price} USD</span>

          <button className="border p-1 rounded hover:bg-gray-100">
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
