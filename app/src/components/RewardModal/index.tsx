"use client";
import { useState } from "react";
import clsx from "clsx";
import { Button } from "@/shared/ui/button";

interface RewardModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Status = "none" | "pending" | "success" | "claimError";

export function RewardModal({ open, onOpenChange }: RewardModalProps) {
  const [status, setStatus] = useState<Status>("none");
  const [connectedWallet] = useState(true); // Mock: wallet connected

  // Mock data
  const offer = {
    id: "1",
    name: "soft-100k",
    items: [
      {
        type: "SOFT_CURRENCY",
        amount: 100000,
        image: "units-booster.png",
      },
    ],
    activityPoints: 50,
  };

 

  const getTitle = () => {
    const nameToTitle = {
      "soft-100k": "UNITS BOOSTER",
      "soft-3m": "UNITS BOOSTER",
      "income-booster": "INCOME BOOSTER",
    };

    if (offer.items?.[0]?.image && offer.items?.[0].type === "GAME_ITEM") {
      return (
        <p className="text-white lg:text-2xl text-lg font-bold uppercase text-center">
          {nameToTitle[offer.name as keyof typeof nameToTitle]}
        </p>
      );
    }
    if (offer.items?.[0].type === "SOFT_CURRENCY") {
      return (
        <div className="flex items-center gap-1 justify-center">
          <div className="lg:w-6 lg:h-6 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
            <span className="text-black font-bold text-xs">$</span>
          </div>
          <p className="text-white lg:text-2xl text-lg font-bold uppercase text-center">
            {formatNumber(offer.items?.[0].amount || 0)} UNITS
          </p>
        </div>
      );
    }
    return null;
  };

  const getDuration = (offerName: string) => {
    const titleToDuration: Record<string, string> = {
      "soft-100k": "3H",
      "soft-3m": "24H",
      "income-booster": "72H",
    };
    return titleToDuration[offerName];
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  const truncatedString = (str: string, length: number) => {
    if (str.length <= length) return str;
    return str.substring(0, length) + "...";
  };

  const handleClaim = () => {
    setStatus("pending");
    // Mock claim process
    setTimeout(() => {
      setStatus("success");
    }, 2000);
  };

  const renderNotification = () => {
    switch (status) {
      case "claimError":
        return (
          <div className="flex items-center justify-center w-full absolute bottom-[72px] left-0 bg-[rgba(255,62,62,0.15)] uppercase text-base md:text-xl text-center text-[#FF3E3E] py-2 font-semibold border-r-[3px] border-r-[#FF3E3E] animate-slideIn">
            CLAIM ERROR
            <div className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">!</span>
            </div>
          </div>
        );

      case "success":
        return (
          <div className="flex items-center justify-center w-full absolute bottom-[20px] left-0 bg-[rgba(70,224,102,0.15)] uppercase text-base md:text-xl text-center text-[#46E066] py-2 font-semibold border-r-[3px] border-r-[#46E066] animate-slideIn">
            CLAIM WAS SUCCESSFUL
          </div>
        );

      case "none":
      case "pending":
        return <></>;
    }
  };

  const renderButton = () => {
    if (!connectedWallet) {
      return (
        <Button
          variant="blue"
          size="default"
          className="min-w-[260px] uppercase"
          onClick={() => {
            // Mock wallet connection
            console.log("Connect wallet");
          }}
        >
          connect wallet
        </Button>
      );
    }

    switch (status) {
      case "none":
        return (
          <Button
            variant="buyGreen"
            size="default"
            className="min-w-[260px] uppercase"
            onClick={handleClaim}
          >
            claim
          </Button>
        );
      case "claimError":
        return (
          <Button
            variant="blue"
            size="default"
            className="min-w-[260px] uppercase opacity-50"
            disabled
          >
            claim
          </Button>
        );
      case "pending":
        return (
          <Button
            variant="blue"
            size="default"
            className="min-w-[260px] uppercase opacity-50"
            disabled
          >
            pending
          </Button>
        );

      case "success":
        return null;
    }
  };

  if (!offer) return null;

  return (
    <div
      className={clsx(
        "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4",
        open ? "block" : "hidden"
      )}
      onClick={() => onOpenChange(false)}
    >
      <div
        className={clsx(
          "bg-[#1A1A2E] rounded-3xl p-6 w-full max-w-[95%] md:max-w-[500px] min-h-[600px] border-none overflow-hidden flex flex-col justify-between items-center relative",
          "animate-in fade-in-0 zoom-in-95 duration-200"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 text-white text-xl font-bold hover:text-gray-300"
        >
          ×
        </Button>

        <div className="relative flex flex-col w-full items-center mt-6 h-full flex-1">
          <div className="w-full flex justify-center items-center">
            <div className="w-full max-w-[164px] h-32  rounded-lg flex items-center justify-center">
              <span className="text-4xl">
                <img
                  src="/icons/logo.png"
                  alt="Reward"
                  className="w-full h-full"
                />
              </span>
            </div>
          </div>

          <div className="gap-2 uppercase text-[18px] md:text-2xl text-center leading-[32px] font-semibold pt-3">
            <div className="text-center max-w-[280px] mx-auto">
              {getTitle()}
            </div>
          </div>

          <div className="max-w-[340px] text-center mt-2 flex-1 flex flex-col items-center justify-between">
            <div className="w-full">
              <span className="w-full text-[#6F7CB5] uppercase text-sm md:text-base">
                Free drop. Free points. Every {getDuration(offer.name!)}. If you
                miss it, someone else won&apos;t.
              </span>

              {offer.id !== "3" ? (
                <div className="w-full flex justify-between items-center uppercase text-xl mt-5">
                  <span className="text-[#6F7CB5]">units</span>
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                      <span className="text-black font-bold text-xs">$</span>
                    </div>
                    {formatNumber(offer.items?.[0].amount || 0)}
                  </span>
                </div>
              ) : (
                <div className="w-full flex justify-between items-center uppercase text-xl mt-5">
                  <span className="text-[#6F7CB5]">INCOME UNITS</span>
                  <span className="flex items-center justify-center gap-2">
                    + 30%
                  </span>
                </div>
              )}

              <div className="w-full flex justify-between items-center uppercase text-xl mt-[10px]">
                <span className="text-[#6F7CB5]">activity points</span>
                <span className="flex items-center justify-center gap-2">
                  {offer.activityPoints} AP
                </span>
              </div>

              {connectedWallet && (
                <div className="w-full flex flex-col items-center gap-3">
                  <span className="uppercase text-base md:text-xl leading-[32px] font-semibold">
                    wallet
                  </span>
                  <div className="w-full flex flex-col gap-2">
                    <div className="w-full flex justify-between items-center uppercase text-sm md:text-base">
                      <span className="text-[#6F7CB5] flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">W</span>
                        </div>
                        your wallet:
                      </span>
                      <span className="flex items-center justify-center gap-2">
                        {truncatedString("0x1234...5678", 16)}
                      </span>
                    </div>

                    <div className="w-full flex justify-between items-center uppercase text-sm md:text-base">
                      <span className="text-[#6F7CB5]">gas fee</span>
                      <span className="flex items-center justify-center gap-2">
                        {"< 0.0001 ETH (BASE)"}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {renderNotification()}

            <div className="w-full relative">{renderButton()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
