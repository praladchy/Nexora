import React from "react";
import AmazonGroupCard from "./AmazonGroupCard";

const AmazonGroups = () => {
  return (
    <div className="bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <AmazonGroupCard
          title="Shop gifts by price"
          linkText="Discover more"
          items={[
            { label: "Deals", image: "https://picsum.photos/300?4" },
          ]}
        />

        <AmazonGroupCard
          title="Shop for your home essentials"
          linkText="Discover more in Home"
          items={[
            { label: "Cleaning Tools", image: "https://picsum.photos/300?5" },
            { label: "Home Storage", image: "https://picsum.photos/300?6" },
            { label: "Home Decor", image: "https://picsum.photos/300?7" },
            { label: "Bedding", image: "https://picsum.photos/300?8" },
          ]}
        />

        <AmazonGroupCard
          title="Shop gifts by recipient"
          linkText="Shop all gifts"
          items={[
            { label: "For him", image: "https://picsum.photos/300?9" },
            { label: "For her", image: "https://picsum.photos/300?10" },
            { label: "For kids", image: "https://picsum.photos/300?11" },
            { label: "For teens", image: "https://picsum.photos/300?12" },
          ]}
        />

        <AmazonGroupCard
          title="Save more on deals"
          linkText="See all deals"
          items={[
            { label: "Fashion", image: "https://picsum.photos/300?13" },
            { label: "Toys", image: "https://picsum.photos/300?14" },
            { label: "Electronics", image: "https://picsum.photos/300?15" },
            { label: "Home", image: "https://picsum.photos/300?16" },
          ]}
        />

      </div>
    </div>
  );
};

export default AmazonGroups;
