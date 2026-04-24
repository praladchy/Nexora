import React from "react";
import Slider from "react-slick";

// IMPORTANT:
// npm install react-slick slick-carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Single slider images (like the reference image – NOT nested)
const images = [
  {
    id: 1,
    title: "Men Dress",
    image: "https://images.unsplash.com/photo-1521334884684-d80222895322",
  },
  {
    id: 2,
    title: "Watches",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  },
  {
    id: 3,
    title: "Shoes",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
  },
  {
    id: 4,
    title: "Bags",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa",
  },
  {
    id: 5,
    title: "Sunglasses",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083",
  },
];

// ----------------------------------
// Simple Image Slider (Slick)
// ----------------------------------
export default function HeroSectionSlider() {
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    pauseOnHover: true,
    
  };

  return (
    <div className=" w-full mx-auto overflow-hidden px-1 py-5">
       

      <Slider {...settings}>
          <div   className="">
            <div className=" pb-3  overflow-hidden shadow-md bg-white">
              

              <div className="w-full mx-auto flex justify-between mb-5 ">
                <div className="w-[30%]   pl-1 ">
                  <Slider {...settings}>
                    {images.map((item) => (
                      <div key={item.id} className="px-3">
                        <div className="rounded-xl overflow-hidden shadow-md bg-white">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-96 w-full object-cover"
                          />
                          <div className="p-3 text-center font-semibold">
                            {item.title}
                          </div>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
                <div className="flex flex-col   w-[70%] ps-1">
                  <div className=" w-full   pb-1  ">
                    <Slider {...settings}>
                      {images.map((item) => (
                        <div key={item.id} className="px-3">
                          <div className="rounded-xl overflow-hidden shadow-md bg-white">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="h-56 w-full object-cover"
                            />
                            <div className="p-3 text-center font-semibold">
                              {item.title}
                            </div>
                          </div>
                        </div>
                      ))}
                    </Slider>
                  </div>

                  <div className=" flex justify-between w-full   pt-1">
                    <div className="  w-[50%]   pl-1   ">
                      <Slider {...settings}>
                        {images.map((item) => (
                          <div key={item.id} className="px-3">
                            <div className="rounded-xl overflow-hidden shadow-md bg-white">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="h-56 w-full object-cover"
                              />
                              <div className="p-3 text-center font-semibold">
                                {item.title}
                              </div>
                            </div>
                          </div>
                        ))}
                      </Slider>
                    </div>
                    <div className="   w-[50%]     ps-1  ">
                      <Slider {...settings}>
                        {images.map((item) => (
                          <div key={item.id} className="px-3">
                            <div className="rounded-xl overflow-hidden shadow-md bg-white">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="h-56 w-full object-cover"
                              />
                              <div className="p-3 text-center font-semibold">
                                {item.title}
                              </div>
                            </div>
                          </div>
                        ))}
                      </Slider>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </Slider>
    </div>
  );
}
