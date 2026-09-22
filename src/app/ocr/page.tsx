"use client";
import React, { useState, useRef } from "react";
import toast from "react-hot-toast";
import { ocrService, OCRResult } from "@/services/ocrService";
import Link from "next/link";

const OCRScanPage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [ocrResult, setOcrResult] = useState<OCRResult | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleScanLabel = async () => {
    if (!selectedFile) {
      toast.error("Please select an image");
      return;
    }

    setLoading(true);
    try {
      const response = await ocrService.scanLabel(selectedFile);

      if (response.success && response.data) {
        console.log("[OCR] Scan result:", response.data);
        setOcrResult(response.data);
        setShowResult(true);
        toast.success("Battery label scanned successfully");
      } else {
        toast.error(response.message || "Failed to scan label");
      }
    } catch (error) {
      console.error("[OCR] Scan error:", error);
      toast.error(
        `Failed to scan label: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreview(null);
    setOcrResult(null);
    setShowResult(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="relative w-full min-h-screen font-avant">
      <img
        src="dashboardBg.svg"
        className="fixed scale-x-130 -z-10 w-full h-full object-cover"
        alt="Background"
      />
      <div className="relative z-0 max-w-7xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/dashboard"
            className="text-cyan-400 hover:text-cyan-300 text-sm mb-4 inline-block"
          >
            Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">
            Scan Battery Label
          </h1>
          <p className="text-gray-400">
            Upload an image of your battery label for instant OCR scanning
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          {!showResult && (
            <div className="shadow rounded-xl p-8 border border-cyan-400/20">
              <h2 className="text-2xl font-bold text-white mb-6">
                Upload Image
              </h2>

              <div
                className="border-2 border-dashed border-cyan-400/40 rounded-lg p-8 text-center cursor-pointer hover:border-cyan-400/60 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                {preview ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={preview}
                      alt="Preview"
                      className="max-h-64 rounded-lg mb-4"
                    />
                    <p className="text-cyan-400 font-semibold text-sm">
                      {selectedFile?.name}
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-white font-semibold mb-2">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-gray-400 text-sm">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />

              <div className="flex gap-4 mt-8">
                <button
                  onClick={handleScanLabel}
                  disabled={!selectedFile || loading}
                  className={`flex-1 py-3 rounded-lg font-bold transition-all ${
                    !selectedFile || loading
                      ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                      : "bg-cyan-500 hover:bg-cyan-600 text-white"
                  }`}
                >
                  {loading ? "Scanning..." : "Scan Label"}
                </button>

                <button
                  onClick={handleReset}
                  className="px-6 py-3 rounded-lg border border-gray-600 text-gray-300 hover:border-gray-400 hover:text-white transition-all font-bold"
                >
                  Reset
                </button>
              </div>
            </div>
          )}

          {/* Results Section */}
          {showResult && ocrResult && (
            <div className="shadow rounded-xl p-8 border border-cyan-400/20">
              <h2 className="text-2xl font-bold text-white mb-6">
                Extracted Information
              </h2>

              <div className="space-y-4 mb-8">
                {ocrResult.battery_code && (
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <p className="text-gray-400 text-sm mb-1">Battery Code</p>
                    <p className="text-white font-semibold text-lg">
                      {ocrResult.battery_code}
                    </p>
                  </div>
                )}

                {ocrResult.brand && (
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <p className="text-gray-400 text-sm mb-1">Brand</p>
                    <p className="text-white font-semibold text-lg">
                      {ocrResult.brand}
                    </p>
                  </div>
                )}

                {ocrResult.model && (
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <p className="text-gray-400 text-sm mb-1">Model</p>
                    <p className="text-white font-semibold text-lg">
                      {ocrResult.model}
                    </p>
                  </div>
                )}

                {ocrResult.initial_capacity && (
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <p className="text-gray-400 text-sm mb-1">
                      Initial Capacity
                    </p>
                    <p className="text-white font-semibold text-lg">
                      {ocrResult.initial_capacity} Ah
                    </p>
                  </div>
                )}

                {ocrResult.voltage && (
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <p className="text-gray-400 text-sm mb-1">Voltage</p>
                    <p className="text-white font-semibold text-lg">
                      {ocrResult.voltage}V
                    </p>
                  </div>
                )}

                {ocrResult.chemistry && (
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <p className="text-gray-400 text-sm mb-1">Chemistry</p>
                    <p className="text-white font-semibold text-lg">
                      {ocrResult.chemistry}
                    </p>
                  </div>
                )}

                {ocrResult.manufacturing_date && (
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <p className="text-gray-400 text-sm mb-1">
                      Manufacturing Date
                    </p>
                    <p className="text-white font-semibold text-lg">
                      {ocrResult.manufacturing_date}
                    </p>
                  </div>
                )}
              </div>

              {preview && (
                <div className="mb-8">
                  <p className="text-gray-400 text-sm mb-2">Original Image</p>
                  <img
                    src={preview}
                    alt="Scanned"
                    className="w-full rounded-lg border border-gray-700"
                  />
                </div>
              )}

              <div className="flex gap-4">
                <button
                  onClick={handleReset}
                  className="flex-1 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white font-bold transition-all"
                >
                  Scan Another
                </button>

                <Link
                  href="/dashboard"
                  className="flex-1 py-3 rounded-lg border border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 transition-all font-bold text-center"
                >
                  Back to Dashboard
                </Link>
              </div>
            </div>
          )}

          {/* Info Section */}
          <div className="shadow rounded-xl p-8 border border-cyan-400/20">
            <h3 className="text-xl font-bold text-white mb-6">How It Works</h3>

            <div className="space-y-4">
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <p className="text-cyan-400 font-bold mb-2">1. Prepare Image</p>
                <p className="text-gray-300 text-sm">
                  Take a clear photo of your battery label with good lighting
                </p>
              </div>

              <div className="bg-gray-800/50 p-4 rounded-lg">
                <p className="text-cyan-400 font-bold mb-2">2. Upload</p>
                <p className="text-gray-300 text-sm">
                  Click the upload area and select your battery label image
                </p>
              </div>

              <div className="bg-gray-800/50 p-4 rounded-lg">
                <p className="text-cyan-400 font-bold mb-2">3. Scan</p>
                <p className="text-gray-300 text-sm">
                  Our AI will extract all battery information automatically
                </p>
              </div>

              <div className="bg-gray-800/50 p-4 rounded-lg">
                <p className="text-cyan-400 font-bold mb-2">4. Review</p>
                <p className="text-gray-300 text-sm">
                  Verify the extracted data and proceed with listing
                </p>
              </div>
            </div>

            <div className="mt-8 p-4 bg-cyan-500/10 border border-cyan-400/30 rounded-lg">
              <p className="text-gray-300 text-sm">
                The OCR scanner recognizes battery models, codes, capacity
                ratings, manufacturing dates, and other specifications from
                label text.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OCRScanPage;
