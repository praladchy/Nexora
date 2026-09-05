import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef } from "react";
import { useGetParentCategoryQuery } from "../redux/category.apiSlice";
import { useNavigate } from "react-router-dom";

export default function PopularCategories() {
  const navigate = useNavigate();
  const sliderRef = useRef(null);

  const { data: categories } = useGetParentCategoryQuery();
  const cate = categories?.category || [];

  const slideLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.clientWidth,
        behavior: "smooth",
      });
    }
  };

  const slideRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: sliderRef.current.clientWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10">
      
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Popular Categories
        </h2>

        <div className="flex gap-2">
          <button
            onClick={slideLeft}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white transition hover:bg-gray-800"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <button
            onClick={slideRight}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white transition hover:bg-gray-800"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Slider */}
      <div
        ref={sliderRef}
        className="
          flex
          gap-4
          overflow-x-auto
          scroll-smooth
          scrollbar-hide
        "
      >
        {cate.map((category) => (
          <div
            key={category._id}
            onClick={() => navigate(`/category/${category._id}`)}
            className={`
              group
              shrink-0
              cursor-pointer
              rounded-lg
              border
              bg-white
              p-3
              text-center
              transition-all
              duration-200
              
              basis-[calc(50%-8px)]
              sm:basis-[calc(33.333%-11px)]
              md:basis-[calc(25%-12px)]
              lg:basis-[calc(16.666%-14px)]

              ${
                category.active
                  ? "border-2 border-[#00B207] shadow-md"
                  : "border-gray-200 hover:border-[#00B207] hover:shadow-lg"
              }
            `}
          >
            {/* Image */}
            <div className="flex h-28 w-full items-center justify-center overflow-hidden rounded-md sm:h-32">
              <img
                src={category.image?.[0]?.url}
                alt={category.name}
                className="
                  h-20
                  w-20
                  object-contain
                  transition
                  duration-300
                  group-hover:scale-105
                  sm:h-24
                  sm:w-24
                "
              />
            </div>

            {/* Name */}
            <h3
              className={`
                mt-3
                line-clamp-2
                min-h-[48px]
                text-sm
                font-semibold
                leading-6
                sm:text-base
                ${
                  category.active
                    ? "text-[#2C742F]"
                    : "text-gray-900 group-hover:text-[#2C742F]"
                }
              `}
            >
              {category.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}