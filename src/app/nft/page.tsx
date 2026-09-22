"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { nftService } from "@/services/nftService";
import Link from "next/link";

const NFTManagementPage = () => {
  const [activeTab, setActiveTab] = useState<"mint" | "transfer" | "burn">(
    "mint",
  );
  const [loading, setLoading] = useState(false);

  // Mint form state
  const [mintData, setMintData] = useState({
    battery_code: "",
    owner_wallet: "",
    cid: "",
    health_score: 85,
  });

  // Transfer form state
  const [transferData, setTransferData] = useState({
    tokenId: "",
    from: "",
    to: "",
  });

  // Burn form state
  const [burnData, setBurnData] = useState({
    tokenId: "",
  });

  const [txResult, setTxResult] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);

  const handleMint = async () => {
    if (!mintData.battery_code || !mintData.owner_wallet || !mintData.cid) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await nftService.mintBatteryNFT(mintData);

      if (response && response.data) {
        console.log("[NFT] Mint result:", response.data);
        setTxResult({
          action: "Minted",
          tokenId: response.data.tokenId,
          txHash: response.data.txHash,
        });
        setShowResult(true);
        toast.success("Battery NFT minted successfully");
        setMintData({
          battery_code: "",
          owner_wallet: "",
          cid: "",
          health_score: 85,
        });
      } else {
        toast.error("Failed to mint NFT");
      }
    } catch (error) {
      console.error("[NFT] Mint error:", error);
      toast.error(
        `Failed to mint NFT: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    } finally {
      setLoading(false);
    }
  };

  const handleTransfer = async () => {
    if (!transferData.tokenId || !transferData.from || !transferData.to) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await nftService.transferBatteryNFT(
        transferData.tokenId,
        transferData.from,
        transferData.to,
      );

      if (response && response.data) {
        console.log("[NFT] Transfer result:", response.data);
        setTxResult({
          action: "Transferred",
          tokenId: response.data.tokenId,
          txHash: response.data.txHash,
          from: transferData.from,
          to: transferData.to,
        });
        setShowResult(true);
        toast.success("NFT transferred successfully");
        setTransferData({ tokenId: "", from: "", to: "" });
      } else {
        toast.error("Failed to transfer NFT");
      }
    } catch (error) {
      console.error("[NFT] Transfer error:", error);
      toast.error(
        `Failed to transfer NFT: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBurn = async () => {
    if (!burnData.tokenId) {
      toast.error("Please enter token ID");
      return;
    }

    setLoading(true);
    try {
      const response = await nftService.burnBatteryNFT(burnData.tokenId);

      if (response && response.data) {
        console.log("[NFT] Burn result:", response.data);
        setTxResult({
          action: "Burned",
          tokenId: response.data.tokenId,
          txHash: response.data.txHash,
        });
        setShowResult(true);
        toast.success("NFT burned successfully");
        setBurnData({ tokenId: "" });
      } else {
        toast.error("Failed to burn NFT");
      }
    } catch (error) {
      console.error("[NFT] Burn error:", error);
      toast.error(
        `Failed to burn NFT: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    } finally {
      setLoading(false);
    }
  };

  const resetForms = () => {
    setShowResult(false);
    setTxResult(null);
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
            NFT Battery Management
          </h1>
          <p className="text-gray-400">
            Mint, transfer, and burn battery NFTs on the blockchain
          </p>
        </div>

        {!showResult && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Tab Navigation */}
            <div className="lg:col-span-3">
              <div className="flex border-b border-gray-700 mb-8">
                {["mint", "transfer", "burn"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`px-6 py-3 font-bold transition-colors ${
                      activeTab === tab
                        ? "border-b-2 border-cyan-400 text-cyan-400"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)} NFT
                  </button>
                ))}
              </div>
            </div>

            {/* Mint Form */}
            {activeTab === "mint" && (
              <div className="lg:col-span-2 shadow rounded-xl p-8 border border-cyan-400/20">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Mint Battery NFT
                </h2>

                <div className="space-y-4 mb-8">
                  <div>
                    <label className="block text-gray-300 text-sm font-semibold mb-2">
                      Battery Code
                    </label>
                    <input
                      type="text"
                      value={mintData.battery_code}
                      onChange={(e) =>
                        setMintData({
                          ...mintData,
                          battery_code: e.target.value,
                        })
                      }
                      placeholder="e.g., BAT-001"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-semibold mb-2">
                      Owner Wallet Address
                    </label>
                    <input
                      type="text"
                      value={mintData.owner_wallet}
                      onChange={(e) =>
                        setMintData({
                          ...mintData,
                          owner_wallet: e.target.value,
                        })
                      }
                      placeholder="0x..."
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-semibold mb-2">
                      IPFS CID (Metadata)
                    </label>
                    <input
                      type="text"
                      value={mintData.cid}
                      onChange={(e) =>
                        setMintData({ ...mintData, cid: e.target.value })
                      }
                      placeholder="Qm..."
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-semibold mb-3">
                      Health Score: {mintData.health_score}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={mintData.health_score}
                      onChange={(e) =>
                        setMintData({
                          ...mintData,
                          health_score: Number(e.target.value),
                        })
                      }
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                    />
                  </div>
                </div>

                <button
                  onClick={handleMint}
                  disabled={loading}
                  className={`w-full py-3 rounded-lg font-bold transition-all ${
                    loading
                      ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                      : "bg-cyan-500 hover:bg-cyan-600 text-white"
                  }`}
                >
                  {loading ? "Minting..." : "Mint NFT"}
                </button>
              </div>
            )}

            {/* Transfer Form */}
            {activeTab === "transfer" && (
              <div className="lg:col-span-2 shadow rounded-xl p-8 border border-cyan-400/20">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Transfer Battery NFT
                </h2>

                <div className="space-y-4 mb-8">
                  <div>
                    <label className="block text-gray-300 text-sm font-semibold mb-2">
                      Token ID
                    </label>
                    <input
                      type="text"
                      value={transferData.tokenId}
                      onChange={(e) =>
                        setTransferData({
                          ...transferData,
                          tokenId: e.target.value,
                        })
                      }
                      placeholder="Token ID"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-semibold mb-2">
                      From Address
                    </label>
                    <input
                      type="text"
                      value={transferData.from}
                      onChange={(e) =>
                        setTransferData({
                          ...transferData,
                          from: e.target.value,
                        })
                      }
                      placeholder="0x..."
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-semibold mb-2">
                      To Address
                    </label>
                    <input
                      type="text"
                      value={transferData.to}
                      onChange={(e) =>
                        setTransferData({ ...transferData, to: e.target.value })
                      }
                      placeholder="0x..."
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <button
                  onClick={handleTransfer}
                  disabled={loading}
                  className={`w-full py-3 rounded-lg font-bold transition-all ${
                    loading
                      ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                      : "bg-cyan-500 hover:bg-cyan-600 text-white"
                  }`}
                >
                  {loading ? "Transferring..." : "Transfer NFT"}
                </button>
              </div>
            )}

            {/* Burn Form */}
            {activeTab === "burn" && (
              <div className="lg:col-span-2 shadow rounded-xl p-8 border border-cyan-400/20">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Burn Battery NFT
                </h2>

                <div className="space-y-4 mb-8">
                  <div>
                    <label className="block text-gray-300 text-sm font-semibold mb-2">
                      Token ID
                    </label>
                    <input
                      type="text"
                      value={burnData.tokenId}
                      onChange={(e) =>
                        setBurnData({ ...burnData, tokenId: e.target.value })
                      }
                      placeholder="Token ID"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div className="bg-red-500/10 border border-red-400/30 p-4 rounded-lg">
                    <p className="text-red-400 font-bold text-sm">
                      Warning: Burning NFT is irreversible
                    </p>
                    <p className="text-gray-300 text-sm mt-1">
                      This action will permanently destroy the NFT on the
                      blockchain.
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleBurn}
                  disabled={loading}
                  className={`w-full py-3 rounded-lg font-bold transition-all ${
                    loading
                      ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700 text-white"
                  }`}
                >
                  {loading ? "Burning..." : "Burn NFT"}
                </button>
              </div>
            )}

            {/* Info Section */}
            <div className="shadow rounded-xl p-8 border border-cyan-400/20">
              <h3 className="text-xl font-bold text-white mb-6">About NFTs</h3>

              <div className="space-y-4">
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <p className="text-cyan-400 font-bold mb-2">Mint</p>
                  <p className="text-gray-300 text-sm">
                    Create a new battery NFT on the blockchain with its metadata
                    stored on IPFS.
                  </p>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <p className="text-cyan-400 font-bold mb-2">Transfer</p>
                  <p className="text-gray-300 text-sm">
                    Move ownership of a battery NFT from one wallet to another
                    securely.
                  </p>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <p className="text-cyan-400 font-bold mb-2">Burn</p>
                  <p className="text-gray-300 text-sm">
                    Permanently remove an NFT from circulation. This action
                    cannot be undone.
                  </p>
                </div>

                <div className="bg-cyan-500/10 border border-cyan-400/30 p-4 rounded-lg">
                  <p className="text-gray-300 text-sm">
                    Each battery NFT contains a digital passport with verified
                    health metrics, ownership history, and authentication
                    details.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Transaction Result */}
        {showResult && txResult && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="lg:col-span-2 shadow rounded-xl p-8 border border-green-400/30 bg-green-500/5">
              <h2 className="text-2xl font-bold text-green-400 mb-6">
                Transaction Successful
              </h2>

              <div className="space-y-4 mb-8">
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm mb-1">Action</p>
                  <p className="text-white font-semibold text-lg">
                    {txResult.action}
                  </p>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm mb-1">Token ID</p>
                  <p className="text-white font-mono font-semibold">
                    {txResult.tokenId}
                  </p>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm mb-1">Transaction Hash</p>
                  <p className="text-white font-mono text-sm break-all">
                    {txResult.txHash}
                  </p>
                </div>

                {txResult.from && (
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <p className="text-gray-400 text-sm mb-1">From</p>
                    <p className="text-white font-mono text-sm">
                      {txResult.from}
                    </p>
                  </div>
                )}

                {txResult.to && (
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <p className="text-gray-400 text-sm mb-1">To</p>
                    <p className="text-white font-mono text-sm">
                      {txResult.to}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={resetForms}
                  className="flex-1 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white font-bold transition-all"
                >
                  Perform Another Action
                </button>

                <Link
                  href="/dashboard"
                  className="flex-1 py-3 rounded-lg border border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 transition-all font-bold text-center"
                >
                  Back to Dashboard
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NFTManagementPage;
