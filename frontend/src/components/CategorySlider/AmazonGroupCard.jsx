import React from "react";
import DynamicImageLayout from "./DynamicImageLayout";

const AmazonGroupCard = ({ title, items, linkText }) => {
  return (
    <div className="bg-white p-4 shadow rounded h-full">
      <h2 className="text-lg font-semibold mb-3">{title}</h2>

      <DynamicImageLayout images={items} />

      <a
        href="#"
        className="inline-block mt-3 text-sm text-blue-600 hover:underline"
      >
        {linkText}
      </a>
    </div>
  );
};

export default AmazonGroupCard;
