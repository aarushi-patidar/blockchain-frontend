import React from "react";

const PriceRangeItem: React.FC<{ label: string; isSelected?: boolean }> = ({
  label,
  isSelected = false,
}) => {
  return (
    <li
      className={`flex items-center gap-2 cursor-pointer py-1 ${isSelected ? "text-gray-400" : "text-gray-300 hover:text-white"}`}
    >
      <input
        type="radio"
        name="price"
        className="w-4 h-4 cursor-pointer"
        defaultChecked={isSelected}
      />
      <span className="text-sm">{label}</span>
    </li>
  );
};

const priceRanges = [
  { label: "All Price", selected: true },
  { label: "Under $20" },
  { label: "Under $50" },
  { label: "$50-$100" },
  { label: "$100-$250" },
  { label: "$250-$500" },
  { label: "$500-$1,000" },
  { label: "$1,000-$5,000" },
];

const PriceRangeSection = () => {
  return (
    <div className="bg-black/40 shadow font-avant backdrop-blur-sm border border-cyan-400/20 rounded-lg p-4 mb-6">
      <h3 className=" uppercase text-2xl italic font-semibold mb-4">
        Price Range
      </h3>
      <div className="mb-4">
        <input type="range" min="0" max="5000" className="w-full" />
      </div>
      <ul className="space-y-2">
        {priceRanges.map((range,index) => (
          <PriceRangeItem
            key={index}
            label={range.label}
            isSelected={range.selected}
          />
        ))}
      </ul>
    </div>
  );
};

export default PriceRangeSection;
