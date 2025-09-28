"use client";
import { useState } from "react";
import { RewardModal } from "@/components/RewardModal";

export function HowItWorksModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [rewardModalOpen, setRewardModalOpen] = useState(false);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="bg-green-600 text-white px-4 py-1 rounded text-sm font-medium"
      >
        Claim
      </button>
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div
        className="bg-[#1A1A2E] rounded-3xl p-6 w-full max-w-sm relative"
        style={{ backgroundColor: "#1A1A2E" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2"></div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white text-xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">How it Works</h1>
          <p className="text-white/80 mb-6 text-sm">
            Sign free World Chain transaction to claim you in-game reward
          </p>

          {/* Worldcoin Icon */}
          <div className="flex justify-center mb-8 mt-3">
            <img
              src="/icons/transIcon.png"
              alt="Worldcoin"
              className="w-16 h-16"
            />
          </div>

          {/* Steps */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-1 text-left">
              <span className="text-white font-bold text-sm min-w-[20px]">
                1.
              </span>
              <span className="text-white">Connect your wallet</span>
            </div>
            <div className="flex items-center gap-1 text-left">
              <span className="text-white font-bold text-sm min-w-[20px]">
                2.
              </span>
              <span className="text-white">
                Sign free World Chain transaction
              </span>
            </div>
            <div className="flex items-center gap-1 text-left">
              <span className="text-white font-bold text-sm min-w-[20px]">
                3.
              </span>
              <span className="text-white">
                Get your loot in Clash of Coins!
              </span>
            </div>
          </div>

          {/* Next Button */}
          <button
            className="w-[50%] text-white py-5 rounded-full font-semibold transition-colors hover:opacity-90"
            style={{ backgroundColor: "rgb(29 40 196)" }}
            onClick={() => {
              setIsOpen(false);
              setRewardModalOpen(true);
            }}
          >
            Next
          </button>
        </div>
      </div>

      <RewardModal open={rewardModalOpen} onOpenChange={setRewardModalOpen} />
    </div>
  );
}
