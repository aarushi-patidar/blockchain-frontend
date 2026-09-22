"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { listingService } from "@/services/listingService";
import { Listing } from "@/types/api.types";
import Link from "next/link";

const ProductDetailPage = () => {
  const params = useParams();
  const id = params.id as string;
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [buyingLoading, setBuyingLoading] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        console.log(`[Product Detail] Fetching listing with ID: ${id}`);
        const response = await listingService.getListingById(id);

        if (response && response.data) {
          console.log("[Product Detail] Listing loaded:", response.data);
          setListing(response.data);
        } else {
          toast.error("Listing not found");
        }
      } catch (error) {
        console.error("[Product Detail] Fetch error:", error);
        toast.error(
          `Failed to load listing: ${
            error instanceof Error ? error.message : "Unknown error"
          }`,
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchListing();
  }, [id]);

  const handleBuy = async () => {
    const walletAddress = prompt("Enter your wallet address:");
    if (!walletAddress) return;

    setBuyingLoading(true);
    try {
      const response = await listingService.buyListing(id, walletAddress);

      if (response && response.success) {
        toast.success("Battery purchased successfully!");
        setListing((prev) => (prev ? { ...prev, status: "sold" } : null));
      } else {
        toast.error("Failed to purchase battery");
      }
    } catch (error) {
      console.error("[Product Detail] Buy error:", error);
      toast.error(
        `Failed to complete purchase: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      );
    } finally {
      setBuyingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen font-avant flex items-center justify-center bg-black text-white">
        Loading product details...
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <h1 className="text-3xl font-bold mb-4">Listing Not Found</h1>
        <Link
          href="/marketplace"
          className="text-cyan-400 hover:text-cyan-300 transition"
        >
          Back to Marketplace
        </Link>
      </div>
    );
  }

  const mainImage =
    listing.images && listing.images.length > 0
      ? listing.images.find((img) => img.position === 0)?.image_url ||
        listing.images[0]?.image_url
      : "https://5.imimg.com/data5/CY/HS/VU/SELLER-743647/exide-inverter-battery.jpeg";

  const displayImages =
    listing.images && listing.images.length > 0 ? listing.images : [];

  return (
    <div className="relative w-full min-h-screen font-avant overflow-hidden text-white">
      
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[url('/dashboardBg.svg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Image Gallery */}
          <div className="flex flex-col gap-4">
            <div className="w-full aspect-square rounded-3xl overflow-hidden shadow-2xl border border-cyan-400/20">
              <img
                src={mainImage}
                alt={listing.battery_code || "Battery"}
                className="w-full h-full object-cover"
              />
            </div>

            {displayImages.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {displayImages.map((img, idx) => (
                  <button
                    key={img.id}
                    className="aspect-square rounded-lg overflow-hidden border border-transparent hover:border-cyan-400 transition-all"
                  >
                    <img
                      src={img.image_url}
                      alt={`Gallery ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col gap-8">

            {/* Header */}
            <div>
              <h1 className="text-4xl font-bold mb-2">
                {listing.brand}
              </h1>
              <p className="text-cyan-400 text-lg">
                Battery Code: {listing.battery_code}
              </p>

              {listing.ai_verified && (
                <div className="mt-4 flex items-center gap-2 text-green-400 bg-green-500/10 px-4 py-2 rounded-lg w-fit">
                  <span className="text-xl">✓</span>
                  <span className="font-semibold">AI Verified</span>
                </div>
              )}
            </div>

            {/* Price */}
            <div className="border-y border-cyan-400/20 py-6">
              <div className="text-gray-400 text-sm mb-2">Price</div>
              <div className="text-5xl font-bold text-cyan-400">
                ${listing.price.toFixed(2)}
              </div>
            </div>

            {/* Specifications */}
            <div className="rounded-2xl p-6 backdrop-blur-xl bg-black/40 border border-cyan-400/20 shadow-xl">
              <h3 className="text-xl font-bold mb-4">Specifications</h3>

              <div className="space-y-4">
                {listing.health_score !== undefined && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Health Score</span>
                    <div className="flex items-center gap-3">
                      <div className="w-64 bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-full rounded-full transition-all ${
                            listing.health_score >= 80
                              ? "bg-green-500"
                              : listing.health_score >= 60
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                          style={{ width: `${listing.health_score}%` }}
                        />
                      </div>
                      <span className="font-bold w-12 text-right">
                        {listing.health_score.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                )}

                {listing.user_voltage !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-gray-300">User Voltage</span>
                    <span>{listing.user_voltage.toFixed(2)}V</span>
                  </div>
                )}

                {listing.predicted_voltage !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-gray-300">Predicted Voltage</span>
                    <span>{listing.predicted_voltage.toFixed(2)}V</span>
                  </div>
                )}

                {listing.battery_code && (
                  <div className="flex justify-between">
                    <span className="text-gray-300">Battery Code</span>
                    <span className="font-mono">{listing.battery_code}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Verification */}
            <div className="rounded-2xl p-6 backdrop-blur-xl bg-black/40 border border-cyan-400/20 shadow-xl">
              <h3 className="text-xl font-bold mb-3">
                Verification Status
              </h3>
              <div className="flex justify-between">
                <span className="text-gray-300">AI Verified</span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-bold ${
                    listing.ai_verified
                      ? "bg-green-500/20 text-green-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {listing.ai_verified ? "Verified" : "Pending"}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={handleBuy}
                disabled={listing.status === "sold" || buyingLoading}
                className={`flex-1 py-3 rounded-lg font-bold text-lg transition-all ${
                  listing.status === "sold" || buyingLoading
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-cyan-500 hover:bg-cyan-600 text-white"
                }`}
              >
                {buyingLoading
                  ? "Processing..."
                  : listing.status === "sold"
                  ? "Sold Out"
                  : "Buy Now"}
              </button>

              <button className="px-6 py-3 rounded-lg border border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 transition-all font-bold">
                Add to Wishlist
              </button>
            </div>

            {listing.created_at && (
              <div className="text-gray-500 text-sm text-center pt-4 border-t border-gray-800">
                Listed on{" "}
                {new Date(listing.created_at).toLocaleDateString()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
