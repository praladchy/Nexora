import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { useGetCategoryQuery } from "../../redux/category.apiSlice";
// Categories data
 

// Utility: group items in pairs (id 1 → top, id 2 → bottom)
 
 

export default function CategorySlider() {
  const {data:categories} = useGetCategoryQuery();
  const cate = categories?.category||[];

  const pairCategories = (data) => {
  const pairs = [];
  for (let i = 0; i < data.length; i += 2) {
    pairs.push(data.slice(i, i + 2));
  }
  return pairs;
};

const pairedCategories = pairCategories(cate);
  const navigate = useNavigate();
  const NextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute -top-5 right-0 z-10 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800"
    > ›
    </button>
  );

  const PrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute -top-5 right-10 z-10 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800"
    >
      ‹
    </button>
  );
  const settings = {
    dots:false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,

    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 5 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 2 },
      },
    ],
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <Slider {...settings}>
        {pairedCategories.map((pair, index) => (
          <div key={index} className="px-3 py-4">
            <div className="flex flex-col gap-8">
              {pair.map((item) => (
                <div
                  key={item._id}
                   className={`group cursor-pointer rounded-lg border bg-white p-4 text-center transition-all duration-200 hover:shadow-lg ${item.active
                ? "border-2 border-[#00B207] shadow-md"
                : "border-gray-200 hover:border-[#00B207]"
            }`}
                  onClick={() => {
                    navigate(`/category/products/${item._id}`);
                  }}
                >
                  <div className="flex h-36 items-center justify-center overflow-hidden rounded-md">
                    <img
                      src={item.image[0]?.url}
                      alt={item.name}
                      className="h-28 w-28 object-contain transition duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h3
              className={`mt-4 text-lg font-semibold ${
                item.active
                  ? "text-[#2C742F]"
                  : "text-gray-900 group-hover:text-[#2C742F]"
              }`}
            >
              {item.name}
            </h3>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
