import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
// Categories data
const categories = [
  { id: 1, name: "1", img: "https://i.imgur.com/2DhmtJ4.png" },
  { id: 2, name: "Fashion2", img: "https://i.imgur.com/W3m4aSI.png" },
  { id: 3, name: "Home3", img: "https://i.imgur.com/6Zp2V1F.png" },
  { id: 4, name: "Sports4", img: "https://i.imgur.com/B2yRnLF.png" },
  { id: 5, name: "Electronics5", img: "https://i.imgur.com/2DhmtJ4.png" },
  { id: 6, name: "Fashion6", img: "https://i.imgur.com/W3m4aSI.png" },
  { id: 7, name: "Home7", img: "https://i.imgur.com/6Zp2V1F.png" },
  { id: 8, name: "Sports8", img: "https://i.imgur.com/B2yRnLF.png" },
  { id: 1, name: "Electronics", img: "https://i.imgur.com/2DhmtJ4.png" },
  { id: 2, name: "Fashion", img: "https://i.imgur.com/W3m4aSI.png" },
  { id: 3, name: "Home", img: "https://i.imgur.com/6Zp2V1F.png" },
  { id: 4, name: "Sports", img: "https://i.imgur.com/B2yRnLF.png" },
  { id: 5, name: "Electronics", img: "https://i.imgur.com/2DhmtJ4.png" },
  { id: 6, name: "Fashion", img: "https://i.imgur.com/W3m4aSI.png" },
  { id: 7, name: "Home", img: "https://i.imgur.com/6Zp2V1F.png" },
  { id: 8, name: "Sports", img: "https://i.imgur.com/B2yRnLF.png" },
  { id: 1, name: "Electronics", img: "https://i.imgur.com/2DhmtJ4.png" },
  { id: 2, name: "Fashion", img: "https://i.imgur.com/W3m4aSI.png" },
  { id: 3, name: "Home", img: "https://i.imgur.com/6Zp2V1F.png" },
  { id: 4, name: "Sports", img: "https://i.imgur.com/B2yRnLF.png" },
  { id: 5, name: "Electronics", img: "https://i.imgur.com/2DhmtJ4.png" },
  { id: 6, name: "Fashion", img: "https://i.imgur.com/W3m4aSI.png" },
  { id: 7, name: "Home", img: "https://i.imgur.com/6Zp2V1F.png" },
  { id: 8, name: "Sports", img: "https://i.imgur.com/B2yRnLF.png" },
];

// Utility: group items in pairs (id 1 → top, id 2 → bottom)
const pairCategories = (data) => {
  const pairs = [];
  for (let i = 0; i < data.length; i += 2) {
    pairs.push(data.slice(i, i + 2));
  }
  return pairs;
};

const pairedCategories = pairCategories(categories);

export default function CategorySlider() {
  const navigate = useNavigate();
  const NextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute -top-5 right-0 z-10 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800"
    >
      ›
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
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 9,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,

    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 10 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 6 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 4 },
      },
    ],
  };

  return (
    <div className="w-full overflow-hidden px-2 py-5">
      <Slider {...settings}>
        {pairedCategories.map((pair, index) => (
          <div key={index} className="px-3 py-4">
            <div className="flex flex-col gap-4">
              {pair.map((item) => (
                <div
                  key={item.id}
                  className="w-28 py-3 mx-auto  rounded-xl shadow-md bg-white flex flex-col items-center justify-center text-center pointer"
                  onClick={()=>{navigate("/category/products")}}
                >
                  <div className="w-20 h-20 bg-gray-100 overflow-hidden rounded-lg">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm mt-3">{item.name}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
