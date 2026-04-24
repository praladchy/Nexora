const subcategories = [
  { name: "Deals", img: "https://i.imgur.com/0y8Ftya.png" },
  { name: "Mobiles", img: "https://i.imgur.com/2DhmtJ4.png" },
  { name: "Shoes", img: "https://i.imgur.com/HpIjJ77.png" },
  { name: "Beauty", img: "https://i.imgur.com/Gz9K7yI.png" },
  { name: "Toys", img: "https://i.imgur.com/Hg7P3XR.png" },
  { name: "Jewelry", img: "https://i.imgur.com/2yaf2wb.png" },
  { name: "Kids", img: "https://i.imgur.com/8Km9tLL.png" },
  { name: "Sports", img: "https://i.imgur.com/B2yRnLF.png" },
];

const SubcategorySlider = () => {
  const NextArrow = ({ onClick }) => (
<button
onClick={onClick}
className="absolute -top-10 right-0 z-10 bg-black text-white w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-800"
>
›
</button>
);


const PrevArrow = ({ onClick }) => (
<button
onClick={onClick}
className="absolute -top-10 right-10 z-10 bg-black text-white w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-800"
>
‹
</button>
);
  return (
    <div className="overflow-x-auto">
      <div className="grid grid-rows-2 grid-flow-col gap-x-6 gap-y-4 w-max">
        {subcategories.map((item, i) => (
          <div key={i} className="w-28 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 overflow-hidden">
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm mt-2">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubcategorySlider;
