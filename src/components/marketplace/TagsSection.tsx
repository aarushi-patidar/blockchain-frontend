import React from "react";

const TagButton: React.FC<{ label: string }> = ({ label }) => {
  return (
    <button className="border border-cyan-400/40 text-cyan-400 hover:border-cyan-400 hover:bg-cyan-400/10 px-3 py-1 rounded text-xs transition-colors">
      {label}
    </button>
  );
};

const tags = [
  "Smart",
  "iPhone",
  "TV",
  "Smartphone",
  "Wireless",
  "WiFi",
  "Smart TV",
  "Monitor",
  "Power Bank",
  "Charger",
  "Gaming",
  "Tablet",
];

const TagsSection = () => {
  return (
    <div className="bg-black/40 backdrop-blur-sm border border-cyan-400/20 rounded-lg p-4 mb-6">
      <h3 className="text-cyan-400 uppercase text-sm font-semibold mb-4">
        Popular Tags
      </h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <TagButton key={tag} label={tag} />
        ))}
      </div>
    </div>
  );
};

export default TagsSection;
