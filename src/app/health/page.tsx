"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  predictionService,
  PredictionResponse,
} from "@/services/predictionService";
import Link from "next/link";

const HealthStatusPage = () => {
  const [sohValue, setSohValue] = useState<number>(85);
  const [loading, setLoading] = useState(false);
  const [healthData, setHealthData] = useState<PredictionResponse | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleCheckHealth = async () => {
    if (sohValue === null || sohValue < 0 || sohValue > 100) {
      toast.error("Please enter a valid SOH percentage (0-100)");
      return;
    }

    setLoading(true);
    try {
      const response = await predictionService.getHealthStatus(sohValue);

      if (response && response.data) {
        console.log("[Health Status] Result:", response.data);
        setHealthData(response.data);
        setShowResult(true);
        toast.success("Health assessment completed");
      } else {
        toast.error("Failed to get health status");
      }
    } catch (error) {
      console.error("[Health Status] Error:", error);
      toast.error(
        `Failed to assess health: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (soh: number) => {
    if (soh >= 80) return "text-green-400";
    if (soh >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const getStatusBg = (soh: number) => {
    if (soh >= 80) return "bg-green-500/10 border-green-400/30";
    if (soh >= 60) return "bg-yellow-500/10 border-yellow-400/30";
    return "bg-red-500/10 border-red-400/30";
  };

  const getHealthLabel = (soh: number) => {
    if (soh >= 90) return "Excellent";
    if (soh >= 80) return "Good";
    if (soh >= 70) return "Fair";
    if (soh >= 60) return "Acceptable";
    if (soh >= 50) return "Poor";
    return "Critical";
  };

  return (
    <div className="relative w-full min-h-screen font-avant">
      <img
        src="dashboardBg.svg"
        className="fixed scale-x-130 -z-10 w-full h-full object-cover"
        alt="Background"
      />
      <div className="relative z-0 max-w-6xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/dashboard"
            className="text-cyan-400 hover:text-cyan-300 text-sm mb-4 inline-block"
          >
            Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">
            Battery Health Status
          </h1>
          <p className="text-gray-400">
            Assess battery health based on State of Health (SOH) percentage
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="shadow rounded-xl p-8 border border-cyan-400/20">
            <h2 className="text-2xl font-bold text-white mb-6">
              Check Health Status
            </h2>

            <div className="mb-8">
              <label className="block text-gray-300 text-sm font-semibold mb-3">
                State of Health (SOH) %
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sohValue}
                  onChange={(e) => setSohValue(Number(e.target.value))}
                  className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
                <div className="w-20 bg-gray-800 border border-gray-700 rounded-lg p-3 text-center">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={sohValue}
                    onChange={(e) =>
                      setSohValue(
                        Math.min(100, Math.max(0, Number(e.target.value))),
                      )
                    }
                    className="w-full bg-transparent text-white text-center font-bold outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Live Preview */}
            <div
              className={`p-6 rounded-lg border mb-8 ${getStatusBg(sohValue)}`}
            >
              <p className="text-gray-400 text-sm mb-2">Current SOH</p>
              <div className="flex items-baseline gap-3">
                <p className={`text-4xl font-bold ${getStatusColor(sohValue)}`}>
                  {sohValue}%
                </p>
                <p
                  className={`text-lg font-semibold ${getStatusColor(sohValue)}`}
                >
                  {getHealthLabel(sohValue)}
                </p>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3 mt-4">
                <div
                  className={`h-full rounded-full transition-all ${
                    sohValue >= 80
                      ? "bg-green-500"
                      : sohValue >= 60
                        ? "bg-yellow-500"
                        : "bg-red-500"
                  }`}
                  style={{ width: `${sohValue}%` }}
                />
              </div>
            </div>

            <button
              onClick={handleCheckHealth}
              disabled={loading}
              className={`w-full py-3 rounded-lg font-bold transition-all ${
                loading
                  ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-cyan-500 hover:bg-cyan-600 text-white"
              }`}
            >
              {loading ? "Assessing..." : "Assess Health"}
            </button>
          </div>

          {/* Results Section */}
          {showResult && healthData && (
            <div className="shadow rounded-xl p-8 border border-cyan-400/20">
              <h2 className="text-2xl font-bold text-white mb-6">
                Assessment Result
              </h2>

              <div
                className={`p-6 rounded-lg border mb-8 ${getStatusBg(healthData.soh_percentage)}`}
              >
                <p className="text-gray-400 text-sm mb-2">Health Status</p>
                <p
                  className={`text-3xl font-bold ${getStatusColor(healthData.soh_percentage)} mb-4`}
                >
                  {healthData.health_status}
                </p>
                <div className="space-y-3">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">SOH Percentage</p>
                    <p className="text-white font-semibold text-lg">
                      {healthData.soh_percentage.toFixed(1)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">
                      Confidence Level
                    </p>
                    <p className="text-white font-semibold text-lg">
                      {healthData.confidence.toFixed(0)}%
                    </p>
                  </div>
                </div>
              </div>

              {healthData.recommendation && (
                <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 mb-8">
                  <p className="text-gray-400 text-sm font-semibold mb-3">
                    Recommendation
                  </p>
                  <p className="text-white leading-relaxed">
                    {healthData.recommendation}
                  </p>
                </div>
              )}

              {/* Health Ranges Reference */}
              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <p className="text-gray-400 text-sm font-semibold mb-4">
                  Health Status Reference
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-green-400">90-100%</span>
                    <span className="text-gray-400">Excellent</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-green-400">80-89%</span>
                    <span className="text-gray-400">Good</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-yellow-400">70-79%</span>
                    <span className="text-gray-400">Fair</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-yellow-400">60-69%</span>
                    <span className="text-gray-400">Acceptable</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-red-400">50-59%</span>
                    <span className="text-gray-400">Poor</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-red-400">Below 50%</span>
                    <span className="text-gray-400">Critical</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Info Section */}
          <div className="shadow rounded-xl p-8 border border-cyan-400/20">
            <h3 className="text-xl font-bold text-white mb-6">
              Understanding SOH
            </h3>

            <div className="space-y-4">
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <p className="text-cyan-400 font-bold mb-2">What is SOH?</p>
                <p className="text-gray-300 text-sm">
                  State of Health is a measure of the battery's current
                  condition relative to its ideal condition, expressed as a
                  percentage.
                </p>
              </div>

              <div className="bg-gray-800/50 p-4 rounded-lg">
                <p className="text-cyan-400 font-bold mb-2">Capacity Fade</p>
                <p className="text-gray-300 text-sm">
                  As batteries age, they lose capacity. SOH reflects how much
                  capacity remains compared to the original.
                </p>
              </div>

              <div className="bg-gray-800/50 p-4 rounded-lg">
                <p className="text-cyan-400 font-bold mb-2">
                  Factors Affecting SOH
                </p>
                <p className="text-gray-300 text-sm">
                  Age, charge cycles, temperature exposure, and usage patterns
                  all impact battery health.
                </p>
              </div>

              <div className="bg-gray-800/50 p-4 rounded-lg">
                <p className="text-cyan-400 font-bold mb-2">End of Life</p>
                <p className="text-gray-300 text-sm">
                  Most batteries are considered end-of-life when SOH drops below
                  80% for primary use or 60% for secondary use.
                </p>
              </div>
            </div>
          </div>

          {/* Recommendations Section */}
          <div className="shadow rounded-xl p-8 border border-cyan-400/20">
            <h3 className="text-xl font-bold text-white mb-6">What To Do</h3>

            <div className="space-y-4">
              <div className="bg-green-500/10 border border-green-400/30 p-4 rounded-lg">
                <p className="text-green-400 font-bold mb-2">SOH Above 80%</p>
                <p className="text-gray-300 text-sm">
                  Battery is in excellent condition. Suitable for primary
                  applications like electric vehicles.
                </p>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-400/30 p-4 rounded-lg">
                <p className="text-yellow-400 font-bold mb-2">SOH 60-80%</p>
                <p className="text-gray-300 text-sm">
                  Battery is still usable. Best suited for secondary
                  applications like energy storage or portable devices.
                </p>
              </div>

              <div className="bg-red-500/10 border border-red-400/30 p-4 rounded-lg">
                <p className="text-red-400 font-bold mb-2">SOH Below 60%</p>
                <p className="text-gray-300 text-sm">
                  Battery condition is poor. Consider recycling or specialized
                  applications only. Not recommended for general use.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthStatusPage;
