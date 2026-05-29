import React from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useGetproductsQuery } from "../../redux/product.slice";
import { useCreateCartMutation } from "../../redux/cart.slice";

const ProductList = () => {
  const { data } = useGetproductsQuery();

  const [createCart, { isLoading }] = useCreateCartMutation();

  const handleAddToCart = async (productId, shopId) => {
    try {
      const res = await createCart({
        productId,
        shopId,
        quantity: 1,
      }).unwrap();

      console.log("add to cart response", res);
      alert(res.message);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className="bg-gray-50 py-4 min-h-screen">
      <div className="w-[98%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {data?.products?.map((products, index) => (
          <div key={index}>
            <div className="border rounded-xl p-3 h-full relative bg-white overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
              
              {/* Wishlist */}
              <button className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition z-10">
                <Heart size={18} />
              </button>

              {/* Product Image */}
              <div className="h-32 sm:h-40 md:h-44 flex items-center justify-center overflow-hidden">
                <NavLink
                  to={`/product/productDetails/${products._id}`}
                  className="w-full h-full flex items-center justify-center"
                >
                  <img
                    src={products?.images?.[0]?.url}
                    alt={products?.name}
                    className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                  />
                </NavLink>
              </div>

              {/* Product Name */}
              <p className="text-sm mt-3 line-clamp-2 min-h-[40px] text-gray-700">
                {products?.name}
              </p>

              {/* Price + Cart */}
              <div className="flex items-center justify-between mt-3">
                <span className="font-semibold text-sm text-black">
                  ${products?.price}
                </span>

                <button
                  className="border p-2 rounded-lg hover:bg-gray-100 transition disabled:opacity-50"
                  onClick={() =>
                    handleAddToCart(
                      products?._id,
                      products?.shop?._id
                    )
                  }
                  disabled={isLoading}
                >
                  <ShoppingCart size={16} />
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