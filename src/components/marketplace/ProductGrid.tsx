import React from "react";
import { Listing } from "@/types/api.types";
import Link from "next/link"; // Assuming we want to link to a details page

interface ProductCardProps {
  listing: Listing;
}

const ProductCard: React.FC<ProductCardProps> = ({ listing }) => {
  const mainImage =
    listing.images && listing.images.length > 0
      ? listing.images.find((img) => img.position === 0)?.image_url ||
        listing.images[0]?.image_url
      : "https://5.imimg.com/data5/CY/HS/VU/SELLER-743647/exide-inverter-battery.jpeg";

  return (
    <Link href={`/marketplace/${listing.id}`}>
      <div className="shadow border-black h-[300px] flex flex-col items-center rounded-lg overflow-hidden hover:border-cyan-400/60 transition-colors cursor-pointer bg-gray-900">
        <div className=" h-[60%] w-[70%] rounded-2xl overflow-hidden mt-4 relative">
          <img
            src={mainImage}
            alt={listing.battery_code || "Battery"}
            className="w-full h-full object-cover"
          />
          {listing.status === "sold" && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-bold border-2 border-red-500 px-2 py-1 rotate-[-15deg]">
                SOLD
              </span>
            </div>
          )}
        </div>
        <div className="p-3 font-avant text-center w-full">
          <h4 className="text-white text-sm font-semibold mb-1 line-clamp-2">
            {listing.brand} {listing.battery_code || ""}
          </h4>
          <p className="text-gray-400 text-xs mb-2">
            Health:{" "}
            {listing.health_score
              ? `${listing.health_score.toFixed(1)}%`
              : "N/A"}
          </p>
          <p className="text-cyan-400 font-bold text-sm">{listing.price} ETH</p>
        </div>
      </div>
    </Link>
  );
};

interface ProductGridProps {
  listings: Listing[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ listings }) => {
  if (listings.length === 0) {
    return (
      <div className="text-white text-center py-10">No listings found.</div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {listings.map((listing) => (
        <ProductCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
};

export default ProductGrid;
