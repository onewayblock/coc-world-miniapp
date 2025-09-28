"use client";
import { useState } from "react";
import { RewardModal } from "@/components/RewardModal";

export function RewardsSection() {
  const [humanityVerified, setHumanityVerified] = useState(true);
  const [clashLinked, setClashLinked] = useState(true);
  const [rewardModalOpen, setRewardModalOpen] = useState(false);

  return (
    <div className="w-full space-y-3">
      <div className="flex gap-3">
        <div
          className="flex-1 bg-white rounded-lg p-2 cursor-pointer"
          onClick={() => setHumanityVerified(!humanityVerified)}
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-8 h-8 mb-2 flex items-center justify-center">
              <img
                src="/icons/image (6).png"
                alt="Humanity"
                className="w-full h-full"
              />
            </div>
            <h3 className="text-sm font-semibold text-black mb-1">Humanity</h3>
            {humanityVerified ? (
              <div className="flex items-center gap-1 text-green-600">
                <span className="text-xs">✓</span>
                <span className="text-xs font-medium">Verified</span>
              </div>
            ) : (
              <span className="text-xs text-gray-600">Tap to verify</span>
            )}
          </div>
        </div>

        <div
          className="flex-1 bg-white rounded-lg p-2 cursor-pointer"
          onClick={() => setClashLinked(!clashLinked)}
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-8 h-8 mb-2 flex items-center justify-center">
              <img
                src="/icons/coc-logo.png"
                alt="Clash of Coins"
                className="w-full h-full"
              />
            </div>
            <h3 className="text-sm font-semibold text-black mb-1">
              Clash of Coins
            </h3>
            {clashLinked ? (
              <div className="flex items-center gap-1 text-green-600">
                <span className="text-xs">✓</span>
                <span className="text-xs font-medium">Linked</span>
              </div>
            ) : (
              <span className="text-xs text-gray-600">Tap to Link</span>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-3">
        <h2 className="text-base font-semibold text-black mb-3">
          How to get a Reward?
        </h2>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 flex items-center justify-center">
                <img
                  src="/icons/image (7).png"
                  alt="Verify"
                  className="w-full h-full"
                />
              </div>
              <span className="text-black font-medium text-sm">
                Get verified as Human
              </span>
            </div>
            {humanityVerified ? (
              <div className="flex items-center gap-1 text-green-600">
                <span className="text-xs">✓</span>
                <span className="text-xs font-medium">Verified</span>
              </div>
            ) : (
              <span className="text-xs text-gray-500">Find Orb</span>
            )}
          </div>

          {/* Task 2 - Link Clash of Coins Account */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 flex items-center justify-center">
                <img
                  src="/icons/coc-logo.png"
                  alt="Link"
                  className="w-full h-full"
                />
              </div>
              <span className="text-black font-medium text-left text-sm">
                Link your Clash of Coins Account
              </span>
            </div>
            {clashLinked ? (
              <div className="flex items-center gap-1 text-green-600">
                <span className="text-xs">✓</span>
                <span className="text-xs font-medium">Linked</span>
              </div>
            ) : (
              <span className="text-xs text-gray-500">Link</span>
            )}
          </div>

          {/* Task 3 - Sign on-chain transaction */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 flex items-center justify-center">
                <img
                  src="/icons/transIcon.png"
                  alt="Sign"
                  className="w-full h-full"
                />
              </div>
              <span className="text-black font-medium text-sm">
                Sign on-chain transaction
              </span>
            </div>
            {humanityVerified && clashLinked ? (
              <button
                className="bg-green-600 text-white px-3 py-1 rounded text-xs font-medium hover:bg-green-700 transition-colors"
                onClick={() => setRewardModalOpen(true)}
              >
                Claim
              </button>
            ) : (
              <span className="text-xs text-gray-500">Sign</span>
            )}
          </div>
        </div>
      </div>

      <RewardModal open={rewardModalOpen} onOpenChange={setRewardModalOpen} />
    </div>
  );
}
