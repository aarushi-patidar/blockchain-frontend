import React from "react";
import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="relative rounded-lg w-full mb-8">
      <input
        type="text"
        placeholder="Search for anything..."
        className="w-full font-avant shadow rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none"
      />
      <Search className="absolute right-4 top-3 text-gray-400 w-5 h-5" />
    </div>
  );
};

export default SearchBar;
