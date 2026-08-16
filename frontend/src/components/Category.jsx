import { ArrowRight } from "lucide-react";
import { useGetParentCategoryQuery } from "../redux/category.apiSlice";
import { useNavigate } from "react-router-dom";

 

export default function PopularCategories() {
  const navigate=useNavigate();
   const {data:categories} = useGetParentCategoryQuery();
    const cate = categories?.category||[];

    console.log("cccssdds",cate)
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">
          Popular Categories
        </h2>

        <button className="flex items-center gap-2 font-semibold text-[#00B207] transition hover:gap-3">
          View All
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {cate.map((category, index) => (
          <div
            key={index}
            className={`group cursor-pointer rounded-lg border bg-white p-4 text-center transition-all duration-200 hover:shadow-lg ${
              category.active
                ? "border-2 border-[#00B207] shadow-md"
                : "border-gray-200 hover:border-[#00B207]"
            }`}
           onClick={() => {
                    navigate(`/category/products/${category._id}`);
                  }}>
            <div className="flex h-36 items-center justify-center overflow-hidden rounded-md">
              <img
                src={category.image[0]?.url}
                alt={category.name}
                className="h-28 w-28 object-contain transition duration-300 group-hover:scale-105"
              />
            </div>

            <h3
              className={`mt-4 text-lg font-semibold ${
                category.active
                  ? "text-[#2C742F]"
                  : "text-gray-900 group-hover:text-[#2C742F]"
              }`}
            >
              {category.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}