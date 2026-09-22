import React from "react";

interface CategoryItemProps {
  label: string;
  isSelected?: boolean;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  label,
  isSelected = false,
}) => {
  return (
    <li
      className={`flex items-center gap-2 cursor-pointer py-1 ${isSelected ? "text-gray-400" : "text-gray-300 hover:text-white"}`}
    >
      <span
        className={`w-3 h-3 bg-transparent border-2 rounded-full ${isSelected ? "border-green-500" : "bg-gray-400"}`}
      ></span>
      <span className="text-sm">{label}</span>
    </li>
  );
};

const categories = [
  { label: "Batteries Device", selected: true },
  { label: "Capacity & Lipos" },
  { label: "Capacity Accessories" },
  { label: "Smart Phone" },
  { label: "Headphone" },
  { label: "Mobile Powerbank" },
  { label: "Ac & Laptop" },
  { label: "Camera & Photo" },
  { label: "TV & Home Appliances" },
  { label: "Watch & Accessories" },
  { label: "GPS & Navigation" },
  { label: "Wireless Headphone" },
];

const CategorySection = () => {
  return (
    <div className="bg-black/50 font-avant   shadow rounded-lg p-4 mb-6">
      <h3 className="uppercase text-2xl italic font-semibold mb-4">
        Category
      </h3>
      <ul className="space-y-2">
        {categories.map((cat) => (
          <CategoryItem
            key={cat.label}
            label={cat.label}
            isSelected={cat.selected}
          />
        ))}
      </ul>
    </div>
  );
};

export default CategorySection;
