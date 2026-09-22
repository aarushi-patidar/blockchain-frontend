import React from "react";

const BrandCheckbox: React.FC<{ label: string; isSelected?: boolean }> = ({
  label,
  isSelected = false,
}) => {
  return (
    <li className="flex items-center gap-2 cursor-pointer py-1">
      <input
        type="checkbox"
        className="w-4 h-4 cursor-pointer accent-green-400"
        defaultChecked={isSelected}
      />
      <span
        className={`text-sm ${isSelected ? "text-green-400" : "text-gray-300 hover:text-white"}`}
      >
        {label}
      </span>
    </li>
  );
};

const brands = [
  { label: "Apple", selected: true },
  { label: "Samsung" },
  { label: "LG" },
  { label: "Sony" },
  { label: "HP" },
  { label: "Xiaomi" },
  { label: "Dell" },
  { label: "OnePlus" },
  { label: "Google" },
  { label: "Intel" },
  { label: "Samsung" },
  { label: "BMW" },
];

const BrandsSection = () => {
  return (
    <div className="bg-black/40 backdrop-blur-sm border border-cyan-400/20 rounded-lg p-4 mb-6">
      <h3 className="text-cyan-400 uppercase text-sm font-semibold mb-4">
        Popular Brands
      </h3>
      <ul className="space-y-2 grid grid-cols-2 gap-3">
        {brands.map((brand,index) => (
          <BrandCheckbox
            key={index}
            label={brand.label}
            isSelected={brand.selected}
          />
        ))}
      </ul>
    </div>
  );
};

export default BrandsSection;
