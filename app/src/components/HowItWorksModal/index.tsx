"use client";
import { useState } from "react";
import { RewardModal } from "@/components/RewardModal";

export function HowItWorksModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [rewardModalOpen, setRewardModalOpen] = useState(false);

  if (!isOpen) {
    return (
      <div className="w-full flex justify-start mt-3">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 flex items-center gap-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          How it works
        </button>
      </div>
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
