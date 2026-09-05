import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { useGetCategoryQuery } from "../../redux/category.apiSlice";

export default function CategorySlider() {
  const navigate = useNavigate();

  const { data: categories, isLoading } = useGetCategoryQuery();

  const cate = Array.isArray(categories?.category) ? categories.category : [];

  // --------------------------------
  // Pair categories
  // --------------------------------
  const pairCategories = (data) => {
    const pairs = [];

    for (let i = 0; i < data.length; i += 2) {
      pairs.push(data.slice(i, i + 2));
    }

    return pairs;
  };

  const pairedCategories = pairCategories(cate);

  // --------------------------------
  // Detect screen size manually
  // --------------------------------
  const getSlidesToShow = () => {
    if (window.innerWidth <= 480) {
      return 2;
    }

    if (window.innerWidth <= 768) {
      return 3;
    }

    if (window.innerWidth <= 1024) {
      return 4;
    }

    return 6;
  };

  const [slidesToShow, setSlidesToShow] = useState(getSlidesToShow());

  // --------------------------------
  // Listen for screen resize
  // --------------------------------
  useEffect(() => {
    const handleResize = () => {
      setSlidesToShow(getSlidesToShow());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // --------------------------------
  // Arrows
  // --------------------------------
  const NextArrow = ({ onClick }) => (
    <button
      type="button"
      onClick={onClick}
      className="absolute -top-5 right-0 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black text-xl text-white hover:bg-gray-800"
    >
      ›
    </button>
  );

  const PrevArrow = ({ onClick }) => (
    <button
      type="button"
      onClick={onClick}
      className="absolute -top-5 right-10 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black text-xl text-white hover:bg-gray-800"
    >
      ‹
    </button>
  );

  // --------------------------------
  // Slider settings
  // --------------------------------
  const settings = {
    dots: false,

    arrows: pairedCategories.length > slidesToShow,

    infinite: pairedCategories.length > slidesToShow,

    speed: 500,

    slidesToShow: Math.min(slidesToShow, pairedCategories.length),

    slidesToScroll: 1,

    autoplay: false,

    pauseOnHover: true,

    nextArrow: <NextArrow />,

    prevArrow: <PrevArrow />,
  };

  // --------------------------------
  // Loading
  // --------------------------------
  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-7xl px-4 py-10">Loading...</div>
    );
  }

  // --------------------------------
  // No categories
  // --------------------------------
  if (!cate.length) {
    return null;
  }

  return (
    <div className="mx-auto w-full max-w-7xl overflow-hidden px-4 py-10">
      <Slider {...settings}>
        {pairedCategories.map((pair, index) => (
          <div key={index} className="px-2">
            <div className="flex flex-col gap-4 py-4">
              {pair.map((item) => {
                const imageUrl =
                  Array.isArray(item.image) && item.image.length > 0
                    ? item.image[0]?.url
                    : null;

                return (
                  <div
                    key={item._id}
                    onClick={() => navigate(`/category/products/${item._id}`)}
                    className={`group cursor-pointer rounded-lg bg-white p-3 text-center transition-all duration-200 ${
                      item.active
                        ? "border-2 border-[#00B207] shadow-md"
                        : "border border-gray-200 hover:border-[#00B207] hover:shadow-lg"
                    }`}
                  >
                    {/* Image */}
                    <div className="flex h-28 items-center justify-center overflow-hidden rounded-md">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={item.name}
                          className="h-24 w-24 object-contain transition duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-24 w-24 items-center justify-center rounded-md bg-gray-100 text-xs text-gray-400">
                          No Image
                        </div>
                      )}
                    </div>

                    {/* Name */}
                    <h3
                      className={`mt-3 truncate text-base font-semibold ${
                        item.active
                          ? "text-[#2C742F]"
                          : "text-gray-900 group-hover:text-[#2C742F]"
                      }`}
                    >
                      {item.name}
                    </h3>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
