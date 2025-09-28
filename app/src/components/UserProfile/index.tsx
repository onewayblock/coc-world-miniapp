"use client";
import { Heading } from "@/shared/ui/heading";
import clsx from "clsx";
import { useState } from "react";

export function UserProfile() {
  const [hintOpen, setHintOpen] = useState(false);

  // Mock data
  const user = {
    nickname: "CREATIVE",
  };

  const userPoints = 53229;

  const userRank = {
    position: 19999, // 20K+ rank
  };

  return (
    <div
      className="w-full rounded-2xl border border-[#FFFFFF14] bg-black/60 backdrop-blur-md p-4 sm:p-6"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start">
          <div className="w-[84px] h-[78px] mr-2 bg-[#23263A] flex items-center justify-center rounded-full">
            <img
              src="/icons/treasury/avatar-icon.svg"
              className="w-6 h-6"
              alt="avatar"
            />
          </div>

          <div className="flex flex-col justify-between gap-4">
            <div className="flex items-start justify-start gap-1">
              <div className="flex flex-col gap-0">
                <p className="text-sm font-bold text-[#9DAFFE] leading-none text-left">
                  Username
                </p>
                <div className="truncate w-full uppercase text-white text-xl leading-none font-bold text-left">
                  <Heading className="truncate w-[130px]">
                    {user.nickname}
                  </Heading>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-0">
              <p className="text-sm font-bold text-[#9DAFFE] leading-none text-left">
                Activity points
              </p>
              <div className="truncate w-full uppercase text-white text-xl leading-none font-bold text-left">
                <Heading className="truncate">{userPoints}</Heading>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center relative">
          <div
            className={clsx({
              "absolute bottom-[calc(100%+0px)] right-0 translate-x-1/2 transition-all pointer-events-none flex flex-col":
                true,
              "opacity-0": !hintOpen,
              "opacity-100": hintOpen,
            })}
          >
            <p className="bg-white text-black font-bold text-[11px] text-center items-center justify-center leading-none font-jura min-w-[55px] rounded-md px-2 py-1 relative">
              {userRank.position + 1}
            </p>
            <div className="w-0 h-0 border-solid border-x-[5.5px] border-b-[6px] border-x-transparent border-b-white rotate-180 ml-1" />
          </div>

          <div
            className="flex flex-col justify-center items-center h-[47px] w-[45px] relative cursor-pointer"
            onMouseEnter={() => {
              if (userRank.position + 1 > 100) {
                setHintOpen(true);
              }
            }}
            onMouseLeave={() => {
              setHintOpen(false);
            }}
          >
            <div className="hexagon flex items-center justify-center absolute top-0 left-0 w-full h-full" />
            <span className="text-white font-bold leading-none uppercase">
              20K+
            </span>
          </div>

          <span className="text-white text-base font-bold pt-2">YOUR RANK</span>
        </div>
      </div>
    </div>
  );
}
