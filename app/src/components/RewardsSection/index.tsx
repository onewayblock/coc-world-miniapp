"use client";
import { useState } from "react";
import { RewardModal } from "@/components/RewardModal";

export function RewardsSection() {
  const [humanityVerified, setHumanityVerified] = useState(true);
  const [clashLinked, setClashLinked] = useState(true);
  const [rewardModalOpen, setRewardModalOpen] = useState(false);

  return (
    <div className="w-full space-y-4 sm:space-y-6">
      <div className="flex gap-4">
        <div
          className="flex-1 bg-white rounded-lg p-3 sm:p-4 cursor-pointer"
          onClick={() => setHumanityVerified(!humanityVerified)}
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 mb-3 flex items-center justify-center">
              <img
                src="/icons/image (6).png"
                alt="Humanity"
                className="w-full h-full"
              />
            </div>
            <h3 className="text-lg font-semibold text-black mb-1">Humanity</h3>
            {humanityVerified ? (
              <div className="flex items-center gap-1 text-green-600">
                <span className="text-sm">✓</span>
                <span className="text-sm font-medium">Verified</span>
              </div>
            ) : (
              <span className="text-sm text-gray-600">Tap to verify</span>
            )}
          </div>
        </div>

        <div
          className="flex-1 bg-white rounded-lg p-3 sm:p-4 cursor-pointer"
          onClick={() => setClashLinked(!clashLinked)}
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 mb-3 flex items-center justify-center">
              <img
                src="/icons/coc-logo.png"
                alt="Clash of Coins"
                className="w-full h-full"
              />
            </div>
            <h3 className="text-lg font-semibold text-black mb-1">
              Clash of Coins
            </h3>
            {clashLinked ? (
              <div className="flex items-center gap-1 text-green-600">
                <span className="text-sm">✓</span>
                <span className="text-sm font-medium">Linked</span>
              </div>
            ) : (
              <span className="text-sm text-gray-600">Tap to Link</span>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-3 sm:p-4">
        <h2 className="text-lg font-semibold text-black mb-4">
          How to get a Reward?
        </h2>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center">
                <img
                  src="/icons/image (7).png"
                  alt="Verify"
                  className="w-full h-full"
                />
              </div>
              <span className="text-black font-medium">
                Get verified as Human
              </span>
            </div>
            {humanityVerified ? (
              <div className="flex items-center gap-1 text-green-600">
                <span className="text-sm">✓</span>
                <span className="text-sm font-medium">Verified</span>
              </div>
            ) : (
              <span className="text-sm text-gray-500">Find Orb</span>
            )}
          </div>

          {/* Task 2 - Link Clash of Coins Account */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center">
                <img
                  src="/icons/coc-logo.png"
                  alt="Link"
                  className="w-full h-full"
                />
              </div>
              <span className="text-black font-medium text-left">
                Link your Clash of Coins Account
              </span>
            </div>
            {clashLinked ? (
              <div className="flex items-center gap-1 text-green-600">
                <span className="text-sm">✓</span>
                <span className="text-sm font-medium">Linked</span>
              </div>
            ) : (
              <span className="text-sm text-gray-500">Link</span>
            )}
          </div>

          {/* Task 3 - Sign on-chain transaction */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center">
                <img
                  src="/icons/transIcon.png"
                  alt="Sign"
                  className="w-full h-full"
                />
              </div>
              <span className="text-black font-medium">
                Sign on-chain transaction
              </span>
            </div>
            {humanityVerified && clashLinked ? (
              <button
                className="bg-green-600 text-white px-4 py-1 rounded text-sm font-medium hover:bg-green-700 transition-colors"
                onClick={() => setRewardModalOpen(true)}
              >
                Claim
              </button>
            ) : (
              <span className="text-sm text-gray-500">Sign</span>
            )}
          </div>
        </div>
      </div>

      <RewardModal open={rewardModalOpen} onOpenChange={setRewardModalOpen} />
    </div>
  );
}
