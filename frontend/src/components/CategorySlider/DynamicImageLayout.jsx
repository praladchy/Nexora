import React from "react";

const DynamicImageLayout = ({ images }) => {
  const count = images.length;

  return (
    <div className="flex flex-wrap h-64 w-full">
      {count === 1 && (
        <div className="w-full h-full">
          <img
            src={images[0].image}
            alt=""
            className="w-full h-full object-cover rounded"
          />
        </div>
      )}

      {count === 2 &&
        images.map((img, i) => (
          <div key={i} className="w-full h-1/2">
            <img
              src={img.image}
              alt=""
              className="w-full h-full object-cover rounded"
            />
          </div>
        ))}

      {count === 3 && (
        <>
          {images.slice(0, 2).map((img, i) => (
            <div key={i} className="w-1/2 h-1/2 p-1">
              <img
                src={img.image}
                alt=""
                className="w-full h-full object-cover rounded"
              />
            </div>
          ))}

          <div className="w-full h-1/2 p-1">
            <img
              src={images[2].image}
              alt=""
              className="w-full h-full object-cover rounded"
            />
          </div>
        </>
      )}

      {count >= 4 &&
        images.slice(0, 4).map((img, i) => (
         <div
      key={i}
      className="w-1/2 h-1/2 pr-3 pb-3 box-border"
    >
      <img
        src={img.image}
        alt=""
        className="w-full h-full object-cover rounded"
      />
      <p className="text-sm mt-1 text-gray-700">
        {img.label}
      </p>
    </div>
        ))}
    </div>
  );
};

export default DynamicImageLayout;
