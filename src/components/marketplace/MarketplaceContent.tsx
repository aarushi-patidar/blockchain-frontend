"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { listingService } from "@/services/listingService";
import { Listing } from "@/types/api.types";
import SearchBar from "./SearchBar";
import CategorySection from "./CategorySection";
import PriceRangeSection from "./PriceRangeSection";
import BrandsSection from "./BrandsSection";
import TagsSection from "./TagsSection";
import ProductGrid from "./ProductGrid";

const MarketplaceContent = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await listingService.getListings();
        console.log("[Marketplace] API Response:", response);

        // Handle response with data property containing listings array
        if (response && response.data && Array.isArray(response.data)) {
          console.log("[Marketplace] Setting listings:", response.data);
          setListings(response.data);
        } else {
          console.warn("[Marketplace] Unexpected response format:", response);
        }
      } catch (error) {
        console.error("[Marketplace] Fetch error:", error);
        toast.error(
          `Failed to fetch listings: ${error instanceof Error ? error.message : "Unknown error"}`,
        );
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  return (
    <div className="w-full pt-20">
      <h1 className="text-4xl w-[50vw] px-10 py-5 rounded-2xl font-avant leading-tight shadow text-white mb-8">
        MARKETPLACE
      </h1>

      <SearchBar />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Filters */}
        <div className="lg:col-span-1">
          <CategorySection />
          <PriceRangeSection />
          {/* <BrandsSection />
          <TagsSection /> */}
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="text-white">Loading...</div>
          ) : (
            <ProductGrid listings={listings} />
          )}
        </div>
      </div>
    </div>
  );
};
export default MarketplaceContent;
